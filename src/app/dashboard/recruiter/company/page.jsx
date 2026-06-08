"use client";

import { useState } from "react";
import Image from "next/image";
import {
  OfficeBadge,
  Plus,
  Xmark,
  Globe,
  MapPin,
  ArrowUpFromSquare,
  ChevronDown,
  CircleCheckFill,
  CircleInfoFill,
  Link,
} from "@gravity-ui/icons";

// ── Toast ─────────────────────────────────────────────────────────────────────
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
      className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium max-w-sm
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

// ── Shared field components ────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <label className="text-sm font-medium text-gray-300">{children}</label>
  );
}

function Input({ icon: Icon, prefix, ...props }) {
  return (
    <div className="flex items-center bg-[#1a1d24] border border-white/10 hover:border-white/20 focus-within:border-[#6366F1] rounded-xl overflow-hidden transition-colors duration-150">
      {prefix && (
        <span className="px-3 text-xs text-gray-500 border-r border-white/10 bg-[#13151a] h-full flex items-center py-3 shrink-0">
          {prefix}
        </span>
      )}
      {Icon && !prefix && (
        <Icon className="ml-3 w-4 h-4 text-gray-600 shrink-0" />
      )}
      <input
        {...props}
        className="flex-1 bg-transparent text-white placeholder-gray-600 text-sm px-3 py-3 focus:outline-none"
      />
    </div>
  );
}

function Select({ children, ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className="w-full appearance-none bg-[#1a1d24] border border-white/10 hover:border-white/20 focus:border-[#6366F1] focus:outline-none text-white text-sm rounded-xl px-4 py-3 pr-10 transition-colors duration-150"
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
    </div>
  );
}

const INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Media & Entertainment",
  "Manufacturing",
  "Consulting",
  "Real Estate",
  "Logistics",
  "Legal",
  "Non-profit",
  "Other",
];

const EMPLOYEE_RANGES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1000+ employees",
];

// ── Register Modal ─────────────────────────────────────────────────────────────
function RegisterModal({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [form, setForm] = useState({
    name: "",
    industry: "Technology",
    website: "",
    location: "",
    employeeRange: "1-10 employees",
    description: "",
    logoUrl: "",
  });

  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (field === "logoUrl") setLogoError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.industry || !form.location) {
      alert("Please fill in all required fields.");
      return;
    }
    // TODO: wire up to backend later
    console.log(form);
    onSuccess(form);
  };

  const logoPreview = form.logoUrl && !logoError ? form.logoUrl : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg bg-[#0d0f13] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-white/8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                Register New Company
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter your business details to start hiring on HireLoop.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors mt-0.5"
            >
              <Xmark className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1">
          <div className="px-6 py-5 flex flex-col gap-4">
            {/* Name + Industry */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Company Name</Label>
                <Input
                  value={form.name}
                  onChange={set("name")}
                  placeholder="e.g. Acme Corp"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Industry / Category</Label>
                <Select value={form.industry} onChange={set("industry")}>
                  {INDUSTRIES.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* Website + Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Website URL</Label>
                <Input
                  prefix="https://"
                  value={form.website}
                  onChange={set("website")}
                  placeholder="www.company.com"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Location</Label>
                <Input
                  icon={MapPin}
                  value={form.location}
                  onChange={set("location")}
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Employee count + Logo URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <Label>Employee Count Range</Label>
                <Select
                  value={form.employeeRange}
                  onChange={set("employeeRange")}
                >
                  {EMPLOYEE_RANGES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Company Logo</Label>
                <div className="flex items-center gap-2">
                  {/* Preview */}
                  <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-full h-full object-cover"
                        onError={() => setLogoError(true)}
                      />
                    ) : (
                      <Link className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <Input
                    className="flex-1"
                    value={form.logoUrl}
                    onChange={set("logoUrl")}
                    placeholder="https://logo.url/image.png"
                  />
                </div>
                {logoError && (
                  <p className="text-xs text-red-400 mt-0.5">
                    Couldn't load image — check the URL.
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <Label>Brief Description</Label>
              <textarea
                rows={4}
                value={form.description}
                onChange={set("description")}
                placeholder="Tell us about your company's mission and culture..."
                className="w-full bg-[#1a1d24] border border-white/10 hover:border-white/20 focus:border-[#6366F1] focus:outline-none text-white placeholder-gray-600 text-sm rounded-xl px-4 py-3 transition-colors duration-150 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/8 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/8 transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-white hover:bg-gray-100 text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              )}
              Register Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Company Card ──────────────────────────────────────────────────────────────
function CompanyCard({ company }) {
  const statusStyles = {
    approved: "text-green-400 bg-green-400/10 border-green-400/20",
    pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    rejected: "text-red-400 bg-red-400/10 border-red-400/20",
  };
  const status = company.approved
    ? "approved"
    : company.rejected
      ? "rejected"
      : "pending";
  const statusLabel = {
    approved: "Approved",
    pending: "Pending Review",
    rejected: "Rejected",
  }[status];

  return (
    <div className="bg-[#0d0f13] border border-white/8 rounded-2xl p-5 flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center shrink-0 overflow-hidden">
        {company.logoUrl ? (
          <img
            src={company.logoUrl}
            alt={company.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <OfficeBadge className="w-5 h-5 text-[#818CF8]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-semibold text-white">{company.name}</h3>
          <span
            className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${statusStyles[status]}`}
          >
            {statusLabel}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">
          {company.industry} · {company.location}
        </p>
        {company.website && (
          <a
            href={`https://${company.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[#818CF8] hover:text-[#a5b4fc] mt-1 transition-colors"
          >
            <Globe className="w-3 h-3" />
            {company.website}
          </a>
        )}
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs text-gray-500">{company.plan ?? "Free"} plan</p>
        <p className="text-xs text-gray-600 mt-0.5">
          {company.activeJobs ?? 0} / {company.jobLimit ?? 3} jobs
        </p>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CompanyPage({ initialCompanies = [] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [companies, setCompanies] = useState(initialCompanies);
  const { toast, show } = useToast();

  const handleSuccess = (newCompany) => {
    setModalOpen(false);
    setCompanies((prev) => [
      ...prev,
      { ...newCompany, approved: false, rejected: false },
    ]);
    show("Company registered! It will be reviewed shortly.", "success");
  };

  return (
    <>
      <Toast toast={toast} />
      {modalOpen && (
        <RegisterModal
          onClose={() => setModalOpen(false)}
          onSuccess={handleSuccess}
        />
      )}

      <div className="px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">My Companies</h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage your registered companies and their verification states.
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center gap-2 sm:shrink-0 w-full sm:w-auto px-5 py-2.5 rounded-2xl text-sm font-semibold bg-white hover:bg-gray-100 text-black transition-colors duration-150"
          >
            <Plus className="w-4 h-4" />
            Register a company
          </button>
        </div>

        {/* Company list */}
        {companies.length > 0 ? (
          <div className="flex flex-col gap-3">
            {companies.map((c, i) => (
              <CompanyCard key={c._id ?? i} company={c} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center mb-4">
              <OfficeBadge className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="text-base font-semibold text-white mb-1">
              No companies yet
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mb-6">
              Register your company to start posting jobs and finding great
              candidates.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
