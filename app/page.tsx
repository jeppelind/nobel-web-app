import { NobelPrizesResponse } from "./lib/types";
import Laureates from "./components/laureates";

async function fetchNobelPrizes() {
  try {
    const res = await fetch('http://api.nobelprize.org/2.1/nobelPrizes?limit=75&sort=desc&nobelPrizeCategory=eco', {
      next: {
        revalidate: 60 * 60,
      },
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data: NobelPrizesResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching Nobel prize data:', error);
    return null;
  }
}

export default async function Home() {
  const data = await fetchNobelPrizes();

  if (!data) {
    return (
      <main className="container mx-auto flex flex-col items-center">
        <div>There was a problem fetching the data.</div>
      </main>
    );
  }

  return (
    <main className="container mx-auto flex flex-col items-center gap-4 px-8 pb-12">
      <p className="text-2xl font-bold">Economic Sciences</p>
      <Laureates nobelPrizes={data.nobelPrizes} />
    </main>
  );
}
