import axios from './axiosInstance'; // your configured axios with baseURL and auth

export const getNotifications = async () => {
  const res = await axios.get('/notifications');
  return res.data;
};

export const markNotificationAsRead = async (id) => {
  const res = await axios.patch(`/notifications/${id}/read`);
  return res.data;
};
