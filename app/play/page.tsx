import { PreviewLink } from "@/registry/orbit/items/preview-link/preview-link";

export default function Play() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center gap-4">
      <PreviewLink url="https://tailwindcss.com" className="text-xl font-bold" useScreenshot>
        Tailwind CSS
      </PreviewLink>
      <PreviewLink url="https://github.com/RChaubey16" className="text-xl font-bold" useScreenshot>
        GitHub
      </PreviewLink>
      <PreviewLink imageSrc="/images/nyc.jpg" className="text-xl font-bold">
        New York City
      </PreviewLink>
    </div>
  );
}
