export const AuthService = {
    isAuthenticated: false,

    setSession(token: string, expiry: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiry', expiry);
    },

    clearSession() {
        AuthService.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('expiry');
    },
    isSessionValid() {
        const expiry = localStorage.getItem('expiry');
        AuthService.isAuthenticated = !!(expiry && (+new Date(expiry) > +new Date()));
        return AuthService.isAuthenticated;
    },

    getAuthHeaders() {
        return {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }
};
