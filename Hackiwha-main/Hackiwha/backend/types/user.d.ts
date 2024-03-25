import type { Buffer } from "buffer";

interface File {
  name: string;
  data: Buffer;
  date: Date;
}

interface Subscription {
  start: Date;
  end: Date;
}

interface Medication {
  name: string;
  description: string;
  sideEffects: string;
  time: number[];
}

interface UserInfo {
  email: string;
  fullName: string;
  phone: string;
  password: string;
  birthDate: Date;
}

interface Patient {
  type: "Patient";
  doctor: string | null;
  appointments: Date[];
  documents: File[];
  subscription: Subscription;
  medications: Medication[];
  description: string;
}

interface Doctor {
  type: "Doctor";
  patients: string[];
  field: string;
  experience: number;
  description: string;
  certificates: File[];
}

interface Supervisor {
  type: "Supervisor";
  patients: string[];
}

interface Admin {
  type: "Admin";
}

declare interface User {
  _id: string;

  info: UserInfo;

  role: Patient | Doctor | Supervisor | Admin;

  createdAt: Date;

  updatedAt: Date;
}

type RequestUser = User;
type BodyUser = Omit<User, "_id">;
