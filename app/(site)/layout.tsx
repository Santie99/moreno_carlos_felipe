import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/layout/JsonLd";
import { Navbar } from "@/components/layout/Navbar";
import { getProfile, getSiteSettings } from "@/lib/data";

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [profile, settings] = await Promise.all([getProfile(), getSiteSettings()]);

  return (
    <>
      <JsonLd profile={profile} />
      <Navbar profileName={profile.name} showNotes={settings.notesEnabled} />
      <main>{children}</main>
      <Footer profile={profile} />
    </>
  );
}
