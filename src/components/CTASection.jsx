"use client";

import Image from "next/image";
import Link from "next/link";
import ctaBg from "@/assets/cta-bg.png";
import gradient from "@/assets/Gradient.png";

export default function CTASection() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Grid background */}
      <div className="absolute inset-0 flex items-start justify-center">
        <Image
          src={ctaBg}
          alt=""
          fill
          className="object-cover object-top opacity-90"
          priority
        />
      </div>

      {/* Blue gradient overlay */}
      <div className="absolute inset-0 flex items-start justify-center">
        <Image
          src={gradient}
          alt=""
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-28 sm:py-36">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mb-5">
          Your next role is <br /> already looking for you
        </h2>

        <p className="text-sm sm:text-base text-gray-400 max-w-md mb-10">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/signup"
            className="btn bg-white hover:bg-gray-100 text-black border-none font-semibold px-7 rounded-xl text-sm shadow-lg"
          >
            Create a free account
          </Link>
          <Link
            href="/pricing"
            className="btn bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold px-7 rounded-xl text-sm"
          >
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
