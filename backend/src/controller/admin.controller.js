import Admin from "../models/admin.model.js";

// Register new admin
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

// Get all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Check if admin exists by email
export const checkAdminEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // For demo, return success and OTP request allowed
    res.status(200).json({ message: "Admin exists, proceed with OTP", adminId: admin._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Verify OTP (demo OTP = 123456)
export const verifyAdminOtp = async (req, res) => {
  try {
    const { adminId, otp } = req.body;

    if (otp !== "123456") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "OTP verified", admin: { id: admin._id, email: admin.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
