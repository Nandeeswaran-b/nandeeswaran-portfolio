// API Client for Nandeeswaran B. Data Science Portfolio
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

// Helper to get auth token
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
}

// Helper to set auth token
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', token);
  }
}

// Helper to clear auth token
export function clearAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
  }
}

// Base request wrapper
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const headers = new Headers(options.headers || {});
  
  // Attach JWT if available
  const token = getAuthToken();
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  // Default to JSON Content-Type if not uploading form-data
  if (!(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      clearAuthToken();
    }
    const errText = await response.text();
    let errMessage = 'An error occurred';
    try {
      const parsed = JSON.parse(errText);
      errMessage = parsed.detail || errMessage;
    } catch {
      errMessage = errText || errMessage;
    }
    throw new Error(errMessage);
  }
  
  if (response.status === 204) {
    return null as unknown as T;
  }
  
  return response.json() as Promise<T>;
}

// API Methods
export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const data = await request<{ access_token: string; token_type: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAuthToken(data.access_token);
    return data;
  },
  
  getMe: async () => {
    return request<any>('/auth/me');
  },
  
  // Projects
  getProjects: async (category?: string) => {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    return request<any[]>(`/projects${query}`);
  },
  
  getProject: async (id: string) => {
    return request<any>(`/projects/${id}`);
  },
  
  createProject: async (project: any) => {
    return request<any>('/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  },
  
  updateProject: async (id: string, project: any) => {
    return request<any>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  },
  
  deleteProject: async (id: string) => {
    return request<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Skills
  getSkills: async (category?: string) => {
    const query = category ? `?category=${encodeURIComponent(category)}` : '';
    return request<any[]>(`/skills${query}`);
  },
  
  createSkill: async (skill: any) => {
    return request<any>('/skills', {
      method: 'POST',
      body: JSON.stringify(skill),
    });
  },
  
  updateSkill: async (id: string, skill: any) => {
    return request<any>(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skill),
    });
  },
  
  deleteSkill: async (id: string) => {
    return request<void>(`/skills/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Internships
  getInternships: async () => {
    return request<any[]>('/internships');
  },
  
  createInternship: async (internship: any) => {
    return request<any>('/internships', {
      method: 'POST',
      body: JSON.stringify(internship),
    });
  },
  
  updateInternship: async (id: string, internship: any) => {
    return request<any>(`/internships/${id}`, {
      method: 'PUT',
      body: JSON.stringify(internship),
    });
  },
  
  deleteInternship: async (id: string) => {
    return request<void>(`/internships/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Certifications
  getCertifications: async () => {
    return request<any[]>('/certifications');
  },
  
  createCertification: async (cert: any) => {
    return request<any>('/certifications', {
      method: 'POST',
      body: JSON.stringify(cert),
    });
  },
  
  updateCertification: async (id: string, cert: any) => {
    return request<any>(`/certifications/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cert),
    });
  },
  
  deleteCertification: async (id: string) => {
    return request<void>(`/certifications/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Achievements
  getAchievements: async () => {
    return request<any[]>('/achievements');
  },
  
  createAchievement: async (achievement: any) => {
    return request<any>('/achievements', {
      method: 'POST',
      body: JSON.stringify(achievement),
    });
  },
  
  updateAchievement: async (id: string, achievement: any) => {
    return request<any>(`/achievements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(achievement),
    });
  },
  
  deleteAchievement: async (id: string) => {
    return request<void>(`/achievements/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Blogs
  getBlogPosts: async (filters: { categorySlug?: string; tagSlug?: string; search?: string; includeDrafts?: boolean } = {}) => {
    const params = new URLSearchParams();
    if (filters.categorySlug) params.append('category_slug', filters.categorySlug);
    if (filters.tagSlug) params.append('tag_slug', filters.tagSlug);
    if (filters.search) params.append('search', filters.search);
    if (filters.includeDrafts) params.append('include_drafts', 'true');
    
    return request<any[]>(`/blogs/posts?${params.toString()}`);
  },
  
  getBlogPost: async (slug: string) => {
    return request<any>(`/blogs/posts/${slug}`);
  },
  
  createBlogPost: async (post: any) => {
    return request<any>('/blogs/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  },
  
  updateBlogPost: async (id: string, post: any) => {
    return request<any>(`/blogs/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
    });
  },
  
  deleteBlogPost: async (id: string) => {
    return request<void>(`/blogs/posts/${id}`, {
      method: 'DELETE',
    });
  },
  
  incrementBlogViews: async (slug: string) => {
    return request<any>(`/blogs/posts/${slug}/view`, {
      method: 'POST',
    });
  },
  
  getBlogCategories: async () => {
    return request<any[]>('/blogs/categories');
  },
  
  createBlogCategory: async (category: any) => {
    return request<any>('/blogs/categories', {
      method: 'POST',
      body: JSON.stringify(category),
    });
  },
  
  deleteBlogCategory: async (id: string) => {
    return request<void>(`/blogs/categories/${id}`, {
      method: 'DELETE',
    });
  },
  
  getBlogTags: async () => {
    return request<any[]>('/blogs/tags');
  },
  
  createBlogTag: async (tag: any) => {
    return request<any>('/blogs/tags', {
      method: 'POST',
      body: JSON.stringify(tag),
    });
  },
  
  deleteBlogTag: async (id: string) => {
    return request<void>(`/blogs/tags/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Contact
  sendContactMessage: async (message: { name: string; email: string; subject?: string; message: string }) => {
    return request<any>('/contact', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  },
  
  getContactMessages: async () => {
    return request<any[]>('/contact/messages');
  },
  
  markContactMessageRead: async (id: string) => {
    return request<any>(`/contact/messages/${id}/read`, {
      method: 'PUT',
    });
  },
  
  deleteContactMessage: async (id: string) => {
    return request<void>(`/contact/messages/${id}`, {
      method: 'DELETE',
    });
  },
  
  // Resume
  getActiveResume: async () => {
    return request<any>('/contact/resume/active');
  },
  
  getAllResumes: async () => {
    return request<any[]>('/contact/resumes');
  },
  
  uploadResume: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return request<any>('/contact/resume', {
      method: 'POST',
      body: formData,
    });
  },
  
  // Analytics
  trackEvent: async (event: { session_id?: string; path: string; referrer?: string; event_type?: string; metadata?: any }) => {
    return request<any>('/analytics/track', {
      method: 'POST',
      body: JSON.stringify(event),
    });
  },
  
  getAnalyticsStats: async () => {
    return request<any>('/analytics/stats');
  },
};
export default api;
