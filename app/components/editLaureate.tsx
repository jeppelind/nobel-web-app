import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react";
import { useState, useEffect } from "react";

export default function EditLaureate(
  { isDialogOpen, setIsDialogOpen, handleDialogSubmit, laureateData }:
  { isDialogOpen: boolean, setIsDialogOpen: (isDialogOpen: boolean) => void, handleDialogSubmit: ({ year, id, name, motivation }: { year: number, id: string, name: string, motivation: string }) => void, laureateData: { year: number, id: string, name: string, motivation: string } }
) {
  const [newName, setNewName] = useState('');
  const [newMotivation, setNewMotivation] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setNewName(laureateData.name);
    setNewMotivation(laureateData.motivation);
  }, [laureateData]);

  const handleSubmit = () => {
    if (!newName || !newMotivation) {
      setError('Name and motivation are required');
      return;
    }
    setIsDialogOpen(false);
    handleDialogSubmit({ year: laureateData.year, id: laureateData.id, name: newName, motivation: newMotivation });
  }

  return (
    <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Edit Laureate
                  </DialogTitle>
                  <div className="mt-2 flex flex-col gap-2 flex-grow">
                    <input
                      type="text"
                      name="name"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Name"
                      className="w-full rounded-md border-2 border-gray-300 p-2"
                    />
                    <input
                      type="text"
                      name="motivation"
                      value={newMotivation}
                      onChange={(e) => setNewMotivation(e.target.value)}
                      placeholder="Motivation"
                      className="w-full rounded-md border-2 border-gray-300 p-2"
                    />
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
            
            <div className="px-4 py-3 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleSubmit}
                className="inline-flex w-full justify-center rounded-md bg-amber-600 px-3 py-2 font-bold text-white shadow-sm hover:bg-amber-500 sm:ml-3 sm:w-auto"
              >
                Submit
              </button>
              <button
                onClick={() => setIsDialogOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 font-bold text-white shadow-sm hover:bg-gray-400 sm:ml-3 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}