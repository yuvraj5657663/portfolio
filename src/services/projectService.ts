const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  image?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    const res = await fetch(`${BASE_URL}/projects`);
    const json = await res.json();
    return json.data ?? [];
  },

  getAllProjects: async (): Promise<Project[]> => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${BASE_URL}/admin/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    return json.data ?? [];
  },

  addProject: async (data: any): Promise<Project> => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${BASE_URL}/admin/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return json.data;
  },

  updateProject: async (id: string, data: any): Promise<Project> => {
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${BASE_URL}/admin/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return json.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    const token = localStorage.getItem('adminToken');
    await fetch(`${BASE_URL}/admin/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
