import React from "react";
import { Link, Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Welcome({ auth }) {
    const Layout = auth?.user ? MainLayout : GuestLayout;

    return (
        <Layout title="Welcome" hideTitle>
            <Head title="Welcome to Dexo" />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary/5 to-primary/10 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-10 md:mb-0">
                            <h1 className="text-5xl font-bold text-primary mb-4">
                                Track. Build. Optimize.
                            </h1>
                            <p className="text-xl text-text-muted mb-8 max-w-lg">
                                Dexo helps you manage your Pokémon card
                                collection and Beyblade parts, build competitive
                                decks and combos—all in one beautiful workspace.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {auth?.user ? (
                                    <Link
                                        href="/dashboard"
                                        className="px-6 py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 transition-colors"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href="/register"
                                            className="px-6 py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 transition-colors"
                                        >
                                            Get Started — It's Free
                                        </Link>
                                        <Link
                                            href="/login"
                                            className="px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary/10 transition-colors"
                                        >
                                            Log in
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-full h-full bg-primary/10 rounded-xl"></div>
                                <div className="relative bg-surface rounded-xl shadow-xl overflow-hidden">
                                    <img
                                        src="/images/dashboard-preview.png"
                                        alt="Dexo Dashboard Preview"
                                        className="w-full h-auto"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://placehold.co/600x400/e2e8f0/475569?text=Dexo+Dashboard";
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">
                            Your Ultimate Collection Organizer
                        </h2>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto">
                            Everything you need to track your collection, build
                            competitive decks, and stay ahead of the meta.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-surface p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                                <svg
                                    className="w-6 h-6 text-primary"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-text mb-2">
                                Pokémon Card Tracking
                            </h3>
                            <p className="text-text-muted">
                                Track your personal Pokémon card collection with
                                ease. Organize by set, rarity, type, and more.
                                Never lose track of your valuable cards again.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-surface p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                                <svg
                                    className="w-6 h-6 text-primary"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-text mb-2">
                                Beyblade Parts Management
                            </h3>
                            <p className="text-text-muted">
                                Manage your Beyblade layers, disks, and drivers
                                in one place. Keep track of your collection and
                                build optimized combos for competitive play.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-surface p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                                <svg
                                    className="w-6 h-6 text-primary"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-text mb-2">
                                Deck Building
                            </h3>
                            <p className="text-text-muted">
                                Build and save powerful Pokémon TCG decks with
                                our intuitive deck builder. Test strategies and
                                create winning combinations.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-surface p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                                <svg
                                    className="w-6 h-6 text-primary"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-text mb-2">
                                Meta Trends
                            </h3>
                            <p className="text-text-muted">
                                Stay updated with the latest meta trends from
                                top players. Discover winning strategies and
                                deck compositions for competitive play.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-surface p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                                <svg
                                    className="w-6 h-6 text-primary"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-text mb-2">
                                Beyblade Combo Builder
                            </h3>
                            <p className="text-text-muted">
                                Create and save competitive Beyblade combos.
                                Experiment with different parts combinations to
                                find your winning strategy.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-surface p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                                <svg
                                    className="w-6 h-6 text-primary"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-text mb-2">
                                API Integration
                            </h3>
                            <p className="text-text-muted">
                                Import cards directly from the Pokémon TCG API.
                                Stay updated with the latest card releases and
                                data automatically.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">
                            Trusted by Collectors & Competitors
                        </h2>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto">
                            See what our users are saying about how Dexo
                            transformed their collection management and
                            competitive play.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-background p-8 rounded-xl shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="text-primary">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5 inline-block"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <blockquote className="text-text-muted mb-4">
                                "Dexo has transformed how I manage my Pokémon
                                card collection. I can finally keep track of all
                                my cards and build competitive decks with ease."
                            </blockquote>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold mr-3">
                                    SJ
                                </div>
                                <div>
                                    <p className="font-semibold text-text">
                                        Sarah Johnson
                                    </p>
                                    <p className="text-sm text-text-muted">
                                        Pokémon TCG Player
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-background p-8 rounded-xl shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="text-primary">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5 inline-block"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <blockquote className="text-text-muted mb-4">
                                "As a Beyblade competitor, I needed a solution
                                to track my parts and build winning
                                combinations. Dexo delivered beyond my
                                expectations."
                            </blockquote>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold mr-3">
                                    ML
                                </div>
                                <div>
                                    <p className="font-semibold text-text">
                                        Michael Lee
                                    </p>
                                    <p className="text-sm text-text-muted">
                                        Beyblade Enthusiast
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-background p-8 rounded-xl shadow-sm">
                            <div className="flex items-center mb-4">
                                <div className="text-primary">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className="w-5 h-5 inline-block"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <blockquote className="text-text-muted mb-4">
                                "The meta trends feature has been a game-changer
                                for my competitive play. I can now stay updated
                                with the latest strategies and deck
                                compositions."
                            </blockquote>
                            <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-semibold mr-3">
                                    AR
                                </div>
                                <div>
                                    <p className="font-semibold text-text">
                                        Alex Rodriguez
                                    </p>
                                    <p className="text-sm text-text-muted">
                                        Tournament Champion
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-xl text-text-muted max-w-2xl mx-auto">
                            Choose the plan that's right for your collection and
                            competitive needs. All plans include a 14-day free
                            trial.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Free Plan */}
                        <div className="bg-surface rounded-xl shadow-sm border border-surface overflow-hidden">
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-text mb-4">
                                    Collector
                                </h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-bold text-primary">
                                        $0
                                    </span>
                                    <span className="text-text-muted ml-2">
                                        /month
                                    </span>
                                </div>
                                <p className="text-text-muted mb-6">
                                    Perfect for casual collectors just getting
                                    started.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        "Track up to 500 Pokémon cards",
                                        "Basic Beyblade parts tracking",
                                        "Create up to 5 decks/combos",
                                        "View public meta trends",
                                        "Email support",
                                    ].map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center"
                                        >
                                            <svg
                                                className="w-5 h-5 text-success mr-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-text">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register"
                                    className="block w-full text-center px-6 py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-surface rounded-xl shadow-lg border-2 border-primary relative transform md:-translate-y-4 scale-105">
                            <div className="absolute top-0 inset-x-0 bg-primary text-background text-center py-1 text-sm font-semibold">
                                MOST POPULAR
                            </div>
                            <div className="p-8 pt-10">
                                <h3 className="text-2xl font-bold text-text mb-4">
                                    Competitor
                                </h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-bold text-primary">
                                        $12
                                    </span>
                                    <span className="text-text-muted ml-2">
                                        /month
                                    </span>
                                </div>
                                <p className="text-text-muted mb-6">
                                    Ideal for serious players and competitive
                                    enthusiasts.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        "Unlimited card tracking",
                                        "Advanced deck building tools",
                                        "Full Beyblade combo analysis",
                                        "Detailed meta statistics",
                                        "Priority support",
                                        "Export/import collections",
                                        "Win rate tracking",
                                    ].map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center"
                                        >
                                            <svg
                                                className="w-5 h-5 text-success mr-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-text">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register"
                                    className="block w-full text-center px-6 py-3 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Start 14-day Trial
                                </Link>
                            </div>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="bg-surface rounded-xl shadow-sm border border-surface overflow-hidden">
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-text mb-4">
                                    Champion
                                </h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-4xl font-bold text-primary">
                                        $29
                                    </span>
                                    <span className="text-text-muted ml-2">
                                        /month
                                    </span>
                                </div>
                                <p className="text-text-muted mb-6">
                                    For tournament players and professional
                                    collectors.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        "Everything in Competitor",
                                        "AI-powered deck recommendations",
                                        "Tournament match tracking",
                                        "Advanced statistics & analytics",
                                        "Collection value estimation",
                                        "Early access to new features",
                                        "1-on-1 coaching sessions",
                                        "API access for developers",
                                    ].map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center"
                                        >
                                            <svg
                                                className="w-5 h-5 text-success mr-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-text">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/register"
                                    className="block w-full text-center px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-primary/10 transition-colors"
                                >
                                    Contact Sales
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary/10">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-primary mb-6">
                        Ready to Level Up Your Collection?
                    </h2>
                    <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
                        Join thousands of Pokémon TCG players and Beyblade
                        enthusiasts who have already made the switch to Dexo.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="px-8 py-4 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/register"
                                    className="px-8 py-4 bg-primary text-background font-medium rounded-lg hover:bg-primary/90 transition-colors"
                                >
                                    Sign Up Free
                                </Link>
                                <Link
                                    href="#"
                                    className="px-8 py-4 bg-background text-primary font-medium rounded-lg hover:bg-background/90 transition-colors"
                                >
                                    View Demo
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
