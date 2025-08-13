/**
 * Search Input Component
 * Reusable search input with debouncing and clear functionality
 */

import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchInputProps {
    placeholder?: string;
    onSearch: (searchTerm: string) => void;
    debounceMs?: number;
    className?: string;
    disabled?: boolean;
    initialValue?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = 'Search...',
    onSearch,
    debounceMs = 300,
    className = '',
    disabled = false,
    initialValue = '',
}) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);
    const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

    // Trigger search when debounced value changes
    useEffect(() => {
        onSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm, onSearch]);

    const handleClear = () => {
        setSearchTerm('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            <input
                type="text"
                className={`
          input-field
          pl-10
          ${searchTerm ? 'pr-10' : 'pr-4'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleInputChange}
                disabled={disabled}
                aria-label="Search"
            />

            {searchTerm && !disabled && (
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={handleClear}
                    aria-label="Clear search"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};
