/**
 * Loading Spinner Component
 * Reusable loading spinner with customizable size and color
 */

import React from 'react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'gray' | 'white';
    className?: string;
}

const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
};

const colorClasses = {
    primary: 'border-primary-600',
    gray: 'border-gray-600',
    white: 'border-white',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    color = 'primary',
    className = '',
}) => {
    return (
        <div
            className={`
        loading-spinner
        ${sizeClasses[size]}
        ${colorClasses[color]}
        ${className}
      `}
            aria-label="Loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
};
