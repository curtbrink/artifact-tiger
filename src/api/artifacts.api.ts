import axios from 'axios';
import browserStorageService from '@/services/browser-storage.service';
import pThrottle from 'p-throttle';

const instance = axios.create({
  // replace this with the real API when the API itself is all built out
  baseURL: 'https://api.artifactsmmo.com/',
});

instance.interceptors.response.use(undefined, async (error) => {
  const apiError = error.response?.data?.error;
  if (apiError) {
    const errorMsg = `${apiError.code} - ${apiError.message}`;
    throw new Error(errorMsg);
  }
  throw error;
});

instance.interceptors.request.use(
  async (request) => {
    if (browserStorageService.hasAuthToken()) {
      request.headers['Authorization'] =
        'Bearer ' + browserStorageService.getAuthToken();
    }
    return request;
  },
  (error) => Promise.reject(error),
);

const registrationThrottler = pThrottle({
  limit: 50,
  interval: 1000 * 60 * 60,
}); // 50 requests per hour
const tokenThrottler = pThrottle({ limit: 50, interval: 1000 * 60 * 60 }); // 50 requests per hour
const dataThrottler = pThrottle({ limit: 2, interval: 1000 }); // 2 requests per second
const actionThrottler = pThrottle({ limit: 2, interval: 1000 }); // 2 requests per second

export default {
  registration: {
    post: registrationThrottler(instance.post),
  },
  token: {
    post: tokenThrottler(instance.post),
  },
  data: {
    get: dataThrottler(instance.get),
    post: dataThrottler(instance.post),
    patch: dataThrottler(instance.patch),
  },
  action: {
    get: actionThrottler(instance.get),
    post: actionThrottler(instance.post),
    patch: actionThrottler(instance.patch),
  },
};
