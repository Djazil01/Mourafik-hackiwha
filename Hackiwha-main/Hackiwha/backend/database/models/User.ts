import { User } from "../../types/user";
import { Schema, model } from "mongoose";
import { Buffer } from "buffer";
//create a new schema for user

const FileSchema = new Schema(
  {
    name: { type: String, required: true },
    data: { type: Buffer, required: true },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const SubscriptionSchema = new Schema(
  {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { _id: false }
);

const MedicationSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    sideEffects: { type: String, required: true },
    time: [{ type: Number, required: true }],
  },
  { _id: false }
);

const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
  },
  {
    _id: false,
  }
);

const UserSchema = new Schema(
  {
    _id: { type: String, required: true },
    info: { type: UserInfoSchema, required: true },
    role: {
      type: {
        type: String,
        enum: ["Patient", "Doctor", "Supervisor", "Admin"],
        required: true,
      },
      doctor: { type: String },
      appointments: [{ type: Date }],
      documents: [FileSchema],
      subscription: SubscriptionSchema,
      medications: [MedicationSchema],
      description: { type: String },
      patients: [{ type: String }],
      field: { type: String },
      experience: { type: Number },
      certificates: [FileSchema],
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false, versionKey: false, minimize: true }
);


const UserModel = model<User>("User", UserSchema);

export { UserModel };
