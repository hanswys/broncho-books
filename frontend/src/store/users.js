import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null, // Retrieve user from localStorage on app load

    loginUser: async (email, password) => {
        try {
            const res = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const error = await res.json();
                return { success: false, message: error.message };
            }

            const data = await res.json();
            localStorage.setItem("user", JSON.stringify(data.user)); // Save user to localStorage
            set({ user: data.user }); // Save user to the store
            return { success: true, message: "Login successful" };
        } catch (error) {
            return { success: false, message: "Error logging in" };
        }
    },

    logoutUser: () => {
        localStorage.removeItem("user"); // Remove user from localStorage
        set({ user: null }); // Clear user from the store
    },
}));