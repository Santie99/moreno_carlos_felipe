"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProfileForm } from "@/components/admin/ProfileForm";
import type { Profile } from "@/types";

export function ProfileAdminClient() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/profile")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "No se pudo cargar el perfil.");
        setProfile(data.profile);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <AdminPageHeader title="Perfil" description="Edita la información pública central de tu perfil: nombre, headline, foto, biografías y links." />
      {loading ? <div className="glass-card rounded-3xl p-8 text-slate-300">Cargando perfil...</div> : null}
      {error ? <div className="glass-card rounded-3xl p-8 text-red-100">{error}</div> : null}
      {profile ? <ProfileForm profile={profile} /> : null}
    </>
  );
}
