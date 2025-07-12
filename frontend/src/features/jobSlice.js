

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-hot-toast';
import API from "../util/axios"
import qs from "qs";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (filters, thunkAPI) => {
 
    try {
      const res = await API.get("/jobs/getjobs",  {
  params: filters,
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'repeat' }),
});
      
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
   
      return res.data;
    } catch (err) {
  
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
     
      const response = await API.patch(`/applications/${applicationId}/status`, { status });
  
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



export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ jobId, updates }, thunkAPI) => {
    try {
      const res = await API.patch(`/jobs/${jobId}/edit`, updates);
      return res.data.job;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update job");
    }
  }
);

export const updateJobStatus = createAsyncThunk(
  "jobs/updateJobStatus",
  async ({ jobId, status }, thunkAPI) => {
    try {
      const res = await API.patch(`/jobs/${jobId}/status`, { status });
      return res.data.job;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update job status");
    }
  }
);



export const getJobDetailForEdit = createAsyncThunk(
  'jobs/getJobDetailForEdit',
  async (jobId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/jobs/jobforedit/${jobId}`); 
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch job');
    }
  }
);


const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
//     jobs: [],
//     currentJob: null,
//     applicants: [],
//     loading: false,
//     error: null,
//     updating:null,
//    selectedApplication: null,
//  totalPages: 0,
//   totalCount: 0,
//   currentPage: 1,
//    editJob: null,


 jobs: [],
  referrerJobs: [],
  currentJob: null,
  applicants: [],
  loading: false,
  error: null,
  updating: null,
  selectedApplication: null,
  totalPages: 0,
  totalCount: 0,
  currentPage: 1,
  editJob: null,
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
     setEditJob: (state, action) => {
      state.editJob = action.payload;
    },
    clearEditJob: (state) => {
      state.editJob = null;
    },
 
     clearCurrentJobs: (state) => {
      state.jobs = [];
   
    state.referrerJobs = [];
      state.totalPages = 0;
      state.totalCount = 0;
   
    }
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
  state.referrerJobs = action.payload.jobs; 
  state.applicants = action.payload.applications;
  state.loading = false;
})


      // .addCase(fetchJobsWithApplicantsForReferrer.fulfilled, (state, action) => {
      //   state.jobs = action.payload.jobs;
      //   state.applicants = action.payload.applications;
      //   state.loading = false;
      // })
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

.addCase(getJobDetailForEdit.fulfilled, (state, action) => {
  state.editJob = action.payload;
  state.loading = false;
})
.addCase(getJobDetailForEdit.pending, (state) => {
  state.loading = true;
})
.addCase(getJobDetailForEdit.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})


  },
  
})


export const { optimisticStatusUpdate,setEditJob, clearEditJob, clearCurrentJobs } = jobsSlice.actions;
export const selectAllJobs = (state) => state.jobs.jobs;
export const selectReferrerJobs = (state) => state.jobs.referrerJobs;

export const selectJobsLoading = (state) => state.jobs.loading;
export const selectJobsError = (state) => state.jobs.error;
// / Add these selectors at the bottom
export const selectTotalPages = (state) => state.jobs.totalPages;
export const selectTotalCount = (state) => state.jobs.totalCount;
export const selectCurrentPage = (state) => state.jobs.currentPage;



export default jobsSlice.reducer;
