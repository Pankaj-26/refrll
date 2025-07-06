
// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from "../../util/axios"

// const API = 'http://localhost:5000/api';
axios.defaults.withCredentials = true; // Enable cookie transmission

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Auth operations
// export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
//   try {
//     const res = await axios.get(`${API}/auth/me`);
//     return res.data.user;
//   } catch (err) {
//     if (err.response?.status === 401) {
//       try {
//         await axios.post(`${API}/auth/refresh`);
//         const retryRes = await axios.get(`${API}/auth/me`);
//         return retryRes.data.user;
//       } catch (refreshErr) {
//         return rejectWithValue(refreshErr.response?.data?.message || 'Session expired');
//       }
//     }
//     return rejectWithValue(err.response?.data?.message || 'Request failed');
//   }
// });


export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/auth/me');
    return res.data.user;
  } catch (err) {
    if (err.response?.status === 401) {
      try {
        await API.post('/auth/refresh');
        const retryRes = await API.get('/auth/me');
        return retryRes.data.user;
      } catch (refreshErr) {
        return rejectWithValue(refreshErr.response?.data?.message || 'Session expired');
      }
    }
    return rejectWithValue(err.response?.data?.message || 'Request failed');
  }
});



export const refreshAccessToken = async () => {
  try {
    const res = await API.post('/auth/refresh', {}, {
      withCredentials: true
    });
    return res.data;
  } catch (err) {
    console.error('Refresh token failed:', err);
    throw err;
  }
};


// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(`${API}/auth/signin`, { email, password });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Login failed');
//     }
//   }
// );

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await API.post('/auth/signin', { email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);



export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await API.post('/auth/logout');
    return null;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Logout failed');
  }
});


// export const toggleRole = createAsyncThunk('auth/toggleRole', async (currentRole, thunkAPI) => {
//   try {
//     const token = localStorage.getItem('token');
//     const endpoint = currentRole === 'seeker' ? 'upgradeToReferrer' : 'downgradeToSeeker';
    
//     const res = await axios.put(
//       'http://localhost:5000/users/${endpoint}',
//       {}, 
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//         timeout: 5000
//       }
//     );
    
//     // Extract newToken and user from response
//     const { newToken, user } = res.data;
    
//     // Update client-side token storage
//     localStorage.setItem('token', newToken);
    
//     // Update axios default headers for future requests
//     axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    
//     return user;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || 'Role switch failed');
//   }
// });





// Signup thunk


export const toggleRole = createAsyncThunk('auth/toggleRole', async (currentRole, thunkAPI) => {
  try {
    const endpoint = currentRole === 'seeker' ? 'upgradeToReferrer' : 'downgradeToSeeker';
    
    const res = await API.put(`/users/${endpoint}`);

    // Extract updated user from response
    const { user } = res.data;

    return user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Role switch failed');
  }
});


export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ name, email, password,isCompany}, thunkAPI) => {
   
    try {
      const res = await API.post('/auth/signup', { name, email, password,isCompany });
      return res.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Signup failed');
    }
  }
);





const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user || action.payload.company;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      
      .addCase(toggleRole.fulfilled, (state, action) => {
        state.user = action.payload;
         state.status = 'succeeded';
      })
        .addCase(toggleRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(signupUser.fulfilled, (state, action) => {
  state.user = action.payload.user; 
  state.loading = false;
})
.addCase(signupUser.rejected, (state, action) => {
  state.error = action.payload;
  state.loading = false;
})
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;