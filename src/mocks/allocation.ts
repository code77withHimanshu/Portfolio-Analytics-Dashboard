import type { AllocationSlice } from '@/types';
import { CHART_PALETTE } from '@/constants/chart';

const now = new Date();
const ts = new Date(now.getTime() - 8 * 60_000).toISOString();

export const allocationBySector: AllocationSlice[] = [
  { label: 'Technology', value: 85251.0, percentage: 45.7, color: CHART_PALETTE[0], dataTimestamp: ts },
  { label: 'Financials', value: 13895.0, percentage: 7.4, color: CHART_PALETTE[1], dataTimestamp: ts },
  { label: 'Consumer Discretionary', value: 8343.0, percentage: 4.5, color: CHART_PALETTE[2], dataTimestamp: ts },
  { label: 'Communication Services', value: 10536.0, percentage: 5.6, color: CHART_PALETTE[3], dataTimestamp: ts },
  { label: 'Healthcare', value: 9906.0, percentage: 5.3, color: CHART_PALETTE[4], dataTimestamp: ts },
  { label: 'Fixed Income', value: 11784.0, percentage: 6.3, color: CHART_PALETTE[5], dataTimestamp: ts },
  { label: 'Cryptocurrency', value: 33725.0, percentage: 9.2, color: CHART_PALETTE[6], dataTimestamp: ts },
  { label: 'Cash & Equivalents', value: 29560.0, percentage: 16.0, color: CHART_PALETTE[7], dataTimestamp: ts },
];

export const allocationByAssetClass: AllocationSlice[] = [
  { label: 'Equities', value: 128691.5, percentage: 68.9, color: CHART_PALETTE[0], dataTimestamp: ts },
  { label: 'ETFs', value: 27428.5, percentage: 14.7, color: CHART_PALETTE[1], dataTimestamp: ts },
  { label: 'Fixed Income', value: 11784.0, percentage: 6.3, color: CHART_PALETTE[5], dataTimestamp: ts },
  { label: 'Cryptocurrency', value: 33725.0, percentage: 9.2, color: CHART_PALETTE[6], dataTimestamp: ts },
  { label: 'Cash', value: 1671.0, percentage: 0.9, color: CHART_PALETTE[7], dataTimestamp: ts },
];
