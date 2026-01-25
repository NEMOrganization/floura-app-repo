import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import BackArrow from '../../src/components/BackArrow';
import { Notification, NotificationType, createNotification, deleteNotification, getUserNotifications, } from '../services/notificationService';
import NotificationItem from '../components/NotificationItem';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function ReminderSettingsScreen() {
  const router = useRouter();
  const { token } = useAuth();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [morningTime, setMorningTime] = useState(new Date());
  const [eveningTime, setEveningTime] = useState(new Date());
  const [showMorningPicker, setShowMorningPicker] = useState(false);
  const [showEveningPicker, setShowEveningPicker] = useState(false);

  // Hent notifikationer fra backend
  const loadNotifications = async () => {
    if (!token) return;
    try {
      const data = await getUserNotifications(token);
      setNotifications(data);

      // Sæt tid til eksisterende notifikationer
      const morning = data.find((n) => n.type === 0);
      const evening = data.find((n) => n.type === 1);

      if (morning) setMorningTime(new Date(morning.time));
      if (evening) setEveningTime(new Date(evening.time));
    } catch (err) {
      console.log('Kunne ikke hente notifikationer', err);
    }
  };

  useEffect(() => {
    if (token) loadNotifications();
  }, [token]);

  // Bed om notifikationstilladelse
  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Tillad notifikationer',
        'Vi har brug for tilladelse til at sende påmindelser! 🪥'
      );
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Planlæg daglig lokal notifikation
  const scheduleDailyNotification = async (
    time: Date,
    title: string,
    body: string
  ) => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const trigger: Notifications.CalendarTriggerInput = {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour: time.getHours(),
      minute: time.getMinutes(),
      repeats: true,
    };

    await Notifications.scheduleNotificationAsync({
      content: { title, body, sound: true },
      trigger,
    });
  };

  const handleCreate = async (type: NotificationType) => {
    if (!token) return;

    const exists = notifications.find((n) => n.type === type);
    if (exists) {
      Alert.alert('Info', 'Du har allerede en notifikation for dette tidspunkt.');
      return;
    }

    const time = type === 0 ? morningTime : eveningTime;

    try {
      await createNotification(
        { time: time.toISOString(), type },
        token
      );

      await scheduleDailyNotification(
        time,
        type === 0 ? 'Morgenpåmindelse' : 'Aftenpåmindelse',
        'Tid til at børste tænder! 🪥'
      );

      await loadNotifications();

      // Luk DateTimePicker
      if (type === 0) setShowMorningPicker(false);
      else setShowEveningPicker(false);

      Alert.alert(
        'Påmindelse gemt!',
        `Du vil blive mindet hver dag kl. ${time.getHours()}:${time
          .getMinutes()
          .toString()
          .padStart(2, '0')}`
      );
    } catch (err) {
      Alert.alert('Fejl', 'Kunne ikke gemme påmindelsen 😢');
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await deleteNotification(id, token);
      await loadNotifications();
      Alert.alert('Påmindelse slettet');
    } catch (err) {
      Alert.alert('Fejl', 'Kunne ikke slette påmindelsen 😢');
    }
  };

  const onMorningChange = (pickerEvent: DateTimePickerEvent, selectedDate?: Date) => {
    if (pickerEvent.type === 'dismissed') {
      setShowMorningPicker(false);
      return;
    }

    setShowMorningPicker(Platform.OS === 'ios');
    if (selectedDate) setMorningTime(selectedDate);
  };

  const onEveningChange = (pickerEvent: DateTimePickerEvent, selectedDate?: Date) => {
    if (pickerEvent.type === 'dismissed') {
    setShowEveningPicker(false);
    return;
  }

    setShowEveningPicker(Platform.OS === 'ios');
    if (selectedDate) setEveningTime(selectedDate);
  };

  const handleBack = () => router.back();

  return (
    <View style={styles.container}>
      <View style={styles.backButton}>
        <BackArrow onBack={handleBack} />
      </View>

      <Text style={styles.header}>Påmindelser</Text>

    {/* Morgen */}
<View style={styles.section}>
  <Text style={styles.label}>Morgenpåmindelse</Text>

  <TouchableOpacity
    style={styles.timeButton}
    onPress={() => setShowMorningPicker(true)}
  >
    <Text style={styles.timeText}>
      {morningTime.getHours()}:
      {morningTime.getMinutes().toString().padStart(2, '0')}
    </Text>
  </TouchableOpacity>

  {showMorningPicker && (
    <>
      <DateTimePicker
        value={morningTime}
        mode="time"
        is24Hour={true}
        display="spinner"
        onChange={onMorningChange}
      />

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setShowMorningPicker(false)}
      >
        <Text style={styles.cancelText}>Annuller</Text>
      </TouchableOpacity>
    </>
  )}

  <TouchableOpacity
    style={[styles.button, { backgroundColor: '#FFD6E0' }]}
    onPress={() => handleCreate(0)}
  >
    <Text style={styles.buttonText}>Gem påmindelse</Text>
  </TouchableOpacity>
</View>


      {/* Aften */}
      <View style={styles.section}>
        <Text style={styles.label}>Aftenpåmindelse</Text>

        <TouchableOpacity
          style={styles.timeButton}
          onPress={() => setShowEveningPicker(true)}
        >
          <Text style={styles.timeText}>
            {eveningTime.getHours()}:{eveningTime.getMinutes().toString().padStart(2, '0')}
          </Text>
        </TouchableOpacity>

        {showEveningPicker && (
          <>
          <DateTimePicker
            value={eveningTime}
            mode="time"
            is24Hour={true}
            display="spinner"
            onChange={onEveningChange}
          />

          <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => setShowEveningPicker(false)}
      >
        <Text style={styles.cancelText}>Annuller</Text>
      </TouchableOpacity>
    </>
    )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#AAC4F5' }]}
          onPress={() => handleCreate(1)}
        >
          <Text style={styles.buttonText}>Gem påmindelse</Text>
        </TouchableOpacity>
      </View>

      {/* Liste af notifikationer */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem notification={item} onDelete={handleDelete} />
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF8DE' },
  backButton: { marginBottom: 10 },
  header: { fontSize: 28, color: '#432323', textAlign: 'center', marginBottom: 20, fontFamily: 'Roboto', },
  section: { marginBottom: 25, padding: 15, backgroundColor: '#F5EFE6', borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5 },
  label: { fontSize: 18, fontWeight: '500', color: '#432323', marginBottom: 20, fontFamily: 'Roboto', textAlign: 'center' },
  timeButton: { padding: 12, borderRadius: 12, backgroundColor: '#E8DFCA', alignItems: 'center', marginBottom: 5 },
  timeText: { fontSize: 16, fontWeight: '500' },
  button: { padding: 10, borderRadius: 30, alignItems: 'center', marginTop: 5 },
  buttonText: { color: '#432323', fontWeight: '600', fontFamily: 'Roboto' },
  cancelButton: { marginTop: 10, alignSelf: 'center', marginBottom: 10 },
  cancelText: { color: '#BB6653', fontSize: 20, },
});






