import Link from 'next/link';
import { Stethoscope, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-stone-50">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#155e42] flex items-center justify-center mx-auto">
          <Stethoscope className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-serif text-stone-900">Page Not Found</h1>
          <p className="text-sm text-stone-600">
            The remedy or dispensary page you are looking for does not exist or has been relocated.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#155e42] hover:bg-[#0e2a1f] text-white font-bold text-sm transition-colors w-full"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
