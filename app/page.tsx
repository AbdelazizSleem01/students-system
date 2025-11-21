import { FaUserGraduate, FaChalkboardTeacher, FaLink, FaShieldAlt, FaUniversity, FaMobileAlt, FaRocket, FaLock, FaEye, FaEdit, FaShareAlt, FaGraduationCap, FaUsers, FaGlobe, FaChartLine } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import AdminLogin from './admin/login/page';

export default function HomePage() {
  return (
    // <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
    //   <Navbar />

    //   {/* Hero Section */}
    //   <section className="hero min-h-screen py-20">
    //     <div className="hero-content text-center">
    //       <div className="max-w-6xl">
    //         <div className="flex justify-center mb-8">
    //           <div className="relative">
    //             <div className="w-24 h-24 bg-linear-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
    //               <FaUserGraduate className="text-white text-4xl" />
    //             </div>
    //             <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
    //               <FaRocket className="text-white text-sm" />
    //             </div>
    //           </div>
    //         </div>
            
    //         <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
    //           Modern Student
    //           <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Profile </span>
    //           System
    //         </h1>
            
    //         <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
    //           Create stunning student profiles, manage academic portfolios, and showcase achievements with our all-in-one platform designed for educational excellence.
    //         </p>
            
    //         {/* Features Grid */}
    //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    //           <FeatureCard
    //             icon={<FaUserGraduate className="text-3xl" />}
    //             title="Student Profiles"
    //             description="Comprehensive profiles with academic info and social links"
    //             color="from-blue-500 to-blue-600"
    //           />
    //           <FeatureCard
    //             icon={<FaLink className="text-3xl" />}
    //             title="Link Pages"
    //             description="Beautiful, customizable pages for all platforms"
    //             color="from-purple-500 to-purple-600"
    //           />
    //           <FeatureCard
    //             icon={<FaChalkboardTeacher className="text-3xl" />}
    //             title="Admin Dashboard"
    //             description="Easy management of all student accounts"
    //             color="from-green-500 to-green-600"
    //           />
    //           <FeatureCard
    //             icon={<FaShieldAlt className="text-3xl" />}
    //             title="Secure Access"
    //             description="Protected admin and student edit pages"
    //             color="from-orange-500 to-orange-600"
    //           />
    //         </div>

    //         {/* Action Buttons */}
    //         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
    //           <Link href="/admin/login" className="btn btn-primary btn-lg px-10 rounded-full bg-linear-to-r from-blue-500 to-purple-500 border-none text-white hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
    //             <FaRocket className="mr-2" />
    //             Get Started Now
    //           </Link>
    //           <Link href="/feature" className="btn btn-outline btn-lg px-10 rounded-full border-2 hover:bg-gray-100 transition-all">
    //             <FaEye className="mr-2" />
    //             Explore Features
    //           </Link>
    //         </div>

    //         {/* Stats */}
    //         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
    //           <StatCard number="500+" label="Students Managed" icon={<FaUsers />} />
    //           <StatCard number="25+" label="Universities" icon={<FaUniversity />} />
    //           <StatCard number="99.9%" label="Uptime" icon={<FaGlobe />} />
    //           <StatCard number="24/7" label="Support" icon={<FaChartLine />} />
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* How It Works Section */}
    //   <section id="features" className="py-20 bg-white/50">
    //     <div className="container mx-auto px-4">
    //       <div className="text-center mb-16">
    //         <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
    //           How It <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Works</span>
    //         </h2>
    //         <p className="text-xl text-gray-600 max-w-2xl mx-auto">
    //           Simple, efficient, and powerful - everything you need to manage student profiles in three easy steps
    //         </p>
    //       </div>
          
    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
    //         {/* Connecting Line */}
    //         <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 transform -translate-y-1/2"></div>
            
    //         <StepCard
    //           step="1"
    //           title="Create Profile"
    //           description="Admin creates student profiles with unique edit passwords and generates public/private links"
    //           icon={<FaEdit className="text-2xl" />}
    //         />
    //         <StepCard
    //           step="2"
    //           title="Customize Content"
    //           description="Students access their private edit page to customize profile information and social links"
    //           icon={<FaUserGraduate className="text-2xl" />}
    //         />
    //         <StepCard
    //           step="3"
    //           title="Share & Showcase"
    //           description="Share public profile and link page to showcase academic achievements and social presence"
    //           icon={<FaShareAlt className="text-2xl" />}
    //         />
    //       </div>
    //     </div>
    //   </section>

    //   {/* Features Detail Section */}
    //   <section className="py-20 bg-linear-to-br from-gray-900 to-gray-800 text-white">
    //     <div className="container mx-auto px-4">
    //       <div className="text-center mb-16">
    //         <h2 className="text-4xl md:text-5xl font-bold mb-4">
    //           Powerful <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Features</span>
    //         </h2>
    //         <p className="text-xl text-gray-300 max-w-2xl mx-auto">
    //           Everything you need to create, manage, and showcase student profiles effectively
    //         </p>
    //       </div>
          
    //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    //         <FeatureDetail
    //           title="Comprehensive Student Profiles"
    //           features={[
    //             "Academic information and enrollment details",
    //             "Profile image upload with Cloudinary",
    //             "Social media links integration",
    //             "Professional CV/Resume hosting"
    //           ]}
    //           icon={<FaGraduationCap className="text-3xl" />}
    //           gradient="from-blue-500 to-cyan-500"
    //         />
    //         <FeatureDetail
    //           title="Beautiful Link Pages"
    //           features={[
    //             "Modern, responsive design",
    //             "All major social platforms",
    //             "Customizable appearance",
    //             "Mobile-friendly interface"
    //           ]}
    //           icon={<FaLink className="text-3xl" />}
    //           gradient="from-purple-500 to-pink-500"
    //         />
    //         <FeatureDetail
    //           title="Admin Management"
    //           features={[
    //             "Create and manage student accounts",
    //             "Generate unique access links",
    //             "Monitor student profiles",
    //             "Secure admin authentication"
    //           ]}
    //           icon={<FaChalkboardTeacher className="text-3xl" />}
    //           gradient="from-green-500 to-teal-500"
    //         />
    //         <FeatureDetail
    //           title="Security & Privacy"
    //           features={[
    //             "Password-protected edit pages",
    //             "Secure file uploads",
    //             "Protected admin routes",
    //             "Data encryption"
    //           ]}
    //           icon={<FaLock className="text-3xl" />}
    //           gradient="from-orange-500 to-red-500"
    //         />
    //       </div>
    //     </div>
    //   </section>

    //   {/* CTA Section */}
    //   <section className="py-20 bg-linear-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
    //     <div className="container mx-auto px-4 text-center">
    //       <div className="max-w-4xl mx-auto">
    //         <h2 className="text-4xl md:text-5xl font-bold mb-6">
    //           Ready to Transform Student Management?
    //         </h2>
    //         <p className="text-xl mb-8 opacity-90">
    //           Join hundreds of educational institutions using our platform to create amazing student profiles and streamline academic management.
    //         </p>
    //         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    //           <Link href="/admin/login" className="btn btn-secondary btn-lg px-12 rounded-full bg-white text-blue-600 border-none hover:bg-gray-100 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-bold">
    //             <FaRocket className="mr-2" />
    //             Start Now - It's Free
    //           </Link>
    //           <Link href="#features" className="btn btn-outline btn-lg px-12 rounded-full border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all">
    //             Learn More
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </section>

    //   {/* Footer */}
    //   <Footer/>
    // </div>
    <>
    <AdminLogin/>
    </>
  );
}

