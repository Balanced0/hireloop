"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/actions/jobs";
import {
  Briefcase,
  Tag,
  CircleDollar,
  MapPin,
  Calendar,
  Globe,
  OfficeBadge,
  CircleCheckFill,
  CircleInfoFill,
  ChevronDown,
} from "@gravity-ui/icons";

// ── Toast ────────────────────────────────────────────────────────────────────
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
  const ok = toast.type === "success";
  return (
    <div
      className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium max-w-sm
      ${ok ? "bg-[#0d1f14] border-green-500/30 text-green-400" : "bg-[#1f0d0d] border-red-500/30 text-red-400"}`}
    >
      {ok ? (
        <CircleCheckFill className="w-4 h-4 shrink-0" />
      ) : (
        <CircleInfoFill className="w-4 h-4 shrink-0" />
      )}
      {toast.message}
    </div>
  );
}

// ── Reusable field components ─────────────────────────────────────────────────
function Label({ children, required }) {
  return (
    <label className="text-xs font-medium text-gray-400">
      {children}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
      )}
      <input
        {...props}
        className={`w-full bg-[#13151a] border border-white/10 hover:border-white/20 focus:border-[#6366F1] focus:outline-none text-white placeholder-gray-600 text-sm rounded-xl py-3 pr-4 transition-colors duration-150
          ${Icon ? "pl-10" : "pl-4"} ${props.className || ""}`}
      />
    </div>
  );
}

function Select({ icon: Icon, children, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
      )}
      <select
        {...props}
        className={`w-full appearance-none bg-[#13151a] border border-white/10 hover:border-white/20 focus:border-[#6366F1] focus:outline-none text-white text-sm rounded-xl py-3 pr-10 transition-colors duration-150
          ${Icon ? "pl-10" : "pl-4"} ${props.className || ""}`}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
    </div>
  );
}

function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      className={`w-full bg-[#13151a] border border-white/10 hover:border-white/20 focus:border-[#6366F1] focus:outline-none text-white placeholder-gray-600 text-sm rounded-xl px-4 py-3 transition-colors duration-150 resize-none ${props.className || ""}`}
    />
  );
}

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-9 h-9 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-[#818CF8]" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-[#0d0f13] border border-white/8 rounded-2xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}

const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Remote",
  "Contract",
  "Internship",
];
const CURRENCIES = ["USD", "BDT", "EUR", "GBP", "INR", "AED", "CAD", "AUD"];
const CATEGORIES = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Operations",
  "Product",
  "Data & Analytics",
  "Customer Support",
  "Other",
];

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PostJobPage({ companies }) {
  const router = useRouter();
  const { toast, show } = useToast();
  const [loading, setLoading] = useState(false);
  const [isRemote, setIsRemote] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState("");
  const company = companies?.find((c) => c._id === selectedCompanyId) ?? null;

  const [form, setForm] = useState({
    title: "",
    category: "",
    type: "",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    city: "",
    country: "",
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
  });

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.title || !form.category || !form.type) {
      show("Please fill in all required fields.", "error");
      return;
    }
    if (!isRemote && (!form.city || !form.country)) {
      show("Please enter the job location or toggle Remote.", "error");
      return;
    }
    if (!form.responsibilities || !form.requirements) {
      show("Responsibilities and Requirements are required.", "error");
      return;
    }

    try {
      setLoading(true);
      const result = await createJob({
        ...form,
        isRemote,
        status: "active",
        companyId: company?._id,
      });

      if (result.insertedId) {
        show("Job posted successfully!", "success");
        setTimeout(() => router.push("/dashboard/recruiter/jobs"), 1500);
      } else {
        throw new Error(result.message || "Failed to post job.");
      }
    } catch (err) {
      show(err.message || "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast toast={toast} />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Post a Job</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below to publish a new job listing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* ── Job Info ── */}
          <Card>
            <SectionHeader
              icon={Briefcase}
              title="Job Info"
              subtitle="Basic details about the position"
            />
            <div className="flex flex-col gap-4">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <Label required>Job Title</Label>
                <Input
                  icon={Briefcase}
                  value={form.title}
                  onChange={set("title")}
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>

              {/* Category + Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label required>Category</Label>
                  <Select
                    icon={Tag}
                    value={form.category}
                    onChange={set("category")}
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label required>Job Type</Label>
                  <Select value={form.type} onChange={set("type")}>
                    <option value="" disabled>
                      Select type
                    </option>
                    {JOB_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Salary */}
              <div className="flex flex-col gap-1.5">
                <Label>Salary Range</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-gray-600">Min</span>
                    <Input
                      icon={CircleDollar}
                      type="number"
                      value={form.salaryMin}
                      onChange={set("salaryMin")}
                      placeholder="0"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-gray-600">Max</span>
                    <Input
                      icon={CircleDollar}
                      type="number"
                      value={form.salaryMax}
                      onChange={set("salaryMax")}
                      placeholder="0"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-gray-600">Currency</span>
                    <Select value={form.currency} onChange={set("currency")}>
                      {CURRENCIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label>Location</Label>
                  {/* Remote toggle */}
                  <button
                    type="button"
                    onClick={() => setIsRemote(!isRemote)}
                    className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors duration-150
                      ${
                        isRemote
                          ? "bg-[#6366F1]/10 border-[#6366F1]/40 text-[#818CF8]"
                          : "bg-white/5 border-white/10 text-gray-500 hover:text-gray-300"
                      }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Remote
                    <div
                      className={`w-7 h-4 rounded-full transition-colors duration-150 relative ${isRemote ? "bg-[#6366F1]" : "bg-white/10"}`}
                    >
                      <div
                        className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all duration-150 ${isRemote ? "left-3.5" : "left-0.5"}`}
                      />
                    </div>
                  </button>
                </div>
                {!isRemote && (
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      icon={MapPin}
                      value={form.city}
                      onChange={set("city")}
                      placeholder="City"
                    />
                    <Input
                      value={form.country}
                      onChange={set("country")}
                      placeholder="Country"
                    />
                  </div>
                )}
                {isRemote && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#6366F1]/5 border border-[#6366F1]/20 rounded-xl">
                    <Globe className="w-4 h-4 text-[#818CF8]" />
                    <span className="text-sm text-gray-400">
                      This is a fully remote position
                    </span>
                  </div>
                )}
              </div>

              {/* Deadline */}
              <div className="flex flex-col gap-1.5">
                <Label>Application Deadline</Label>
                <Input
                  icon={Calendar}
                  type="date"
                  value={form.deadline}
                  onChange={set("deadline")}
                />
              </div>
            </div>
          </Card>

          {/* ── Job Description ── */}
          <Card>
            <SectionHeader
              icon={Tag}
              title="Job Description"
              subtitle="Describe the role in detail"
            />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label required>Responsibilities</Label>
                <Textarea
                  rows={5}
                  value={form.responsibilities}
                  onChange={set("responsibilities")}
                  placeholder="• Lead development of key product features&#10;• Collaborate with cross-functional teams&#10;• Review and mentor junior developers"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label required>Requirements</Label>
                <Textarea
                  rows={5}
                  value={form.requirements}
                  onChange={set("requirements")}
                  placeholder="• 3+ years of experience in React&#10;• Strong understanding of REST APIs&#10;• Excellent communication skills"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>
                  Benefits{" "}
                  <span className="text-gray-600 font-normal">(optional)</span>
                </Label>
                <Textarea
                  rows={3}
                  value={form.benefits}
                  onChange={set("benefits")}
                  placeholder="• Health insurance&#10;• Flexible working hours&#10;• Annual performance bonus"
                />
              </div>
            </div>
          </Card>

          {/* ── Company ── */}
          <Card>
            <SectionHeader
              icon={OfficeBadge}
              title="Company"
              subtitle="Select the company you're posting this job for"
            />
            {companies && companies.length > 0 ? (
              <>
                <div className="relative">
                  <select
                    value={selectedCompanyId}
                    onChange={(e) => setSelectedCompanyId(e.target.value)}
                    className="w-full appearance-none bg-[#13151a] border border-white/10 hover:border-white/20 focus:border-[#6366F1] focus:outline-none text-white text-sm rounded-xl px-4 py-3 pr-10 transition-colors duration-150"
                  >
                    <option value="" disabled>
                      Select a company
                    </option>
                    {companies.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
                </div>
                {company && company.activeJobs >= company.jobLimit && (
                  <div className="mt-3 px-4 py-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl text-sm text-yellow-400 flex items-center gap-2">
                    <CircleInfoFill className="w-4 h-4 shrink-0" />
                    You've reached your plan's job limit ({
                      company.jobLimit
                    }{" "}
                    jobs). Upgrade to post more.
                  </div>
                )}
              </>
            ) : (
              <div className="px-4 py-4 bg-red-500/5 border border-red-500/20 rounded-xl text-sm text-red-400">
                No company registered.{" "}
                <a
                  href="/dashboard/recruiter/company"
                  className="underline hover:text-red-300"
                >
                  Set up your company
                </a>{" "}
                before posting jobs.
              </div>
            )}
          </Card>

          {/* ── Submit ── */}
          <div className="flex items-center justify-end gap-3 pb-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/8 transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                loading ||
                !selectedCompanyId ||
                company?.activeJobs >= company?.jobLimit
              }
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#6366F1] hover:bg-[#4F46E5] disabled:opacity-50 disabled:cursor-not-allowed text-white transition-colors duration-150 shadow-lg shadow-indigo-500/20"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              Publish Job
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
