"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SettingsPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previewUrlRef = useRef<string>("");

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (previewUrlRef.current.startsWith("blob:")) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  useEffect(() => {
    async function loadSettings() {
      const res = await fetch("/api/user/me");
      if (res.ok) {
        const user = await res.json();
        setFirstName(user.firstName ?? "");
        setLastName(user.lastName ?? "");
        setBio(user.bio ?? "");
        setPreviewUrl(user.profilePicture ?? "");
      }
    }
    loadSettings();
  }, []);

  const showToast = (type: "success" | "error", message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ type, message });
    toastTimerRef.current = setTimeout(() => setToast(null), 4000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrlRef.current.startsWith("blob:")) URL.revokeObjectURL(previewUrlRef.current);
      const objectUrl = URL.createObjectURL(file);
      previewUrlRef.current = objectUrl;
      setSelectedFile(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("bio", bio);
    if (selectedFile) {
      form.append("profilePicture", selectedFile);
    }

    const res = await fetch("/api/user/update", { method: "PUT", body: form });
    setLoading(false);
    if (res.ok) {
      showToast("success", "Settings saved successfully.");
    } else {
      showToast("error", "Failed to save settings. Please try again.");
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    const res = await fetch("/api/user/delete", { method: "DELETE" });
    setDeleting(false);
    if (res.ok) {
      router.push("/");
    } else {
      showToast("error", "Failed to delete account. Please try again.");
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {/* Toast */}
      {toast && (
        <div
          role="alert"
          className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all ${
            toast.type === "success"
              ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950/40 dark:border-green-800 dark:text-green-300"
              : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/40 dark:border-red-800 dark:text-red-300"
          }`}
        >
          {toast.type === "success" ? (
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {toast.message}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 text-[var(--color-font)]">Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile picture card */}
        <div className="bg-base-100 border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-[var(--color-font)] mb-4">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 shrink-0">
              <Image
                src={previewUrl || "/default_pfp.png"}
                alt="Profile preview"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-border"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="profilePicture"
                className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl border border-border bg-base-200 hover:bg-accent text-sm font-medium text-[var(--color-font)] transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Choose image
              </label>
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="mt-2 text-xs text-muted-foreground">JPG, PNG, or GIF · Max 5 MB</p>
            </div>
          </div>
        </div>

        {/* Personal info card */}
        <div className="bg-base-100 border border-border rounded-2xl p-6 space-y-5">
          <h2 className="text-lg font-semibold text-[var(--color-font)]">Personal Info</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[var(--color-font)] mb-1.5">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-base-200 text-[var(--color-font)] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[var(--color-font)] mb-1.5">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-base-200 text-[var(--color-font)] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              />
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-[var(--color-font)] mb-1.5">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              maxLength={300}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-base-200 text-[var(--color-font)] placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition resize-none"
              placeholder="Tell the community a bit about yourself..."
            />
            <p className="mt-1 text-xs text-muted-foreground text-right">{bio.length}/300</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary border-0 rounded-xl px-8 font-semibold disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Saving…
              </span>
            ) : (
              "Save Settings"
            )}
          </button>
        </div>
      </form>

      {/* Danger zone */}
      <div className="mt-12 bg-base-100 border border-red-200 dark:border-red-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Danger Zone</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Once you delete your account, all your articles and data will be permanently removed. This action cannot be undone.
        </p>
        {!showDeleteConfirm ? (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="btn btn-sm rounded-xl border border-red-300 bg-transparent text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium"
          >
            Delete Account
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--color-font)]">Are you absolutely sure?</span>
            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="btn btn-sm rounded-xl bg-red-600 hover:bg-red-700 text-white border-0 font-medium disabled:opacity-50"
            >
              {deleting ? "Deleting…" : "Yes, delete"}
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="btn btn-sm rounded-xl border border-border bg-transparent text-[var(--color-font)]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
