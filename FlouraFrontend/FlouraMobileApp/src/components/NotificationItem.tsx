import React from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';
import { Notification } from '../services/notificationService';

interface Props {
  notification: Notification;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationItem: React.FC<Props> = ({ notification, onToggle, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text>{notification.type} at {new Date(notification.time).toLocaleTimeString()}</Text>
      <Switch
        value={notification.isEnabled}
        onValueChange={() => onToggle(notification.id)}
      />
      <Button title="Delete" onPress={() => onDelete(notification.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  }
});

export default NotificationItem;
