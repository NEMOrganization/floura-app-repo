import React, { useState, useEffect } from 'react';
import { View, Text, Platform, Alert, StyleSheet, TouchableOpacity } from 'react-native';
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

  useEffect(() => {
    loadReminderTime();
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Tillad notifikationer',
        'Vi har brug for tilladelse til at sende påmindelser! 🪥'
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
        body: "Husk at børste tænderne nu! 😁",
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
      <Text style={styles.label}>Vælg tidspunkt for tandbørstning ⏰</Text>

      {/* Tidspicker knap */}
      <TouchableOpacity 
        style={styles.timeButton} 
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.timeButtonText}>
          {time.getHours()}:{time.getMinutes().toString().padStart(2, '0')}
        </Text>
      </TouchableOpacity>

      {/* DateTimePicker */}
      {showPicker && (
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={time}
            mode="time"
            display="spinner"
            onChange={onChange}
          />
        </View>
      )}

      {/* Gem påmindelse */}
      <TouchableOpacity style={styles.saveButton} onPress={saveReminder}>
        <Text style={styles.saveButtonText}>Gem påmindelse</Text>
      </TouchableOpacity>
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
    backgroundColor: '#E8F5E9',
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#432323',
    textAlign: 'center',
  },
  timeButton: {
    backgroundColor: '#F5AFAF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 20,
    marginBottom: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  timeButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  pickerContainer: {
    backgroundColor: '#C8E6C9',
    borderRadius: 20,
    padding: 10,
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: '#F5AFAF',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
});
