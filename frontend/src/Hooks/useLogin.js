import { use, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    // login user method 
    const loginUser = async ({ email, password }) => {
        console.log(loading);
        // const success = await handleInputErrors({
        //     email, password
        // });

        // if (!success) return;

        try {
            setLoading(true);

            console.log(import.meta.env.VITE_BACKEND_URL);

            const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            })

            const data = await res.json();

            // if any error 
            if (data.error) {
                throw new Error(data.error)
            }

            // set to localStorage 
            localStorage.setItem("user", JSON.stringify(data?.user));
            setAuthUser(data?.user);

            toast.success("Login successful");
            navigate("/student/dashboard");


        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return { loginUser, loading };
}

export default useLogin;

async function handleInputErrors({ email, password }) {
    if (!email || !password) {
        toast.error("Please fill all the required fields")
        return false;
    }

    if (password.length < 8) {
        toast.error("Password must be at least 8 characters");
    }

    return true;
}