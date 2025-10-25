export interface ShortenedUrl {
  id: number;
  shortCode: string;
  originalUrl: string;
  title?: string;
  description?: string;
  clickCount: number;
  isActive: boolean;
  createdAt: string;
  expiresAt?: string;
  shortUrl: string;
}

export interface CreateUrlRequest {
  originalUrl: string;
  customAlias?: string;
  title?: string;
  description?: string;
  expiresAt?: string;
}

export interface AnalyticsOverview {
  shortCode: string;
  originalUrl: string;
  totalClicks: number;
  clicksToday: number;
  clicksThisWeek: number;
  clicksThisMonth: number;
  browserStats: Record<string, number>;
  osStats: Record<string, number>;
  deviceStats: Record<string, number>;
  locationStats: Record<string, number>;
  recentClicks: TimelineDataPoint[];
}

export interface TimelineDataPoint {
  timestamp: string;
  clicks: number;
}

export interface TimelineResponse {
  shortCode: string;
  granularity: string;
  data: TimelineDataPoint[];
}
