import { Earth, Star } from "lucide-react";

import RotatingTabs from "../../items/rotating-tabs/rotating-tabs";

const IconTabs = () => {
  const notifications = [
    {
      id: 1,
      icon: {
        src: "/vercel.svg",
        alt: "Vercel logo",
      },
      message: "Vercel has shipped a new feature",
      cta: "Explore",
    },
    {
      id: 2,
      icon: <Star className="h-5 w-5" />,
      message: "Your deployment is ready to preview",
      cta: "View deploy",
    },
    {
      id: 3,
      icon: <Earth className="h-5 w-5" />,
      message: "Domain verification successful",
      cta: "Go to settings",
    },
  ];
  return <RotatingTabs notifications={notifications} />;
};

export { IconTabs };
