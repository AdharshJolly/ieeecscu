"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ConfirmModal from "@/components/ConfirmModal";
import Image from "next/image";

export default function AdminOfficeBearers() {
  const router = useRouter();
  const [bearers, setBearers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  
  const [formData, setFormData] = useState({
    name: "", role: "", year: "2024-2025", order: 100, linkedinUrl: "", githubUrl: "", imageUrl: ""
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Custom Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [allYears, setAllYears] = useState<string[]>([]);

  const fetchYears = async () => {
    const res = await fetch("/api/office-bearers/years");
    if (res.ok) {
      const years = await res.json();
      if (Array.isArray(years) && years.length > 0) {
        const uniqueYears = Array.from(new Set(years)).sort().reverse() as string[];
        setAllYears(uniqueYears);
        
        setSelectedYear(prev => {
          if (!uniqueYears.includes(prev)) {
            return uniqueYears[0];
          }
          return prev;
        });
      }
    }
  };

  const fetchBearers = async (year: string) => {
    setLoading(true);
    const res = await fetch(`/api/office-bearers?year=${year}`);
    if (res.ok) {
      setBearers(await res.json());
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchYears();
  }, []);

  useEffect(() => {
    fetchBearers(selectedYear);
  }, [selectedYear]);

  const openModal = (bearer: any = null) => {
    if (bearer) {
      setEditingId(bearer._id);
      setFormData({
        name: bearer.name,
        role: bearer.role,
        year: bearer.year,
        order: bearer.order,
        linkedinUrl: bearer.linkedinUrl || "",
        githubUrl: bearer.githubUrl || "",
        imageUrl: bearer.imageUrl || ""
      });
      setImagePreview(bearer.imageUrl || null);
    } else {
      setEditingId(null);
      setFormData({ name: "", role: "", year: selectedYear, order: 100, linkedinUrl: "", githubUrl: "", imageUrl: "" });
      setImagePreview(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    let finalImageUrl = formData.imageUrl;

    if (imageFile) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
      if (uploadRes.ok) {
        const result = await uploadRes.json();
        finalImageUrl = result.url;
      } else {
        toast.error("Image upload failed");
        setUploading(false);
        return;
      }
    }

    const url = editingId ? `/api/office-bearers/${editingId}` : "/api/office-bearers";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, imageUrl: finalImageUrl }),
    });

    setUploading(false);

    if (res.ok) {
      toast.success(`Office Bearer ${editingId ? "updated" : "added"} successfully!`);
      setIsModalOpen(false);
      // Auto-switch to the year they just created/edited in case they changed it
      if (formData.year !== selectedYear) {
        setSelectedYear(formData.year);
        fetchYears();
      } else {
        fetchBearers(selectedYear);
      }
      router.refresh();
    } else {
      toast.error("Error saving office bearer");
    }
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    const res = await fetch(`/api/office-bearers/${itemToDelete}`, { method: "DELETE" });
    setIsDeleting(false);
    setDeleteModalOpen(false);
    setItemToDelete(null);

    if (res.ok) {
      toast.success("Office Bearer deleted successfully!");
      fetchBearers(selectedYear);
      router.refresh();
    } else {
      toast.error("Failed to delete office bearer.");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Office Bearers</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage the core team for different academic years.</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-ieee-primary shadow-sm"
          >
            {allYears.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <button 
            onClick={() => openModal()}
            className="bg-ieee-primary hover:bg-ieee-secondary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-ieee-primary/30 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Member
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Photo</th>
                <th className="px-6 py-4">Name & Role</th>
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-8"></div></td>
                    <td className="px-6 py-4 text-right"><div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16 ml-auto"></div></td>
                  </tr>
                ))
              ) : bearers.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-500">No office bearers found for {selectedYear}.</td></tr>
              ) : bearers.map(bearer => (
                <tr key={bearer._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                      {bearer.imageUrl ? (
                        <div className="w-full h-full relative">
                          <Image src={bearer.imageUrl} alt={bearer.name} fill className="object-cover" sizes="48px" />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 dark:text-white">{bearer.name}</div>
                    <div className="text-sm text-ieee-primary font-semibold">{bearer.role}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{bearer.order}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => openModal(bearer)} className="text-ieee-primary hover:text-ieee-secondary font-semibold">Edit</button>
                    <button onClick={() => handleDeleteClick(bearer._id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
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
          <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] my-8 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700 flex-shrink-0">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{editingId ? 'Edit Office Bearer' : 'Add Office Bearer'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-ieee-primary text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Role</label>
                  <input required type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} placeholder="e.g. Chairperson" className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-ieee-primary text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Academic Year</label>
                  <input required type="text" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} placeholder="e.g. 2024-2025" className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-ieee-primary text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Sort Order</label>
                  <input required type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} placeholder="10" className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-ieee-primary text-slate-900 dark:text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Profile Photo</label>
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-4">
                    {imagePreview && (
                      <div className="w-20 h-20 relative rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
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
                      className="w-full max-w-full overflow-hidden text-ellipsis px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-ieee-primary text-slate-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-ieee-primary/10 file:text-ieee-primary hover:file:bg-ieee-primary/20" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">LinkedIn URL</label>
                  <input type="url" value={formData.linkedinUrl} onChange={e => setFormData({...formData, linkedinUrl: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-ieee-primary text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">GitHub URL</label>
                  <input type="url" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-ieee-primary text-slate-900 dark:text-white" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">Cancel</button>
                <button type="submit" disabled={uploading} className="px-6 py-2 rounded-xl font-bold bg-ieee-primary hover:bg-ieee-secondary text-white shadow-md shadow-ieee-primary/30 transition-colors disabled:opacity-50">
                  {uploading ? "Uploading..." : "Save Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Office Bearer"
        message="Are you sure you want to delete this office bearer? This action cannot be undone."
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
