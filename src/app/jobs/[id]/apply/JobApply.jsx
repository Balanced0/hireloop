"use client";
import React, { useState } from "react";

const JobApply = ({ applicant, job }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    resumeLink: "",
    coverLetter: "",
    portfolio: "",
    linkedin: "",
    availableFrom: "",
    expectedSalary: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.resumeLink.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/applications", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          jobId: job._id,
          applicantId: applicant._id,
          ...form,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center gap-3 py-16">
        <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-2xl mb-2">
          ✓
        </div>
        <p className="text-white font-semibold text-lg">
          Application submitted!
        </p>
        <p className="text-white/40 text-sm">
          We'll be in touch if your profile matches the role.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Applicant info pill */}
      <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.06] rounded-xl px-4 py-3">
        <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/20 flex items-center justify-center text-xs font-bold text-indigo-400 flex-shrink-0">
          {applicant?.name?.charAt(0)?.toUpperCase() ?? "?"}
        </div>
        <div className="min-w-0">
          <p className="text-white text-sm font-medium truncate">
            {applicant?.name}
          </p>
          <p className="text-white/40 text-xs truncate">{applicant?.email}</p>
        </div>
      </div>

      {/* Resume link — required */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/60">
          Resume / CV link <span className="text-indigo-400">*</span>
        </label>
        <input
          name="resumeLink"
          value={form.resumeLink}
          onChange={handleChange}
          placeholder="https://drive.google.com/your-resume"
          className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-indigo-500/60 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 transition-colors"
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-xs text-white/25">Optional info</span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>

      {/* Cover letter */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-white/60">
          Cover letter
        </label>
        <textarea
          name="coverLetter"
          value={form.coverLetter}
          onChange={handleChange}
          rows={4}
          placeholder="Tell them why you're a great fit..."
          className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-indigo-500/60 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 transition-colors resize-none"
        />
      </div>

      {/* Portfolio + LinkedIn */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white/60">Portfolio</label>
          <input
            name="portfolio"
            value={form.portfolio}
            onChange={handleChange}
            placeholder="https://yoursite.com"
            className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-indigo-500/60 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white/60">LinkedIn</label>
          <input
            name="linkedin"
            value={form.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/you"
            className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-indigo-500/60 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 transition-colors"
          />
        </div>
      </div>

      {/* Available from + Expected salary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white/60">
            Available from
          </label>
          <input
            type="date"
            name="availableFrom"
            value={form.availableFrom}
            onChange={handleChange}
            className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-indigo-500/60 focus:outline-none rounded-xl px-4 py-3 text-sm text-white/70 transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-white/60">
            Expected salary ({job?.currency ?? "USD"})
          </label>
          <input
            type="number"
            name="expectedSalary"
            value={form.expectedSalary}
            onChange={handleChange}
            placeholder="e.g. 25000"
            className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-indigo-500/60 focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 transition-colors"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !form.resumeLink.trim()}
        className="w-full py-3 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-semibold text-white shadow-lg shadow-indigo-500/20"
      >
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </div>
  );
};

export default JobApply;
