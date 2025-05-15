export const validateAge = (req, res, next) => {
    const { age } = req.body;
  
    if (age < 10 || age > 25) {
      return res.status(400).json({
        message: "Age must be between 10 and 25 years only. Unfortunately, you're not allowed.",
      });
    }
  
    next(); 
  };
  