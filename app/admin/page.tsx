'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import AdminLayout from '@/components/AdminLayout';
import CreateStudentForm from '@/components/CreateStudentForm';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import { Student } from '@/types';
import StudentTable from '@/components/StudentTable';
import { FaKey, FaPlusCircle } from 'react-icons/fa';

export default function AdminPage() {
  const { data: session } = useSession();
  const [students, setStudents] = useState<Student[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Admin Dashboard - Student Profile System';
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-base-100">
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="btn btn-warning gap-2 text-white rounded-xl w-full sm:w-auto bg-linear-to-r from-orange-500 to-orange-400 border-none hover:shadow-lg transition-all text-sm sm:text-base py-2 h-auto"
              >
                <FaKey className="text-xs sm:text-sm" />
                Change Password
              </button>
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn btn-primary gap-2 text-white rounded-xl w-full sm:w-auto bg-linear-to-r from-indigo-700 to-indigo-500 border-none hover:shadow-lg transition-all text-sm sm:text-base py-2 h-auto"
              >
                <FaPlusCircle className="text-xs sm:text-sm" />
                Create Student
              </button>
            </div>
          </div>

          {showCreateForm && (
            <CreateStudentForm
              onClose={() => setShowCreateForm(false)}
              onStudentCreated={fetchStudents}
            />
          )}

          <StudentTable
            students={students}
            loading={loading}
            onStudentsChange={fetchStudents}
          />
        </div>
      </div>

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </AdminLayout>
  );
}