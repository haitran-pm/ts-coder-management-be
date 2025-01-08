import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  name: string;
  description: string;
  status: "pending" | "working" | "review" | "done" | "archive";
  isDeleted: boolean;
  user?: mongoose.Schema.Types.ObjectId;
}

const taskSchema: Schema<ITask> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "working", "review", "done", "archive"],
      default: "pending",
      required: true,
    },
    isDeleted: { type: Boolean, default: false, required: true },
    // Reference to a User (optional)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false, // Task may not belong to any user
    },
  },
  {
    timestamps: true,
  }
);

taskSchema.pre(/^find/, function (next) {
  if (!("_conditions" in this)) return next();
  if (!("isDeleted" in taskSchema.paths)) {
    delete (this as any)["_conditions"]["all"];
    return next();
  }
  if (!("all" in (this as any)["_conditions"])) {
    (this as any)["_conditions"].isDeleted = false;
  } else {
    delete (this as any)["_conditions"]["all"];
  }
  next();
});

const Task = mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default Task;
