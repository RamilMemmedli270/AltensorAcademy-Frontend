const isLocalDev =
    window.location.protocol === "file:" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "";

const BACKEND_BASE_URL = isLocalDev
    ? "http://localhost:5150"
    : `${window.location.protocol === "http:" ? "http:" : "https:"}//api.altensoracademy.com`;
const API_BASE_URL = `${BACKEND_BASE_URL}/api`;

function getToken() {
    return localStorage.getItem("token");
}

function getCurrentUser() {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function saveAuthData(data) {
    if (data.token) {
        localStorage.setItem("token", data.token);
    }
    const userObj = {
        userId: data.userId,
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        role: data.role
    };
    localStorage.setItem("user", JSON.stringify(userObj));
    localStorage.setItem("role", data.role || "User");
}

function logoutUser() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "index.html";
}

function resolveImageUrl(imagePath, fallbackUrl) {
    if (!imagePath) return fallbackUrl;
    const clean = String(imagePath).trim();
    if (clean.startsWith("http://") || clean.startsWith("https://") || clean.startsWith("assets/")) {
        return escapeHtml(clean);
    }
    if (clean.startsWith("/")) {
        return `${BACKEND_BASE_URL}${escapeHtml(clean)}`;
    }
    return `${BACKEND_BASE_URL}/${escapeHtml(clean)}`;
}

function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
