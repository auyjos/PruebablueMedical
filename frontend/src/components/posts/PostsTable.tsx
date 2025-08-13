import React, { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import type { Post } from '../../hooks/usePosts';

type SortableFields = 'id' | 'comment' | 'userName' | 'createdAt';

interface PostsTableProps {
    readonly posts: Post[];
    readonly loading?: boolean;
    readonly className?: string;
}

export function PostsTable({ posts, loading = false, className = '' }: PostsTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<SortableFields>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Debug logs
    console.log('PostsTable rendered with posts:', posts);
    console.log('Posts length:', posts.length);
    console.log('Loading state:', loading);
    if (posts.length > 0) {
        console.log('First post structure:', posts[0]);
        console.log('First post keys:', Object.keys(posts[0]));
    }

    // Debounced search to avoid filtering on every keystroke
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Filter and sort posts
    const filteredAndSortedPosts = posts
        .filter(post => {
            // Verificar que post existe y tiene las propiedades necesarias
            if (!post) return false;

            // Si no hay término de búsqueda, mostrar todos los posts
            if (!debouncedSearchTerm) return true;

            // Buscar en comentario y nombre de usuario
            const comment = post.comment || '';
            const userName = post.userName || '';
            const searchTerm = debouncedSearchTerm.toLowerCase();

            return comment.toLowerCase().includes(searchTerm) ||
                userName.toLowerCase().includes(searchTerm);
        })
        .sort((a, b) => {
            const aValue = a[sortBy] || '';
            const bValue = b[sortBy] || '';

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

    console.log('Filtered and sorted posts:', filteredAndSortedPosts);
    console.log('Filtered posts length:', filteredAndSortedPosts.length);

    const handleSort = (column: SortableFields) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const getSortIcon = (column: SortableFields) => {
        if (sortBy !== column) {
            return (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
            );
        }

        if (sortOrder === 'asc') {
            return (
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
            );
        } else {
            return (
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            );
        }
    };

    return (
        <div className={`bg-white shadow rounded-lg ${className}`}>
            {/* Search Bar */}
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Buscar posts..."
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                onClick={() => handleSort('id')}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            >
                                <div className="flex items-center space-x-1">
                                    <span>ID</span>
                                    {getSortIcon('id')}
                                </div>
                            </th>
                            <th
                                onClick={() => handleSort('comment')}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Comentario</span>
                                    {getSortIcon('comment')}
                                </div>
                            </th>
                            <th
                                onClick={() => handleSort('createdAt')}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Fecha</span>
                                    {getSortIcon('createdAt')}
                                </div>
                            </th>
                            <th
                                onClick={() => handleSort('userName')}
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            >
                                <div className="flex items-center space-x-1">
                                    <span>Usuario</span>
                                    {getSortIcon('userName')}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center">
                                    <div className="flex justify-center items-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                        <span className="ml-2 text-gray-500">Cargando...</span>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {!loading && filteredAndSortedPosts.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                    {searchTerm ? 'No se encontraron posts que coincidan con la búsqueda' : 'No hay posts disponibles'}
                                </td>
                            </tr>
                        )}

                        {!loading && filteredAndSortedPosts.length > 0 && filteredAndSortedPosts.map((post) => (
                            <tr key={post?.id || Math.random()} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {post?.id || 'N/A'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">
                                    <div className="max-w-md truncate" title={post?.comment || ''}>
                                        {post?.comment || 'Sin comentario'}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {post?.createdAt ? new Date(post.createdAt).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    }) : 'Sin fecha'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {post?.userName || 'Usuario desconocido'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Results Summary */}
            {!loading && filteredAndSortedPosts.length > 0 && (
                <div className="px-6 py-3 border-t border-gray-200 text-sm text-gray-500">
                    Mostrando {filteredAndSortedPosts.length} de {posts.length} posts
                    {debouncedSearchTerm && ` (filtrado por "${debouncedSearchTerm}")`}
                </div>
            )}
        </div>
    );
}