function FeatureCard({ icon, title, description, color }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string;
}) {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent transform hover:-translate-y-2">
      <div className={`w-16 h-16 bg-linear-to-r ${color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="card-title text-lg font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function StatCard({ number, label, icon }: { number: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="text-center group">
      <div className="flex justify-center mb-3">
        <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <div className="stat-value text-2xl md:text-3xl font-bold text-gray-900 mb-1">
        {number}
      </div>
      <div className="stat-desc text-gray-600 font-medium">{label}</div>
    </div>
  );
}

function StepCard({ step, title, description, icon }: { 
  step: string; 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) {
  return (
    <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 group-hover:scale-110 transition-transform duration-300">
        {step}
      </div>
      <div className="text-center pt-4">
        <div className="w-16 h-16 bg-linear-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="card-title text-xl font-semibold text-gray-900 mb-3 justify-center">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function FeatureDetail({ title, features, icon, gradient }: { 
  title: string; 
  features: string[]; 
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className="bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 group hover:border-gray-600">
      <div className={`w-16 h-16 bg-linear-to-r ${gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-white mb-6">{title}</h3>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start group/item">
            <div className={`w-6 h-6 bg-linear-to-r ${gradient} rounded-full flex items-center justify-center mr-3 mt-0.5 shrink-0 group-hover/item:scale-110 transition-transform duration-300`}>
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-300 group-hover/item:text-white transition-colors">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
