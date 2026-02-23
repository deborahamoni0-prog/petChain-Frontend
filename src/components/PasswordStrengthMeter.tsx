import { calculatePasswordStrength, PasswordStrength } from '../utils/passwordStrength';

interface PasswordStrengthMeterProps {
  password: string;
  showRequirements?: boolean;
}

/**
 * Password strength meter component
 * Displays visual feedback on password strength
 */
export default function PasswordStrengthMeter({ 
  password, 
  showRequirements = true 
}: PasswordStrengthMeterProps) {
  const strength: PasswordStrength = calculatePasswordStrength(password);

  // Color mapping
  const getColorClass = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  // Width percentage based on score
  const getWidth = () => {
    switch (strength.score) {
      case 0:
        return '5%';
      case 1:
        return '25%';
      case 2:
        return '50%';
      case 3:
        return '75%';
      case 4:
        return '100%';
      default:
        return '0%';
    }
  };

  return (
    <div className="mt-2">
      {/* Strength bar */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full transition-all duration-300 ${getColorClass(strength.color)}`}
          style={{ width: getWidth() }}
        />
      </div>

      {/* Strength label */}
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs font-medium" style={{ 
          color: strength.color === 'red' ? '#ef4444' : 
                 strength.color === 'yellow' ? '#eab308' : 
                 strength.color === 'blue' ? '#3b82f6' : 
                 strength.color === 'green' ? '#22c55e' : '#6b7280'
        }}>
          {strength.label}
        </span>
        {password && (
          <span className="text-xs text-gray-500">
            {strength.score + 1}/5 requirements met
          </span>
        )}
      </div>

      {/* Requirements list */}
      {showRequirements && password && (
        <ul className="mt-2 space-y-1">
          {strength.requirements.map((req, index) => (
            <li 
              key={index} 
              className={`flex items-center text-xs ${
                req.met ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              <span className="mr-1.5">
                {req.met ? (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              {req.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
