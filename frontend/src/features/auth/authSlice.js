
// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from "../../util/axios"


axios.defaults.withCredentials = true; 

const initialState = {
  user: null,
  loading: false,
  error: null,
   forgotPasswordMessage: null,
    resetPasswordMessage: null,
};




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




export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const res = await API.post('/auth/forgot-password', { email });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error occurred');
    }
  }
);

// 🔷 Reset Password Thunk
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await API.post(`/auth/reset-password/${token}`, { password });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error occurred');
    }
  }
);





const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.forgotPasswordMessage = null;
      state.resetPasswordMessage = null;
    },
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
 .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotPasswordMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotPasswordMessage = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resetPasswordMessage = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.resetPasswordMessage = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;