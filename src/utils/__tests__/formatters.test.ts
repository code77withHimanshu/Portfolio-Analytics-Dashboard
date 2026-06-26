import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatPercent,
  formatNumber,
  formatSign,
  formatSignedCurrency,
  formatSignedPercent,
} from '../formatters';

describe('formatCurrency', () => {
  it('formats positive dollar amounts', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats negative dollar amounts', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats large amounts compactly when compact=true', () => {
    const result = formatCurrency(1_500_000, { compact: true });
    expect(result).toContain('M');
  });

  it('does not compact amounts under 1M even when compact=true', () => {
    const result = formatCurrency(999_999, { compact: true });
    expect(result).toBe('$999,999.00');
  });
});

describe('formatPercent', () => {
  it('formats 50% correctly', () => {
    expect(formatPercent(50)).toBe('50.00%');
  });

  it('formats 0%', () => {
    expect(formatPercent(0)).toBe('0.00%');
  });

  it('formats negative percent', () => {
    expect(formatPercent(-10)).toBe('-10.00%');
  });

  it('respects decimals parameter', () => {
    expect(formatPercent(33.333, 0)).toBe('33%');
  });
});

describe('formatNumber', () => {
  it('formats with 2 decimals by default', () => {
    expect(formatNumber(1234.5678)).toBe('1,234.57');
  });

  it('formats zero', () => {
    expect(formatNumber(0)).toBe('0.00');
  });
});

describe('formatSign', () => {
  it('prefixes positive numbers with +', () => {
    expect(formatSign(1.5)).toBe('+1.50');
  });

  it('does not double-prefix negative numbers', () => {
    expect(formatSign(-2.3)).toBe('-2.30');
  });

  it('prefixes zero with +', () => {
    expect(formatSign(0)).toBe('+0.00');
  });
});

describe('formatSignedCurrency', () => {
  it('prefixes positive with +', () => {
    expect(formatSignedCurrency(500)).toBe('+$500.00');
  });

  it('does not double-prefix negatives', () => {
    expect(formatSignedCurrency(-300)).toBe('-$300.00');
  });
});

describe('formatSignedPercent', () => {
  it('prefixes positive with +', () => {
    expect(formatSignedPercent(5)).toBe('+5.00%');
  });

  it('handles negative', () => {
    expect(formatSignedPercent(-3)).toBe('-3.00%');
  });
});
