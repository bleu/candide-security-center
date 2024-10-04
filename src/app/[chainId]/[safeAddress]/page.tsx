"use client";
import { useHandleGuardian } from "@/hooks/useGuardians";
import { useEffect, useState } from "react";

export default function Page() {
  const { checkIsGuardian, addGuardian, listGuardians } = useHandleGuardian();
  const [guardians, setGuardians] = useState<string[]>([]);

  useEffect(() => {
    listGuardians().then((listedGuardian) => setGuardians(listedGuardian));
  }, [listGuardians]);

  const [guardianInput, setGuardianInput] = useState("");

  const handleVerifyGuardian = async () => {
    console.log(`Verifying guardian: ${guardianInput}`);
    await checkIsGuardian({ guardianAddress: guardianInput });
  };

  const handleAddGuardian = async () => {
    console.log(`Adding guardian: ${guardianInput}`);
    await addGuardian({ guardianAddress: guardianInput });
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold">Guardians</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <span className="text-lg font-semibold text-gray-700">
          Here is a list of your guardians:
        </span>
        <ul className="mt-4 list-disc list-inside text-gray-600">
          {guardians.map((guardian) => (
            <li key={guardian} className="py-2 border-b last:border-none">
              {guardian}
            </li>
          ))}
        </ul>
      </div>

      <input
        type="text"
        className="border border-gray-300 p-2 rounded w-full"
        placeholder="Enter Guardian Address"
        value={guardianInput}
        onChange={(e) => setGuardianInput(e.target.value)}
      />

      <button
        type="button"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleVerifyGuardian}
      >
        Verify if User is Guardian
      </button>

      <button
        type="button"
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddGuardian}
      >
        Add Guardian
      </button>
    </div>
  );
}
