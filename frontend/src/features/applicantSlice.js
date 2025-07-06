import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from "../util/axios"

// export const fetchApplicants = createAsyncThunk(
//   'applicants/fetchApplicants',
//   async (jobId, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/applications/job/${jobId}/applicants`,
//         {
//          withCredentials: true
//         }
//       );
//       return res.data; 
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

export const fetchApplicants = createAsyncThunk(
  'applicants/fetchApplicants',
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/applications/job/${jobId}/applicants`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// export const fetchSeekerApplications = createAsyncThunk(
//   'applications/fetchSeekerApplications',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/applications/seeker', {
        
//             withCredentials: true
//         });
      
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch applications');
//     }
//   }
// );


export const fetchSeekerApplications = createAsyncThunk(
  'applications/fetchSeekerApplications',
  async (_, thunkAPI) => {
    try {
      const response = await API.get('/applications/seeker');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch applications');
    }
  }
);

const applicantSlice = createSlice({
  name: 'applicants',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchApplicants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSeekerApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeekerApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSeekerApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default applicantSlice.reducer;
