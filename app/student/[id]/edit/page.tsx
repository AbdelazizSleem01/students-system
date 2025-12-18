'use client';
import { useState, useEffect, JSX } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Student } from '@/types';
import Swal from 'sweetalert2';
import Image from 'next/image';
import {
  FaEye, FaEyeSlash, FaUser, FaGraduationCap, FaShareAlt, FaInfoCircle,
  FaLock, FaSave, FaKey, FaUpload, FaUserCircle, FaUniversity, FaIdCard,
  FaBook, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaGithub, FaLinkedin,
  FaFilePdf, FaWhatsapp, FaInstagram, FaTiktok, FaSpotify, FaFacebook,
  FaTwitter, FaSnapchat, FaFile, FaCalendar, FaEnvelope, FaArrowLeft,
  FaMobile, FaDesktop, FaChartBar,
  FaDownload, FaMoneyBillWave, FaPhone
} from 'react-icons/fa';

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (authenticated && student) {
      document.title = `${student.name} - Edit Profile`;
    }
  }, [authenticated, student]);

  const handleAuthentication = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/students/${params.id}`);
      if (!response.ok) throw new Error('Student not found');
      const studentData = await response.json();

      if (password === studentData.editPassword) {
        setStudent(studentData);
        setAuthenticated(true);
      } else {
        Swal.fire('Error!', 'Invalid password.', 'error');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to load student data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Student, value: string) => {
    if (student) {
      setStudent({ ...student, [field]: value });
    }
  };

  const handleImageUpload = async (file: File, field: keyof Student) => {
    setImageUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('Upload failed');

      const { url, originalName } = await uploadRes.json();

      const updatedStudent = {
        ...student!,
        [field]: url,
        ...(field === 'cvUrl' && { cvFileName: originalName }),
        ...(field === 'scheduleImage' && { scheduleImageFileName: originalName }),
      };

      setStudent(updatedStudent as Student);

      const saveRes = await fetch(`/api/students/${student!._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent),
      });

      if (!saveRes.ok) throw new Error('Failed to save');

      Swal.fire({
        icon: 'success',
        title: 'Uploaded successfully!',
        text: originalName,
        timer: 2500,
        showConfirmButton: false
      });

      router.refresh();

    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Failed to upload the file. Please try again.', 'error');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async (studentToSave?: Student) => {
    const targetStudent = studentToSave || student;
    if (!targetStudent) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/students/${targetStudent._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(targetStudent),
      });

      if (response.ok) {
        Swal.fire('Success!', 'Student data updated successfully.', 'success');
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      Swal.fire('Error!', 'Failed to update student data.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!student) return;
    const { value: newPassword } = await Swal.fire({
      title: 'Change Edit Password',
      input: 'text',
      inputLabel: 'New Password (minimum 3 characters)',
      inputValue: student.editPassword,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value.length < 3) return 'Please enter a password with at least 3 characters!';
        if (value.length > 50) return 'Password must be less than 50 characters!';
        if (!/^[a-zA-Z0-9]+$/.test(value)) return 'Password can only contain letters and numbers!';
      }
    });

    if (newPassword) {
      setStudent({ ...student, editPassword: newPassword });
      setSaving(true);
      try {
        const response = await fetch(`/api/students/${student._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...student, editPassword: newPassword }),
        });
        if (response.ok) {
          Swal.fire('Success!', 'Password updated successfully!', 'success');
        } else {
          throw new Error('Update failed');
        }
      } catch (error) {
        Swal.fire('Error!', 'Failed to update password.', 'error');
        setStudent(student);
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mb-4"></div>
        <p className="text-lg text-gray-600">Loading student data...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <div className="card w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200">
          <div className="card-body p-6 md:p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="bg-linear-to-r from-blue-500 to-purple-600 rounded-full p-4 mb-4 shadow-lg">
                <FaLock className="text-white text-2xl" />
              </div>
              <h2 className="card-title text-2xl font-bold text-center text-gray-800">Enter Edit Password</h2>
              <p className="text-gray-500 text-center mt-2 text-sm md:text-base">
                Please enter the password to edit this student profile
              </p>
            </div>
            <form onSubmit={handleAuthentication}>
              <div className="form-control">
                <label className="label block mb-2">
                  <span className="label-text font-medium text-gray-700">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input input-bordered pr-12 w-full focus:ring-2 focus:ring-primary focus:border-transparent rounded-xl py-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your edit password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-primary w-full py-3 font-semibold rounded-xl bg-linear-to-r from-blue-500 to-purple-600 border-none hover:shadow-lg"
                >
                  {loading ? 'Verifying...' : 'Enter Edit Mode'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="text-center p-6">
          <FaUserCircle className="mx-auto text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No student data available</h2>
          <p className="text-gray-500 mb-4">Unable to load student information</p>
          <button onClick={() => router.back()} className="btn btn-primary rounded-xl">
            <FaArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const socialIcons: { [key: string]: JSX.Element } = {
    github: <FaGithub className="text-gray-700" />,
    linkedin: <FaLinkedin className="text-blue-600" />,
    cvUrl: <FaFilePdf className="text-red-500" />,
    whatsapp: <FaWhatsapp className="text-green-500" />,
    instagram: <FaInstagram className="text-pink-500" />,
    tiktok: <FaTiktok className="text-black" />,
    spotify: <FaSpotify className="text-green-500" />,
    facebook: <FaFacebook className="text-blue-600" />,
    x: <FaTwitter className="text-black" />,
    threads: <FaInstagram className="text-black" />,
    snapchat: <FaSnapchat className="text-yellow-400" />
  };

  const SectionHeader = ({ icon, title, color }: { icon: JSX.Element; title: string; color: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-3 rounded-xl bg-linear-to-r ${color} shadow-lg`}>{icon}</div>
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-4 md:py-8">
      <div className="container mx-auto px-3 md:px-4">
        <div className="card bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 mb-6">
          <div className="card-body p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Edit {student.name}'s Profile</h1>
                <p className="text-gray-600 text-sm md:text-base">Update and manage student information</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="badge badge-lg bg-linear-to-r from-blue-500 to-purple-500 text-white border-none px-4 py-2 rounded-xl">
                  {isMobile ? <FaMobile /> : <FaDesktop />}
                  {isMobile ? 'Mobile' : 'Desktop'}
                </div>
                <div className={`badge badge-lg gap-2 px-4 py-2 rounded-xl ${student.status === 'active'
                  ? 'bg-linear-to-r from-green-500 to-emerald-500 text-white'
                  : 'bg-linear-to-r from-red-500 to-pink-500 text-white'
                  }`}>
                  {student.status === 'active' ? <FaCheckCircle /> : <FaTimesCircle />}
                  {student.status}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="card bg-white shadow-xl rounded-2xl border border-gray-200 sticky top-6">
              <div className="card-body p-4 md:p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Navigation</h3>
                <div className="space-y-2">
                  {[
                    { id: 'personal', icon: <FaUser />, label: 'Personal', color: 'from-blue-500 to-blue-600' },
                    { id: 'academic', icon: <FaGraduationCap />, label: 'Academic', color: 'from-green-500 to-green-600' },
                    { id: 'social', icon: <FaShareAlt />, label: 'Social Links', color: 'from-purple-500 to-purple-600' },
                    { id: 'additional', icon: <FaInfoCircle />, label: 'Additional', color: 'from-orange-500 to-orange-600' },
                    { id: 'documents', icon: <FaFile />, label: 'Documents', color: 'from-teal-500 to-teal-600' },
                    { id: 'statistics', icon: <FaChartBar />, label: 'Statistics', color: 'from-pink-500 to-pink-600' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      className={`w-full text-left p-4 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3 ${activeSection === item.id
                        ? `bg-linear-to-r ${item.color} text-white shadow-lg transform -translate-y-0.5`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'
                        }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <div className={`p-2 rounded-lg ${activeSection === item.id ? 'bg-white/20' : 'bg-white shadow'}`}>
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="card bg-white shadow-xl rounded-2xl border border-gray-200">
              <div className="card-body p-4 md:p-6">

                {activeSection === 'personal' && (
                  <div className="space-y-6">
                    <SectionHeader icon={<FaUser className="text-white text-xl" />} title="Personal Information" color="from-blue-500 to-blue-600" />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="lg:col-span-2">
                        <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                          <div className="shrink-0">
                            {student.profileImage ? (
                              <div className="avatar">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg cursor-pointer hover:scale-105 transition-transform">
                                  <Image src={student.profileImage} alt="Profile" width={128} height={128} className="object-cover w-full h-full" onClick={() => setSelectedImage(student.profileImage as string)} />
                                </div>
                              </div>
                            ) : (
                              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-lg">
                                <FaUserCircle className="text-5xl text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 text-center md:text-left">
                            <h3 className="font-semibold text-gray-800 mb-2">Profile Image</h3>
                            <p className="text-gray-600 text-sm mb-4">Upload a professional profile picture</p>
                            <label className="btn btn-primary cursor-pointer rounded-xl bg-linear-to-r from-blue-500 to-purple-500 border-none hover:shadow-lg transition-all">
                              <FaUpload className="mr-2" />
                              {imageUploading ? 'Uploading...' : 'Choose Image'}
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], 'profileImage')} disabled={imageUploading} />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="form-control">
                        <label className="label block mb-3"><span className="label-text font-semibold text-gray-700 flex items-center gap-2"><FaUser className="text-blue-500" />Full Name</span></label>
                        <input type="text" className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 rounded-xl py-3" value={student.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Enter full name" />
                      </div>
                      <div className="form-control">
                        <label className="label block mb-3"><span className="label-text font-semibold text-gray-700 flex items-center gap-2"><FaEnvelope className="text-blue-500" />Email Address</span></label>
                        <input type="email" className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 rounded-xl py-3" value={student.email || ''} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="Enter email address" />
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'academic' && (
                  <div className="space-y-6">
                    <SectionHeader icon={<FaGraduationCap className="text-white text-xl" />} title="Academic Information" color="from-green-500 to-green-600" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { icon: <FaUniversity />, field: 'university', label: 'University', placeholder: 'Enter university name' },
                        { icon: <FaIdCard />, field: 'universityId', label: 'University ID', placeholder: 'Enter university ID' },
                        { icon: <FaBook />, field: 'faculty', label: 'Faculty', placeholder: 'Enter faculty name' },
                        { icon: <FaBook />, field: 'major', label: 'Major', placeholder: 'Enter major' },
                      ].map((item) => (
                        <div key={item.field} className="form-control">
                          <label className="label block mb-3"><span className="label-text font-semibold text-gray-700 flex items-center gap-2">{item.icon}{item.label}</span></label>
                          <input type="text" className="input input-bordered w-full focus:ring-2 focus:ring-green-500 rounded-xl py-3" value={(student as any)[item.field] || ''} onChange={(e) => handleInputChange(item.field as keyof Student, e.target.value)} placeholder={item.placeholder} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'social' && (
                  <div className="space-y-6">
                    <SectionHeader icon={<FaShareAlt className="text-white text-xl" />} title="Social Links" color="from-purple-500 to-purple-600" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="form-control">
                        <label className="label block mb-3"><span className="label-text font-semibold text-gray-700 flex items-center gap-2"><FaPhone className="text-blue-500" />Phone Number</span></label>
                        <input type="tel" className="input input-bordered w-full focus:ring-2 focus:ring-purple-500 rounded-xl py-3" value={student.phone || ''} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="Enter phone number" />
                      </div>
                      {['github', 'linkedin', 'whatsapp', 'instagram', 'tiktok', 'spotify', 'facebook', 'x', 'threads', 'snapchat'].map((platform) => (
                        <div key={platform} className="form-control">
                          <label className="label block mb-3"><span className="label-text font-semibold text-gray-700 flex items-center gap-2">{socialIcons[platform] || <FaShareAlt />}{platform.charAt(0).toUpperCase() + platform.slice(1)}</span></label>
                          <input type="url" className="input input-bordered w-full focus:ring-2 focus:ring-purple-500 rounded-xl py-3" value={(student as any)[platform] || ''} onChange={(e) => handleInputChange(platform as keyof Student, e.target.value)} placeholder={`Enter ${platform} URL`} />
                        </div>
                      ))}
                      <div className="form-control">
                        <label className="label block mb-3"><span className="label-text font-semibold text-gray-700 flex items-center gap-2"><FaMoneyBillWave className="text-green-500" />Instapay</span></label>
                        <input type="url" className="input input-bordered w-full focus:ring-2 focus:ring-purple-500 rounded-xl py-3" value={student.instapay || ''} onChange={(e) => handleInputChange('instapay', e.target.value)} placeholder="Enter Instapay URL" />
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'additional' && (
                  <div className="space-y-6">
                    <SectionHeader icon={<FaInfoCircle className="text-white text-xl" />} title="Additional Information" color="from-orange-500 to-orange-600" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { icon: <FaCalendar />, field: 'academicYear', label: 'Academic Year', type: 'text', placeholder: 'Enter academic year' },
                        { icon: <FaCalendarAlt />, field: 'enrollmentDate', label: 'Enrollment Date', type: 'date' },
                        { icon: <FaCalendarAlt />, field: 'validUntil', label: 'Valid Until', type: 'date' },
                      ].map((item) => (
                        <div key={item.field} className="form-control">
                          <label className="label block mb-3"><span className="label-text font-semibold text-gray-700 flex items-center gap-2">{item.icon}{item.label}</span></label>
                          <input type={item.type as 'text' | 'date'} className="input input-bordered w-full focus:ring-2 focus:ring-orange-500 rounded-xl py-3" value={(student as any)[item.field] || ''} onChange={(e) => handleInputChange(item.field as keyof Student, e.target.value)} placeholder={item.placeholder} />
                        </div>
                      ))}
                      <div className="form-control">
                        <label className="label block mb-3"><span className="label-text font-semibold text-gray-700 flex items-center gap-2"><FaCheckCircle />Status</span></label>
                        <select className="select select-bordered w-full focus:ring-2 focus:ring-orange-500 rounded-xl py-3" value={student.status || 'active'} onChange={(e) => handleInputChange('status', e.target.value)}>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'documents' && (
                  <div className="space-y-8">
                    <SectionHeader
                      icon={<FaFile className="text-white text-xl" />}
                      title="Documents"
                      color="from-teal-500 to-teal-600"
                    />

                    {/* National ID and University Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { field: 'nationalIdImage', label: 'National ID', icon: <FaIdCard className="text-4xl text-blue-600" /> },
                        { field: 'universityCardImage', label: 'University Card', icon: <FaUniversity className="text-4xl text-indigo-600" /> },
                      ].map((doc) => {
                        const hasFile = !!student?.[doc.field as keyof Student];

                        return (
                          <div key={doc.field} className="form-control">
                            <label className="label pb-2">
                              <span className="label-text font-bold text-gray-800 text-lg">
                                {doc.label}
                              </span>
                            </label>

                            <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-6 hover:border-gray-400 transition-all duration-200">
                              <div className="flex flex-col items-center gap-5">
                                {hasFile ? (
                                  <div
                                    className="avatar cursor-pointer hover:scale-110 transition-transform duration-300"
                                    onClick={() => setSelectedImage(student![doc.field as keyof Student] as string)}
                                  >
                                    <div className="w-28 h-28 rounded-2xl ring-4 ring-white shadow-2xl overflow-hidden border-4 border-gray-200">
                                      <Image
                                        src={student![doc.field as keyof Student] as string}
                                        alt={doc.label}
                                        width={112}
                                        height={112}
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="w-24 h-24 bg-linear-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center shadow-inner">
                                    {doc.icon}
                                  </div>
                                )}

                                <label className={`btn btn-primary w-full ${imageUploading ? 'btn-disabled' : ''}`}>
                                  <FaUpload className="mr-2" />
                                  {imageUploading ? 'Uploading...' : 'Upload File'}
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], doc.field as keyof Student)}
                                    disabled={imageUploading}
                                  />
                                </label>

                                {hasFile && (
                                  <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                    Uploaded
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Certificate with full width */}
                    <div className="w-full">
                      {(() => {
                        const doc = { field: 'certificate1Image', label: 'Certificate', icon: <FaCheckCircle className="text-4xl text-green-600" /> };
                        const hasFile = !!student?.[doc.field as keyof Student];

                        return (
                          <div className="form-control">
                            <label className="label pb-2">
                              <span className="label-text font-bold text-gray-800 text-lg">
                                {doc.label}
                              </span>
                            </label>

                            <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-6 hover:border-gray-400 transition-all duration-200">
                              <div className="flex flex-col items-center gap-5">
                                {hasFile ? (
                                  <div
                                    className="avatar cursor-pointer hover:scale-110 transition-transform duration-300"
                                    onClick={() => setSelectedImage(student![doc.field as keyof Student] as string)}
                                  >
                                    <div className="w-28 h-28 rounded-2xl ring-4 ring-white shadow-2xl overflow-hidden border-4 border-gray-200">
                                      <Image
                                        src={student![doc.field as keyof Student] as string}
                                        alt={doc.label}
                                        width={112}
                                        height={112}
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <div className="w-24 h-24 bg-linear-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center shadow-inner">
                                    {doc.icon}
                                  </div>
                                )}

                                <label className={`btn btn-primary w-full ${imageUploading ? 'btn-disabled' : ''}`}>
                                  <FaUpload className="mr-2" />
                                  {imageUploading ? 'Uploading...' : 'Upload File'}
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], doc.field as keyof Student)}
                                    disabled={imageUploading}
                                  />
                                </label>

                                {hasFile && (
                                  <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                    Uploaded
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* PDFs in a row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { field: 'scheduleImage', label: 'Schedule', icon: <FaCalendarAlt className="text-4xl text-purple-600" />, isPdf: true },
                        { field: 'cvUrl', label: 'CV / Resume', icon: <FaFilePdf className="text-5xl text-red-600" />, isPdf: true },
                      ].map((doc) => {
                        const hasFile = !!student?.[doc.field as keyof Student];
                        const fileName = doc.isPdf
                          ? (doc.field === 'cvUrl' ? student?.cvFileName : student?.scheduleImageFileName)
                          : null;

                        return (
                          <div key={doc.field} className="form-control">
                            <label className="label pb-2">
                              <span className="label-text font-bold text-gray-800 text-lg">
                                {doc.label}
                              </span>
                            </label>

                            <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-6 hover:border-gray-400 transition-all duration-200">
                              <div className="flex flex-col items-center gap-5">
                                {hasFile ? (
                                  doc.isPdf ? (
                                    <div className="flex flex-col items-center gap-4">
                                      <div className="w-24 h-24 bg-linear-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white">
                                        <FaFilePdf className="text-6xl text-red-600" />
                                      </div>

                                      <div className="text-center max-w-full px-2">
                                        <p className="text-sm font-semibold text-gray-800 line-clamp-2 wrap-break-word">
                                          {fileName || 'ملف.pdf'}
                                        </p>
                                        {fileName && (
                                          <p className="text-xs text-gray-500 mt-1">
                                           Uploaded File
                                          </p>
                                        )}
                                      </div>

                                      <a
                                        href={`/api/download-cv?url=${encodeURIComponent(student![doc.field as keyof Student] as string)}&name=${encodeURIComponent(fileName || 'Document.pdf')}`}
                                        className="btn btn-sm btn-error text-white hover:btn-error/90 shadow-md"
                                        download
                                      >
                                        <FaDownload className="mr-2" />
                                        Download
                                      </a>
                                    </div>
                                  ) : (
                                    <div
                                      className="avatar cursor-pointer hover:scale-110 transition-transform duration-300"
                                      onClick={() => setSelectedImage(student![doc.field as keyof Student] as string)}
                                    >
                                      <div className="w-28 h-28 rounded-2xl ring-4 ring-white shadow-2xl overflow-hidden border-4 border-gray-200">
                                        <Image
                                          src={student![doc.field as keyof Student] as string}
                                          alt={doc.label}
                                          width={112}
                                          height={112}
                                          className="object-cover w-full h-full"
                                        />
                                      </div>
                                    </div>
                                  )
                                ) : (
                                  <div className="w-24 h-24 bg-linear-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center shadow-inner">
                                    {doc.icon}
                                  </div>
                                )}

                                <label className={`btn btn-primary w-full ${imageUploading ? 'btn-disabled' : ''}`}>
                                  <FaUpload className="mr-2" />
                                  {imageUploading ? 'Uploading...' : 'Upload File'}
                                  <input
                                    type="file"
                                    className="hidden"
                                    accept={doc.isPdf ? 'application/pdf' : 'image/*'}
                                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], doc.field as keyof Student)}
                                    disabled={imageUploading}
                                  />
                                </label>

                                {hasFile && !doc.isPdf && (
                                  <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                    Uploaded
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {activeSection === 'statistics' && (
                  <div className="space-y-6">
                    <SectionHeader icon={<FaChartBar className="text-white text-xl" />} title="Statistics" color="from-pink-500 to-pink-600" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="stat bg-gray-50 rounded-2xl border border-gray-200 p-6">
                        <div className="stat-figure text-blue-500"><FaEye className="inline-block w-8 h-8 stroke-current" /></div>
                        <div className="stat-title">Profile Visits</div>
                        <div className="stat-value text-3xl">{student.visitCount || 0}</div>
                        <div className="stat-desc">Total profile page views</div>
                      </div>
                      <div className="stat bg-gray-50 rounded-2xl border border-gray-200 p-6">
                        <div className="stat-figure text-green-500"><FaCalendarAlt className="inline-block w-8 h-8 stroke-current" /></div>
                        <div className="stat-title">Last Viewed</div>
                        <div className="stat-value text-xl">
                          {student.lastViewed ? (
                            <div>
                              <div>{(() => {
                                const date = new Date(student.lastViewed);
                                const day = String(date.getDate()).padStart(2, '0');
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const year = date.getFullYear();
                                return `${day}/${month}/${year}`;
                              })()}</div>
                              <div className="text-sm text-gray-500 mt-1">{new Date(student.lastViewed).toLocaleTimeString()}</div>
                            </div>
                          ) : 'Never'}
                        </div>
                        <div className="stat-desc">Last time profile was viewed</div>
                      </div>
                      <div className="stat bg-gray-50 rounded-2xl border border-gray-200 p-6">
                        <div className="stat-figure text-blue-600"><FaLinkedin className="inline-block w-8 h-8" /></div>
                        <div className="stat-title">LinkedIn Clicks</div>
                        <div className="stat-value text-3xl">{student.linkedinClicks || 0}</div>
                        <div className="stat-desc">LinkedIn profile clicks</div>
                      </div>
                      <div className="stat bg-gray-50 rounded-2xl border border-gray-200 p-6">
                        <div className="stat-figure text-gray-700"><FaGithub className="inline-block w-8 h-8" /></div>
                        <div className="stat-title">GitHub Clicks</div>
                        <div className="stat-value text-3xl">{student.githubClicks || 0}</div>
                        <div className="stat-desc">GitHub profile clicks</div>
                      </div>
                      <div className="stat bg-gray-50 rounded-2xl border border-gray-200 p-6">
                        <div className="stat-figure text-pink-500"><FaInstagram className="inline-block w-8 h-8" /></div>
                        <div className="stat-title">Instagram Clicks</div>
                        <div className="stat-value text-3xl">{student.instagramClicks || 0}</div>
                        <div className="stat-desc">Instagram profile clicks</div>
                      </div>
                      <div className="stat bg-gray-50 rounded-2xl border border-gray-200 p-6">
                        <div className="stat-figure text-black"><FaTiktok className="inline-block w-8 h-8" /></div>
                        <div className="stat-title">TikTok Clicks</div>
                        <div className="stat-value text-3xl">{student.tiktokClicks || 0}</div>
                        <div className="stat-desc">TikTok profile clicks</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-8 pt-6 border-t border-gray-200">
                  <button onClick={handlePasswordChange} className="btn btn-warning gap-2 text-white rounded-xl w-full sm:w-auto bg-linear-to-r from-orange-500 to-red-500 border-none hover:shadow-lg">
                    <FaKey />Change Password
                  </button>
                  <button onClick={() => handleSave()} className="btn btn-primary gap-2 rounded-xl w-full sm:w-auto bg-linear-to-r from-blue-500 to-purple-500 border-none hover:shadow-lg" disabled={saving}>
                    {saving ? <span className="loading loading-spinner"></span> : <FaSave />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 h-3/4 max-w-4xl p-0 relative bg-transparent shadow-none">
            <div className="w-full h-full flex items-center justify-center">
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl max-w-4xl max-h-full">
                <Image src={selectedImage} alt="Full size" width={800} height={600} className="w-full h-full object-contain max-h-[70vh]" />
                <button className="absolute top-4 right-4 btn btn-circle btn-ghost text-white bg-black/50 hover:bg-black/70 border-none" onClick={() => setSelectedImage(null)}>
                  <FaTimesCircle className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
