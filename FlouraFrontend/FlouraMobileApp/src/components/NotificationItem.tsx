import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Notification } from '../services/notificationService';

interface Props {
  notification: Notification;
  onDelete: (id: string) => void;
}

export default function NotificationItem({ notification, onDelete }: Props) {
  // Bestem baggrundsfarve ud fra notification type
  const IsMorning = notification.type === 0;
  const backgroundColor = IsMorning ? "#F5EFE6"  : "#F5EFE6"; 
  const label = IsMorning ? "Morgen" : "Aften";

  return (
    <View style={[styles.container, { backgroundColor }]}>
        <View>
            <Text style={styles.labelText}>{label}</Text>
            <Text style={styles.timeText}>
                {new Date(new Date(notification.time).getTime() + 60 * 60 * 1000)
                    .toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })} 
            </Text>
      </View>

      <Button
        title="Slet"
        color="#BB6653"
        onPress={() => onDelete(notification.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 5,
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 2,
    color: '#432323',
    fontFamily: 'Roboto'
  },
  timeText: {
    fontSize: 16,
    color: '#432323',
  },
});

