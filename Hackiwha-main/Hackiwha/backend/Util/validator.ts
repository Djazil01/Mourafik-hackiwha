import Joi from "joi";

const FileSchema = Joi.object({
  name: Joi.string().required(),
  data: Joi.binary().required(),
  date: Joi.date(),
});

const SubscriptionSchema = Joi.object({
  start: Joi.date().required(),
  end: Joi.date().required(),
});

const MedicationSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  sideEffects: Joi.string().required(),
  time: Joi.array().items(Joi.number()).required(),
});

const UserInfoSchema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  birthDate: Joi.date().required(),
});

class Validator {
  static validateUser(user: any) {
    // Define validation schema for User
    const UserSchemaValidator = Joi.object({
      info: UserInfoSchema.required(),

      role: Joi.object({
        type: Joi.string()
          .valid("Patient", "Doctor", "Supervisor", "Admin")
          .required(),

        doctor: Joi.string().allow(null).when("type", {
          is: "Patient",
          then: Joi.required(),
          otherwise: Joi.forbidden(),
        }),

        appointments: Joi.array().items(Joi.date()).when("type", {
          is: "Patient",
          then: Joi.required(),
          otherwise: Joi.forbidden(),
        }),

        documents: Joi.array().items(FileSchema).when("type", {
          is: "Patient",
          then: Joi.required(),
          otherwise: Joi.forbidden(),
        }),

        subscription: SubscriptionSchema.when("type", {
          is: "Patient",
          then: Joi.required(),
          otherwise: Joi.forbidden(),
        }),

        medications: Joi.array().items(MedicationSchema).when("type", {
          is: "Patient",
          then: Joi.required(),
          otherwise: Joi.forbidden(),
        }),

        description: Joi.string().when("type", {
          //is Patient or Doctor
          is: Joi.valid("Patient", "Doctor"),
          then: Joi.required(),
          otherwise: Joi.forbidden(),
        }),

        patients: Joi.array()
          .items(Joi.string())
          .when("type", {
            is: Joi.valid("Doctor", "Supervisor"),
            then: Joi.required(),
            otherwise: Joi.forbidden(),
          }),

        field: Joi.string().when("type", {
          is: "Doctor",
          then: Joi.required(),
          otherwise: Joi.forbidden(),
        }),

        experience: Joi.number().when("type", {
          is: "Doctor",
          then: Joi.required(),
          otherwise: Joi.forbidden(),
        }),

        certificates: Joi.array().items(FileSchema).when("type", {
          is: "Doctor",
          then: Joi.required(),
          otherwise: Joi.forbidden(),
        }),
      }).required(),
    });

    return UserSchemaValidator.validate(user, {
      abortEarly: false,
    });
  }

  static validateRegister(user: any) {
    const RegisterSchemaValidator = Joi.object({
      info: UserInfoSchema.required(),

      role: Joi.object({
        type: Joi.string()
          .valid("Patient", "Doctor", "Supervisor", "Admin")
          .required(),
      }).required(),
    });

    const result = RegisterSchemaValidator.validate(user, {
      abortEarly: false,
    });

    const valid = result.error === undefined;

    return { valid, error: result.error?.message };
  }

  static validateLogin(user: any) {
    const LoginSchemaValidator = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const result = LoginSchemaValidator.validate(user, {
      abortEarly: false,
    });

    const valid = result.error === undefined;

    return { valid, error: result.error?.message };
  }

  static validateEmail(email: string) {
    const EmailSchemaValidator = Joi.string().email().required();

    const result = EmailSchemaValidator.validate(email, {
      abortEarly: false,
    });

    const valid = result.error === undefined;

    return { valid, error: result.error?.message };
  }
  static validateMedication(medication: any) {
    const result = MedicationSchema.validate(medication, {
      abortEarly: false,
    });

    const valid = result.error === undefined;

    return { valid, error: result.error?.message };
  }

  static validateToken(token: string) {
    const regex = /^Bearer\s/;
    return regex.test(token);
  }
}







export { Validator };
