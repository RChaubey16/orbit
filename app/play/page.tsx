import { TestimonialCard } from "@/registry/orbit/items/testimonial-card/testimonial-card";

export default function Play() {
  return (
    <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center gap-4">
      <TestimonialCard
        avatar="https://github.com/shadcn.png"
        name="Shadcn"
        designation="SWE @ Vercel"
        quote="Lorem ipsum dolor sit amet consectetur adiicing elit. Quisquam, quod."
      />
      <TestimonialCard
        avatar="https://github.com/shadcn.png"
        name="Shadcn"
        designation="SWE @ Vercel"
        quote="Lorem ipsum dolor sit amet consectetur adiicing elit. Quisquam, quod."
        variant="inset"
      />
    </div>
  );
}
