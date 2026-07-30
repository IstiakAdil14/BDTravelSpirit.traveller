export enum GUIDE_SYSTEM_NOTIFICATION_PRIORITY {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}
export type GuideSystemNotificationPriority = `${GUIDE_SYSTEM_NOTIFICATION_PRIORITY}`;

export enum GUIDE_SYSTEM_NOTIFICATION_TYPE {
  SYSTEM = "system",
  BOOKING = "booking",
  REVIEW = "review",
}
export type GuideSystemNotificationType = `${GUIDE_SYSTEM_NOTIFICATION_TYPE}`;
