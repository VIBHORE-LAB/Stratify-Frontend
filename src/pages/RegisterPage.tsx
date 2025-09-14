import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { TrendingUp, User, Mail, Lock } from "lucide-react";
import { Label } from "../components/ui/label";
import { toast } from "sonner"; // ✅ import sonner toast

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        description: "Please re-enter matching passwords.",
      });
      return;
    }

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Account created!", {
          description: "Redirecting you to the dashboard...",
        });
        navigate("/dashboard");
      } else {
        toast.error("Registration failed", {
          description: result.payload || "Something went wrong.",
        });
      }
    } catch (err) {
      toast.error("Error", {
        description: "Unexpected error occurred. Please try again later.",
      });
      console.error("Register failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-neutral-900" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Branding */}
        <div className="flex items-center justify-center mb-8">
          <TrendingUp className="h-10 w-10 text-green-400 mr-3" />
          <span className="text-3xl font-bold text-white tracking-tight">
            Stratify
          </span>
        </div>

        <Card className="bg-neutral-900 border border-neutral-800 shadow-xl text-white">
          <CardHeader className="text-center border-b border-neutral-800">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription className="text-neutral-400">
              Join Stratify!
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm text-neutral-300">
                  Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Choose a Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-neutral-300">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm text-neutral-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm text-neutral-300"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold rounded-md"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full mr-2" />
                    Creating account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            {/* Links */}
            <div className="mt-6 text-center">
              <p className="text-neutral-400">
                Already have an account?{" "}
                <Link to="/login" className="text-green-400 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/"
                className="text-neutral-400 hover:text-white text-sm"
              >
                ← Back to home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
