const API_BASE_URL = 'http://localhost:5000/api/v1';

// Auth API functions
export const authAPI = {
  signup: async (email: string, password: string, username: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Signup failed');
    }
    
    return await response.json();
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    return await response.json();
  },
};

// Questions API functions
export const questionsAPI = {
  getQuestions: async (field: string, topic: string, level: string, token: string) => {
    const response = await fetch(`${API_BASE_URL}/questions?field=${field}&topic=${topic}&level=${level}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    
    return await response.json();
  },
};

// Progress API functions
export const progressAPI = {
  submitProgress: async (questionId: number, isCorrect: boolean, token: string) => {
    const response = await fetch(`${API_BASE_URL}/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ questionId, isCorrect }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit progress');
    }
    
    return await response.json();
  },

  getProgress: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/progress`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch progress');
    }
    
    return await response.json();
  },
};