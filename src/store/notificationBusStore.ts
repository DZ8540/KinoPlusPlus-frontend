// * Types
import type { NotificationType } from '@/contracts/notification'
// * Types

import cuid from 'cuid'
import { defineStore } from 'pinia'

type Notification = NotificationType & {
  id: string,
}

export const useNotificationBus = defineStore('notificationBus', {
  state: () => ({
    notifications: [] as Notification[]
  }),
  actions: {
    addNotification(notificationType: NotificationType): void {
      const id: Notification['id'] = cuid()
      const notification: Notification = { ...notificationType, id }

      this.notifications.push(notification)

      setTimeout(() => {
        this.removeNotification(id)
      }, 5000)
    },
    removeNotification(id: Notification['id']): void {
      this.notifications = this.notifications.filter((item: Notification) => item.id != id)
    },
  },
})
