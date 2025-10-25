import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: JWT 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: 에러 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// Auth API
export const authAPI = {
  signup: (data: { username: string; email: string; password: string }) =>
    apiClient.post("/auth/signup", data),
  login: (data: { username: string; password: string }) =>
    apiClient.post("/auth/login", data),
};

// Survey API
export const surveyAPI = {
  getAll: () => apiClient.get("/surveys"),
  getById: (id: string) => apiClient.get(`/surveys/${id}`),
  getMySurveys: () => apiClient.get("/surveys/my"),
  create: (data: any) => apiClient.post("/surveys", data),
  update: (id: string, data: any) => apiClient.put(`/surveys/${id}`, data),
  delete: (id: string) => apiClient.delete(`/surveys/${id}`),
};

// Response API
export const responseAPI = {
  submit: (surveyId: string, data: any) =>
    apiClient.post(`/surveys/${surveyId}/responses`, data),
  getResponses: (surveyId: string) =>
    apiClient.get(`/surveys/${surveyId}/responses`),
};
