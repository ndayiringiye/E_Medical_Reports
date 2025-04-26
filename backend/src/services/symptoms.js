import Symptom from "../models/symptomsModel.js";
export const createSymptomsCriteria = async (req, res) => {
    try {
        const {
            fullName,
            email,
            gender,
            age,
            nationality,
            quartier,
            howDoYouFeeling,
            durationOfDiseases,
            session,
            whichOtherSevicesDoYouWant,
        } = req.body;
        const newSymptom = new Symptom({
            fullName,
            email,
            gender,
            age,
            nationality,
            quartier,
            howDoYouFeeling,
            durationOfDiseases,
            session,
            whichOtherSevicesDoYouWant,
        });

        await newSymptom.save();
        res.status(201).json({ message: "Symptom report submitted successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to submit symptom", error: error.message });
        console.log(error)
    }
};


export const gettingSingleSymptoms = async (req, res) => {
    const { id } = req.params;
    try {
        const symptom = await Symptom.findById(id);
        if (!symptom) {
            return res.status(404).json({ success: false, message: "Symptom not found" });
        }
        res.status(200).json({ success: true, data: symptom, message: "Symptom retrieved successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching symptom", error: error });
    }
};
