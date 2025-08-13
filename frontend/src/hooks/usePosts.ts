import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export interface Post {
    id: string;
    createdAt: string;
    comment: string;
    userName?: string; // Optional because it gets added when flattening
}

export interface UserWithPosts {
    name: string;
    postCount: number;
    posts: Post[];
}

export interface PostsStats {
    totalPosts: number;
    totalUsers: number;
    averagePostsPerUser: number;
}

interface UsePosts {
    users: UserWithPosts[];
    stats: PostsStats | null;
    loading: boolean;
    error: string | null;
    refreshPosts: () => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export function usePosts(nameFilter?: string): UsePosts {
    const [users, setUsers] = useState<UserWithPosts[]>([]);
    const [stats, setStats] = useState<PostsStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            console.log('Fetching from API_BASE_URL:', API_BASE_URL);
            // Construct URL with name filter if provided
            const postsUrl = nameFilter 
                ? `${API_BASE_URL}/posts?name=${encodeURIComponent(nameFilter)}`
                : `${API_BASE_URL}/posts`;
            
            // Fetch posts and stats in parallel
            const [postsResponse, statsResponse] = await Promise.all([
                axios.get(postsUrl),
                axios.get(`${API_BASE_URL}/posts/stats`)
            ]);

            console.log('Posts response:', postsResponse.data);
            console.log('Stats response:', statsResponse.data);

            // El backend devuelve { success: true, data: [...] }
            // donde data es un array de usuarios con posts anidados
            let postsData = postsResponse.data;
            let statsData = statsResponse.data;

            // Si viene envuelto en { success: true, data: [...] }
            if (postsData.success && postsData.data) {
                postsData = postsData.data;
            }
            if (statsData.success && statsData.data) {
                statsData = statsData.data;
            }

            // Procesar datos de usuarios directamente
            if (Array.isArray(postsData)) {
                console.log('Users data:', postsData);
                setUsers(postsData);
            } else {
                console.log('Users data not an array, setting empty:', postsData);
                setUsers([]);
            }

            // Para stats, verificamos que sea un objeto válido
            if (statsData && typeof statsData === 'object') {
                console.log('Stats data processed:', statsData);
                setStats(statsData);
            } else {
                console.log('Stats data invalid, setting null:', statsData);
                setStats(null);
            }
        } catch (err) {
            const errorMessage = err instanceof Error
                ? err.message
                : 'Error al cargar los datos';
            setError(errorMessage);
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    }, [nameFilter]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return {
        users,
        stats,
        loading,
        error,
        refreshPosts: fetchPosts
    };
}
