'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash, FaLock, FaUserShield } from 'react-icons/fa';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Password Required',
        text: 'Please enter your password',
      });
      return;
    }

    setLoading(true);

    try {
      const result = await signIn('credentials', {
        password,
        redirect: false,
      });

      if (result?.error) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid password. Please try again.',
          confirmButtonColor: '#3B82F6',
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome back, Admin!',
          confirmButtonColor: '#10B981',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          router.push('/admin');
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Unable to connect to server. Please try again.',
        confirmButtonColor: '#EF4444',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="card-body p-6 sm:p-8">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-4 mb-4 shadow-lg">
              <FaUserShield className="text-white text-2xl sm:text-3xl" />
            </div>
            <h2 className="card-title text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
              Admin Portal
            </h2>
            <p className="text-gray-600 text-center text-sm sm:text-base">
              Enter your password to access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Input */}
            <div className="form-control">
              <label className="label block mb-3">
                <span className="label-text font-semibold text-gray-700 text-sm sm:text-base flex items-center gap-2">
                  <FaLock className="text-gray-500 text-sm" />
                  Admin Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input input-bordered pr-12 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm sm:text-base py-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter admin password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute z-10 cursor-pointer inset-y-0 right-0 pr-3  flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <FaEye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {showPassword ? 'Password is visible' : 'Password is hidden'}
                </span>
                <span className="text-xs text-gray-500">
                  {password.length} character{password.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-control">
              <button 
                type="submit" 
                className="btn btn-primary w-full py-3 font-semibold text-sm sm:text-base transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !password.trim()}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span>
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FaLock className="text-sm" />
                    <span>Access Dashboard</span>
                  </div>
                )}
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <div className="text-yellow-600 mt-0.5">
                <FaLock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-yellow-800 font-medium">
                  Security Notice
                </p>
                <p className="text-xs text-yellow-700">
                  This area is restricted to authorized personnel only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}