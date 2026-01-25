import { apiClient } from '../api/client';

export type NotificationType = "Morning" | "Evening";

export interface Notification {
  id: string;
  time: string;
  isEnabled: boolean;
  type: NotificationType;
}

export interface CreateNotificationDto {
  time: string;
  type: NotificationType;
}

// Hent brugerens notifikationer
export const getUserNotifications = async (token: string): Promise<Notification[]> => {
  return apiClient.get<Notification[]>('/notifications', {
    Authorization: `Bearer ${token}`,
  });
};

// Opret ny notifikation
export const createNotification = async (dto: CreateNotificationDto, token: string) => {
  return apiClient.post<Notification>('/notifications', dto, {
    Authorization: `Bearer ${token}`,
  });
};

// Toggle en notifikation
export const toggleNotification = async (id: string, token: string) => {
  return apiClient.put<Notification>(`/notifications/${id}/toggle`, null, {
    Authorization: `Bearer ${token}`,
  });
};

// Slet en notifikation
export const deleteNotification = async (id: string, token: string) => {
  return apiClient.delete<void>(`/notifications/${id}`, {
    Authorization: `Bearer ${token}`,
  });
};
