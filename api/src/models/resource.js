const mongoose = require('mongoose')

const PhoneNumber = new mongoose.Schema({
    phoneType: { type: String, required: true },
    phoneNumber: { type: String, required: true }
})

const OtherContact = new mongoose.Schema({
    roleOfContact: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    note: { type: String, required: false }
})

const FinancialAid = new mongoose.Schema({
    education: { type: String, required: false },
    immigrationStatus: { type: String, required: false },
    deadline: { type: String, required: false },
})

const Resource = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    website: { type: String, required: false },
    email: { type: String, required: false },
    phoneNumbers: { type: [PhoneNumber], required: false },
    otherContacts: { type: [OtherContact], required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    hoursOfOperation: { type: String, required: false },
    eligibilityRequirements: { type: String, required: false },
    financialAidDetails: { type: FinancialAid, required: false },
    cost: { type: String, required: false },
    availableLanguages: { type: [String], default: ["English"], required: false },
    lastUpdated: { type: Date, default: Date.now, required: false },
    recommendation: { type: String, enum: ["Yes", "Maybe", "No"], required: false },
    comments: { type: [String], required: false },
    internalNotes: { type: [String], required: false }
})

module.exports = mongoose.model('Resource', Resource)