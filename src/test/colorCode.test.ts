import { describe, it, expect } from 'vitest';
import { classifyHour, categoryStyles } from '../utils/colorCode';

describe('classifyHour', () => {
  it('classifies business hours (8-17) as business (AC7)', () => {
    expect(classifyHour(8)).toBe('business');
    expect(classifyHour(10)).toBe('business');
    expect(classifyHour(12)).toBe('business');
    expect(classifyHour(17)).toBe('business');
  });

  it('classifies early morning (6-7) as early-late (AC8)', () => {
    expect(classifyHour(6)).toBe('early-late');
    expect(classifyHour(7)).toBe('early-late');
  });

  it('classifies evening (18-21) as early-late', () => {
    expect(classifyHour(18)).toBe('early-late');
    expect(classifyHour(21)).toBe('early-late');
  });

  it('classifies overnight (22-5) as overnight (AC9)', () => {
    expect(classifyHour(22)).toBe('overnight');
    expect(classifyHour(23)).toBe('overnight');
    expect(classifyHour(0)).toBe('overnight');
    expect(classifyHour(3)).toBe('overnight');
    expect(classifyHour(5)).toBe('overnight');
  });

  it('boundary: 8 is business, 7 is early-late', () => {
    expect(classifyHour(7)).toBe('early-late');
    expect(classifyHour(8)).toBe('business');
  });

  it('boundary: 17 is business, 18 is early-late', () => {
    expect(classifyHour(17)).toBe('business');
    expect(classifyHour(18)).toBe('early-late');
  });

  it('boundary: 21 is early-late, 22 is overnight', () => {
    expect(classifyHour(21)).toBe('early-late');
    expect(classifyHour(22)).toBe('overnight');
  });
});

describe('categoryStyles', () => {
  it('has styles for all categories', () => {
    expect(categoryStyles.business).toBeDefined();
    expect(categoryStyles['early-late']).toBeDefined();
    expect(categoryStyles.overnight).toBeDefined();
  });

  it('each category has bg, text, and label', () => {
    for (const cat of ['business', 'early-late', 'overnight'] as const) {
      expect(categoryStyles[cat].bg).toBeTruthy();
      expect(categoryStyles[cat].text).toBeTruthy();
      expect(categoryStyles[cat].label).toBeTruthy();
    }
  });

  it('labels are human-readable', () => {
    expect(categoryStyles.business.label).toBe('Business hours');
    expect(categoryStyles['early-late'].label).toBe('Early / Late');
    expect(categoryStyles.overnight.label).toBe('Overnight');
  });
});
