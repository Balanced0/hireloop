import Link from "next/link";
import { ArrowLeft } from "@gravity-ui/icons";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#6366F1]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* 404 */}
        <h1 className="text-[120px] sm:text-[160px] font-black text-white/5 leading-none select-none">
          404
        </h1>

        {/* Logo */}
        <div className="-mt-10 mb-6">
          <Image src={logo} width={140} height={40} alt="logo"></Image>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Page not found
        </h2>
        <p className="text-sm text-gray-500 max-w-xs mb-8">
          Looks like this page went job hunting and never came back. Let&apos;s
          get you somewhere useful.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors duration-150 shadow-lg shadow-indigo-500/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
