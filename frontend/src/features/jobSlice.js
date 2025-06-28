import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from 'react-hot-toast';


export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (params, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/getjobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          tab: params.tab,
          search: params.search,
          jobType: params.jobType?.join(","),
          experience: params.experience
        }
      });
      
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const applyToJob = createAsyncThunk("jobs/applyToJob", async ( jobId , thunkAPI) => {
 
  try {
    const res = await axios.post(
      "http://localhost:5000/api/applications/apply",
      { jobId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    return { jobId, status: res.data.status || "Pending" };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});


export const fetchJobsWithApplicants = createAsyncThunk(
  "jobs/fetchJobsWithApplicants",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:5000/api/applications/applicants", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
     console.log(res.data)
      
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
      const res = await axios.get("http://localhost:5000/api/applications/referrer", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
     console.log(res.data)
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
      const response = await axios.post('http://localhost:5000/api/jobs', jobData, {
        headers: { 
           Authorization: `Bearer ${localStorage.getItem("token")}`,
           'Content-Type': 'application/json' },
        withCredentials: true,
      });
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
  async ({ jobId, contactInfo,userId  }, thunkAPI) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/jobs/${jobId}/claim`,
        { contactInfo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
      console.log( applicationId, status)
      const response = await axios.patch(
        `http://localhost:5000/api/applications/${applicationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message || "Failed to update status");
    }
  }
);


export const getJobWithApplicants = createAsyncThunk(
  'jobs/getJobWithApplicants',
  async (jobId, { rejectWithValue }) => {
    try {
      //  i changed it to seeker from applicants
      const res = await axios.get(`/api/applications/${jobId}/applicants`,   {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
     console.log("Fetching job with applicants for ID:", res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Error fetching job');
    }
  }
);

export const getJobDetailForSeeker = createAsyncThunk(
  'jobs/getJobDetailForSeeker',
  async (jobId, { rejectWithValue }) => {
    try {
      //  i changed it to seeker from applicants
      const res = await axios.get(`/api/applications/${jobId}/seeker`,   {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message || 'Error fetching job');
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
    //   setSelectedApplication: (state, action) => {
    // state.selectedApplication = action.payload;
  // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.loading = false;
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
        state.jobs = action.payload;
        state.loading = false;
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
      // .addCase(claimJobForReferral.fulfilled, (state, action) => {
      //   state.loading = false;
      //   // Update the specific job with new referral claim
      //   state.jobs = state.jobs.map(job => {
      //     if (job._id === action.payload.job._id) {
      //       return {
      //         ...job,
      //         referralClaims: [...(job.referralClaims || []), action.payload]
      //       };
      //     }
      //     return job;
      //   });
      // })
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


export default jobsSlice.reducer;
