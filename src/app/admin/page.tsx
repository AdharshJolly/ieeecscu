import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/events" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Events Manager</h2>
            <p className="text-gray-600">Create and manage upcoming and past events.</p>
          </Link>
          
          <Link href="/admin/media" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Media Manager</h2>
            <p className="text-gray-600">Upload and manage images stored on GitHub.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
