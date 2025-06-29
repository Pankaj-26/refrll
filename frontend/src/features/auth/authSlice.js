

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API = 'http://localhost:5000/api';

// const initialState = {
//   user: null,
//   loading: false,
//   error: null,
// };

// // Fetch user details
// export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, thunkAPI) => {
//   const token = localStorage.getItem('token'); 
//   try {
//     const res = await axios.get(`${API}/auth/me`, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
//   withCredentials: true 
// });

// console.log("fetchUser response:", res.data);
 
//     return res.data.user;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data.message);
//   }
// });


// // Signup thunk
// export const signupUser = createAsyncThunk(
//   'auth/signupUser',
//   async ({ name, email, password }, thunkAPI) => {
//     try {
//       const res = await axios.post(`${API}/auth/signup`, { name, email, password });
//       return res.data; // ideally your API returns user info and token on signup
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || 'Signup failed');
//     }
//   }
// );


// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ email, password }, thunkAPI) => {
//     try {
//       const res = await axios.post(`${API}/auth/signin`, { email, password });

//       return res.data; 
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
//     }
//   }
// );




// export const signupCompany = createAsyncThunk('auth/signupCompany', async (companyData, thunkAPI) => {
//   try {
//     const res = await axios.post(`${API}/company/signup`, companyData);
//     return res.data;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data.message || 'Company signup failed');
//   }
// });

// // Toggle role



// export const toggleRole = createAsyncThunk('auth/toggleRole', async (currentRole, thunkAPI) => {
//   try {
//     const token = localStorage.getItem('token');
//     const endpoint = currentRole === 'seeker' ? 'upgradeToReferrer' : 'downgradeToSeeker';
    
//     const res = await axios.put(
//       `${API}/users/${endpoint}`,
//       {}, // Empty body
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true
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

// // Logout
// export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
//   localStorage.removeItem('token'); 
//   try {
//     await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
//     return null;
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response.data.message);
//   }
// });

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//      clearError: (state) => {
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//        // Signup cases
//       .addCase(signupUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         state.loading = false;
//         // If your signup returns user + token, store them
//         // Usually on signup you might want to auto-login user
//         state.user = action.payload.user || null;
//         if (action.payload.token) {
//           localStorage.setItem('token', action.payload.token);
//         }
//       })
//        .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//  // Login cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
  
//  .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//             if (action.payload.user) {
//     state.user = action.payload.user;
//   } else if (action.payload.company) {
//     state.user = action.payload.company; // assign company as user
//   }
//         if (action.payload.token) {
//           localStorage.setItem('token', action.payload.token);
//         }
//       })



   
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })


//       //fetchUser cases

//       .addCase(fetchUser.pending, (state) => { state.loading = true; })
//       .addCase(fetchUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchUser.rejected, (state, action) => {
//         state.error = action.payload;
//         state.loading = false;
//       })

//       .addCase(toggleRole.fulfilled, (state, action) => {
//         state.user = action.payload;
//          state.status = 'succeeded';
//       })
//         .addCase(toggleRole.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })

//       .addCase(logout.fulfilled, (state) => {
//         state.user = null;
//       });
//   },
// });
// export const { clearError } = authSlice.actions;

// export default authSlice.reducer;

























// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:5000/api';
axios.defaults.withCredentials = true; // Enable cookie transmission

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Auth operations
export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${API}/auth/me`);
    return res.data.user;
  } catch (err) {
    if (err.response?.status === 401) {
      try {
        await axios.post(`${API}/auth/refresh`);
        const retryRes = await axios.get(`${API}/auth/me`);
        return retryRes.data.user;
      } catch (refreshErr) {
        return rejectWithValue(refreshErr.response?.data?.message || 'Session expired');
      }
    }
    return rejectWithValue(err.response?.data?.message || 'Request failed');
  }
});

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/auth/signin`, { email, password });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axios.post(`${API}/auth/logout`);
    return null;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Logout failed');
  }
});




export const toggleRole = createAsyncThunk('auth/toggleRole', async (currentRole, thunkAPI) => {
  try {
    const token = localStorage.getItem('token');
    const endpoint = currentRole === 'seeker' ? 'upgradeToReferrer' : 'downgradeToSeeker';
    
    const res = await axios.put(
      `${API}/users/${endpoint}`,
      {}, // Empty body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true
      }
    );
    
    // Extract newToken and user from response
    const { newToken, user } = res.data;
    
    // Update client-side token storage
    localStorage.setItem('token', newToken);
    
    // Update axios default headers for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    
    return user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Role switch failed');
  }
});





// Signup thunk
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ name, email, password,isCompany}, thunkAPI) => {
    console.log(isCompany)
    try {
      const res = await axios.post(`${API}/auth/signup`, { name, email, password,isCompany });
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
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;