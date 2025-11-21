'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { FaLock, FaEye, FaEyeSlash, FaKey, FaCheck, FaTimes } from 'react-icons/fa';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all fields',
        confirmButtonColor: '#F59E0B',
        background: '#fff',
        color: '#1f2937',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          confirmButton: 'px-6 py-2 rounded-xl font-semibold'
        }
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Password Mismatch',
        text: 'New passwords do not match',
        confirmButtonColor: '#F59E0B',
        background: '#fff',
        color: '#1f2937',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          confirmButton: 'px-6 py-2 rounded-xl font-semibold'
        }
      });
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Password Too Short',
        text: 'New password must be at least 6 characters',
        confirmButtonColor: '#F59E0B',
        background: '#fff',
        color: '#1f2937',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          confirmButton: 'px-6 py-2 rounded-xl font-semibold'
        }
      });
      return;
    }

    if (currentPassword === newPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Same Password',
        text: 'New password must be different from current password',
        confirmButtonColor: '#F59E0B',
        background: '#fff',
        color: '#1f2937',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          confirmButton: 'px-6 py-2 rounded-xl font-semibold'
        }
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Password Changed!',
          text: 'Your admin password has been updated successfully',
          confirmButtonColor: '#10B981',
          background: '#fff',
          color: '#1f2937',
          customClass: {
            popup: 'rounded-2xl shadow-2xl',
            confirmButton: 'px-6 py-2 rounded-xl font-semibold'
          }
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        onClose();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Change Failed',
          text: data.error || 'Failed to change password',
          confirmButtonColor: '#EF4444',
          background: '#fff',
          color: '#1f2937',
          customClass: {
            popup: 'rounded-2xl shadow-2xl',
            confirmButton: 'px-6 py-2 rounded-xl font-semibold'
          }
        });
      }
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Failed to connect to server, please try again',
        confirmButtonColor: '#EF4444',
        background: '#fff',
        color: '#1f2937',
        customClass: {
          popup: 'rounded-2xl shadow-2xl',
          confirmButton: 'px-6 py-2 rounded-xl font-semibold'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 hover:scale-[1.02]">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-500 to-purple-600 p-6 rounded-t-2xl text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <FaLock className="text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Change Password</h2>
                <p className="text-blue-100 text-sm mt-1">Update your admin password securely</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-circle btn-sm text-white hover:bg-white/20 transition-colors"
              disabled={isLoading}
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Current Password */}
          <div className="form-control">
            <label className="label mb-3">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaKey className="text-blue-500" />
                Current Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input input-bordered w-full pl-4 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter current password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute z-10 inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                disabled={isLoading}
              >
                {showCurrentPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="form-control">
            <label className="label mb-3">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaLock className="text-green-500" />
                New Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input input-bordered w-full pl-4 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter new password (min 6 characters)"
                minLength={6}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute z-10 inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowNewPassword(!showNewPassword)}
                disabled={isLoading}
              >
                {showNewPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Password must be at least 6 characters long
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label mb-3">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaCheck className="text-purple-500" />
                Confirm New Password
              </span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full pl-4 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Confirm new password"
                minLength={6}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute z-10 inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </button>
            </div>
            {newPassword && confirmPassword && (
              <div className={`text-xs mt-2 font-medium ${newPassword === confirmPassword ? 'text-green-600' : 'text-red-600'
                }`}>
                {newPassword === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn bg-gray-300 flex-1 gap-2 rounded-xl font-semibold transition-all hover:bg-gray-100 hover:shadow-md"
              disabled={isLoading}
            >
              <FaTimes className="text-sm" />
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1 gap-2 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 border-none text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:transform-none disabled:hover:scale-100"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Changing ...
                </>
              ) : (
                <>
                  <FaLock className="text-sm" />
                  Change Password
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}