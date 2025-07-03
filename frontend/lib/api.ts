import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/stores/authStore";
import type { LoginData, RegisterData, AuthResponse } from "@/types/auth";
import type { CalorieRequest, CalorieResponse } from "@/types/calorie";

// Get the base URL from environment or fallback
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // set to true if using cookies/session
});

// Intercept requests and attach Bearer token if available
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: intercept responses for error logging or transformation
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Optional: Centralized error logging
    console.error("❌ API Error:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
    });

    return Promise.reject(error);
  }
);

export default api;

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export async function registerUser(
  data: RegisterData
): Promise<{ message: string }> {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function getCalories(
  data: CalorieRequest
): Promise<CalorieResponse> {
  try {
    const response = await api.post("/get-calories", data);
    return response.data as CalorieResponse;
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data?.error || "An error occurred";

    if (status === 401) throw new Error("Unauthorized. Please log in again.");
    if (status === 400) throw new Error(`Validation error: ${message}`);
    if (status === 404) throw new Error("Dish not found in USDA database.");

    throw new Error(`Failed to get calories: ${message}`);
  }
}
