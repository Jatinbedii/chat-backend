import jwt from "jsonwebtoken";
function createToken(id) {
  const token = jwt.sign({ id: id }, process.env.JWT, {
    expiresIn: 24 * 60 * 60,
  });
  return token;
}

export { createToken };
