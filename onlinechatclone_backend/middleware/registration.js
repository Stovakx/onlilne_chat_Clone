import User from "../models/user";

const registerMiddleware = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
  
      // Kontrola emailu zda už není registrován
      const existingUser = await User.findOne({ email, name });
      if (existingUser) {
        return res.status(400).json({ error: 'Uživatel s tímto e-mailem již existuje.' });
      }
  
      // Vytvoření nového uživatele
      const newUser = new User({ name, email, password });
      await newUser.save(); 
  
      // Přesměrování na přihlášení nebo jinou odpověď
      res.status(201).json({ message: 'Registration completed.' });
      res.redirect('/')
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something wen wrong. Please try again.' });
    }
  };

  export default registerMiddleware; 