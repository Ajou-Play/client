import axios from '@Util/axios';

export const compareSenderReceiverType = (compare: boolean) => (compare ? 'sender' : 'receiver');

export const getMessageHistory = async (channelId: string) => {
  const res = await axios.get(`/channels/${channelId}/chats?page=0&size=500`);
  return res.data.data.content;
};
