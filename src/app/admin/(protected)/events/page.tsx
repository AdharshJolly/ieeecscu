"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import ConfirmModal from "@/components/ConfirmModal";

// Import CSS for Markdown Editor
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

// Dynamically load the editor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function AdminEvents() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "", type: "Hackathon", date: "", description: "", link: "", imageUrl: "", location: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Custom Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    const res = await fetch("/api/events");
    if (res.ok) {
      setEvents(await res.json());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openModal = (event: any = null) => {
    if (event) {
      setEditingId(event._id);
      
      let formattedDate = "";
      try {
        const parsedDate = new Date(event.date);
        if (!isNaN(parsedDate.getTime())) {
          formattedDate = parsedDate.toISOString().split('T')[0];
        }
      } catch (e) {
        console.warn("Invalid date format in database:", event.date);
      }

      setFormData({
        title: event.title,
        type: event.type,
        date: formattedDate,
        description: event.description || "",
        link: event.link || "",
        imageUrl: event.imageUrl || "",
        location: event.location || ""
      });
      setImagePreview(event.imageUrl || null);
    } else {
      setEditingId(null);
      setFormData({ title: "", type: "Hackathon", date: "", description: "", link: "", imageUrl: "", location: "" });
      setImagePreview(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description) {
      toast.error("Description cannot be empty!");
      return;
    }
    setUploading(true);

    let finalImageUrl = formData.imageUrl;

    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData
      });
      if (uploadRes.ok) {
        const result = await uploadRes.json();
        finalImageUrl = result.url;
      } else {
        toast.error("Image upload failed");
        setUploading(false);
        return;
      }
    }

    const url = editingId ? `/api/events/${editingId}` : "/api/events";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, imageUrl: finalImageUrl }),
    });

    setUploading(false);

    if (res.ok) {
      toast.success(`Event ${editingId ? "updated" : "created"} successfully!`);
      setIsModalOpen(false);
      fetchEvents();
      router.refresh();
    } else {
      toast.error("Error saving event");
    }
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    const res = await fetch(`/api/events/${itemToDelete}`, { method: "DELETE" });
    setIsDeleting(false);
    setDeleteModalOpen(false);
    setItemToDelete(null);

    if (res.ok) {
      toast.success("Event deleted successfully!");
      fetchEvents();
      router.refresh();
    } else {
      toast.error("Failed to delete event.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Events</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage hackathons, conferences, and workshops.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-ieee-primary hover:bg-ieee-secondary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-ieee-primary/30 transition-all flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Event
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div></td>
                    <td className="px-6 py-4 text-right"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16 ml-auto"></div></td>
                  </tr>
                ))
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-16 text-center">
                    <div className="w-20 h-20 mx-auto bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No events found</h3>
                    <p className="text-slate-500 dark:text-slate-400">Click the "New Event" button to create your first event.</p>
                  </td>
                </tr>
              ) : events.map(event => (
                <tr key={event._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{event.title}</td>
                  <td className="px-6 py-4">
                    <span className="bg-ieee-primary/10 text-ieee-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                      {event.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => openModal(event)} className="text-ieee-primary hover:text-ieee-secondary font-semibold transition-colors">Edit</button>
                    <button onClick={() => handleDeleteClick(event._id)} className="text-red-500 hover:text-red-600 font-semibold transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[90vh] my-8 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700 flex-shrink-0">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{editingId ? 'Edit Event' : 'Create Event'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors bg-slate-100 dark:bg-slate-700 p-2 rounded-full">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-ieee-primary text-slate-900 dark:text-white transition-all" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Type</label>
                  <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-ieee-primary text-slate-900 dark:text-white transition-all">
                    <option>Hackathon</option>
                    <option>Conference</option>
                    <option>Workshop</option>
                    <option>Technical Talk</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Date</label>
                  <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-ieee-primary text-slate-900 dark:text-white transition-all" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Location</label>
                  <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-ieee-primary text-slate-900 dark:text-white transition-all" />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Event Banner Image</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl">
                    {imagePreview && (
                      <div className="w-32 h-24 relative rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImageFile(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }} 
                      className="w-full max-w-full overflow-hidden text-ellipsis file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-ieee-primary file:text-white hover:file:bg-ieee-secondary file:cursor-pointer file:transition-colors text-slate-500 dark:text-slate-400" 
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">External Link (Optional)</label>
                  <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-ieee-primary text-slate-900 dark:text-white transition-all" placeholder="https://..." />
                </div>
                
                <div className="md:col-span-2" data-color-mode={resolvedTheme === 'dark' ? 'dark' : 'light'}>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Description</label>
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <MDEditor
                      value={formData.description}
                      onChange={(val) => setFormData({...formData, description: val || ""})}
                      height={400}
                      preview="edit"
                      className="!border-0"
                    />
                  </div>
                </div>
                
              </div>
              
              <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                <button type="submit" disabled={uploading} className="px-8 py-3 rounded-xl font-bold bg-ieee-primary hover:bg-ieee-secondary text-white shadow-md shadow-ieee-primary/30 transition-all disabled:opacity-50 flex items-center gap-2">
                  {uploading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  )}
                  {uploading ? "Saving..." : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        isLoading={isDeleting}
      />
    </div>
  );
}
