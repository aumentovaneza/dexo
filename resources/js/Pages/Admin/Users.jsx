import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    MagnifyingGlassIcon as SearchIcon,
    PencilIcon,
    TrashIcon,
    PlusIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function AdminUsers({ auth, users = [] }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Sample users data (in a real app, this would be passed from the backend)
    const sampleUsers = users.length
        ? users
        : [
              {
                  id: 1,
                  name: "John Doe",
                  email: "john@example.com",
                  role: "user",
                  status: "active",
                  created_at: "2023-05-10",
              },
              {
                  id: 2,
                  name: "Jane Smith",
                  email: "jane@example.com",
                  role: "admin",
                  status: "active",
                  created_at: "2023-04-15",
              },
              {
                  id: 3,
                  name: "Mike Johnson",
                  email: "mike@example.com",
                  role: "user",
                  status: "active",
                  created_at: "2023-06-20",
              },
              {
                  id: 4,
                  name: "Sarah Williams",
                  email: "sarah@example.com",
                  role: "user",
                  status: "inactive",
                  created_at: "2023-03-05",
              },
              {
                  id: 5,
                  name: "Alex Brown",
                  email: "alex@example.com",
                  role: "user",
                  status: "active",
                  created_at: "2023-07-12",
              },
              {
                  id: 6,
                  name: "Lisa Miller",
                  email: "lisa@example.com",
                  role: "admin",
                  status: "active",
                  created_at: "2023-02-18",
              },
              {
                  id: 7,
                  name: "Tom Wilson",
                  email: "tom@example.com",
                  role: "user",
                  status: "active",
                  created_at: "2023-08-03",
              },
              {
                  id: 8,
                  name: "Emma Davis",
                  email: "emma@example.com",
                  role: "user",
                  status: "inactive",
                  created_at: "2023-01-27",
              },
          ];

    // Filter users based on search term
    const filteredUsers = sampleUsers.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout title="User Management">
            <Head title="User Management" />

            <div className="py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center space-x-2 relative w-full md:w-64 mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add New User
                    </button>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Email
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Role
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Joined Date
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">
                                                {user.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-gray-500">
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 text-xs font-semibold leading-5 ${
                                                    user.role === "admin"
                                                        ? "bg-purple-100 text-purple-800"
                                                        : "bg-blue-100 text-blue-800"
                                                } rounded-full`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 text-xs font-semibold leading-5 ${
                                                    user.status === "active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                } rounded-full`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {user.created_at}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-3">
                                                <button className="text-indigo-600 hover:text-indigo-900">
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900">
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Previous
                            </button>
                            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing{" "}
                                    <span className="font-medium">1</span> to{" "}
                                    <span className="font-medium">8</span> of{" "}
                                    <span className="font-medium">8</span>{" "}
                                    results
                                </p>
                            </div>
                            <div>
                                <nav
                                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                    aria-label="Pagination"
                                >
                                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">
                                            Previous
                                        </span>
                                        <ChevronLeftIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        1
                                    </button>
                                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
