import User from "../models/user";
import jwt from "jsonwebtoken";

const loginMiddleware = async (req, res, next) => {
    try {
      const { identifier, password } = req.body;
  
      // Najděte uživatele podle e-mailu
      const user = await User.findOne({
        $or: [{ email: identifier }, { name: identifier }],
      });
  
      if (!user) {
        return res.status(401).json({ error: "Invalid data" });
      }
  
      // Porovnání hesla
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid data' });
      }
  
      // Vytvoření JWT tokenu
      const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed.' });
    }
};
  
export default loginMiddleware;