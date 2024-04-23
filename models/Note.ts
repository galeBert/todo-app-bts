import mongoose, { Schema, models } from "mongoose";

const noteSchema = new Schema(
  {
    text: {
      type: String,
    },
    owner: {
      type: String,
    },
  },
  { timestamps: true }
);

const Note = models.Note || mongoose.model("Note", noteSchema);
export default Note;
