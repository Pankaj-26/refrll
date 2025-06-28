import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// export const fetchProfile = createAsyncThunk(
//   "profile/fetchProfile",
//   async (_, { rejectWithValue }) => {
//     try {
      
//       const res = await axios.get("http://localhost:5000/api/users/profile", {
//         withCredentials: true
//       });

//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
//     }
//   }
// );

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      Object.entries(profileData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === "skills" && Array.isArray(value)) {
            formData.append("skills", value.join(",")); // Join skills into a string
          } else if (key === "resume") {
            formData.append("resume", value); // file
          } else {
            formData.append(key, value);
          }
        }
      });

      

      const res = await axios.patch("http://localhost:5000/api/users/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update profile");
    }
  }
);




const profileSlice = createSlice({
  name: "profile",
  initialState: {
    seeker: null,
    loading: false,
    error: null,
  },
  reducers: {
    // No regular reducers needed for now
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.seeker = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
