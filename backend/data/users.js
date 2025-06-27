import bcrypt from "bcrypt";

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: await bcrypt.hash("password123", 10),
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: await bcrypt.hash("password456", 10),
  },
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    password: await bcrypt.hash("password789", 10),
  },
];

export default users;
// Note: The passwords are hashed using bcrypt for security.
