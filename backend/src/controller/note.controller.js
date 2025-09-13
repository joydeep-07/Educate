import Note from "../models/note.model.js";
import imagekit from "../services/imagekit.js";

// ✅ Create a new note
export const createNote = async (req, res) => {
  try {
    const { subjectName, topic, caption } = req.body;

    // Upload files to ImageKit
    let uploadedFiles = [];
    if (req.files && req.files.length > 0) {
      const uploads = await Promise.all(
        req.files.map(async (file) => {
          const uploadResponse = await imagekit.upload({
            file: file.buffer, // multer memory buffer
            fileName: file.originalname,
          });

          return {
            fileName: file.originalname,
            fileType: file.mimetype,
            url: uploadResponse.url,
          };
        })
      );
      uploadedFiles = uploads;
    }

    const newNote = new Note({
      subjectName,
      topic,
      caption,
      contents: uploadedFiles,
    });

    await newNote.save();

    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notes", error: error.message });
  }
};
