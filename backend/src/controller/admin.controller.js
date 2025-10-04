import Admin from "../models/admin.model.js";
import nodemailer from "nodemailer";

// ================= Register new admin =================
export const registerAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({ firstName, lastName, email });
    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= Get all admins =================
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= Step 1: Check admin email & send OTP =================
export const checkAdminEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // valid for 5 mins

    admin.otp = otp;
    admin.otpExpiry = otpExpiry;
    await admin.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Admin Portal" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Your Admin Login OTP",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    res.status(200).json({
      message: "OTP sent to email",
      adminId: admin._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= Step 2: Verify OTP =================
export const verifyAdminOtp = async (req, res) => {
  try {
    const { adminId, otp } = req.body;
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Validate OTP
    if (admin.otp !== otp || Date.now() > admin.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // OTP correct → clear it
    admin.otp = null;
    admin.otpExpiry = null;
    await admin.save();

    res.status(200).json({
      message: "OTP verified",
      admin: { id: admin._id, email: admin.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
