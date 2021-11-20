
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {RefreshToken} from "../models";

export const createToken = user => {
  // Sign the JWT
  if (!user.role) {
    throw new Error('No user role specified');
  }

  const _jwt =  jwt.sign(
    {
      _id: user._id,
      role: user.role,
      iss: process.env.VERCEL_URL,
      aud: process.env.VERCEL_URL
    },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '1h' }
  )
  
  return _jwt;
};

export const createRefreshToken = async user => {
    if (!user.role) {
    throw new Error('No user role specified');
  }

  const _jwt =  jwt.sign(
    {
      _id: user._id,
      username: user.username,
      role: user.role,
      iss: process.env.VERCEL_URL,
      aud: process.env.VERCEL_URL,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { algorithm: 'HS256'}
  )

  const refreshTokencreated = await RefreshToken.create({
    token: _jwt,
    userId: user._id
  }).catch(err => console.log(err))
  // console.log(refreshTokencreated)
  // console.log(_jwt, "the jwt")
  
  return refreshTokencreated?.token;
}

export const hashPassword = password => {
  return new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const verifyPassword = (
  passwordAttempt,
  hashedPassword
) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};


