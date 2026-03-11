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

export async function FloatingDock() {
  const { data: navItems } = await sanityFetch({ query: NAVIGATION_QUERY });

  if (!navItems || navItems.length === 0) {
    return null;
  }

  const filteredNavItems = navItems.filter((item) => {
    const hiddenHrefs = new Set([
      "#services",
      "#certifications",
      "#testimonials",
      "#achievements",
      "#blog",
    ]);
    return !hiddenHrefs.has(item.href);
  });

  if (filteredNavItems.length === 0) {
    return null;
  }

  return <FloatingDockClient navItems={filteredNavItems} />;
}
