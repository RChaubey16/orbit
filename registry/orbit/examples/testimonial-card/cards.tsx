import { TestimonialCard } from "../../items/testimonial-card/testimonial-card";

const CardDefault = () => {
  return (
    <TestimonialCard
      avatar="https://github.com/shadcn.png"
      name="Shadcn"
      designation="SWE @ Vercel"
      quote="Lorem ipsum dolor sit amet consectetur adipiscing elit."
    />
  );
};

const CardElevated = () => {
  return (
    <TestimonialCard
      avatar="https://github.com/shadcn.png"
      name="Shadcn"
      designation="SWE @ Vercel"
      quote="Lorem ipsum dolor sit amet consectetur adipiscing elit."
      variant="elevated"
    />
  );
};

const CardInset = () => {
  return (
    <TestimonialCard
      avatar="https://github.com/shadcn.png"
      name="Shadcn"
      designation="SWE @ Vercel"
      quote="Lorem ipsum dolor sit amet consectetur adipiscing elit."
      variant="inset"
    />
  );
};

export { CardDefault, CardElevated, CardInset };
