import { LucideIcon } from 'lucide-react';

interface TrustBadgeProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export function TrustBadge({ icon: Icon, value, label }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <div className="font-bold text-lg text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  );
}
