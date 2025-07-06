

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-hot-toast';
import API from "../util/axios"


// export const fetchJobs = createAsyncThunk(
//   "jobs/fetchJobs",
//   async (params, thunkAPI) => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/jobs/getjobs", {
//         params,
//         withCredentials:true,
//       });
//     console.log(res.data)
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );


// export const applyToJob = createAsyncThunk("jobs/applyToJob", async ( jobId , thunkAPI) => {
 
//   try {
//     const res = await axios.post(
//       "http://localhost:5000/api/applications/apply",
//       { jobId },
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );

//     return { jobId, status: res.data.status || "Pending" };
//   } catch (err) {
//     return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//   }
// });




// export const fetchJobsWithApplicants = createAsyncThunk(
//   "jobs/fetchJobsWithApplicants",
//   async (params, thunkAPI) => {
    
 
//     try {
//       const res = await axios.get("http://localhost:5000/api/applications/applicants", {
//      params
//       });
//      console.log(res.data)
      
//       return res.data;
//     } catch (err) {
//      console.log(err)

//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    
//   }
//   }
// );


// export const fetchJobsWithApplicantsForReferrer = createAsyncThunk(
//   "jobs/fetchJobsWithApplicantsForReferrer",
//   async (_, thunkAPI) => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/applications/referrer", {
       
//         withCredentials:true
//       });

   
     
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );


// export const postJob = createAsyncThunk(
//   'jobs/postJob',
//   async (jobData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/jobs', jobData, {
     
//         withCredentials: true,
//       });
//       toast.success('Job posted successfully!');
//       return response.data.job;
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed to post job');
//       return rejectWithValue(err.response?.data);
//     }
//   }
// );


// export const claimJobForReferral = createAsyncThunk(
//   "jobs/claimJobForReferral",
//   async ({ jobId, contactInfo,userId  }, thunkAPI) => {
//     try {
//       const res = await axios.post(
//         `http://localhost:5000/api/jobs/${jobId}/claim`,
//         { contactInfo },
//         {
//          withCredentials:true
//         }
//       );
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );


// export const updateApplicationStatus = createAsyncThunk(
//   "jobs/updateApplicationStatus",
//   async ({ applicationId, status }, thunkAPI) => {
//     try {
//       console.log( applicationId, status)
//       const response = await axios.patch(
//         `http://localhost:5000/api/applications/${applicationId}/status`,
//         { status },
//         {
//         withCredentials:true
//         }
//       );

//       console.log(response.data)
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.message || "Failed to update status");
//     }
//   }
// );




// export const getJobWithApplicants = createAsyncThunk(
//   'jobs/getJobWithApplicants',
//   async ({ jobId, page = 1, limit = 10, filters = {} }, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(`/api/applications/${jobId}/applicants`, {
//         params: { page, limit, ...filters },
//         withCredentials: true
//       });
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data.message || 'Error fetching job');
//     }
//   }
// );


// export const getJobDetailForSeeker = createAsyncThunk(
//   'jobs/getJobDetailForSeeker',
//   async (jobId, { rejectWithValue }) => {
//     try {
//       //  i changed it to seeker from applicants
//       const res = await axios.get(`/api/applications/${jobId}/seeker`,   {
//          withCredentials:true
//         });
   
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data.message || 'Error fetching job');
//     }
//   }
// );






