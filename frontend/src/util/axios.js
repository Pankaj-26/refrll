

// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'https://refrll-backend.onrender.com/api',
//   withCredentials: true,
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// API.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     // 🔷 Define public paths
//     const publicPaths = [
//       '/login',
//       '/signup',
//       '/forgot-password',
//       '/reset-password'
//     ];

//     // 🔷 Check if current path is public
//     const isPublicPath = publicPaths.some(path =>
//       window.location.pathname.startsWith(path)
//     );

//     // 🔴 Skip refresh logic if on public pages
//     if (isPublicPath) {
//       return Promise.reject(error);
//     }

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (originalRequest.url.includes('/auth/refresh')) {
//         // 🔴 Refresh itself failed, redirect to login to break loop
//         window.location.href = '/login';
//         return Promise.reject(error);
//       }

//       if (isRefreshing) {
//         // Queue requests while refreshing to prevent multiple refresh calls
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(() => API(originalRequest))
//           .catch(err => Promise.reject(err));
//       }

//       isRefreshing = true;

//       try {
//         await API.post('/auth/refresh');
//         processQueue(null);
//         return API(originalRequest);
//       } catch (refreshErr) {
//         processQueue(refreshErr, null);
//         if (!isPublicPath) {
//           window.location.href = '/login';
//         }
//         return Promise.reject(refreshErr);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default API;



API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const publicPaths = [
      '/login',
      '/signup',
      '/forgot-password',
      '/reset-password'
    ];

    const isPublicPath = publicPaths.some(path =>
      window.location.pathname.startsWith(path)
    );

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (originalRequest.url.includes('/auth/refresh')) {
        console.warn("Refresh endpoint itself failed. Redirecting to login.");
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => API(originalRequest))
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        console.log("Attempting token refresh...");
        await API.post('/auth/refresh');
        processQueue(null);
        return API(originalRequest);
      } catch (refreshErr) {
        console.error("Refresh failed:", refreshErr);
        processQueue(refreshErr, null);
        if (!isPublicPath) {
          window.location.href = '/login';
        }
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
