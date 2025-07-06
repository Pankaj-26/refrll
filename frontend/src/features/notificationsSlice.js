import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import API from "../util/axios"

// export const getNotifications = createAsyncThunk(
//   'notifications/getNotifications',
//   async (_, { rejectWithValue }) => {
//     try {
//        const res = await axios.get('http://localhost:5000/api/notifications',{
//          withCredentials:true
//        });


//        return res.data;;
     
//     } catch (err) {
//       return rejectWithValue(err.response.data.message || 'Failed to fetch notifications');
//     }
//   }
// );

// export const markNotificationAsRead  = createAsyncThunk(
//   'notifications/markNotificationAsRead ',
//   async (id, { rejectWithValue }) => {
//     try {
//        const res = await axios.patch(`http://localhost:5000/api/notifications/${id}/read`,{

//         withCredentials:true
//     });
//     return res.data;
  
     
//     } catch (err) {
//       return rejectWithValue(err.response.data.message || 'Failed to mark as read');
//     }
//   }
// );

// export const markAllNotificationsAsRead = createAsyncThunk(
//   'notifications/markAllAsRead',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.patch('http://localhost:5000/api/notifications/mark-all-read',{
//          withCredentials:true
//       });
//       return response.data;
//     } catch (err) {
//       console.error('Failed to mark notifications as read:', err);
//       return rejectWithValue(err.response.data || 'Failed to mark notifications as read.');
//     }
//   }
// );



export const getNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/notifications');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch notifications');
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/notifications/${id}/read`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to mark as read');
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.patch('/notifications/mark-all-read');
      return response.data;
    } catch (err) {
      console.error('Failed to mark notifications as read:', err);
      return rejectWithValue(err.response?.data?.message || 'Failed to mark notifications as read.');
    }
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
      })
       .addCase(markAllNotificationsAsRead.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
        state.loading = false;
        state. notifications = state. notifications.map((notification) => ({
          ...notification,
          read: true,
          readAt: new Date().toISOString()
        }));
      })
      .addCase(markAllNotificationsAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to mark notifications as read';
      });
  }
});

export const { clearNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;

