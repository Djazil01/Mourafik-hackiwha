import { Router } from "express";
import { Authenticator } from "../middlewares/authenticator";
import { Status } from "../constants/status";
import { rateLimit } from "express-rate-limit";
import { handleLogin } from "../controllers/login";
import { handleRegister } from "../controllers/register";
import {
  addPatient,
  removePatient,
  getPatiens,
  addMedication,
  removeMedication,
  myDoctor,
  myMedications,
} from "../controllers/managePatient";
const router = Router();

const limiter = rateLimit({
  handler: (_req, res) => {
    res.status(Status.TooManyRequests.code).json(Status.TooManyRequests);
  },
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: true,
});

router.get("/", limiter, (req, res) => {
  res.status(Status.Welcome.code).json(Status.Welcome);
});
router.post("/user/registre", handleRegister);

router.post("/user/login", handleLogin);

router.get("/user/me", Authenticator.verify, (req, res) => res.json(req.user)
);

router.get("/user/patients", Authenticator.verify, getPatiens);
router.post("/user/patients", Authenticator.verify, addPatient);
router.delete("/user/patients", Authenticator.verify, removePatient);

router.get("/user/patients/doctor", Authenticator.verify, myDoctor);

router.get("/user/patients/medications", Authenticator.verify, myMedications);
router.post("/user/patients/medications", Authenticator.verify, addMedication);
router.delete(
  "/user/patients/medications",
  Authenticator.verify,
  removeMedication
);

const apiRouterConfig = {
  router,
  path: "/api",
};

export { apiRouterConfig };
