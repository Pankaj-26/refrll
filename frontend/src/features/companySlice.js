// redux/companySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateCompanyProfile = createAsyncThunk(
  'company/updateProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.put('/api/company/update-profile', formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    company: {
    name: "OpenAI",
    tagline: "Leading AI Research",
    location: "San Francisco",
    website: "https://openai.com",
    industry: "AI",
    companySize: "500+",
    founded: "2015",
    description: "We develop AI for the benefit of humanity.",
    specialties: ["AI", "ML", "NLP"],
    bannerUrl: "https://via.placeholder.com/1200x300?text=OpenAI+Banner",
    logoUrl: "https://via.placeholder.com/150?text=OA",
  },
    loading: false,
    error: null,
  },
  reducers: {
    setCompany(state, action) {
      state.company = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCompanyProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCompanyProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(updateCompanyProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update';
      });
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
