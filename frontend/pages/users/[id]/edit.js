// pages/users/[id]/edit.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../../../components/Header";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // Fetch current user data
  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        setEmail(res.data.email);
        setLoading(false);
      } catch (err) {
        setError("User not found");
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUpdating(true);

    try {
      await axios.patch(`http://localhost:5000/users/${id}`, { email });
      alert("Email updated successfully");
      router.push("/users");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-t-2 border-orange-600 border-solid rounded-full animate-spin"></div>
            <span className="text-gray-700 font-medium">Loading user data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading User</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => router.push("/users")}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-200"
            >
              Back to Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <Header />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Edit User
              </h1>
              <p className="text-gray-600">
                Update user email address
              </p>
              <div className="mt-2 bg-gray-100 rounded-lg p-3">
                <p className="text-sm text-gray-600 font-mono">User ID: {id}</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="Enter new email address"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => router.push("/users")}
                  disabled={updating}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {updating ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    "Update Email"
                  )}
                </button>
              </div>
            </form>

            {/* Additional info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Changes will take effect immediately</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;


/*
// pages/users/[id]/edit.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch current user data
  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        setEmail(res.data.email);
        setLoading(false);
      } catch (err) {
        setError("User not found");
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.patch(`http://localhost:5000/users/${id}`, { email });
      alert("Email updated successfully");
      router.push("/users"); // Redirect back to users list
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Edit User Email</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "0.5rem", width: "300px" }}
          />
        </div>
        <button
          type="submit"
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Update Email
        </button>
      </form>
    </div>
  );
};

export default EditUser;





/*
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../../lib/api";
import Header from "../../../components/Header";

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (id) {
      api.get(`/users/${id}`).then((res) => setEmail(res.data.email));
    }
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.patch(`/users/${id}`, { newEmail:email });
      router.push("/users");
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  }

  return (
    <div>
      <Header />
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} /><br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
*/