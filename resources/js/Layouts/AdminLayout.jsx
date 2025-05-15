import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    HomeIcon,
    UserGroupIcon as UsersIcon,
    ChartBarIcon,
    Cog6ToothIcon as CogIcon,
    ArrowRightEndOnRectangleIcon,
    Bars3Icon as MenuIcon,
    XMarkIcon as XIcon,
    ListBulletIcon as ViewListIcon,
    RectangleGroupIcon as CollectionIcon,
    DocumentTextIcon as DocumentReportIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function AdminLayout({ children, title }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: "Dashboard", href: route("admin.dashboard"), icon: HomeIcon },
        { name: "Users", href: route("admin.users"), icon: UsersIcon },
        {
            name: "Pokemon Cards",
            href: route("admin.pokemon.cards"),
            icon: CollectionIcon,
        },
        {
            name: "Analytics",
            href: route("admin.analytics"),
            icon: ChartBarIcon,
        },
        {
            name: "Content",
            href: route("admin.content"),
            icon: DocumentReportIcon,
        },
        {
            name: "Collections",
            href: route("admin.collections"),
            icon: CollectionIcon,
        },
        { name: "Settings", href: route("admin.settings"), icon: CogIcon },
    ];

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100">
            {/* Mobile sidebar */}
            <div
                className={`${
                    sidebarOpen ? "block" : "hidden"
                } fixed inset-0 flex z-40 md:hidden`}
                role="dialog"
                aria-modal="true"
            >
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-75"
                    aria-hidden="true"
                    onClick={() => setSidebarOpen(false)}
                ></div>

                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="sr-only">Close sidebar</span>
                            <XIcon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                            />
                        </button>
                    </div>

                    <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div className="flex-shrink-0 flex items-center px-4">
                            <span className="text-white text-xl font-bold">
                                Admin Portal
                            </span>
                        </div>
                        <nav className="mt-5 px-2 space-y-1">
                            {navigation.map((item) => {
                                const isActive =
                                    window.location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                                            isActive
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                        }`}
                                    >
                                        <item.icon
                                            className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300"
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                    <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
                        <div className="flex-shrink-0 group block">
                            <div className="flex items-center">
                                <div className="ml-3">
                                    <p className="text-base font-medium text-white">
                                        {auth.user.name}
                                    </p>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="block w-full text-left px-4 py-2 text-sm text-text-muted hover:bg-surface"
                                    >
                                        <div className="flex items-center">
                                            <ArrowRightEndOnRectangleIcon
                                                className="mr-2 h-5 w-5"
                                                aria-hidden="true"
                                            />
                                            <span>Sign out</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0 w-14" aria-hidden="true">
                    {/* Force sidebar to shrink to fit close icon */}
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64">
                    <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex items-center flex-shrink-0 px-4">
                                <span className="text-white text-xl font-bold">
                                    Admin Portal
                                </span>
                            </div>
                            <nav className="mt-5 flex-1 px-2 space-y-1">
                                {navigation.map((item) => {
                                    const isActive =
                                        window.location.pathname === item.href;
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                                                isActive
                                                    ? "bg-gray-900 text-white"
                                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                            }`}
                                        >
                                            <item.icon
                                                className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300"
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
                            <div className="flex-shrink-0 w-full group block">
                                <div className="flex items-center">
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-white">
                                            {auth.user.name}
                                        </p>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="block w-full text-left px-4 py-2 text-sm text-text-muted hover:bg-surface"
                                        >
                                            <div className="flex items-center">
                                                <ArrowRightEndOnRectangleIcon
                                                    className="mr-2 h-5 w-5"
                                                    aria-hidden="true"
                                                />{" "}
                                                Sign out
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <h1 className="text-2xl font-semibold text-gray-900">
                                {title}
                            </h1>
                        </div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <div className="py-4">{children}</div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
