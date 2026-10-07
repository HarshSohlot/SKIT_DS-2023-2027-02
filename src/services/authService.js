import api from './api';

// Demo users available for offline college presentation and development
const DEMO_USERS = [
  {
    id: 'usr_donor_01',
    name: 'Green Leaf Restaurant',
    email: 'donor@carekart.org',
    role: 'DONOR',
    organizationType: 'Restaurant',
    phone: '+91 98765 43210',
    address: 'Plot 12, Malviya Nagar, Jaipur, Rajasthan',
    city: 'Jaipur',
    pincode: '302017',
    avatar: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&auto=format&fit=crop&q=80',
    stats: { donations: 42, mealsProvided: 860, activeListings: 3 }
  },
  {
    id: 'usr_receiver_01',
    name: 'Asha Food Relief NGO',
    email: 'receiver@carekart.org',
    role: 'RECEIVER',
    organizationType: 'Registered NGO',
    phone: '+91 91234 56789',
    address: 'Sector 5, Jagatpura, Jaipur, Rajasthan',
    city: 'Jaipur',
    pincode: '302017',
    avatar: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=150&auto=format&fit=crop&q=80',
    stats: { claimedDonations: 38, beneficiariesFed: 1240, pendingPickups: 2 }
  },
  {
    id: 'usr_admin_01',
    name: 'CareKart System Administrator',
    email: 'admin@carekart.org',
    role: 'ADMIN',
    organizationType: 'Platform Authority',
    phone: '+91 90000 11111',
    address: 'SKIT Campus, Ramnagaria, Jagatpura, Jaipur',
    city: 'Jaipur',
    pincode: '302017',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    stats: { totalDonors: 140, totalReceivers: 85, totalRedistributedMeals: 15420 }
  }
];

// Helper to simulate JWT token creation for testing/presentation
const generateMockJwt = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(
    JSON.stringify({
      sub: user.email,
      id: user.id,
      name: user.name,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
    })
  );
  const signature = btoa('carekart_mock_jwt_secret_signature');
  return `${header}.${payload}.${signature}`;
};

export const authService = {
  /**
   * Login user with email & password
   * Connects to Spring Boot backend, falls back gracefully to mock mode if backend is offline
   */
  async login(email, password, roleHint = 'DONOR') {
    try {
      // 1. Try real backend Spring Boot endpoint
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('carekart_token', token);
      localStorage.setItem('carekart_user', JSON.stringify(user));
      return { success: true, user, token, isMock: false };
    } catch (error) {
      // If backend is unreachable (ECONNREFUSED / Network Error), use Mock presentation mode
      const isNetworkError = !error.response || error.code === 'ERR_NETWORK';
      
      if (isNetworkError) {
        console.warn('Backend server offline or unreachable. Using CareKart Demo Auth Mode.');
        
        // Match existing demo user or generate one dynamically
        let matchedUser = DEMO_USERS.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (!matchedUser) {
          // Allow flexible login for viva presentation
          matchedUser = {
            id: `usr_${Date.now()}`,
            name: email.split('@')[0].toUpperCase(),
            email,
            role: roleHint || 'DONOR',
            organizationType: roleHint === 'RECEIVER' ? 'Community Kitchen' : 'Donor Partner',
            phone: '+91 98765 00000',
            address: 'Jagatpura, Jaipur, Rajasthan',
            city: 'Jaipur',
            pincode: '302017',
            stats: { donations: 1, mealsProvided: 20, activeListings: 1 }
          };
        }

        const mockToken = generateMockJwt(matchedUser);
        localStorage.setItem('carekart_token', mockToken);
        localStorage.setItem('carekart_user', JSON.stringify(matchedUser));
        
        return {
          success: true,
          user: matchedUser,
          token: mockToken,
          isMock: true,
          message: 'Connected via CareKart Presentation/Demo Mode (Backend offline)'
        };
      }

      // If backend responded with an actual error (e.g. 400 Bad Credentials)
      const message = error.response?.data?.message || 'Invalid email or password.';
      throw new Error(message);
    }
  },

  /**
   * Register a new user
   */
  async register(registrationData) {
    try {
      // 1. Try real Spring Boot backend endpoint
      const response = await api.post('/auth/register', registrationData);
      const { token, user } = response.data;
      
      localStorage.setItem('carekart_token', token);
      localStorage.setItem('carekart_user', JSON.stringify(user));
      return { success: true, user, token, isMock: false };
    } catch (error) {
      const isNetworkError = !error.response || error.code === 'ERR_NETWORK';
      
      if (isNetworkError) {
        console.warn('Backend offline. Registering in CareKart Demo Mode.');
        
        const newUser = {
          id: `usr_${Date.now()}`,
          name: registrationData.name,
          email: registrationData.email,
          role: registrationData.role || 'DONOR',
          organizationType: registrationData.organizationType || 'Food Service Provider',
          phone: registrationData.phone || '+91 98765 43210',
          address: registrationData.address || 'Ramnagaria, Jagatpura, Jaipur',
          city: registrationData.city || 'Jaipur',
          pincode: registrationData.pincode || '302017',
          stats: { donations: 0, mealsProvided: 0, activeListings: 0 }
        };

        const mockToken = generateMockJwt(newUser);
        localStorage.setItem('carekart_token', mockToken);
        localStorage.setItem('carekart_user', JSON.stringify(newUser));

        return {
          success: true,
          user: newUser,
          token: mockToken,
          isMock: true,
          message: 'Account registered successfully (Demo Mode).'
        };
      }

      const message = error.response?.data?.message || 'Registration failed. Please check your details.';
      throw new Error(message);
    }
  },

  /**
   * Log out user
   */
  logout() {
    localStorage.removeItem('carekart_token');
    localStorage.removeItem('carekart_user');
  },

  /**
   * Get current stored user
   */
  getCurrentUser() {
    const userStr = localStorage.getItem('carekart_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  },

  /**
   * Get current JWT token
   */
  getToken() {
    return localStorage.getItem('carekart_token');
  },

  /**
   * Get demo credentials for quick testing in UI
   */
  getDemoCredentials() {
    return DEMO_USERS;
  }
};
