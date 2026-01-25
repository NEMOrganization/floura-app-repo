import React, { useEffect, useState, useCallback } from 'react';
import { View, Button, FlatList, Alert, ActivityIndicator, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import {
  getUserNotifications,
  createNotification,
  toggleNotification,
  deleteNotification,
  Notification,
} from '../services/notificationService';
import NotificationItem from '../components/NotificationItem';

export default function NotificationsScreen() {
  const { token, loading } = useAuth(); // 🔹 hent loading fra AuthContext
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadNotifications = useCallback(async () => {
  if (!token) return;
  try {
    const data = await getUserNotifications(token);
    setNotifications(data);
  } catch (error) {
    Alert.alert('Error', (error as Error).message);
  }
}, [token]);

useEffect(() => {
  loadNotifications();
}, [loadNotifications]);


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

  const handleCreate = async (type: 'Morning' | 'Evening') => {
    if (!token) return;
    try {
      await createNotification({ time: new Date().toISOString(), type }, token);
      loadNotifications();
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  if (loading) {
    // 🔹 Vent mens AuthContext loader token
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Create Morning Notification" onPress={() => handleCreate('Morning')} />
      <Button title="Create Evening Notification" onPress={() => handleCreate('Evening')} />

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
        refreshing={isLoading}
        onRefresh={loadNotifications}
        ListEmptyComponent={
          !isLoading ? (
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Text>No notifications</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}


