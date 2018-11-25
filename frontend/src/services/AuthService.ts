export const AuthService = {
    isAuthenticated: false,
    authenticate(cb: any) {
        this.isAuthenticated = true;
        setTimeout(cb, 100)
    },
    logout(cb: any) {
        this.isAuthenticated = false;
        setTimeout(cb, 100)
    }
};
