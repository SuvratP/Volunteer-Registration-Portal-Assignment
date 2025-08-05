import mongoose from 'mongoose';


const applicantSchema = mongoose.Schema ({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['Intern', 'Volunteer'],
      required: true,
    },
    skills: {
      type: String,
    },
    availability: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

 const Applicant = mongoose.model('Applicant',applicantSchema)
 export default Applicant;