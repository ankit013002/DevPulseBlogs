// app/settings/page.jsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SettingsPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const res = await fetch("/api/user/me");
      if (res.ok) {
        const user = await res.json();
        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setBio(user.bio || "");
        setPreviewUrl(user.profilePicture || "");
      }
    }
    loadSettings();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("bio", bio);
    if (selectedFile) {
      form.append("profilePicture", selectedFile);
    }

    const res = await fetch("/api/user/update", {
      method: "PUT",
      body: form,
    });

    setLoading(false);
    if (res.ok) {
      alert("Settings saved successfully");
    } else {
      alert("Failed to save settings");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }
    setDeleting(true);
    const res = await fetch("/api/user/delete", {
      method: "DELETE",
    });
    setDeleting(false);

    if (res.ok) {
      alert("Your account has been deleted.");
      router.push("/");
    } else {
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-[var(--color-font)]">
        Settings
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-[var(--color-font)]">
            Profile Picture
          </label>
          {previewUrl && (
            <Image
              src={previewUrl}
              alt="Preview"
              width={100}
              height={100}
              className="rounded-full mb-2"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full border border-border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-[var(--color-font)]">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="block w-full border border-border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-[var(--color-font)]">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="block w-full border border-border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-[var(--color-font)]">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="block w-full border border-border rounded-md p-2"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-hover disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
          <button
            type="button"
            onClick={handleDeleteAccount}
            disabled={deleting}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </form>
    </div>
  );
}
