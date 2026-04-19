const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  location?: string;
  date?: string;
  achievements?: string[];
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const portfolioService = {
  // Public
  getSkills: async (): Promise<SkillCategory[]> => {
    const res = await fetch(`${BASE_URL}/skills`);
    const json = await res.json();
    return json.data ?? [];
  },

  getExperience: async (): Promise<Experience[]> => {
    const res = await fetch(`${BASE_URL}/experience`);
    const json = await res.json();
    return json.data ?? [];
  },

  submitContact: async (contact: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }): Promise<void> => {
    await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contact),
    });
  },

  trackVisit: async (): Promise<void> => {
    if (!sessionStorage.getItem('hasVisited')) {
      await fetch(`${BASE_URL}/visit`, { method: 'POST' });
      sessionStorage.setItem('hasVisited', 'true');
    }
  },

  // Admin
  getContacts: async (): Promise<Contact[]> => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${BASE_URL}/admin/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    return json.data ?? [];
  },

  deleteContact: async (id: string): Promise<void> => {
    const token = localStorage.getItem('adminToken');
    await fetch(`${BASE_URL}/admin/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateContactStatus: async (id: string, isRead: boolean): Promise<Contact> => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${BASE_URL}/admin/contacts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isRead }),
    });
    const json = await res.json();
    return json.data;
  },

  getAnalytics: async (): Promise<any> => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${BASE_URL}/admin/visits`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    return json.data;
  },
};
