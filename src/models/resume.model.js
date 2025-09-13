import mongoose, { Schema } from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    firstName: String,
    lastName: String,
    jobTitle: String,
    address: String,
    phone: String,
    email: String,
    summary: String,

    experience: [
      {
        id: Number,
        title: String,
        companyName: String,
        city: String,
        state: String,
        startDate: String,
        endDate: String,
        currentlyWorking: Boolean,
        workSummary: String,
      },
    ],

    education: [
      {
        id: Number,
        universityName: String,
        startDate: String,
        endDate: String,
        degree: String,
        major: String,
        description: String,
      },
    ],

    certifications: [
      {
        id: Number,
        name: String,
        authority: String,
        issueDate: String,
        expiryDate: String,
        credentialUrl: String,
      },
    ],

    skills: [
      {
        id: Number,
        name: String,
        rating: Number,
      },
    ],

    socialLinks: [{ id: Number, name: String, url: String }],

    projects: [
      {
        id: Number,
        name: String,
        description: String,
        liveUrl: String,
      },
    ],

    achievements: [
      {
        id: Number,
        title: String,
        description: String,
        date: String,
      },
    ],

    languages: [
      {
        id: Number,
        name: String,
        proficiency: String,
      },
    ],

    preferences: {
      jobType: String,
      location: String,
      relocation: Boolean,
    },

    template: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema)
