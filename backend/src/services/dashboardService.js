import Symptom from "../models/symptomsModel.js";

export const getAllSymptoms = async (req , res) =>{
    try {
        const symptoms = await Symptom.find({});
        res.status(201).json({success : true, data : symptoms, messege : "symptoms getted successfully"});
    } catch (error) {
        console.log(error);
        res.status(404).json({success : false, messege : "getting symptoms failure", error : error.messege})
    }
}