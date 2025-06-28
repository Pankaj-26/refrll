import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchApplicants = createAsyncThunk(
  'applicants/fetchApplicants',
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/job/${jobId}/applicants`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

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

// export const fetchSeekerApplications = createAsyncThunk(
//   'applications/fetchSeekerApplications',
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/applications/seeker', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           }
//         });
//       console.log(response.data)
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
      const response = await axios.get('http://localhost:5000/api/applications/seeker', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
            withCredentials: true
        });
      console.log(response.data)
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
