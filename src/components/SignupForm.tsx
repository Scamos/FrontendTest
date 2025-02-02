import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { signupUser, resetAuthState } from "../store/authSlice";

// Validation schema using Zod
const SignupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username cannot exceed 20 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[@$!%*?&#]/, "Must contain a special character"),
});

type SignupFormValues = z.infer<typeof SignupSchema>;

const SignupForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({ resolver: zodResolver(SignupSchema) });

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.auth);

  const onSubmit = (data: SignupFormValues) => {
    dispatch(signupUser(data));
    setTimeout(() => dispatch(resetAuthState()), 5000); // Reset state after 5 seconds for better UX
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Username:</label>
          <input {...register("username")} className="border p-2 w-full" />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input {...register("email")} className="border p-2 w-full" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" {...register("password")} className="border p-2 w-full" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 mt-4 w-full" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Signup successful!</p>}
    </div>
  );
};

export default SignupForm;