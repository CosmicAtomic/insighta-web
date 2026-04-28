const BACKEND_URL = "https://name-profiler-production.up.railway.app";

async function apiCall(path, options = {}) {
    const headers = {
        "X-API-Version": "1",
        "Authorization": "Bearer " + getAccessToken(),
        ...options.headers
    };

    let response = await fetch(BACKEND_URL + path, { ...options, headers });

    // Auto-refresh if 401
    if (response.status === 401) {
        const refreshed = await refreshTokens();
        if (refreshed) {
            headers["Authorization"] = "Bearer " + getAccessToken();
            response = await fetch(BACKEND_URL + path, { ...options, headers });
        } else {
            logout();
            return null;
        }
    }

    return response;
}

async function refreshTokens() {
    try {
        const response = await fetch(BACKEND_URL + "/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: getRefreshToken() })
        });

        if (!response.ok) return false;

        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        return true;
    } catch {
        return false;
    }
}