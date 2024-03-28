import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Please provide the company name"],
    },
    url: {
        type: String,
        required: [true, "Please provide a LinkedIn URL"],
        unique: true,
    },
    about: {
        type: String,
        required: [true, "Please provide a description"],
    },
    avatarUrl: String,
    companySize: String,
    headquarters: String,
    website: String,
    industry: String,
    founded: String,
    type: String,
    specialties: String, 
    emails: {
        type: [String],
    },
})

const Company = mongoose.models.companies || mongoose.model("companies", companySchema);

export default Company;