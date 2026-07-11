"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

export default function MediaManager() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch('/api/media');
      if (res.ok) {
        const data = await res.json();
        setImages(data.images || []);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const loadImages = async () => {
      try {
        const res = await fetch('/api/media');
        if (res.ok) {
          const data = await res.json();
          if (active) setImages(data.images || []);
        }
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadImages();
    return () => { active = false; };
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result as string;
        // filename without spaces to avoid issues
        const filename = file.name.replace(/\s+/g, '-');

        const res = await fetch('/api/media', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filename, base64 }),
        });

        if (res.ok) {
          // Refresh images
          await fetchImages();
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        } else {
          alert('Failed to upload image');
        }
      };
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) return;

    try {
      const res = await fetch('/api/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      });

      if (res.ok) {
        // Remove from UI
        setImages(images.filter(img => !img.endsWith(filename)));
      } else {
        alert('Failed to delete image');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting image');
    }
  };

  // Helper to extract filename from path
  const getFilename = (path: string) => {
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Media Manager</h1>
        <div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleUpload}
            disabled={uploading}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading images...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-500 mb-4">No images found in public/uploads</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {images.map((img) => (
            <div key={img} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group">
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src={img}
                  alt={getFilename(img)}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleDelete(getFilename(img))}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="p-3 truncate text-sm text-gray-600" title={getFilename(img)}>
                {getFilename(img)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
