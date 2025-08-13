import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UsersTable } from '../../components/UsersTable'
import type { UserWithPosts } from '../../hooks/usePosts'

describe('UsersTable', () => {
    const mockUsers: UserWithPosts[] = [
        {
            name: 'John Doe',
            postCount: 5,
            posts: []
        },
        {
            name: 'Jane Smith',
            postCount: 3,
            posts: []
        }
    ]

    it('renders loading state correctly', () => {
        render(<UsersTable users={[]} loading={true} />)

        expect(screen.getByText('Cargando usuarios...')).toBeInTheDocument()
    })

    it('renders empty state when no users', () => {
        render(<UsersTable users={[]} loading={false} />)

        expect(screen.getByText('No se encontraron usuarios')).toBeInTheDocument()
    })

    it('renders users table correctly', () => {
        render(<UsersTable users={mockUsers} loading={false} />)

        // Check table headers
        expect(screen.getByText('Nombre del Usuario')).toBeInTheDocument()
        expect(screen.getByText('Número de Posts')).toBeInTheDocument()

        // Check user data
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('5')).toBeInTheDocument()
        expect(screen.getByText('Jane Smith')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('renders correct number of rows', () => {
        render(<UsersTable users={mockUsers} loading={false} />)

        const rows = screen.getAllByRole('row')
        // 1 header row + 2 data rows = 3 total
        expect(rows).toHaveLength(3)
    })

    it('handles single user correctly', () => {
        const singleUser: UserWithPosts[] = [
            {
                name: 'Solo User',
                postCount: 1,
                posts: []
            }
        ]

        render(<UsersTable users={singleUser} loading={false} />)

        expect(screen.getByText('Solo User')).toBeInTheDocument()
        expect(screen.getByText('1')).toBeInTheDocument()
    })
})
