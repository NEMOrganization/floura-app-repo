import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

// Opsæt notifikation handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const ReminderSettingsScreen = () => {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  // Load saved reminder time og spørg om permission
  useEffect(() => {
    loadReminderTime();
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Tillad notifikationer',
        'Vi har brug for tilladelse til at sende påmindelser!'
      );
    }
  };

  const loadReminderTime = async () => {
    const json = await AsyncStorage.getItem('reminderTime');
    if (json) {
      const savedTime = new Date(JSON.parse(json));
      setTime(savedTime);
    }
  };

  const saveReminderTime = async (selectedTime: Date) => {
    await AsyncStorage.setItem('reminderTime', JSON.stringify(selectedTime));
  };

  const scheduleDailyReminder = async (selectedTime: Date) => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Gem hour/minute i lokale variabler
  const hour = selectedTime.getHours();
  const minute = selectedTime.getMinutes();

  const trigger: Notifications.CalendarTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
    repeats: true,
    hour,
    minute,
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Tid til tandbørstning! 🪥",
      body: "Husk at børste tænderne nu!",
      sound: true,
    },
    trigger,
  });

  Alert.alert(
    'Påmindelse gemt!',
    `Du vil blive mindet hver dag kl. ${hour}:${minute.toString().padStart(2, '0')}`
  );
};


  const onChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) setTime(selectedDate);
  };

  const saveReminder = async () => {
    await saveReminderTime(time);
    await scheduleDailyReminder(time);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Vælg tidspunkt for tandbørstning:</Text>
      <Button
        title={`Tid: ${time.getHours()}:${time.getMinutes()
          .toString()
          .padStart(2, '0')}`}
        onPress={() => setShowPicker(true)}
      />
      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onChange}
        />
      )}
      <View style={styles.saveButton}>
        <Button title="Gem påmindelse" onPress={saveReminder} />
      </View>
    </View>
  );
};

export default ReminderSettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
  saveButton: {
    marginTop: 30,
    width: '80%',
  },
});