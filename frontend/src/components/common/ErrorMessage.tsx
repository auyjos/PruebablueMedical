/**
 * Error Message Component
 * Displays error messages with retry functionality
 */

import React from 'react';

interface ErrorMessageProps {
    title?: string;
    message: string;
    onRetry?: () => void;
    className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
    title = 'Error',
    message,
    onRetry,
    className = '',
}) => {
    return (
        <div className={`card p-6 ${className}`}>
            <div className="flex items-center space-x-3 mb-4">
                <div className="flex-shrink-0">
                    <svg
                        className="h-5 w-5 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{message}</p>
                </div>
            </div>

            {onRetry && (
                <div className="flex justify-end">
                    <button
                        onClick={onRetry}
                        className="btn-primary"
                        type="button"
                    >
                        <svg
                            className="h-4 w-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
};
