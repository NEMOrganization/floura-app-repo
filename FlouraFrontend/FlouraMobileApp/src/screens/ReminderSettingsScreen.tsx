import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getUserNotifications, createNotification, toggleNotification, deleteNotification, Notification } from '../services/notificationService';
import NotificationItem from '../components/NotificationItem';

export default function NotificationsScreen() {
  const { token } = useAuth(); // Hent JWT token fra AuthContext
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const loadNotifications = async () => {
    if (!token) return;
    try {
      const data = await getUserNotifications(token);
      setNotifications(data);
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, [token]);

  const handleToggle = async (id: string) => {
    if (!token) return;
    try {
      await toggleNotification(id, token);
      loadNotifications();
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await deleteNotification(id, token);
      loadNotifications();
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const handleCreate = async (type: "Morning" | "Evening") => {
    if (!token) return;
    try {
      await createNotification({ time: new Date().toISOString(), type }, token);
      loadNotifications();
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Create Morning Notification" onPress={() => handleCreate("Morning")} />
      <Button title="Create Evening Notification" onPress={() => handleCreate("Evening")} />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
      />
    </View>
  );
}

