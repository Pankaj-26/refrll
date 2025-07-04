import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const getNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async (_, { rejectWithValue }) => {
    try {
       const res = await axios.get('http://localhost:5000/api/notifications',{
         withCredentials:true
       });

    console.log(res.data)

       return res.data;;
     
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Failed to fetch notifications');
    }
  }
);

export const markNotificationAsRead  = createAsyncThunk(
  'notifications/markNotificationAsRead ',
  async (id, { rejectWithValue }) => {
    try {
       const res = await axios.patch(`http://localhost:5000/api/notifications/${id}/read`,{

        withCredentials:true
    });
    console.log(res.data)
    return res.data;
  
     
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Failed to mark as read');
    }
  }
);



// features/notificationsSlice.js
export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { getState }) => {
    const { user } = getState().auth;
    const response = await api.patch('/notifications/mark-all-read', {
      userId: user.id
    });
    return response.data;
  }
);

const initialState = {
  notifications: [],
  loading: false,
  error: null
};


const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 🔷 Fetch notifications
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔷 Mark notification as read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.loading = false;
        const id = action.meta.arg; // id passed in dispatch(markNotificationAsRead(id))
        const index = state.notifications.findIndex(n => n._id === id);
        if (index !== -1) {
          state.notifications[index].isRead = true;
        }
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;

