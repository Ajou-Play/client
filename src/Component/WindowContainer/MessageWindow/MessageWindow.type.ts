type SenderType = {
  senderId: number;
  name: string;
  profileImage: string;
};

export type MessageType = {
  sender: SenderType;
  content: string;
  createdAt: Date;
};
