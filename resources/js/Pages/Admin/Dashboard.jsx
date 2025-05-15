import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    UserGroupIcon as UsersIcon,
    RectangleGroupIcon as CollectionIcon,
    ShoppingCartIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon as TrendingUpIcon,
    ViewfinderCircleIcon as ViewGridIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard({ auth, stats }) {
    // Sample stats data (in a real app, this would be passed from the backend)
    const sampleStats = stats || {
        totalUsers: 1250,
        newUsers: 48,
        totalCards: 7320,
        newCards: 124,
        totalDecks: 345,
        popularDecks: 12,
        revenue: 2640,
        transactions: 178,
    };

    const cards = [
        {
            name: "Total Users",
            value: sampleStats.totalUsers,
            icon: UsersIcon,
            change: "+12%",
            color: "bg-blue-500",
        },
        {
            name: "New Users (30d)",
            value: sampleStats.newUsers,
            icon: UsersIcon,
            change: "+8%",
            color: "bg-green-500",
        },
        {
            name: "Total Cards",
            value: sampleStats.totalCards,
            icon: CollectionIcon,
            change: "+5%",
            color: "bg-purple-500",
        },
        {
            name: "New Cards (30d)",
            value: sampleStats.newCards,
            icon: CollectionIcon,
            change: "+18%",
            color: "bg-yellow-500",
        },
        {
            name: "Total Decks",
            value: sampleStats.totalDecks,
            icon: ViewGridIcon,
            change: "+7%",
            color: "bg-red-500",
        },
        {
            name: "Popular Decks",
            value: sampleStats.popularDecks,
            icon: TrendingUpIcon,
            change: "+2%",
            color: "bg-indigo-500",
        },
        {
            name: "Revenue ($)",
            value: sampleStats.revenue,
            icon: CurrencyDollarIcon,
            change: "+15%",
            color: "bg-pink-500",
        },
        {
            name: "Transactions",
            value: sampleStats.transactions,
            icon: ShoppingCartIcon,
            change: "+9%",
            color: "bg-teal-500",
        },
    ];

    const recentActivities = [
        {
            user: "John Doe",
            action: "created a new deck",
            time: "5 minutes ago",
        },
        {
            user: "Jane Smith",
            action: "added 12 cards to collection",
            time: "10 minutes ago",
        },
        {
            user: "Mike Johnson",
            action: "shared a deck",
            time: "30 minutes ago",
        },
        { user: "Sarah Williams", action: "registered", time: "1 hour ago" },
        { user: "Alex Brown", action: "updated profile", time: "2 hours ago" },
    ];

    return (
        <AdminLayout title="Admin Dashboard">
            <Head title="Admin Dashboard" />

            <div className="py-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Overview
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow p-5"
                        >
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm font-medium">
                                        {card.name}
                                    </p>
                                    <p className="text-3xl font-bold text-gray-800">
                                        {card.value.toLocaleString()}
                                    </p>
                                </div>
                                <div
                                    className={`${card.color} rounded-full p-3 h-10 w-10 flex items-center justify-center`}
                                >
                                    <card.icon className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <div className="mt-2">
                                <span className="text-green-600 text-sm font-semibold">
                                    {card.change}
                                </span>
                                <span className="text-gray-500 text-sm font-medium ml-1">
                                    from last month
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">
                                Recent Activity
                            </h3>
                            <button className="text-sm text-blue-600 hover:text-blue-800">
                                View all
                            </button>
                        </div>
                        <div className="space-y-4">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-start">
                                    <div className="bg-blue-100 rounded-full p-2 mr-4">
                                        <ClockIcon className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            <span className="font-semibold">
                                                {activity.user}
                                            </span>{" "}
                                            {activity.action}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">
                                System Status
                            </h3>
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                All systems normal
                            </span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">
                                        Server Load
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">
                                        24%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: "24%" }}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">
                                        Database Usage
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">
                                        68%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-yellow-500 h-2 rounded-full"
                                        style={{ width: "68%" }}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">
                                        API Requests (per minute)
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">
                                        142
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full"
                                        style={{ width: "42%" }}
                                    ></div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">
                                        Memory Usage
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">
                                        52%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: "52%" }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
