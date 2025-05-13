import mongoose from "mongoose";

const symptomSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: [10, "Minimum age is 10"],
        max: [25, "Maximum age is 25"],
    },
    nationality: {
        type: String,
        required: true,
    },
    quartier: {
        type: [String, Number],
        required: true,
    },
    howDoYouFeeling: {
        type: String,
        required: true,
    },
    durationOfDiseases: {
        type: [String, Number],
        required: true,
    },
    session: {
        type: String,
        required: true
    },
    whichOtherSevicesDoYouWant: {
        type: String,
        required: true,
    }, 
},{Timestamps : true})
const Symptom = mongoose.model("Symptom", symptomSchema);
export default Symptom;