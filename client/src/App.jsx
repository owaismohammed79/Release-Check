import { useState, useEffect } from 'react'
import ReleaseForm from './components/ReleaseForm'
import ReleaseItem from './components/ReleaseItem'

export default function App() {
  const [releases, setReleases] = useState([])

  useEffect(() => {
    fetchReleases()
  }, [])

  const fetchReleases = async () => {
    const res = await fetch("http://localhost:3000/api/releases")
    if (res.ok) {
      const data = await res.json()
      setReleases(data)
    }
  }

  const handleCreate = async (releaseData) => {
    const res = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(releaseData)
    });
    
    if (res.ok) {
      const newRelease = await res.json();
      setReleases(prevReleases => [...prevReleases, newRelease]);
    }
  };

  const handleUpdate = (updatedRelease) => {
    setReleases(releases.map(r => r.id === updatedRelease.id ? updatedRelease : r))
  }

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:3000/api/releases/${id}`, {
      method: 'DELETE'
    })
    
    if (res.ok) {
      setReleases(releases.filter(r => r.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Release Tracker
        </h1>
        
        <ReleaseForm onSubmit={handleCreate} />
        
        <div className="space-y-2">
          {releases.length === 0 ? (
            <div className="text-center p-8 bg-white rounded shadow-sm">
              <p className="text-gray-500">No releases found. Create one above!</p>
            </div>
          ) : (
            releases.map(release => (
              <ReleaseItem
                key={release.id}
                release={release}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}