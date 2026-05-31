import { useState } from 'react';

export default function ReleaseForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !releaseDate) return;

    setIsSubmitting(true);

    await onSubmit({
      name,
      release_date: new Date(releaseDate).toISOString(),
      additional_info: additionalInfo
    });

    setName('');
    setReleaseDate('');
    setAdditionalInfo('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded p-4 mb-6 bg-gray-50 shadow-sm">
      <h3 className="text-lg font-bold mb-4">Create New Release</h3>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block mb-1 font-medium text-sm">Release Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2"
            disabled={isSubmitting}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Due Date</label>
          <input
            type="datetime-local"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="w-full border rounded p-2"
            disabled={isSubmitting}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Additional Info (Optional)</label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="w-full border rounded p-2"
            rows="2"
            disabled={isSubmitting}
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`py-2 rounded font-medium text-white ${
            isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Create Release'}
        </button>
      </div>
    </form>
  );
}