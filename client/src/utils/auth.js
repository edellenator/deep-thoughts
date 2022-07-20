import decode from 'jwt-decode';

class AuthService{
    // RETRIEVE DATA SAVED IN TOKEN
    getProfile() {
        return decode(this.getToken());
    }
    // CHECK IF THE USER IS STILL LOGGED IN
    loggedIn() {
        //  CHECKS IF THERE IS A SAVED TOKEN AND IT'S STILL VALID
        const token = this.getToken();
        // USE TYPE COERSION  TO CHECK IF TOKEN IS NOT UNDEFINED AND THE TOKEN IS NOT EXPIRED
        return !!token && !this.isTokenExpired(token)
    }

    // CHECK IF THE TOKEN HAS EXPIRED
    isTokenExpired() {
        try {
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // RETRIEVE TOKE FROM LOCALsTORAGE

    getToken() {
        // RETRIEVES THE USER TOKEN FROM LOCALSTORAGE
        return localStorage.getItem('id_token');
    }

    // SET TOKEN TO LOCAL STORAGE AND RELOAD PAGE TO HOMEPAGE
    login(idToken) {
        //  SAVES USER TOKEN TO LOCALSTORAGE
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // CLEAR TOKEN FROM LOCALSTORAGE AND FORCE LOGOUT WITH RELOAD
    logout() {
        // CLEAR USER TOKEN AND PROFILE DATA FROM LOCALSTORAGE
        localStorage.removeItem('id_token');
        // THIS WILL RELOAD THE PAGE AND RESET THE STATE OF THE APPLICATIONS
        window.location.assign('/');
    }
}

export default new AuthService();