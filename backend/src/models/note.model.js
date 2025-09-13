import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    subjectName: { type: String, required: true },
    topic: { type: String, required: true },
    caption: { type: String },
    contents: [
      {
        fileName: { type: String, required: true },
        fileType: { type: String, enum: ["image", "document"], required: true },
        url: { type: String, required: true }, // <-- consistent naming
        size: { type: Number }, // optional, in bytes
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
