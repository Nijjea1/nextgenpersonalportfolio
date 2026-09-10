import PortfolioContent from "@/components/PortfolioContent";

// Regenerate the page at most every 60s so Sanity content edits (new projects,
// experience, etc.) appear on the live site without a manual redeploy.
export const revalidate = 60;

export default async function Home() {
  return (
    <main className="min-h-screen">
      <PortfolioContent />
    </main>
  );
}
