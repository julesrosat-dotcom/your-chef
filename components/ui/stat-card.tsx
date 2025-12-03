import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  description?: string;
}

export function StatCard({ icon: Icon, value, label, description }: StatCardProps) {
  return (
    <div className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
      <div className="text-sm font-semibold text-gray-700 mb-1">{label}</div>
      {description && (
        <div className="text-xs text-gray-500">{description}</div>
      )}
    </div>
  );
}
