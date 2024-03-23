import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Please provide the company name"],
    },
    linkedInUrl: {
        type: String,
        required: [true, "Please provide a LinkedIn URL"],
        unique: true,
    },
    about: String,
    website: String,
    industry: String,
    companySize: String,
    headquarters: String,
    founded: String,
    type: String,
    specialities: String, 
})

const Company = mongoose.models.Company || mongoose.model("companies", companySchema);

export default Company;