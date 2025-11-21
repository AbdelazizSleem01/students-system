import Link from 'next/link';
import { 
  FaUserGraduate, 
  FaEnvelope, 
  FaShieldAlt, 
  FaFileContract,
  FaHeart,
  FaRocket,
  FaGraduationCap,
  FaLinkedin,
  FaTwitter,
  FaGithub
} from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-linear-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <FaUserGraduate className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EduProfile
                </h3>
                <p className="text-gray-400 text-sm">Student Management System</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Empowering educational institutions with modern student profile management and showcase solutions.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-700 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110">
                <FaLinkedin className="text-lg" />
              </a>
              <a href="#" className="p-2 bg-gray-700 hover:bg-blue-400 rounded-lg transition-all duration-300 transform hover:scale-110">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-110">
                <FaGithub className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaRocket className="text-blue-400" />
              Quick Links
            </h4>
            <div className="space-y-3">
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                Home
              </Link>
              <Link href="/featured" className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1">
                <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                Featured Students
              </Link>
              <Link href="/admin/login" className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-all duration-300 hover:translate-x-1">
                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                Admin Login
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaGraduationCap className="text-green-400" />
              Resources
            </h4>
            <div className="space-y-3">
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-all duration-300 hover:translate-x-1">
                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                Documentation
              </Link>
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">
                <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                Help Center
              </Link>
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-all duration-300 hover:translate-x-1">
                <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
                Blog
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-red-400" />
              Legal
            </h4>
            <div className="space-y-3">
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1">
                <FaShieldAlt className="text-xs" />
                Privacy Policy
              </Link>
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-all duration-300 hover:translate-x-1">
                <FaFileContract className="text-xs" />
                Terms of Service
              </Link>
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1">
                <FaEnvelope className="text-xs" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Link href="https://abdelaziz-sleem.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-red-400 transition-all duration-300">
                Abdelaziz Sleem
            </Link>
              <FaHeart className="text-red-400 animate-pulse" />
              <span>for education</span>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              Copyright © {currentYear} - All rights reserved by{' '}
              <span className="text-blue-400 font-semibold">EduProfile System</span>
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Empowering the next generation of academic excellence
            </p>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 pt-6 border-t border-gray-700">
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Secure Platform</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full text-xs">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full text-xs">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span>Modern Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
}