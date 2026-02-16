export const UserResponseDTO = (user) => {
  return {
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
    createdAt: user.createdAt
  };
};
