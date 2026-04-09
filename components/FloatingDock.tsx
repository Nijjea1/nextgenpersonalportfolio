import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { FloatingDockClient } from "./FloatingDockClient";

const NAVIGATION_QUERY =
  defineQuery(`*[_type == "navigation"] | order(order asc){
  title,
  href,
  icon,
  isExternal
}`);

const RESUME_NAV_ITEM = {
  title: "Resume",
  href: "/resume.pdf",
  icon: "IconFileTypePdf",
  isExternal: true,
  prominent: true,
} as const;

export async function FloatingDock() {
  const { data: navItems } = await sanityFetch({ query: NAVIGATION_QUERY });

  if (!navItems || navItems.length === 0) {
    return <FloatingDockClient navItems={[RESUME_NAV_ITEM]} />;
  }

  const filteredNavItems = navItems.filter((item) => {
    const hiddenHrefs = new Set([
      "#services",
      "#certifications",
      "#testimonials",
      "#achievements",
      "#blog",
    ]);
    if (!item.href) return false;
    return !hiddenHrefs.has(item.href);
  });

  const dockItems =
    filteredNavItems.length === 0
      ? [RESUME_NAV_ITEM]
      : [RESUME_NAV_ITEM, ...filteredNavItems];

  return <FloatingDockClient navItems={dockItems} />;
}
