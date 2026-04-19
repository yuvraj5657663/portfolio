const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authService = {
  login: async (credentials: { email: string; password: string }): Promise<string> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const json = await res.json();
    const token = json.data?.token;
    if (!token) throw new Error(json.message || 'Login failed');
    localStorage.setItem('adminToken', token);
    return token;
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('adminToken');
  },
};
