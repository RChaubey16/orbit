import { ImageCard } from "@/registry/orbit/items/image-card/image-card";

export default function Play() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center gap-4">
      <ImageCard
        title="Professional services"
        description="Get tailored guidance from Stripe on implementation, complex integrations, or major migrations."
        imageSrc="https://images.unsplash.com/photo-1772289934600-cb4ddd71dbd8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageAltText="Hero image"
        cardLink="#"
        subTitle="Ruturaj Chaubey | January 20, 2026"
      />
      <ImageCard
        title="Snipr"
        description="Snipr is a screen recording and video editing tool. Snipr is a screen recording and video editing tool."
        imageSrc="https://images.unsplash.com/photo-1772289934600-cb4ddd71dbd8?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        imageAltText="Hero image"
        cardLink="#"
        subTitle="Ruturaj Chaubey | January 20, 2026"
        variant="background"
      />
    </div>
  );
}