export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (params, thunkAPI) => {
    try {
      const res = await API.get("/jobs/getjobs", { params });
      console.log(res.data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const applyToJob = createAsyncThunk(
  "jobs/applyToJob",
  async (jobId, thunkAPI) => {
    try {
      const res = await API.post("/applications/apply", { jobId });
      return { jobId, status: res.data.status || "Pending" };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchJobsWithApplicants = createAsyncThunk(
  "jobs/fetchJobsWithApplicants",
  async (params, thunkAPI) => {
    try {
      const res = await API.get("/applications/applicants", { params });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchJobsWithApplicantsForReferrer = createAsyncThunk(
  "jobs/fetchJobsWithApplicantsForReferrer",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/applications/referrer");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const postJob = createAsyncThunk(
  'jobs/postJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await API.post('/jobs', jobData);
      toast.success('Job posted successfully!');
      return response.data.job;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post job');
      return rejectWithValue(err.response?.data);
    }
  }
);

export const claimJobForReferral = createAsyncThunk(
  "jobs/claimJobForReferral",
  async ({ jobId, contactInfo }, thunkAPI) => {
    try {
      const res = await API.post(`/jobs/${jobId}/claim`, { contactInfo });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  "jobs/updateApplicationStatus",
  async ({ applicationId, status }, thunkAPI) => {
    try {
      console.log(applicationId, status);
      const response = await API.patch(`/applications/${applicationId}/status`, { status });
      console.log(response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update status");
    }
  }
);

export const getJobWithApplicants = createAsyncThunk(
  'jobs/getJobWithApplicants',
  async ({ jobId, page = 1, limit = 10, filters = {} }, { rejectWithValue }) => {
    try {
      const res = await API.get(`/applications/${jobId}/applicants`, {
        params: { page, limit, ...filters },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error fetching job');
    }
  }
);

export const getJobDetailForSeeker = createAsyncThunk(
  'jobs/getJobDetailForSeeker',
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/applications/${jobId}/seeker`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Error fetching job');
    }
  }
);






const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    currentJob: null,
    applicants: [],
    loading: false,
    error: null,
    updating:null,
   selectedApplication: null,
 totalPages: 0,
  totalCount: 0,
  currentPage: 1,

  },
  reducers: {
      optimisticStatusUpdate: (state, action) => {
      const { jobId, applicationId, newStatus } = action.payload;
      
      const job = state.jobs.find(j => j._id === jobId);
      if (job && job.applicants) {
        const application = job.applicants.find(app => app._id === applicationId);
        if (application) {
          application.status = newStatus;
        }
      }
    },
 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
    
        .addCase(fetchJobs.fulfilled, (state, action) => {
  state.loading = false;
  state.jobs = action.payload.jobs;
  // Add these properties from the server response
  state.totalPages = action.payload.totalPages;
  state.totalCount = action.payload.totalCount;
  state.currentPage = action.payload.currentPage;
})
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        const { jobId, status } = action.payload;
        state.jobs = state.jobs.map((job) =>
          job._id === jobId ? { ...job, applied: true, applicationStatus: status } : job
        );
      })
      .addCase(fetchJobsWithApplicants.pending, (state) => {
        state.loading = true;
      })
    
        .addCase(fetchJobsWithApplicants.fulfilled, (state, action) => {
      state.loading = false;
      state.jobs = action.payload.jobs;
      state.totalJobs = action.payload.totalJobs;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.limit = action.payload.limit;
    })
      .addCase(fetchJobsWithApplicants.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(postJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.loading = false;
        state.postedJob = action.payload;
      })
      .addCase(postJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Job post failed';
      })
      .addCase(claimJobForReferral.pending, (state) => {
        state.loading = true;
      })
    
.addCase(claimJobForReferral.fulfilled, (state, action) => {
  state.loading = false;

  const updatedJob = action.payload.job;
  if (!updatedJob) return;

  state.jobs = state.jobs.map((job) =>
    job._id === updatedJob._id ? updatedJob : job
  );
})


   .addCase(fetchJobsWithApplicantsForReferrer.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobsWithApplicantsForReferrer.fulfilled, (state, action) => {
        state.jobs = action.payload.jobs;
        state.applicants = action.payload.applications;
        state.loading = false;
      })
      .addCase(fetchJobsWithApplicantsForReferrer.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

    
      .addCase(claimJobForReferral.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.updating = null;
       
      })
      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.updating = null;
      })

       .addCase(getJobWithApplicants.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(getJobWithApplicants.fulfilled, (state, action) => {
  state.loading = false;
  state.currentJob = action.payload.job;
  state.applicants = action.payload.applicants;
  state.pagination = {
    page: action.payload.page,
    totalPages: action.payload.totalPages,
    totalApplicants: action.payload.totalApplicants
  };
})
.addCase(getJobWithApplicants.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})



.addCase(getJobDetailForSeeker.fulfilled, (state, action) => {
  // state.selectedApplication = action.payload;
  state.currentJob = action.payload.application;

})


  },
  
})


export const { optimisticStatusUpdate } = jobsSlice.actions;
export const selectAllJobs = (state) => state.jobs.jobs;
export const selectJobsLoading = (state) => state.jobs.loading;
export const selectJobsError = (state) => state.jobs.error;
// / Add these selectors at the bottom
export const selectTotalPages = (state) => state.jobs.totalPages;
export const selectTotalCount = (state) => state.jobs.totalCount;
export const selectCurrentPage = (state) => state.jobs.currentPage;

export default jobsSlice.reducer;
