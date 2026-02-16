export const RegisterDTO = (body) => {
  const { email, username, password } = body;

  if (!email || !username || !password) {
    throw new Error("All fields are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  return {
    email: email.toLowerCase(),
    username,
    password
  };
};

export const LoginDTO = (body) => {
  const { identifier, password } = body;

  if (!identifier || !password) {
    throw new Error("Credentials required");
  }

  return { identifier, password };
};
