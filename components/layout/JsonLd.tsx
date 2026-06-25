import { personSchema, websiteSchema } from "@/lib/seo";
import type { Profile } from "@/types";

export function JsonLd({ profile }: { profile: Profile }) {
  const schemas = [personSchema(profile), websiteSchema()];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />;
}
