import PortfolioContent from "@/components/PortfolioContent";

// Render fresh on every request so Sanity content edits (projects, experience,
// images, etc.) appear on the live site immediately, with no redeploy needed.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  return (
    <main className="min-h-screen">
      <PortfolioContent />
    </main>
  );
}
