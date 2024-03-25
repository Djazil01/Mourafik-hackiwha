import { Request, Response } from "express";
import { UserModel } from "../database/models/User";
import { Status } from "../constants/status";
import { Validator } from "../Util/validator";
export const getPatiens = async (req: Request, res: Response) => {
  //get
  const user = req.user;
  if (
    !user ||
    (user.role.type !== "Doctor" && user.role.type !== "Supervisor")
  ) {
    res.status(Status.Unauthorized.code).json(Status.Unauthorized);
    return;
  }

  const userPatients = await UserModel.find({
    _id: { $in: user.role.patients },
  });

  res.status(200).json(userPatients);
};

export const myDoctor = async (req: Request, res: Response) => {
  //get
  const user = req.user;
  if (!user || user.role.type !== "Patient") {
    res.status(Status.Unauthorized.code).json(Status.Unauthorized);
    return;
  }

  const doctor = await UserModel.findById(user.role.doctor);

  if (!doctor) {
    res.status(Status.UserNotFound.code).json(Status.UserNotFound);
    return;
  }

  res.status(200).json(doctor);
};

export const addPatient = async (req: Request, res: Response) => {
  //Post
  const email = req.body.email;
  const check = Validator.validateEmail(email);

  if (!check.valid) {
    res.status(Status.BadRequest.code).json({
      ...Status.BadRequest,
      error: check.error,
    });
    return;
  }

  const patient = await UserModel.findOne({ "info.email": email });

  if (!patient || patient.role.type !== "Patient") {
    res.status(Status.UserNotFound.code).json(Status.UserNotFound);
    return;
  }
  if (!req.user) {
    res.status(Status.Unauthorized.code).json(Status.Unauthorized);
    return;
  }

  const user = await UserModel.findById(req.user._id);
  if (!user) {
    res.status(Status.UserNotFound.code).json(Status.UserNotFound);
    return;
  }

  if (user.role.type !== "Doctor" && user.role.type !== "Supervisor") {
    res.status(Status.Unauthorized.code).json(Status.Unauthorized);
    return;
  }

  if (!user.role.patients.includes(patient._id))
    user.role.patients.push(patient._id);

  await user.save();

  patient.role.doctor = user._id;

  await patient.save();

  res.status(Status.PatientAdded.code).json(Status.PatientAdded);
};

export const removePatient = async (req: Request, res: Response) => {
  //delete
  const email = req.body.email;
  const check = Validator.validateEmail(email);

  if (!check.valid) {
    res.status(Status.BadRequest.code).json({
      ...Status.BadRequest,
      error: check.error,
    });
    return;
  }

  const patient = await UserModel.findOne({ "info.email": email });

  if (!patient || patient.role.type !== "Patient") {
    res.status(Status.UserNotFound.code).json(Status.UserNotFound);
    return;
  }
  if (!req.user) {
    res.status(Status.Unauthorized.code).json(Status.Unauthorized);
    return;
  }

  const user = await UserModel.findById(req.user._id);
  if (!user) {
    res.status(Status.UserNotFound.code).json(Status.UserNotFound);
    return;
  }

  if (user.role.type !== "Doctor" && user.role.type !== "Supervisor") {
    res.status(Status.Unauthorized.code).json(Status.Unauthorized);
    return;
  }

  user.role.patients = user.role.patients.filter((c) => c !== patient._id);
  patient.role.doctor = null;
  await patient.save();

  await user.save();

  res.status(Status.PatientRemoved.code).json(Status.PatientRemoved);
};

export const addMedication = async (req: Request, res: Response) => {
  //Post
  const email = req.body.email;
  const medication = req.body.medication;
  const emailCheck = Validator.validateEmail(email);

  if (!emailCheck.valid) {
    res.status(Status.BadRequest.code).json({
      ...Status.BadRequest,
      error: emailCheck.error,
    });
    return;
  }

  const medicationCheck = Validator.validateMedication(medication);

  if (!medicationCheck.valid) {
    res.status(Status.BadRequest.code).json({
      ...Status.BadRequest,
      error: medicationCheck.error,
    });
    return;
  }

  const patient = await UserModel.findOne({ "info.email": email });

  if (!patient || patient.role.type !== "Patient") {
    res.status(Status.UserNotFound.code).json(Status.UserNotFound);
    return;
  }
  if (!req.user) {
    res.status(Status.Unauthorized.code).json(Status.Unauthorized);
    return;
  }

  const user = await UserModel.findById(req.user._id);
  if (!user) {
    res.status(Status.UserNotFound.code).json(Status.UserNotFound);
    return;
  }

  if (
    (user.role.type !== "Doctor" && user.role.type !== "Supervisor") ||
    patient.role.doctor !== user._id
  ) {
    res.status(Status.Unauthorized.code).json(Status.Unauthorized);
    return;
  }

  if (!patient.role.medications.includes(medication))
    patient.role.medications.push(medication);

  await patient.save();

  res.status(Status.MedicationAdded.code).json(Status.MedicationAdded);
};

export const removeMedication = async (req: Request, res: Response) => {
  //delete
  const email = req.body.email;
  const medication = req.body.medication;
  const emailCheck = Validator.validateEmail(email);

  if (!emailCheck.valid) {
    res.status(Status.BadRequest.code).json({
      ...Status.BadRequest,
      error: emailCheck.error,
    });
    return;
  }

  const patient = await UserModel.findOne({ "info.email": email });

  if (!patient || patient.role.type !== "Patient") {
    res.status(Status.UserNotFound.code).json(Status.UserNotFound);
    return;
  }
  if (!req.user) {
    res.status(Status.Unauthorized.code).json(Status.Unauthorized);
    return;
  }

  const user = await UserModel.findById(req.user._id);
  if (!user) {
    res.status(Status.UserNotFound.code).json(Status.UserNotFound);
    return;
  }

  if (
    (user.role.type !== "Doctor" && user.role.type !== "Supervisor") ||
    patient.role.doctor !== user._id
  ) {
    res.status(Status.Unauthorized.code).json(Status.Unauthorized);
    return;
  }

  patient.role.medications = patient.role.medications.filter(
    (c) => c.name !== medication
  );

  await patient.save();

  res.status(Status.MedicationRemoved.code).json(Status.MedicationRemoved);
};

export const myMedications = async (req: Request, res: Response) => {
  //get
  const user = req.user;
  if (!user || user.role.type !== "Patient") {
    res.status(Status.Unauthorized.code).json(Status.Unauthorized);
    return;
  }

  const patient = await UserModel.findById(user._id);

  if (!patient || patient.role.type !== "Patient") {
    res.status(Status.UserNotFound.code).json(Status.UserNotFound);
    return;
  }

  res.status(200).json(patient.role.medications);
};
