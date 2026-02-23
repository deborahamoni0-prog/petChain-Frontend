/**
 * Password strength calculation utility
 */

export interface PasswordStrength {
  score: number; // 0-4
  label: string;
  color: string;
  requirements: PasswordRequirement[];
}

export interface PasswordRequirement {
  label: string;
  met: boolean;
}

// Password requirements
const REQUIREMENTS = [
  { 
    label: 'At least 8 characters', 
    test: (password: string) => password.length >= 8 
  },
  { 
    label: 'Contains uppercase letter (A-Z)', 
    test: (password: string) => /[A-Z]/.test(password) 
  },
  { 
    label: 'Contains lowercase letter (a-z)', 
    test: (password: string) => /[a-z]/.test(password) 
  },
  { 
    label: 'Contains number (0-9)', 
    test: (password: string) => /[0-9]/.test(password) 
  },
  { 
    label: 'Contains special character (!@#$%^&*)', 
    test: (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) 
  },
];

/**
 * Calculate password strength
 * @param password - The password to evaluate
 * @returns PasswordStrength object with score, label, color, and requirements
 */
export function calculatePasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return {
      score: 0,
      label: 'None',
      color: 'gray',
      requirements: REQUIREMENTS.map(req => ({
        label: req.label,
        met: false,
      })),
    };
  }

  // Calculate how many requirements are met
  const requirements = REQUIREMENTS.map(req => ({
    label: req.label,
    met: req.test(password),
  }));

  const metCount = requirements.filter(r => r.met).length;

  // Calculate score (0-4)
  let score: number;
  let label: string;
  let color: string;

  if (metCount <= 1) {
    score = 0;
    label = 'Very Weak';
    color = 'red';
  } else if (metCount === 2) {
    score = 1;
    label = 'Weak';
    color = 'red';
  } else if (metCount === 3) {
    score = 2;
    label = 'Fair';
    color = 'yellow';
  } else if (metCount === 4) {
    score = 3;
    label = 'Good';
    color = 'blue';
  } else {
    score = 4;
    label = 'Strong';
    color = 'green';
  }

  // Bonus: Check for common patterns that weaken password
  const hasCommonPatterns = /^(password|123456|qwerty|abc123)/i.test(password);
  if (hasCommonPatterns && score > 0) {
    score = Math.max(0, score - 1);
    label = score <= 2 ? 'Weak' : 'Fair';
    color = score <= 2 ? 'red' : 'yellow';
  }

  // Bonus: Check for repeated characters
  if (/(.)\1{2,}/.test(password) && score > 0) {
    score = Math.max(0, score - 1);
    label = score <= 2 ? 'Weak' : 'Fair';
    color = score <= 2 ? 'red' : 'yellow';
  }

  return {
    score,
    label,
    color,
    requirements,
  };
}

/**
 * Check if password meets all requirements
 * @param password - The password to check
 * @returns true if all requirements are met
 */
export function isPasswordStrong(password: string): boolean {
  const strength = calculatePasswordStrength(password);
  return strength.score >= 3; // Good or Strong
}
