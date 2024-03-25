import bcrypt from "bcrypt";

class Hasher {
  static async hashPassword(password: string) {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  static comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}

export { Hasher };
