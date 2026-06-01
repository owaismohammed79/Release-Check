import { useState } from "react";

const RELEASE_STEPS = [
  { id: 1, label: "All relevant Github pull requests have been merged" },
  { id: 2, label: "CHANGELOG files have been updated" },
  { id: 3, label: "All tests are passing" },
  { id: 4, label: "Releases in github created" },
  { id: 5, label: "Deployed in demo" },
  { id: 6, label: "Tested thoroughly in demo" },
  { id: 7, label: "Deploy to production" },
];

export default function ReleaseItem({ release, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [infoText, setInfoText] = useState(release.additionalInfo || "");

  const handleStepChange = async (stepId) => {
    const isChecked = release.completedSteps.includes(stepId);
    const newSteps = isChecked
      ? release.completedSteps.filter((id) => id !== stepId)
      : [...release.completedSteps, stepId];

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/releases/${release.id}/steps`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed_steps: newSteps }),
      },
    );

    if (res.ok) {
      const updatedRelease = await res.json();
      onUpdate(updatedRelease);
    }
  };

  const handleInfoSave = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/releases/${release.id}/info`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ additional_info: infoText }),
      },
    );

    if (res.ok) {
      const updatedRelease = await res.json();
      onUpdate(updatedRelease);
      setIsEditing(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "done") return "bg-green-100 text-green-800";
    if (status === "ongoing") return "bg-yellow-100 text-yellow-800";
    return "bg-gray-200 text-gray-800";
  };

  return (
    <div className="border rounded p-5 mb-4 shadow-sm bg-white">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-xl font-bold">{release.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            Due: {new Date(release.releaseDate).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(release.status)}`}
          >
            {release.status}
          </span>
          <button
            onClick={() => onDelete(release.id)}
            className="text-red-500 hover:text-red-700 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3 border-b pb-2">Checklist Steps</h4>
        <div className="space-y-2">
          {RELEASE_STEPS.map((step) => {
            const isCompleted = release.completedSteps.includes(step.id);
            return (
              <label
                key={step.id}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => handleStepChange(step.id)}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <span
                  className={
                    isCompleted ? "line-through text-gray-400" : "text-gray-800"
                  }
                >
                  {step.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2 flex justify-between items-center border-b pb-2">
          Additional Info
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-600 font-medium"
            >
              Edit Info
            </button>
          )}
        </h4>
        {isEditing ? (
          <div className="flex flex-col gap-2 mt-2">
            <textarea
              value={infoText}
              onChange={(e) => setInfoText(e.target.value)}
              className="w-full border rounded p-2 text-sm"
              rows="3"
            />
            <div className="flex gap-2">
              <button
                onClick={handleInfoSave}
                className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setInfoText(release.additionalInfo || "");
                }}
                className="bg-gray-200 text-gray-800 px-4 py-1.5 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-sm whitespace-pre-wrap mt-2">
            {release.additionalInfo || "No additional information provided."}
          </p>
        )}
      </div>
    </div>
  );
}
