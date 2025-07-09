import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



// ✅ Thunk to fetch admin stats
export const fetchAdminStats = createAsyncThunk(
  'admin/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('https://refrll-backend.onrender.com/api/admin/stats', { withCredentials: true });
      return res.data;
    } catch (err) {
      console.error("Fetch admin stats error:", err);
      return rejectWithValue(err.response?.data?.message || "Failed to fetch admin stats");
    }
  }
);



export const fetchCompanyJobs = createAsyncThunk(
  'companyJobs/fetchCompanyJobs',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`https://refrll-backend.onrender.com/api/admin/company-jobs?page=${page}&limit=${limit}`, { withCredentials: true });
      return res.data;
    } catch (err) {
      console.error("Fetch company jobs error:", err);
      return rejectWithValue(err.response?.data?.message || "Failed to fetch company jobs");
    }
  }
);


const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: {},
     jobs: [],
    loading: false,
    error: null,
     totalJobs: 0,
    totalPages: 0,
    currentPage: 1
  },
  reducers: {
    clearAdminStats: (state) => {
      state.stats = {};
      state.error = null;
    },
     clearCompanyJobs: (state) => {
      state.jobs = [];
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCompanyJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
          state.totalJobs = action.payload.totalJobs;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchCompanyJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAdminStats } = adminSlice.actions;
export const { clearCompanyJobs } = adminSlice.actions;
export default adminSlice.reducer;
