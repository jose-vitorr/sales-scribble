import { Crown, Sparkles } from 'lucide-react';
import { getQuotaData, DAILY_QUOTA_LIMIT } from '@/utils/quotaStorage';
import { useEffect, useState } from 'react';

interface PremiumBadgeProps {
  className?: string;
}

export const PremiumBadge = ({ className = '' }: PremiumBadgeProps) => {
  const [quotaData, setQuotaData] = useState({ count: 0, isPremium: false });

  useEffect(() => {
    const data = getQuotaData();
    setQuotaData({ count: data.count, isPremium: data.isPremium });
  }, []);

  if (quotaData.isPremium) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 font-semibold text-sm shadow-md ${className}`}>
        <Crown className="h-4 w-4" />
        <span>Premium</span>
      </div>
    );
  }

  const isLimitReached = quotaData.count >= DAILY_QUOTA_LIMIT;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full ${isLimitReached ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-muted text-muted-foreground border border-border'} font-medium text-sm ${className}`}>
      <Sparkles className="h-4 w-4" />
      <span>{quotaData.count}/{DAILY_QUOTA_LIMIT} Grátis</span>
    </div>
  );
};
