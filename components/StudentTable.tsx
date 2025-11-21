'use client';
import { useState } from 'react';
import { Student } from '@/types';
import Swal from 'sweetalert2';
import { FaExternalLinkAlt, FaEdit, FaTrash, FaUser, FaLink, FaLock, FaEye, FaCopy, FaCheck, FaTimes, FaIdCard, FaShareAlt } from 'react-icons/fa';
import Link from 'next/link';

interface StudentTableProps {
  students: Student[];
  loading: boolean;
  onStudentsChange: () => void;
}

interface LinksModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
}

function LinksModal({ student, isOpen, onClose }: LinksModalProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [copyMessage, setCopyMessage] = useState<string>('');

  const [publicLink, setPublicLink] = useState('');
  const [privateLink, setPrivateLink] = useState('');

  useState(() => {
    if (typeof window !== 'undefined') {
      setPublicLink(`${window.location.origin}${student.publicLink}`);
      setPrivateLink(`${window.location.origin}${student.privateLink}`);
    }
  });

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setCopyMessage(`${type === 'public' ? 'Public' : 'Private'} link copied successfully!`);

      setTimeout(() => {
        setCopiedType(null);
        setCopyMessage('');
      }, 2000);
    } catch (err) {
      setCopyMessage('Failed to copy link');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open backdrop-blur-sm overflow-y-auto">
      <div className="modal-box max-w-2xl w-full mx-4 p-0 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-linear-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-white/20 p-2 sm:p-3 rounded-xl backdrop-blur-sm">
              <FaShareAlt className="text-white text-lg sm:text-xl" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">Student Links</h3>
              <p className="text-white/80 text-xs sm:text-sm">Manage links for {student.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-circle btn-sm hover:bg-white/20 text-white"
          >
            <FaTimes className="text-sm sm:text-lg" />
          </button>
        </div>

        {/* Copy Message */}
        {copyMessage && (
          <div className="px-4 sm:px-6 pt-4">
            <div className={`alert ${copiedType ? 'alert-success' : 'alert-error'} shadow-lg py-3`}>
              <div className="flex items-center gap-2">
                {copiedType ? (
                  <FaCheck className="text-green-500 text-sm" />
                ) : (
                  <FaTimes className="text-red-500 text-sm" />
                )}
                <span className="text-xs sm:text-sm">{copyMessage}</span>
              </div>
            </div>
          </div>
        )}

        {/* Links Content */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 w-90%">
          {/* Public Link Card */}
          <div className="bg-linear-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:border-blue-300">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="bg-blue-500 p-2 sm:p-3 rounded-xl text-white">
                <FaExternalLinkAlt className="text-sm sm:text-lg" />
              </div>
              <div>
                <h4 className="font-bold text-blue-800 text-base sm:text-lg">Public Profile</h4>
                <p className="text-blue-600 text-xs sm:text-sm">Share this link for public viewing</p>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  value={publicLink}
                  readOnly
                  className="input input-bordered flex-1 bg-white text-blue-700 font-mono text-xs sm:text-sm cursor-pointer rounded-xl py-2 h-auto min-h-0"
                  onClick={(e) => e.currentTarget.select()}
                />
                <button
                  onClick={() => copyToClipboard(publicLink, 'public')}
                  className={`btn gap-2 rounded-xl py-2 h-auto min-h-0 ${copiedType === 'public'
                      ? 'btn-success'
                      : 'btn-primary'
                    }`}
                >
                  {copiedType === 'public' ? (
                    <FaCheck className="text-xs sm:text-sm" />
                  ) : (
                    <FaCopy className="text-xs sm:text-sm" />
                  )}
                  <span className="text-xs sm:text-sm">Copy</span>
                </button>
              </div>
              <a
                href={student.publicLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary gap-2 rounded-xl w-full py-2 h-auto min-h-0 text-xs sm:text-sm"
              >
                <FaEye className="text-xs sm:text-sm" />
                Open Public Page
              </a>
            </div>
          </div>

          {/* Private Link Card */}
          <div className="bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg hover:border-purple-300">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="bg-purple-500 p-2 sm:p-3 rounded-xl text-white">
                <FaLock className="text-sm sm:text-lg" />
              </div>
              <div>
                <h4 className="font-bold text-purple-800 text-base sm:text-lg">Edit Page</h4>
                <p className="text-purple-600 text-xs sm:text-sm">Use this link to edit student profile</p>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  value={privateLink}
                  readOnly
                  className="input input-bordered flex-1 bg-white text-purple-700 font-mono text-xs sm:text-sm cursor-pointer rounded-xl py-2 h-auto min-h-0"
                  onClick={(e) => e.currentTarget.select()}
                />
                <button
                  onClick={() => copyToClipboard(privateLink, 'private')}
                  className={`btn gap-2 rounded-xl py-2 h-auto min-h-0 ${copiedType === 'private'
                      ? 'btn-success'
                      : 'btn-secondary'
                    }`}
                >
                  {copiedType === 'private' ? (
                    <FaCheck className="text-xs sm:text-sm" />
                  ) : (
                    <FaCopy className="text-xs sm:text-sm" />
                  )}
                  <span className="text-xs sm:text-sm">Copy</span>
                </button>
              </div>
              <a
                href={student.privateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary gap-2 rounded-xl w-full py-2 h-auto min-h-0 text-xs sm:text-sm"
              >
                <FaEdit className="text-xs sm:text-sm" />
                Open Edit Page
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-action p-4 sm:p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button onClick={onClose} className="btn btn-ghost gap-2 rounded-xl w-full sm:w-auto py-2 h-auto min-h-0">
            <FaTimes className="text-xs sm:text-sm" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StudentTable({ students, loading, onStudentsChange }: StudentTableProps) {
  const [linksModal, setLinksModal] = useState<{ isOpen: boolean; student: Student | null }>({
    isOpen: false,
    student: null
  });

  const handleDelete = async (studentId: string, studentName: string) => {
    const result = await Swal.fire({
      title: 'Delete Student?',
      html: `
        <div class="text-center">
          <div class="text-4xl sm:text-6xl mb-4">🗑️</div>
          <p class="text-base sm:text-lg text-gray-700">Are you sure you want to delete</p>
          <p class="text-lg sm:text-xl font-bold text-red-600">${studentName}</p>
          <p class="text-xs sm:text-sm text-gray-500 mt-2">This action cannot be undone.</p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        popup: 'rounded-2xl max-w-xs sm:max-w-md mx-2',
        confirmButton: 'px-4 sm:px-6 py-2 font-semibold rounded-xl text-sm sm:text-base',
        cancelButton: 'px-4 sm:px-6 py-2 font-semibold rounded-xl text-sm sm:text-base'
      }
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/students/${studentId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await Swal.fire({
            title: 'Deleted!',
            text: 'Student has been deleted successfully.',
            icon: 'success',
            confirmButtonColor: '#10B981',
            timer: 2000,
            showConfirmButton: false
          });
          onStudentsChange();
        } else {
          throw new Error('Failed to delete student');
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete student.',
          icon: 'error',
          confirmButtonColor: '#EF4444',
        });
      }
    }
  };

  const handleEditName = async (student: Student) => {
    const { value: newName } = await Swal.fire({
      title: 'Edit Student Name',
      input: 'text',
      inputValue: student.name,
      inputPlaceholder: 'Enter new student name',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#6B7280',
      inputValidator: (value) => {
        if (!value?.trim()) {
          return 'Please enter a name!';
        }
        if (value.length > 50) {
          return 'Name must be less than 50 characters!';
        }
      },
      customClass: {
        popup: 'rounded-2xl max-w-xs sm:max-w-md mx-2',
        confirmButton: 'rounded-xl text-sm sm:text-base',
        cancelButton: 'rounded-xl text-sm sm:text-base'
      }
    });

    if (newName) {
      try {
        const response = await fetch(`/api/students/${student._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newName.trim() }),
        });

        if (response.ok) {
          await Swal.fire({
            title: 'Updated!',
            text: 'Student name has been updated.',
            icon: 'success',
            confirmButtonColor: '#10B981',
            timer: 1500,
            showConfirmButton: false
          });
          onStudentsChange();
        } else {
          throw new Error('Failed to update student');
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update student.',
          icon: 'error',
          confirmButtonColor: '#EF4444',
        });
      }
    }
  };

  const openLinksModal = (student: Student) => {
    setLinksModal({ isOpen: true, student });
  };

  const closeLinksModal = () => {
    setLinksModal({ isOpen: false, student: null });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-primary mb-3 sm:mb-4"></div>
        <p className="text-gray-600 text-base sm:text-lg">Loading students...</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-200">
          <table className="table w-full">
            <thead>
              <tr className="bg-linear-to-r from-gray-50 to-gray-100">
                <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-sm font-bold text-gray-900">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="bg-indigo-500 p-1 sm:p-2 rounded-lg text-white">
                      <FaUser className="text-xs sm:text-sm" />
                    </div>
                    <span className="text-sm sm:text-base">Student Name</span>
                  </div>
                </th>
                <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-sm font-bold text-gray-900">
                  <div className="flex items-center gap-2">
                    <FaExternalLinkAlt className="text-indigo-500 text-sm" />
                    <span className="text-sm sm:text-base">Public Page</span>
                  </div>
                </th>
                <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-sm font-bold text-gray-900">
                  <div className="flex items-center gap-2">
                    <FaLock className="text-purple-500 text-sm" />
                    <span className="text-sm sm:text-base">Edit Page</span>
                  </div>
                </th>
                <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-sm font-bold text-gray-900">
                  <div className="flex items-center gap-2">
                    <FaLink className="text-gray-600 text-sm" />
                    <span className="text-sm sm:text-base">Actions</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <FaUser className="text-white text-base sm:text-lg" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-base sm:text-lg">{student.name}</div>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                          ID: {student._id?.substring(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <Link
                      href={student.publicLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm bg-linear-to-r from-indigo-500 to-indigo-600 border-none text-white gap-2 rounded-xl hover:shadow-lg transition-all text-xs sm:text-sm"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      View
                    </Link>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <Link
                      href={student.privateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm bg-linear-to-r from-purple-500 to-purple-600 border-none text-white gap-2 rounded-xl hover:shadow-lg transition-all text-xs sm:text-sm"
                    >
                      <FaLock className="text-xs" />
                      View
                    </Link>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={() => openLinksModal(student)}
                        className="btn btn-sm bg-linear-to-r from-gray-600 to-gray-700 border-none text-white gap-2 rounded-xl hover:shadow-lg transition-all tooltip text-xs sm:text-sm"
                        data-tip="View & Copy Links"
                      >
                        <FaLink className="text-xs sm:text-sm" />
                        Links
                      </button>
                      <button
                        onClick={() => handleEditName(student)}
                        className="btn btn-sm btn-warning gap-2 text-white rounded-xl bg-linear-to-r from-orange-500 to-orange-400 border-none hover:shadow-lg transition-all text-xs sm:text-sm"
                        data-tip="Edit Name"
                      >
                        <FaEdit className="text-xs sm:text-sm" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id, student.name)}
                        className="btn btn-sm bg-linear-to-r from-red-500 to-red-600 border-none text-white gap-2 rounded-xl hover:shadow-lg transition-all tooltip text-xs sm:text-sm"
                        data-tip="Delete Student"
                      >
                        <FaTrash className="text-xs sm:text-sm" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tablet View */}
        <div className="hidden md:block lg:hidden space-y-4">
          {students.map((student) => (
            <div key={student._id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaUser className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl">{student.name}</h3>
                    <p className="text-xs text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full inline-block">
                      ID: {student._id?.substring(0, 8)}...
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <Link
                  href={student.publicLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-linear-to-r from-blue-500 to-blue-600 border-none text-white gap-2 rounded-xl hover:shadow-lg transition-all text-sm"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  Public Page
                </Link>
                <Link
                  href={student.privateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-linear-to-r from-purple-500 to-purple-600 border-none text-white gap-2 rounded-xl hover:shadow-lg transition-all text-sm"
                >
                  <FaLock className="text-xs" />
                  Edit Page
                </Link>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200 gap-2">
                <button
                  onClick={() => openLinksModal(student)}
                  className="btn btn-sm bg-linear-to-r from-gray-600 to-gray-700 border-none text-white gap-2 flex-1 rounded-xl text-xs sm:text-sm"
                >
                  <FaLink className="text-xs sm:text-sm" />
                  Links
                </button>
                <button
                  onClick={() => handleEditName(student)}
                  className="btn btn-sm bg-linear-to-r from-amber-500 to-amber-600 border-none text-white gap-2 flex-1 rounded-xl text-xs sm:text-sm"
                >
                  <FaEdit className="text-xs sm:text-sm" />
                  Rename
                </button>
                <button
                  onClick={() => handleDelete(student._id, student.name)}
                  className="btn btn-sm bg-linear-to-r from-red-500 to-red-600 border-none text-white gap-2 flex-1 rounded-xl text-xs sm:text-sm"
                >
                  <FaTrash className="text-xs sm:text-sm" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {students.map((student) => (
            <div key={student._id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <FaUser className="text-white text-base" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{student.name}</h3>
                    <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block">
                      ID: {student._id?.substring(0, 8)}...
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <a
                  href={student.publicLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-linear-to-r from-blue-500 to-blue-600 border-none text-white gap-2 rounded-xl w-full hover:shadow-lg transition-all text-xs py-2 h-auto"
                >
                  <FaExternalLinkAlt className="text-xs" />
                  View Public Page
                </a>
                <a
                  href={student.privateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-linear-to-r from-purple-500 to-purple-600 border-none text-white gap-2 rounded-xl w-full hover:shadow-lg transition-all text-xs py-2 h-auto"
                >
                  <FaLock className="text-xs" />
                  Open Edit Page
                </a>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => openLinksModal(student)}
                  className="btn btn-sm bg-linear-to-r from-gray-600 to-gray-700 border-none text-white gap-2 rounded-xl text-xs py-2 h-auto"
                >
                  <FaLink className="text-xs" />
                  View & Copy Links
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleEditName(student)}
                    className="btn btn-sm bg-linear-to-r from-amber-500 to-amber-600 border-none text-white gap-2 rounded-xl text-xs py-2 h-auto"
                  >
                    <FaEdit className="text-xs" />
                    Rename
                  </button>
                  <button
                    onClick={() => handleDelete(student._id, student.name)}
                    className="btn btn-sm bg-linear-to-r from-red-500 to-red-600 border-none text-white gap-2 rounded-xl text-xs py-2 h-auto"
                  >
                    <FaTrash className="text-xs" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {students.length === 0 && (
          <div className="text-center py-12 sm:py-16 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg border border-gray-200">
            <div className="text-5xl sm:text-7xl mb-4 sm:mb-6">👨‍🎓</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">No Students Found</h3>
            <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-lg px-4">
              Get started by creating your first student profile. They'll get a public page and private edit link.
            </p>
          </div>
        )}
      </div>

      {/* Links Modal */}
      {linksModal.student && (
        <LinksModal
          student={linksModal.student}
          isOpen={linksModal.isOpen}
          onClose={closeLinksModal}
        />
      )}
    </>
  );
}