import Symptom from "../models/symptomsModel.js";

export const deleteSymptomService = async (req ,res) =>{
    const {id} = req.params;
    try {
        const symptom = await Symptom.findByIdAndDelete(id);
        if (!symptom) {
            return res.status(404).json({ success: false, message: "Symptom not found" });
          }
        res.status(200).json({success: true, message : "symptoms deleted successfully", data : symptom});
    } catch (error) {
        console.log(error);
        res.status(500).json({success : false, message : "delete symptom failure", error : error.message});
    }
}