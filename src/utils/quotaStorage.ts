export interface QuotaData {
  date: string;
  count: number;
  isPremium: boolean;
}

const QUOTA_KEY = 'orcamento_quota';
const DAILY_LIMIT = 3;

const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getQuotaData = (): QuotaData => {
  const stored = localStorage.getItem(QUOTA_KEY);
  if (!stored) {
    return { date: getTodayString(), count: 0, isPremium: false };
  }
  
  const data: QuotaData = JSON.parse(stored);
  
  // Reset count if it's a new day
  if (data.date !== getTodayString()) {
    return { date: getTodayString(), count: 0, isPremium: data.isPremium };
  }
  
  return data;
};

export const saveQuotaData = (data: QuotaData): void => {
  localStorage.setItem(QUOTA_KEY, JSON.stringify(data));
};

export const incrementQuotaCount = (): void => {
  const data = getQuotaData();
  if (!data.isPremium) {
    data.count += 1;
    data.date = getTodayString();
    saveQuotaData(data);
  }
};

export const canCreateOrcamento = (): boolean => {
  const data = getQuotaData();
  if (data.isPremium) return true;
  return data.count < DAILY_LIMIT;
};

export const getRemainingQuota = (): number => {
  const data = getQuotaData();
  if (data.isPremium) return -1; // -1 indicates unlimited
  return Math.max(0, DAILY_LIMIT - data.count);
};

export const getUsedQuota = (): number => {
  const data = getQuotaData();
  return data.count;
};

export const isPremiumUser = (): boolean => {
  const data = getQuotaData();
  return data.isPremium;
};

export const activatePremiumDemo = (): void => {
  const data = getQuotaData();
  data.isPremium = true;
  saveQuotaData(data);
};

export const deactivatePremiumDemo = (): void => {
  const data = getQuotaData();
  data.isPremium = false;
  saveQuotaData(data);
};

export const resetQuotaDemo = (): void => {
  const data = getQuotaData();
  data.count = 0;
  data.date = getTodayString();
  saveQuotaData(data);
};

export const DAILY_QUOTA_LIMIT = DAILY_LIMIT;
