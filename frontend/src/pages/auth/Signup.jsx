import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "",
    building: "",
    flat: "",
  });

  //  BUILDING DATA
  const buildingFlats = {
    A: Array.from({ length: 10 }, (_, i) => i + 1),
    B: Array.from({ length: 10 }, (_, i) => i + 11),
    C: Array.from({ length: 10 }, (_, i) => i + 21),
    D: Array.from({ length: 10 }, (_, i) => i + 31),
    E: Array.from({ length: 10 }, (_, i) => i + 41),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    //  building change → reset flat
    if (name === "building") {
      setForm({ ...form, building: value, flat: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      status: "PENDING",
    };

    console.log("Signup:", payload);

    alert("Signup request sent for approval 😎");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-4">
          Signup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            name="mobile"
            placeholder="Mobile"
            value={form.mobile}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* ROLE */}
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select Role</option>
            <option value="FAMILY">Family Member</option>
            <option value="TENANT">Tenant</option>
          </select>

          {/* BUILDING */}
          <select
            name="building"
            value={form.building}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          >
            <option value="">Select Building</option>
            {Object.keys(buildingFlats).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* FLAT */}
          <select
            name="flat"
            value={form.flat}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
            disabled={!form.building}
          >
            <option value="">Select Flat</option>
            {form.building &&
              buildingFlats[form.building].map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
          </select>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
            Submit for Approval
          </button>
        </form>

        <p className="text-center mt-3 text-sm">
          Already have account?{" "}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;