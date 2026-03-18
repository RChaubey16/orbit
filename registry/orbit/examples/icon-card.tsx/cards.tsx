import { Orbit } from "lucide-react";

import { IconCard } from "../../items/icon-card/icon-card";

const CardDefault = () => {
  return (
    <IconCard
      icon={<Orbit />}
      title="Professional services."
      description="Get tailored guidance from Stripe on implementation, complex integrations, or major migrations."
      ctaTitle="Contact sales"
      ctaLink="#"
    />
  );
};

const CardSurface = () => {
  return (
    <IconCard
      icon={<Orbit />}
      title="Professional services."
      description="Get tailored guidance from Stripe on implementation, complex integrations, or major migrations."
      ctaTitle="Contact sales"
      ctaLink="#"
      variant="surface"
      color="#758bfd"
    />
  );
};

export { CardDefault, CardSurface };
