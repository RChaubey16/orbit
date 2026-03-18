import { Orbit } from "lucide-react";

import { IconCard } from "@/registry/orbit/items/icon-card/icon-card";

export default function Play() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center">
      <IconCard
        icon={<Orbit />}
        title="Professional services."
        description="Get tailored guidance from Stripe on implementation, complex integrations, or major migrations."
        ctaTitle="Contact sales"
        ctaLink="#"
      />
      <IconCard
        icon={<Orbit />}
        title="Professional services."
        description="Get tailored guidance from Stripe on implementation, complex integrations, or major migrations."
        ctaTitle="Contact sales"
        ctaLink="#"
        variant="surface"
        color="#758bfd"
      />
    </div>
  );
}
