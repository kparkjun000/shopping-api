import axios from "axios";
import {
  CreateUrlRequest,
  ShortenedUrl,
  AnalyticsOverview,
  TimelineResponse,
} from "../types";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://aparkjun-url-shortener-single-1e5d9cf3276f.herokuapp.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const urlService = {
  // URL 단축 생성
  createShortUrl: async (data: CreateUrlRequest): Promise<ShortenedUrl> => {
    const response = await api.post("/api/urls", data);
    return response.data;
  },

  // 모든 URL 조회
  getAllUrls: async (): Promise<ShortenedUrl[]> => {
    const response = await api.get("/api/urls");
    return response.data;
  },

  // 특정 URL 조회
  getUrl: async (shortCode: string): Promise<ShortenedUrl> => {
    const response = await api.get(`/api/urls/${shortCode}`);
    return response.data;
  },

  // URL 삭제
  deleteUrl: async (shortCode: string): Promise<void> => {
    await api.delete(`/api/urls/${shortCode}`);
  },

  // QR 코드 URL 생성
  getQrCodeUrl: (shortCode: string, width = 300, height = 300): string => {
    return `${API_BASE_URL}/api/urls/${shortCode}/qr?width=${width}&height=${height}`;
  },
};

export const analyticsService = {
  // 전체 통계 조회
  getAnalyticsOverview: async (
    shortCode: string
  ): Promise<AnalyticsOverview> => {
    const response = await api.get(`/api/analytics/${shortCode}`);
    return response.data;
  },

  // 시간대별 통계
  getTimeline: async (
    shortCode: string,
    granularity = "daily",
    days = 30
  ): Promise<TimelineResponse> => {
    const response = await api.get(`/api/analytics/${shortCode}/timeline`, {
      params: { granularity, days },
    });
    return response.data;
  },

  // 브라우저별 통계
  getBrowserStats: async (
    shortCode: string
  ): Promise<Record<string, number>> => {
    const response = await api.get(`/api/analytics/${shortCode}/browsers`);
    return response.data;
  },

  // OS별 통계
  getOsStats: async (shortCode: string): Promise<Record<string, number>> => {
    const response = await api.get(`/api/analytics/${shortCode}/os`);
    return response.data;
  },

  // 디바이스별 통계
  getDeviceStats: async (
    shortCode: string
  ): Promise<Record<string, number>> => {
    const response = await api.get(`/api/analytics/${shortCode}/devices`);
    return response.data;
  },

  // 위치별 통계
  getLocationStats: async (
    shortCode: string
  ): Promise<Record<string, number>> => {
    const response = await api.get(`/api/analytics/${shortCode}/locations`);
    return response.data;
  },
};
