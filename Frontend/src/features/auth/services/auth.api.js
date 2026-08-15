import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: `${API_URL}/api/auth`,
    withCredentials: true,
});

export async function register({ username, email, password }) {
    try {
        const response = await api.post("/register", {
            username,
            email,
            password,
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/login", {
            email,
            password,
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function logout() {
    try {
        const response = await api.get("/logout");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getMe() {
    try {
        const response = await api.get("/get-me");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}