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
