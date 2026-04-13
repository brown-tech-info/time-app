import { describe, it, expect } from 'vitest';
import { sanitize } from '../utils/sanitize';

describe('sanitize', () => {
  it('escapes HTML angle brackets', () => {
    expect(sanitize('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;',
    );
  });

  it('escapes ampersands', () => {
    expect(sanitize('Tom & Jerry')).toBe('Tom &amp; Jerry');
  });

  it('escapes single quotes', () => {
    expect(sanitize("it's")).toBe('it&#39;s');
  });

  it('leaves clean strings unchanged', () => {
    expect(sanitize('New York')).toBe('New York');
    expect(sanitize('São Paulo')).toBe('São Paulo');
  });

  it('handles empty string', () => {
    expect(sanitize('')).toBe('');
  });
});
