import React, { useState } from 'react';
import { usePosts } from '../../hooks/usePosts';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { ErrorMessage } from '../common/ErrorMessage';
import { UsersTable } from '../UsersTable';

export const PostsDashboard: React.FC = () => {
    const [searchName, setSearchName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { users, stats, loading, error, refreshPosts } = usePosts(searchTerm);

    const handleSearch = () => {
        setSearchTerm(searchName);
    };

    const handleClearSearch = () => {
        setSearchName('');
        setSearchTerm('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <ErrorMessage
                        message={error}
                        onRetry={refreshPosts}
                        className="max-w-md mx-auto"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Blue Medical Dashboard
                        </h1>
                        <button
                            onClick={refreshPosts}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <LoadingSpinner size="sm" className="mr-2" />
                                    Actualizando...
                                </div>
                            ) : (
                                'Actualizar'
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="text-blue-600">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Total de Posts
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {stats.totalPosts ? stats.totalPosts.toLocaleString() : '0'}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="text-blue-600">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Usuarios Únicos
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {stats.totalUsers ? stats.totalUsers.toLocaleString() : '0'}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="text-blue-600">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">
                                                Post promedio por usuario
                                            </dt>
                                            <dd className="text-lg font-medium text-gray-900">
                                                {stats.averagePostsPerUser ? Math.round(stats.averagePostsPerUser) : '0'} chars
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Search Section */}
                <div className="bg-white shadow rounded-lg mb-8">
                    <div className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1">
                                <label htmlFor="search" className="sr-only">
                                    Buscar por nombre
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="Buscar por nombre de usuario..."
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Buscar
                            </button>
                            {searchTerm && (
                                <button
                                    onClick={handleClearSearch}
                                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Limpiar
                                </button>
                            )}
                        </div>
                        {searchTerm && (
                            <div className="mt-2 text-sm text-gray-600">
                                Mostrando resultados para: <strong>"{searchTerm}"</strong>
                            </div>
                        )}
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white shadow rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Usuarios</h2>
                    </div>
                    <UsersTable users={users} loading={loading} />
                </div>
            </main>
        </div>
    );
};
