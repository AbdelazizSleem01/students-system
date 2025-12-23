import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  academicYear: String,
  enrollmentDate: String,
  faculty: String,
  major: String,
  profileImage: String,
  university: String,
  universityId: String,
  validUntil: String,
  cvUrl: String,
  cvFileName: String,
  phone: String,
  github: String,
  linkedin: String,
  whatsapp: String,
  instagram: String,
  tiktok: String,
  spotify: String,
  facebook: String,
  x: String,
  threads: String,
  snapchat: String,
  youtube: String,
  publicLink: String,
  privateLink: String,
  editPassword: String,
  officialDocumentsImage: String,
  nationalIdImage: String,
  universityCardImage: String,
  scheduleImage: String,
  scheduleImageFileName: String,
  certificate1Image: String,
  visitCount: {
    type: Number,
    default: 0,
  },
  lastViewed: Date,
  linkedinClicks: {
    type: Number,
    default: 0,
  },
  githubClicks: {
    type: Number,
    default: 0,
  },
  instagramClicks: {
    type: Number,
    default: 0,
  },
  tiktokClicks: {
    type: Number,
    default: 0,
  },
  youtubeClicks: {
    type: Number,
    default: 0,
  },
  instapay: String,
}, {
  timestamps: true,
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
