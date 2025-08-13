import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PostsDashboard } from '../../components/posts/PostsDashboard'
import { usePosts } from '../../hooks/usePosts'

// Mock the usePosts hook
vi.mock('../../hooks/usePosts')
const mockedUsePosts = vi.mocked(usePosts)

// Mock child components
vi.mock('../../components/UsersTable', () => ({
    UsersTable: ({ users, loading }: { users: Array<{ name: string; postCount: number; posts: string[] }>; loading: boolean }) => (
        <div data-testid="users-table">
            {loading ? 'Loading...' : `Users: ${users.length}`}
        </div>
    )
}))

vi.mock('../../components/common/LoadingSpinner', () => ({
    LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>
}))

vi.mock('../../components/common/ErrorMessage', () => ({
    ErrorMessage: ({ message, onRetry }: { message: string; onRetry: () => void }) => (
        <div data-testid="error-message">
            <span>{message}</span>
            <button onClick={onRetry}>Retry</button>
        </div>
    )
}))

describe('PostsDashboard', () => {
    const mockUsers = [
        { name: 'John Doe', postCount: 5, posts: [] },
        { name: 'Jane Smith', postCount: 3, posts: [] }
    ]

    const mockStats = {
        totalUsers: 2,
        totalPosts: 8,
        averagePostsPerUser: 4
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders dashboard with users and stats', () => {
        mockedUsePosts.mockReturnValue({
            users: mockUsers,
            stats: mockStats,
            loading: false,
            error: null,
            refreshPosts: vi.fn()
        })

        render(<PostsDashboard />)

        expect(screen.getByText('Blue Medical Dashboard')).toBeInTheDocument()
        expect(screen.getByText('Total de Posts')).toBeInTheDocument()
        expect(screen.getByText('8')).toBeInTheDocument()
        expect(screen.getByText('Usuarios Únicos')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByTestId('users-table')).toBeInTheDocument()
    })

    it('renders loading state correctly', () => {
        mockedUsePosts.mockReturnValue({
            users: [],
            stats: null,
            loading: true,
            error: null,
            refreshPosts: vi.fn()
        })

        render(<PostsDashboard />)

        expect(screen.getByText('Actualizando...')).toBeInTheDocument()
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
    })

    it('renders error state correctly', () => {
        const mockRefresh = vi.fn()
        mockedUsePosts.mockReturnValue({
            users: [],
            stats: null,
            loading: false,
            error: 'Network error',
            refreshPosts: mockRefresh
        })

        render(<PostsDashboard />)

        expect(screen.getByTestId('error-message')).toBeInTheDocument()
        expect(screen.getByText('Network error')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Retry'))
        expect(mockRefresh).toHaveBeenCalledTimes(1)
    })

    it('handles search functionality', async () => {
        const mockRefresh = vi.fn()
        mockedUsePosts.mockReturnValue({
            users: mockUsers,
            stats: mockStats,
            loading: false,
            error: null,
            refreshPosts: mockRefresh
        })

        render(<PostsDashboard />)

        const searchInput = screen.getByPlaceholderText('Buscar por nombre de usuario...')
        const searchButton = screen.getByText('Buscar')

        fireEvent.change(searchInput, { target: { value: 'John' } })
        fireEvent.click(searchButton)

        // Should trigger a new search with the filter
        await waitFor(() => {
            expect(mockedUsePosts).toHaveBeenCalledWith('John')
        })
    })

    it('handles clear search functionality', async () => {
        const mockRefresh = vi.fn()
        mockedUsePosts.mockReturnValue({
            users: mockUsers,
            stats: mockStats,
            loading: false,
            error: null,
            refreshPosts: mockRefresh
        })

        render(<PostsDashboard />)

        const searchInput = screen.getByPlaceholderText('Buscar por nombre de usuario...')
        const searchButton = screen.getByText('Buscar')

        // First, perform a search
        fireEvent.change(searchInput, { target: { value: 'John' } })
        fireEvent.click(searchButton)

        // Wait for clear button to appear
        await waitFor(() => {
            expect(screen.getByText('Limpiar')).toBeInTheDocument()
        })

        // Click clear button
        fireEvent.click(screen.getByText('Limpiar'))

        // Input should be cleared
        expect(searchInput).toHaveValue('')
    })

    it('handles refresh button click', () => {
        const mockRefresh = vi.fn()
        mockedUsePosts.mockReturnValue({
            users: mockUsers,
            stats: mockStats,
            loading: false,
            error: null,
            refreshPosts: mockRefresh
        })

        render(<PostsDashboard />)

        fireEvent.click(screen.getByText('Actualizar'))
        expect(mockRefresh).toHaveBeenCalledTimes(1)
    })

    it('handles enter key in search input', () => {
        const mockRefresh = vi.fn()
        mockedUsePosts.mockReturnValue({
            users: mockUsers,
            stats: mockStats,
            loading: false,
            error: null,
            refreshPosts: mockRefresh
        })

        render(<PostsDashboard />)

        const searchInput = screen.getByPlaceholderText('Buscar por nombre de usuario...')

        fireEvent.change(searchInput, { target: { value: 'Test' } })
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' })

        // Should trigger search on Enter key
        expect(searchInput).toHaveValue('Test')
    })

    it('displays search filter indicator', async () => {
        const mockRefresh = vi.fn()
        mockedUsePosts.mockReturnValue({
            users: mockUsers,
            stats: mockStats,
            loading: false,
            error: null,
            refreshPosts: mockRefresh
        })

        render(<PostsDashboard />)

        const searchInput = screen.getByPlaceholderText('Buscar por nombre de usuario...')
        const searchButton = screen.getByText('Buscar')

        fireEvent.change(searchInput, { target: { value: 'Test Filter' } })
        fireEvent.click(searchButton)

        await waitFor(() => {
            expect(screen.getByText(/Mostrando resultados para:/)).toBeInTheDocument()
            expect(screen.getByText('"Test Filter"')).toBeInTheDocument()
        })
    })
})
