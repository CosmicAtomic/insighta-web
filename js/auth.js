function getTokensFromURL() {
    const params = new URLSearchParams(window.location.search);
    const access = params.get("access_token");
    const refresh = params.get("refresh_token");
    const username = params.get("username");

    if (access && refresh) {
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
        localStorage.setItem("username", username);
        // Clean the URL so tokens aren't visible
        window.history.replaceState({}, "", window.location.pathname);
    }
}

function getAccessToken() {
    return localStorage.getItem("access_token");
}

function getRefreshToken() {
    return localStorage.getItem("refresh_token");
}

function isLoggedIn() {
    return !!getAccessToken();
}

function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    window.location.href = "index.html";
}

function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = "index.html";
    }
}