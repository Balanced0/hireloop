"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Envelope, Lock, Eye, EyeSlash, CircleCheckFill, CircleInfoFill } from "@gravity-ui/icons";
import Image from "next/image";
import logo from "@/assets/logo.png"

function useToast() {
  const [toast, setToast] = useState(null);
  const show = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };
  return { toast, show };
}

function Toast({ toast }) {
  if (!toast) return null;
  const isSuccess = toast.type === "success";
  return (
    <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium max-w-sm
      ${isSuccess
        ? "bg-[#0d1f14] border-green-500/30 text-green-400"
        : "bg-[#1f0d0d] border-red-500/30 text-red-400"
      }`}
    >
      {isSuccess
        ? <CircleCheckFill className="w-4 h-4 shrink-0" />
        : <CircleInfoFill className="w-4 h-4 shrink-0" />
      }
      {toast.message}
    </div>
  );
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const { toast, show } = useToast();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      show("Please fill in all fields.", "error");
      return;
    }
    try {
      setLoadingEmail(true);
      await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });
      show("Signed in successfully! Redirecting...", "success");
    } catch (err) {
      show(err?.message || "Invalid email or password. Please try again.", "error");
    } finally {
      setLoadingEmail(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoadingGoogle(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err) {
      show(err?.message || "Failed to sign in with Google. Please try again.", "error");
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <>
      <Toast toast={toast} />

      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        {/* Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6366F1]/10 blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-0.5 select-none">
              <Image src={logo} width={100} height={40} alt="logo"></Image>
            </Link>
          </div>

          {/* Card */}
          <div className="bg-[#0d0f13] border border-white/8 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
              <p className="text-sm text-gray-500">Sign in to continue to HireLoop</p>
            </div>

            {/* Google SSO */}
            <button
              onClick={handleGoogle}
              disabled={loadingGoogle || loadingEmail}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold text-sm py-3 px-4 rounded-xl transition-colors duration-150"
            >
              {loadingGoogle ? (
                <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
              )}
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-xs text-gray-600">or sign in with email</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-400">Email</label>
                <div className="relative">
                  <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your gmail"
                    className="w-full bg-[#13151a] border border-white/10 hover:border-white/20 focus:border-[#6366F1] focus:outline-none text-white placeholder-gray-600 text-sm rounded-xl pl-10 pr-4 py-3 transition-colors duration-150"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-400">Password</label>
                  <Link href="/forgot-password" className="text-xs text-[#818CF8] hover:text-[#a5b4fc] transition-colors duration-150">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#13151a] border border-white/10 hover:border-white/20 focus:border-[#6366F1] focus:outline-none text-white placeholder-gray-600 text-sm rounded-xl pl-10 pr-10 py-3 transition-colors duration-150"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                  >
                    {showPassword ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loadingEmail || loadingGoogle}
                className="w-full flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 px-4 rounded-xl transition-colors duration-150 mt-1 shadow-lg shadow-indigo-500/20"
              >
                {loadingEmail && (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                Sign In
              </button>
            </form>

            {/* Sign up */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#818CF8] hover:text-[#a5b4fc] font-medium transition-colors duration-150">
                Create one free
              </Link>
            </p>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-gray-600 mt-5">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-gray-400 transition-colors">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="underline hover:text-gray-400 transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </>
  );
}