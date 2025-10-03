
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import Header from "../../components/Header";

export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      api.get(`/users/${id}`)
        .then((res) => setUser(res.data))
        .catch((err) => alert(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-t-2 border-green-600 border-solid rounded-full animate-spin"></div>
            <span className="text-gray-700 font-medium">Loading user details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">User Not Found</h2>
            <p className="text-gray-600 mb-4">The requested user could not be loaded.</p>
            <button
              onClick={() => router.push("/users")}
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:from-green-700 hover:to-teal-700 transition-all duration-200"
            >
              Back to Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100">
      <Header />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">User Details</h1>
                    <p className="text-green-100">User information and profile</p>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/users")}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* User Information */}
            <div className="p-8">
              <div className="space-y-6">
                {/* ID Card */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">User ID</p>
                      <p className="text-lg font-mono text-gray-900">{user.id}</p>
                    </div>
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email Address</p>
                      <p className="text-lg text-gray-900">{user.email}</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Additional Info (you can add more fields here) */}
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">Active User</p>
                      <p className="text-xs text-green-600">This user account is active and operational</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex space-x-4">
                <button
                  onClick={() => router.push("/users")}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Back to Users
                </button>
                <button
                  onClick={() => router.push(`/users/${user.id}/edit`)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Edit User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



/*
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import Header from "../../components/Header";

export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      api.get(`/users/${id}`).then((res) => setUser(res.data)).catch((err) => alert(err.message));
    }
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <h1>User Detail</h1>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
*/