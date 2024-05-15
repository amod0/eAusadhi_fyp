import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  
  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
  });
};

const generateToken1 = (payload, secret, options) => {
  return jwt.sign(payload, secret, options);
};

export { generateToken, generateToken1 };
