import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio",
  description: "Content management",
};

function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

export default StudioLayout;
