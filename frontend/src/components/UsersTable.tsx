import type { UserWithPosts } from '../hooks/usePosts';

interface UsersTableProps {
    readonly users: UserWithPosts[];
    readonly loading: boolean;
}

export function UsersTable({ users, loading }: UsersTableProps) {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-lg text-gray-600">Cargando usuarios...</div>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No se encontraron usuarios
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre del Usuario
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Número de Posts
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.name} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    {user.name}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {user.postCount}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
