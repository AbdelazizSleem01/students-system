import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    FaGraduationCap,
    FaUniversity,
    FaEye,
    FaUser,
    FaStar,
    FaLink,
    FaCrown,
    FaRocket,
} from 'react-icons/fa';

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Featured Students - Student Showcase',
    description: 'Discover the latest and most outstanding students in our academic community',
    keywords: 'students, featured, academics, university, showcase'
};

export default async function FeaturePage() {
  await dbConnect();

  const rawStudents = await Student
    .find({ status: 'active' })
    .sort({ enrollmentDate: -1 })
    .limit(9)
    .lean();

  const students = rawStudents as any[];

    if (!students || students.length === 0) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
            <Navbar />

            {/* Hero Section */}
            <section className="py-16 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        {/* Header Icon */}
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-indigo-400 to-blue-500 rounded-2xl shadow-2xl mb-8">
                            <FaCrown className="text-white text-3xl" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Featured <span className="bg-linear-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent">Students</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Meet our brightest minds and newest academic stars. These outstanding students represent the future of excellence in their fields.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-lg mx-auto mb-16">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                <div className="text-2xl font-bold text-blue-600 mb-2">{students.length}</div>
                                <div className="text-sm text-gray-600 whitespace-nowrap">Featured Students</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                <div className="text-2xl font-bold text-purple-600 mb-2">Latest</div>
                                <div className="text-sm text-gray-600">New Additions</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                <div className="text-2xl font-bold text-green-600 mb-2">Active</div>
                                <div className="text-sm text-gray-600">High Achievers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Students Grid */}
            <section className="py-16 bg-linear-to-br from-white to-blue-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {students.map((student, index) => (
                            <StudentCard
                                key={student._id.toString()}
                                student={student}
                                index={index}
                                isFeatured={index < 3}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-linear-to-r from-blue-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Want to Join Our Academic Community?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Be part of our featured students showcase. Contact our administration to get your profile featured and highlighted.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/admin/login" className="btn btn-lg px-12 rounded-xl bg-white text-blue-600 border-none hover:bg-gray-100 hover:shadow-xl transition-all font-bold">
                                <FaRocket className="mr-2" />
                                Get Featured
                            </Link>
                            <Link href="/" className="btn btn-outline btn-lg px-12 rounded-xl border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all">
                                <FaGraduationCap className="mr-2" />
                                Explore Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}

interface StudentCardProps {
    student: any;
    index: number;
    isFeatured: boolean;
}

function StudentCard({ student, index, isFeatured }: StudentCardProps) {
    const socialLinksCount = [
        student.github, student.linkedin, student.cvUrl,
        student.whatsapp, student.instagram, student.twitter
    ].filter(Boolean).length;

    return (
        <div
            className={`
                group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300
                border border-gray-100 overflow-hidden
                ${isFeatured ? 'ring-2 ring-indigo-400' : ''}
            `}
        >
            {/* Featured Badge */}
            {isFeatured && (
                <div className="absolute top-4 right-4 z-20">
                    <div className="bg-linear-to-r from-indigo-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <FaStar className="text-sm" />
                        FEATURED
                    </div>
                </div>
            )}

            {/* Header with Gradient */}
            <div className={`
                h-20 bg-linear-to-r from-blue-500 to-purple-600 relative overflow-hidden
                ${isFeatured ? 'from-indigo-400 to-blue-500' : ''}
            `}>
                <div className="absolute inset-0 bg-black opacity-10"></div>
            </div>

            {/* Profile Image */}
            <div className="px-6 pb-6">
                <div className="relative -mt-12 mb-6 flex justify-center">
                    <div className="relative">
                        {student.profileImage ? (
                            <div className="avatar">
                                <div className="w-20 h-20 rounded-2xl ring-4 ring-white shadow-lg overflow-hidden">
                                    <Image
                                        src={student.profileImage}
                                        alt={student.name}
                                        width={80}
                                        height={80}
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center shadow-lg ring-4 ring-white">
                                <FaUser className="text-2xl text-white" />
                            </div>
                        )}

                        {/* Status Indicator */}
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Student Information */}
                <div className="text-center space-y-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                            {student.name}
                        </h3>
                        <div className="flex items-center justify-center gap-1">
                            {isFeatured && (
                                <FaStar className="text-indigo-500 text-xs" />
                            )}
                            <span className="text-xs text-gray-500">Featured Student</span>
                        </div>
                    </div>

                    {/* Academic Info */}
                    <div className="space-y-2">
                        {student.major && (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FaGraduationCap className="text-blue-600 text-xs" />
                                </div>
                                <span className="text-sm font-semibold text-gray-700">{student.major}</span>
                            </div>
                        )}

                        {student.university && (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <FaUniversity className="text-purple-600 text-xs" />
                                </div>
                                <span className="text-sm font-semibold text-gray-700">{student.university}</span>
                            </div>
                        )}
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
                        <div className="text-center flex-1">
                            <div className="text-md font-bold text-green-600">{socialLinksCount}</div>
                            <div className="text-xs text-gray-500">Links</div>
                        </div>
                        <div className="w-px h-6 bg-gray-200"></div>
                        <div className="text-center flex-1">
                            <div className="text-md font-bold text-blue-600">
                                {student.enrollmentDate ? new Date(student.enrollmentDate).getFullYear() : '2024'}
                            </div>
                            <div className="text-xs text-gray-500">Joined</div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                        <Link
                            href={`/student/${student._id}`}
                            className="flex-1 btn btn-primary btn-sm rounded-xl bg-linear-to-r from-blue-500 to-purple-500 border-none text-white hover:from-blue-600 hover:to-purple-600 transition-all"
                        >
                            <FaEye className="mr-1 text-xs" />
                            View Profile
                        </Link>

                        {socialLinksCount > 0 && (
                            <Link
                                href={`/student/${student._id}/links`}
                                className="btn btn-outline btn-sm rounded-xl border-2 border-gray-300 hover:border-purple-300 hover:bg-purple-50 transition-all"
                                title="Social Links"
                            >
                                <FaLink className="text-purple-600 text-xs" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
