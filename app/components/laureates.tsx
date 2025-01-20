'use client'

import { useEffect, useState } from "react";
import { NobelPrize, NobelPrizeLaureate } from "../lib/types";
import CreateLaureate from "./createLaureate";
import EditLaureate from "./editLaureate";

export default function Laureates({ nobelPrizes }: { nobelPrizes: NobelPrize[] }) {
  const [customNobelPrizes, setCustomNobelPrizes] = useState<NobelPrize[]>([]);
  const [combinedNobelPrizes, setCombinedNobelPrizes] = useState(nobelPrizes);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLaureate, setSelectedLaureate] = useState<{ year: number, id: string, name: string, motivation: string }>({ year: 0, id: '', name: '', motivation: '' });

  const handleAddCustomLaureate = ({ year, name, motivation }: { year: number, name: string, motivation: string }) => {
    const newLaureate = { 
      awardYear: year.toString(),
      category: { en: 'Economics', se: 'Ekonomi' },
      laureates: [{
        id: Date.now().toString(),
        knownName: { en: name },
        motivation: { en: motivation }
      }]
    };
    const cutomPrizesCopy = [...customNobelPrizes];
    const existingYearIdx = cutomPrizesCopy.findIndex(customPrize => customPrize.awardYear === year.toString());
      if (existingYearIdx === -1) {
        setCustomNobelPrizes([...customNobelPrizes, newLaureate]); // Add new year
      } else {
        cutomPrizesCopy[existingYearIdx].laureates.push(newLaureate.laureates[0]); // Add new laureate to existing year
        setCustomNobelPrizes([...cutomPrizesCopy]);
      }
  }
  
  const handleEditLaureate = ({ year, id, name, motivation }: { year: number, id: string, name: string, motivation: string }) => {
    const cutomPrizesCopy = [...customNobelPrizes];
    const existingYearIdx = cutomPrizesCopy.findIndex(customPrize => {
      console.log(customPrize.awardYear, year.toString(), customPrize.awardYear === year.toString());
      return customPrize.awardYear === year.toString();
    });
    if (existingYearIdx === -1) {
      const newLaureate = { 
        awardYear: year.toString(),
        category: { en: 'Economics', se: 'Ekonomi' },
        laureates: [{
          id: id,
          knownName: { en: name },
          motivation: { en: motivation }
        }]
      };
      setCustomNobelPrizes([...customNobelPrizes, newLaureate]); // Add new year
    } else {
      const laureate = cutomPrizesCopy[existingYearIdx].laureates.find(laureate => laureate.id === id);
      if (laureate) {
        laureate.knownName.en = name;
        laureate.motivation.en = motivation;
        setCustomNobelPrizes([...cutomPrizesCopy]);
      }
    }
  }

  useEffect(() => {
    setCombinedNobelPrizes(current => {
      const existingYears = current.map(prize => {
        const customDataForYear = customNobelPrizes.find(customPrize => customPrize.awardYear === prize.awardYear);
        if (!customDataForYear) { // No custom data for this year, return it unchanged
          return { ...prize };
        }

        // Update existing laureates with custom data
        const updatedLaureates = prize.laureates.map(laureate => {
          const customizedLaureate = customDataForYear.laureates.find(customLaureate => customLaureate.id === laureate.id);
          if (customizedLaureate) {
            return { ...laureate,...customizedLaureate };
          }
          return laureate;
        });

        // Add custom laureates that don't map to existing data
        const addedLaureates = customDataForYear.laureates.filter(customLaureate => !prize.laureates.some(laureate => laureate.id === customLaureate.id));

        return { ...prize, laureates: [...updatedLaureates, ...addedLaureates] };
      });

      // Add custom years that don't map to existing data
      const addedYears = customNobelPrizes.filter(customPrize => !existingYears.some(prize => prize.awardYear === customPrize.awardYear));

      return [...addedYears, ...existingYears];
    });
  }, [nobelPrizes, customNobelPrizes]);

  return (
      <div className="flex flex-col gap-6">
        <CreateLaureate isDialogOpen={isAddDialogOpen} setIsDialogOpen={setIsAddDialogOpen} handleDialogSubmit={handleAddCustomLaureate} />
        <EditLaureate isDialogOpen={isEditDialogOpen} setIsDialogOpen={setIsEditDialogOpen} handleDialogSubmit={handleEditLaureate} laureateData={selectedLaureate} />
        <button onClick={() => setIsAddDialogOpen(true)} className="font-bold bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-md w-fit self-center">Create Custom Laureate</button>
        <div className="flex flex-col gap-2 md:max-w-2xl">
          {
            combinedNobelPrizes.map((prize: NobelPrize) => (
              <div key={prize.awardYear}>
                <h2 className="text-xl font-semibold text-amber-700 mt-4">{prize.awardYear}</h2>
                <div className="flex flex-col gap-2">
                  {
                    prize.laureates.map((laureate: NobelPrizeLaureate) => (
                      <div key={laureate.id}>
                        <div className="group flex flex-row justify-between gap-2">
                          <p className="text-lg font-semibold">{laureate.knownName.en}</p>
                          <button
                            onClick={() => {
                              setSelectedLaureate({ year: Number(prize.awardYear), id: laureate.id, name: laureate.knownName.en, motivation: laureate.motivation.en });
                              setIsEditDialogOpen(true);
                            }}
                            className="font-bold text-xs text-slate-500 hover:bg-amber-500 hover:text-white px-4 py-1 rounded-md"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="text-sm md:text-base italic text-slate-600">“{laureate.motivation.en}”</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}
