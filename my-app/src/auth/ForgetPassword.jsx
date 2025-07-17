import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("https://tensorbackend.fwitech.com/update", {
        username: form.username,
        password: form.password,
      });
      alert("Password updated successfully!");
      setForm({ username: "", password: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center">Update Password</h2>
      <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
        <input
          className="border p-2 rounded"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="New Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
