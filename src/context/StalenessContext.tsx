import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { StalenessThresholds } from '@/types';
import { DEFAULT_STALENESS_THRESHOLDS } from '@/constants/staleness';

const StalenessContext = createContext<StalenessThresholds>(DEFAULT_STALENESS_THRESHOLDS);

interface StalenessProviderProps {
  children: ReactNode;
  thresholds?: Partial<StalenessThresholds>;
}

export function StalenessProvider({ children, thresholds }: StalenessProviderProps) {
  const merged: StalenessThresholds = {
    ...DEFAULT_STALENESS_THRESHOLDS,
    ...thresholds,
  };
  return <StalenessContext.Provider value={merged}>{children}</StalenessContext.Provider>;
}

export function useStalenessThresholds(): StalenessThresholds {
  return useContext(StalenessContext);
}
