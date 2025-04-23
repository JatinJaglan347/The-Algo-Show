import React, { useContext } from 'react';
import { ThemeContext } from '../../App';

function Bar({ barWidth, barHeight, backgroundColor, transition, isActive, isComparing, value, index, isSecondAlgo }) {
  const { isDarkMode } = useContext(ThemeContext);

  // Determine the appropriate style based on the bar's state
  const getBarStyle = () => {
    // Active bar (being compared/swapped)
    if (isActive) {
      return 'linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)';
    }
    
    // Bar being compared with active bar
    if (isComparing) {
      return 'linear-gradient(180deg, #f97316 0%, #c2410c 100%)';
    }
    
    // Custom background if provided
    if (backgroundColor) {
      return backgroundColor;
    }
    
    // Default styles based on algorithm and theme
    if (isSecondAlgo) {
      return isDarkMode 
        ? 'linear-gradient(180deg, #a78bfa 0%, #7c3aed 100%)' 
        : 'linear-gradient(180deg, #c4b5fd 0%, #8b5cf6 100%)';
    } else {
      return isDarkMode 
        ? 'linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)' 
        : 'linear-gradient(180deg, #93c5fd 0%, #3b82f6 100%)';
    }
  };

  // Determine the text color based on the bar height and theme
  const getTextColor = () => {
    if (isDarkMode) {
      return barHeight ? '#ffffff' : '#1f2937';
    } else {
      return barHeight ? '#1f2937' : '#ffffff';
    }
  };

  return (
    <div className="h-full w-full flex items-end justify-center relative">
      <div 
        className={`rounded-t-md w-full flex justify-center items-end relative ${
          isActive || isComparing ? 'animate-pulse-subtle' : ''
        }`}
        style={{ 
          width: `${barWidth}%`, 
          height: `${barHeight}%`, 
          background: getBarStyle(),
          boxShadow: isActive || isComparing 
            ? isSecondAlgo 
              ? '0 0 10px rgba(139, 92, 246, 0.5)' 
              : '0 0 10px rgba(59, 130, 246, 0.5)' 
            : 'none',
          transition: transition || 'all 0.3s ease'
        }}
      >
        {/* Value label */}
        <div 
          className={`font-bold text-xs absolute -top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap`}
          style={{ color: getTextColor() }}
        >
          {barHeight }
        </div>
        
        {/* Bottom highlight */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20"></div>
      </div>
    </div>
  );
}

export default Bar;