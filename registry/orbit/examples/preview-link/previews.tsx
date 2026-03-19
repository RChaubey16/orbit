import { PreviewLink } from "../../items/preview-link/preview-link";

const PreviewLinkTailwind = () => {
  return (
    <PreviewLink url="https://tailwindcss.com" className="text-xl font-bold" useScreenshot>
      Tailwind CSS
    </PreviewLink>
  );
};

export { PreviewLinkTailwind };
