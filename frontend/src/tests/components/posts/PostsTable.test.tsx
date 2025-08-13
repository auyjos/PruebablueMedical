import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostsTable } from '../../../components/posts/PostsTable'

describe('PostsTable', () => {
    const mockPosts = [
        {
            id: '1',
            comment: 'First post comment',
            createdAt: '2024-01-01T10:00:00Z',
            userName: 'John Doe'
        },
        {
            id: '2',
            comment: 'Second post comment',
            createdAt: '2024-01-02T15:30:00Z',
            userName: 'Jane Smith'
        }
    ]

    it('renders loading state correctly', () => {
        render(<PostsTable posts={[]} loading={true} />)

        expect(screen.getByText('Cargando...')).toBeInTheDocument()
    })

    it('renders empty state when no posts', () => {
        render(<PostsTable posts={[]} loading={false} />)

        expect(screen.getByText('No hay posts disponibles')).toBeInTheDocument()
    })

    it('renders posts table correctly', () => {
        render(<PostsTable posts={mockPosts} loading={false} />)

        // Check table headers
        expect(screen.getByText('ID')).toBeInTheDocument()
        expect(screen.getByText('Comentario')).toBeInTheDocument()
        expect(screen.getByText('Fecha')).toBeInTheDocument()
        expect(screen.getByText('Usuario')).toBeInTheDocument()

        // Check post data
        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('First post comment')).toBeInTheDocument()
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('Second post comment')).toBeInTheDocument()
        expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })

    it('formats dates correctly', () => {
        render(<PostsTable posts={mockPosts} loading={false} />)

        // Check that dates are formatted and use getAllByText since there are multiple dates
        const dateElements = screen.getAllByText(/2024/)
        expect(dateElements.length).toBeGreaterThan(0)
    })

    it('handles long comments correctly', () => {
        const longCommentPost = [{
            id: '3',
            comment: 'This is a very long comment that should be handled properly by the table component without breaking the layout',
            createdAt: '2024-01-03T12:00:00Z',
            userName: 'Long Comment User'
        }]

        render(<PostsTable posts={longCommentPost} loading={false} />)

        expect(screen.getByText(/This is a very long comment/)).toBeInTheDocument()
    })
})