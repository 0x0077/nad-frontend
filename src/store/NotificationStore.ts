import { makeObservable, observable, action, computed, reaction, IReactionDisposer } from "mobx";
import { Notification } from "@/lib/interface";


class NotificationStore {
  @observable notifications: Notification[] = [];
  @observable hasPendingNotifications: boolean = false;
  @observable isVisible: boolean = false;
  private disposer?: IReactionDisposer;

  constructor() {
    makeObservable(this);
  }

  setupReactions() {
    if (this.disposer) {
      this.disposer();
    }

    this.disposer = reaction(
      () => ({
        pendingCount: this.pendingNotifications.length
      }),
      ({ pendingCount }) => {
        this.setHasPendingNotifications(pendingCount > 0);
      },
      {
        name: 'pendingNotificationsReaction',
        fireImmediately: true
      }
    );
  }

  dispose() {
    if (this.disposer) {
      this.disposer();
    }
  }
  
  @computed
  get pendingNotifications() {
    return this.notifications.filter(n => n.status === 'pending');
  }

  @computed
  get successNotifications() {
    return this.notifications.filter(n => n.status === 'success');
  }

  @action 
  setHasPendingNotifications(hasPending: boolean) {
    this.hasPendingNotifications = hasPending;
    this.isVisible = hasPending;
  }

  @action
  setVisibility(visible: boolean) {
    this.isVisible = visible;
  }


  @action
  setNotificationOpen(id: string, open: boolean) {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notifications[index] = { 
        ...this.notifications[index], 
        open 
      };
    }
  }

  @action
  addNotification(notification: Omit<Notification, 'id'>): string {
    const id = `${Date.now()}-${performance.now().toFixed(3)}`;
    const newNotification = { 
      ...notification, 
      id,
      open: false,
      animationDelay: this.notifications.length * 100 
    };

    this.notifications.push(newNotification);
    this.setVisibility(true);

    // Auto set open state
    setTimeout(() => {
      this.setNotificationOpen(id, true);
    }, 50);

    // Auto remove success notifications
    if (notification.status === 'success') {
      this.scheduleNotificationRemoval(id, 5000);
    }

    return id;
  }

  @action
  updateNotification(id: string, updates: Partial<Notification>) {
    const index = this.notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      const updatedNotification = {
        ...this.notifications[index],
        ...updates,
        open: true // Keep open state
      };
      
      this.notifications[index] = updatedNotification;

      // Only schedule removal when status changes to success
      if (updates.status === 'success') {
        this.scheduleNotificationRemoval(id, 5000);
      }
    }
  }

  @action
  removeNotification(id: string) {
    // Set close animation first
    this.setNotificationOpen(id, false);

    // Remove after animation completes
    setTimeout(() => {
      this.notifications = this.notifications.filter(n => n.id !== id);
      
      // Hide container if no notifications remain
      if (this.notifications.length === 0) {
        this.setVisibility(false);
      }
    }, 300);
  }

  private scheduleNotificationRemoval(id: string, delay: number) {
    setTimeout(() => {
      this.removeNotification(id);
    }, delay);
  }

  @action
  clearAllNotifications() {
    this.notifications = [];
    this.setVisibility(false);
  }
}

export default NotificationStore;