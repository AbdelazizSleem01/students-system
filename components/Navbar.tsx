import Link from 'next/link';
import { FaUserGraduate } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="navbar bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container flex justify-between mx-auto px-4">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost normal-case text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <FaUserGraduate className="text-blue-600 text-2xl mr-2" />
            EduProfile
          </Link>
        </div>
        <div className="flex-none">
          <div className="flex items-center gap-4">
            <Link href="/feature" className="btn btn-ghost btn-sm md:btn-md rounded-full text-gray-600 hover:bg-gray-100 transition-all">
              Featured Students
            </Link>
            <Link href="/admin/login" className="btn btn-primary btn-sm md:btn-md rounded-full px-6 bg-gradient-to-r from-blue-500 to-purple-500 border-none hover:shadow-lg transition-all">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
