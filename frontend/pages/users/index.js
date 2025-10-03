
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../lib/api";
import Header from "../../components/Header";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  async function loadUsers() {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      setDeletingId(id);
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
              <p className="mt-2 text-gray-600">
                Manage all users in the system
              </p>
            </div>
            <Link
              href="/users/new"
              className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New User
            </Link>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 border-t-2 border-indigo-600 border-solid rounded-full animate-spin"></div>
                <span className="text-gray-700 font-medium">Loading users...</span>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first user.</p>
              <Link
                href="/users/new"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create New User
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-5">
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</span>
                  </div>
                  <div className="col-span-3">
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">User ID</span>
                  </div>
                  <div className="col-span-4 text-right">
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</span>
                  </div>
                </div>
              </div>

              {/* Users List */}
              <div className="divide-y divide-gray-200">
                {users.map((user) => (
                  <div key={user.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Email */}
                      <div className="col-span-5">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* User ID */}
                      <div className="col-span-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 font-mono">
                          {user.id}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="col-span-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/users/${user.id}`}
                            className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View
                          </Link>

                          <Link
                            href={`/users/${user.id}/edit`}
                            className="inline-flex items-center px-3 py-2 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </Link>

                          <button
                            onClick={() => deleteUser(user.id)}
                            disabled={deletingId === user.id}
                            className="inline-flex items-center px-3 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deletingId === user.id ? (
                              <>
                                <div className="w-4 h-4 border-t-2 border-red-600 border-solid rounded-full animate-spin mr-1"></div>
                                Deleting...
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {users.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{users.length}</span> user{users.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/*
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../../lib/api";
import Header from "../../components/Header";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  async function loadUsers() {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  }

  async function deleteUser(id) {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <Header />
      <h1>Users</h1>
      <Link href="/users/new">+ New User</Link>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.email}{" "}
            <Link href={`/users/${u.id}`}>View</Link>{" "}
            <Link href={`/users/${u.id}/edit`}>Edit</Link>{" "}
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
*/