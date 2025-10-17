import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import useConversation from '../zustand/useConversation';

const useLogout = () => {
    const { setAuthUser } = useAuthContext();
    const { setSelectedConversation } = useConversation();
    const [loading, setLoading] = useState(false);

    const logoutUser = async () => {
        try {
            setLoading(true);
            const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.removeItem("chat-user");
            setAuthUser(null);
            setSelectedConversation(null)

        } catch (error) {
            toast.error("Error During Logout : " + error.message)
        } finally {
            setLoading(false)
        }
    }

    return { logoutUser, loading };
}

export default useLogout;