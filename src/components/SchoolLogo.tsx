import React, { useState, useEffect } from 'react';
import { getActiveSchoolLogo, subscribeToLogoChange } from '../utils/logoManager';

interface SchoolLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'full' | 'icon-only' | 'stacked';
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  className = '',
  size = 64,
  showText = false,
  variant = 'icon-only',
}) => {
  const [logoSrc, setLogoSrc] = useState<string>(getActiveSchoolLogo());

  useEffect(() => {
    return subscribeToLogoChange((newLogo) => {
      setLogoSrc(newLogo);
    });
  }, []);

  return (
    <div
      className={`inline-flex items-center gap-3 select-none ${className}`}
      id="school-brand-logo"
    >
      {/* Official Emblem: Al Yemen Model Schools */}
      <img
        src={logoSrc}
        alt="شعار مدارس اليمن النموذجية - معاً نحو مستقبل أفضل"
        width={size}
        height={Math.round(size * 1.36)}
        className="shrink-0 transition-transform duration-300 hover:scale-105 drop-shadow-md object-contain"
        style={{ width: size, height: 'auto' }}
        loading="eager"
      />

      {/* Optional Brand Text (if requested) */}
      {(showText || variant === 'stacked') && (
        <div className="flex flex-col text-right leading-tight">
          <span className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400">
            مَـــــدَارِسُ
          </span>
          <span className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-wide">
            اليَـــمَـــنِ
          </span>
          <span className="text-xs md:text-sm font-extrabold text-blue-800 dark:text-blue-300">
            النَّــمُــوذَجِــيَّــة
          </span>
          <span className="text-[10px] font-bold text-amber-500 dark:text-amber-400 tracking-wider">
            ★ معاً نحو مستقبل أفضل ★
          </span>
        </div>
      )}
    </div>
  );
};

