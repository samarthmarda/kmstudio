import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

describe('frontend build compatibility', () => {
  it('still builds the existing Vite frontend', () => {
    expect(() => {
      execFileSync(
        process.platform === 'win32' ? 'npm.cmd' : 'npm',
        ['run', 'build'],
        {
          cwd: process.cwd(),
          stdio: 'pipe',
          timeout: 120_000,
        },
      );
    }).not.toThrow();
  }, 120_000);
});
