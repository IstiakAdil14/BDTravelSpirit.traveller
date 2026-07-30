export enum SOCKET_NAMESPACES {
  USER_ONLINE = "user_online",
  CHAT = "chat",
  NOTIFICATION = "notification",
}
export type SocketNamespacesTypes = `${SOCKET_NAMESPACES}`;

export type SocketTTriggerTypes = string;
