// lib/types/api.ts

// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  username?: string; // API returns username
  role?: "admin" | "user";
  avatar?: string;
  createdAt?: string;
  first_name?: string;
  last_name?: string;
  pk?: number; // API returns pk
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: string;
}

// Events Types
export interface Event {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  image: string;
  status: "draft" | "published" | "cancelled";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  title: string;
  description: string;
  excerpt: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  image: string;
  status?: "draft" | "published";
}

// Team Types
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  // legacy 'type' concept is no longer used for new features,
  // but kept optional for backward compatibility with old data
  type?: "developer" | "exco";
  bio: string;
  img: string;
  email?: string;
  phone?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  createdAt: string;
}

export interface CreateTeamMemberData {
  name: string;
  role: string;
  type: "developer" | "exco";
  bio: string;
  img: string;
  email?: string;
  phone?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// Profile Types
export interface ProfileEducationItem {
  school: string;
  degree: string;
}

export interface ProfileExperienceItem {
  role: string;
  company: string;
}

export interface CreateProfileData {
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  occupation?: string;
  phone?: string;
  email?: string;
  ward?: string;
  lga?: string;
  bio?: string;
  skills?: string[];
  education?: ProfileEducationItem[];
  experience?: ProfileExperienceItem[];
}

export interface Profile extends CreateProfileData {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

// Resources Types
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: "document" | "link" | "video" | "tool";
  url?: string;
  fileUrl?: string;
  thumbnail?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateResourceData {
  title: string;
  description: string;
  category: "document" | "link" | "video" | "tool";
  url?: string;
  fileUrl?: string;
  thumbnail?: string;
  tags?: string[];
}

// Committee Types
export interface Committee {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  createdAt: string;
}

// Admin Dashboard Types
export interface DashboardStats {
  totalEvents: number;
  publishedEvents: number;
  // Profiles-based stats (replaces excos/developers)
  totalProfiles: number;
  totalResources: number;
  totalDocuments: number;
}

export interface Activity {
  id: string;
  action: string;
  details: string;
  time: string;
  userId?: string;
  userName?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}
