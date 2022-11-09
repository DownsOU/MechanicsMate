const SessionManager = {

    getToken() {
        const token = sessionStorage.getItem('token');
        if (token) return token;
        else return null;
    },

    setUserSession(token, userEmail, userType) {
        sessionStorage.setItem('userEmail', userEmail);
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userType', userType);
    },

    removeUserSession() {
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userType');
    }
}

export default SessionManager;
