import axios from 'axios';
import axiosRetry from 'axios-retry';
import amplifyOutputs from '../../amplify_outputs.json';

// amplify_outputs.jsonはデプロイごとに生成される
const axiosInstance = axios.create({
  baseURL: amplifyOutputs.custom.API.MyBlogV3.endpoint,
  timeout: 30000,
  responseType: 'json',
  responseEncoding: 'utf8',
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});

// axiosRetry
axiosRetry(axiosInstance, {
  retries: 3,
  retryDelay: (retryCount, _error) => {
    const delay = retryCount * 2000;
    console.log(`retry delay: ${delay}ms`);
    return delay;
  },
  onRetry(retryCount, _error, _requestConfig) {
    console.log(`retry count: ${retryCount}`);
    return;
  },
  retryCondition: (error) => {
    const status = error.response?.status;
    console.log(`status: ${status}`);
    return status === undefined || (status >= 400 && status < 600);
  },
  onMaxRetryTimesExceeded: (_error, _retryCount) => {
    console.log("リトライ処理が失敗しました");
    return;
  }
});

export default axiosInstance;
