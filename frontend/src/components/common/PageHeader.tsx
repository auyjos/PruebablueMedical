/**
 * Page Header Component
 * Displays page title and optional description
 */

import React from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: React.ReactNode;
    className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
    title,
    description,
    action,
    className = '',
}) => {
    return (
        <div className={`mb-8 ${className}`}>
            <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-2 text-lg text-gray-600">
                            {description}
                        </p>
                    )}
                </div>
                {action && (
                    <div className="mt-4 flex-shrink-0 md:mt-0">
                        {action}
                    </div>
                )}
            </div>
        </div>
    );
};
