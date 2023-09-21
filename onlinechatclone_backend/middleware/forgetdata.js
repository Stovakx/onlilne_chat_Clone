import User from '../models/user';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const forgetDataMiddleware = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Generování náhodného resetovacího tokenu
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Nastavení expiračního data resetovacího tokenu
    const resetTokenExpiration = Date.now() + 3600000; //1h

    // Najděte uživatele podle e-mailu a aktualizujte resetovací token a expiraci
    const user = await User.findOneAndUpdate(
      { email },
      { resetToken, resetTokenExpiration },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'Uživatel s tímto e-mailem nebyl nalezen.' });
    }

    // Odešlete e-mail s resetovacím odkazem dodat údaje pro nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'vas-email@gmail.com', 
        pass: 'vas-heslo', 
      },
    });

    const mailOptions = {
      from: 'vas-email@gmail.com',
      to: email,
      subject: 'Resetovat heslo',
      text: `Klikněte na následující odkaz pro resetování hesla: http://localhost:3000/reset-password/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'E-mail pro obnovu hesla byl odeslán.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Obnovení hesla selhalo' });
  }
};

export default forgetDataMiddleware;
