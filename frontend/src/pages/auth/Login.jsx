import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            //  API CALL
            // const res = await axios.post("/api/login", form);
            // const user = res.data;

            // 🧪 MOCK RESPONSE
            const user = {
                name: "Rahul",
                role: "OWNER",
                status: "PENDING", // change to APPROVED to test
            };

            // MAIN LOGIC
            if (user.status !== "APPROVED") {
                alert("Wait for admin approval ");
                return;
            }

            alert("Login Successful ");

            //  ROLE BASED NAVIGATION
            if (user.role === "OWNER" || user.role === "TENANT") {
                navigate("/resident");
            } else if (user.role === "GUARD") {
                navigate("/guard");
            } else if (user.role === "ADMIN") {
                navigate("/admin");
            }

        } catch (err) {
            alert("Invalid credentials ");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">

                <h2 className="text-2xl font-bold text-center mb-4">
                    Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg"
                        required
                    />

                    <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
                        Login
                    </button>

                </form>

                <p className="text-center mt-3 text-sm">
                    Don’t have account?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="text-indigo-600 cursor-pointer"
                    >
                        Signup
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;