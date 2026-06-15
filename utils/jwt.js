// Import the default object
import jwt from 'jsonwebtoken';
import { CONSTANT } from './constants.js';

export function generateTokens({ id, email, role }) {
  const accessToken = generateAccessToken({ id, email, role });
  const refreshToken = generateRefreshToken({ id, email, role });
  return { accessToken, refreshToken };
}

/* <-------------- Verifies the tokens --------------> */
export function verifyAccessToken(token) {
  // Use jwt.verify
  return jwt.verify(token, CONSTANT.JWT.ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, CONSTANT.JWT.REFRESH_SECRET);
}

/* <-------------- UTILS: Generates the tokens --------------> */
function generateAccessToken(payload) {
  // Use jwt.sign
  return jwt.sign(payload, CONSTANT.JWT.ACCESS_SECRET, {
    algorithm: CONSTANT.JWT.ALGORITHM,
    expiresIn: CONSTANT.JWT.ACCESS_EXPIRES_IN,
  });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, CONSTANT.JWT.REFRESH_SECRET, {
    algorithm: CONSTANT.JWT.ALGORITHM,
    expiresIn: CONSTANT.JWT.REFRESH_EXPIRES_IN,
  });
}
