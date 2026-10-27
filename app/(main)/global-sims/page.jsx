import { HowEsimWorks } from "./_components/HowEsimWorks";
import { PopularSimChoices } from "./_components/PopularSimChoices";
import { transatelService } from "@/lib/transatel";

export const revalidate = 3600; // Cache for 1 hour with ISR

export default async function Page() {
  let initialData = null;
  try {
    initialData = await transatelService.getCatalogGrouped();
  } catch (err) {
    console.error("Failed to prefetch Transatel catalog on server:", err);
  }

  return (
    <>
      <PopularSimChoices initialData={initialData} />
      <HowEsimWorks />
    </>
  );
}
