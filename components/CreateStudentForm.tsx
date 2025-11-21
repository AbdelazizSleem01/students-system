'use client';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { FaUserPlus, FaTimes, FaLink, FaLock, FaUser, FaCopy, FaCheck } from 'react-icons/fa';

interface CreateStudentFormProps {
  onClose: () => void;
  onStudentCreated: () => void;
}

export default function CreateStudentForm({ onClose, onStudentCreated }: CreateStudentFormProps) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {

    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Name Required',
        text: 'Please enter student name',
        confirmButtonColor: '#3B82F6',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (response.ok) {
        const student = await response.json();
        const publicLink = `${window.location.origin}${student.publicLink}`;
        const privateLink = `${window.location.origin}${student.privateLink}`;

        await Swal.fire({
          icon: 'success',
          title: '🎉 Student Created Successfully!',
          html: `
            <div class="text-left space-y-4">
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 class="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <FaUser class="inline" />
                  Student Information
                </h3>
                <p class="text-green-700"><strong>Name:</strong> ${student.name}</p>
              </div>
              
              <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h3 class="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                  <FaLink class="inline" />
                  Public Profile Link
                </h3>
                <div class="flex items-center gap-2">
                  <input 
                    id="public-link" 
                    value="${publicLink}" 
                    readonly 
                    class="flex-1 p-2 border border-indigo-300 rounded text-sm bg-white text-indigo-700 cursor-pointer"
                    onclick="this.select()"
                  />
                  <button 
                    type="button" 
                    onclick="copyText('public-link', 'public')"
                    class="btn btn-sm btn-outline btn-indigo"
                  >
                    ${copiedField === 'public' ? '✅' : 'Copy'}
                  </button>
                </div>
                <p class="text-indigo-600 text-xs mt-2">Share this link for public viewing</p>
              </div>

              <div class="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h3 class="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
                  <FaLink class="inline" />
                  Private Edit Link
                </h3>
                <div class="flex items-center gap-2">
                  <input 
                    id="private-link" 
                    value="${privateLink}" 
                    readonly 
                    class="flex-1 p-2 border border-indigo-300 rounded text-sm bg-white text-indigo-700 cursor-pointer"
                    onclick="this.select()"
                  />
                  <button 
                    type="button" 
                    onclick="copyText('private-link', 'private')"
                    class="btn btn-sm btn-outline btn-indigo"
                  >
                    ${copiedField === 'private' ? '✅' : 'Copy'}
                  </button>
                </div>
                <p class="text-indigo-600 text-xs mt-2">Use this link to edit student profile</p>
              </div>

              <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 class="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                  <FaLock class="inline" />
                  Edit Password
                </h3>
                <div class="flex items-center gap-2">
                  <input 
                    id="edit-password" 
                    value="${student.editPassword}" 
                    readonly 
                    class="flex-1 p-2 border border-orange-300 rounded text-sm bg-white text-orange-700 cursor-pointer font-mono"
                    onclick="this.select()"
                  />
                  <button 
                    type="button" 
                    onclick="copyText('edit-password', 'password')"
                    class="btn btn-sm btn-outline btn-orange"
                  >
                    ${copiedField === 'password' ? '✅' : 'Copy'}
                  </button>
                </div>
                <p class="text-orange-600 text-xs mt-2">Required to access edit page</p>
              </div>

              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p class="text-yellow-800 text-sm flex items-center gap-2 ">
                  ⚠️ <strong>Important:</strong> The password cannot be recovered.
                </p>
              </div>
            </div>
          `,
          confirmButtonText: 'Got it!',
          confirmButtonColor: '#10B981',
          width: '600px',
          customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'px-6 py-2 rounded-lg font-semibold'
          },
          didOpen: () => {
            (window as any).copyText = (elementId: string, field: string) => {
              const element = document.getElementById(elementId) as HTMLInputElement;
              if (element) {
                copyToClipboard(element.value, field);
                const fieldName = field === 'public' ? 'public link' : field === 'private' ? 'private link' : field === 'password' ? 'password' : field;
                Swal.showValidationMessage(`Copied ${fieldName} to clipboard!`);
                setTimeout(() => Swal.resetValidationMessage(), 1500);
              }
            };
          }
        });

        setName('');
        onStudentCreated();
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create student');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Creation Failed',
        text: error instanceof Error ? error.message : 'Failed to create student',
        confirmButtonColor: '#EF4444',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-white shadow-2xl rounded-2xl border border-gray-200 mb-8">
      <div className="card-body p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-full">
              <FaUserPlus className="text-indigo-600 text-xl" />
            </div>
            <div>
              <h2 className="card-title text-2xl font-bold text-gray-800">Create New Student</h2>
              <p className="text-gray-600 text-sm">Add a new student to the system</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-circle btn-sm hover:bg-gray-100"
            disabled={loading}
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="form-control">
            <label className="label block mb-3">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                <FaUser className="text-gray-500 text-sm" />
                Student Full Name
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-base py-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student's full name"
              required
              disabled={loading}
              autoFocus
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                Enter the complete name as it should appear on the profile
              </span>
              <span className="text-xs text-gray-500">
                {name.length}/50 characters
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="card-actions justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline btn-gray gap-2 px-6 transition-all duration-200 hover:shadow-md"
              disabled={loading}
            >
              <FaTimes className="text-sm" />
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary gap-2 px-6 transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || !name.trim()}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating...
                </>
              ) : (
                <>
                  <FaUserPlus className="text-sm" />
                  Create Student
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
