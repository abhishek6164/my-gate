import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState("PENDING");

    // FETCH USERS
    const fetchUsers = async () => {
        try {
            //  API CALL
            // const res = await axios.get(`/api/users?status=${activeTab}`);
            // setUsers(res.data);

            // MOCK DATA
            const mock = [
                { id: 1, name: "Rahul", role: "OWNER", flat: "A-101", status: "PENDING" },
                { id: 2, name: "Priya", role: "TENANT", flat: "B-202", status: "APPROVED" },
                { id: 3, name: "Amit", role: "FAMILY", flat: "A-101", status: "REJECTED" },
            ];

            setUsers(mock.filter((u) => u.status === activeTab));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [activeTab]);

    //  APPROVE
    const handleApprove = async (id) => {
        try {
            // await axios.patch(`/api/users/${id}/approve`);

            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    //  REJECT
    const handleReject = async (id) => {
        try {
            // await axios.patch(`/api/users/${id}/reject`);

            setUsers((prev) => prev.filter((u) => u.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-6">

            <h1 className="text-2xl font-bold text-center mb-6">
                Admin Dashboard
            </h1>

            {/* TABS */}
            <div className="flex justify-center gap-3 mb-6 flex-wrap">
                {["PENDING", "APPROVED", "REJECTED"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg font-medium ${activeTab === tab
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-700"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* USER LIST */}
            <div className="max-w-3xl mx-auto space-y-4">

                {users.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No {activeTab.toLowerCase()} users
                    </p>
                ) : (
                    users.map((user) => (
                        <div
                            key={user.id}
                            className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row justify-between gap-4"
                        >
                            {/* INFO */}
                            <div>
                                <h2 className="font-semibold text-lg">{user.name}</h2>
                                <p className="text-sm text-gray-600">Role: {user.role}</p>
                                <p className="text-sm text-gray-600">Flat: {user.flat}</p>
                            </div>

                            {/* ACTION */}
                            {activeTab === "PENDING" && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleApprove(user.id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Approve
                                    </button>

                                    <button
                                        onClick={() => handleReject(user.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;