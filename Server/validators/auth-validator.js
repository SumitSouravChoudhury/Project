const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "This field is required" })
    .trim()
    .min(3, { message: "Name must be of atleast 3 characters" })
    .max(100, { message: "Name must be of maximum 100 characters" }),

  email: z
    .string({ required_error: "This field is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be of atleast 3 characters" })
    .max(100, { message: "Email must be of maximum 100 characters" }),

  phone: z
    .string({ required_error: "This field is required" })
    .trim()
    .min(10, { message: "Phone number must be of atleast 10 characters" })
    .max(20, { message: "Phone number must be of maximum 100 characters" }),

  password: z
    .string({ required_error: "This field is required" })
    .trim()
    .min(6, { message: "Name must be of atleast 6 characters" })
    .max(1000, { message: "Name must be of maximum 1000 characters" }),
});

module.exports = signupSchema;