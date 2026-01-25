import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Content({ auth, content }) {
    const [activeTab, setActiveTab] = useState("cards");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectItem = (itemId) => {
        setSelectedItems(prev => 
            prev.includes(itemId) 
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handleSelectAll = () => {
        if (selectedItems.length === content?.cards?.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(content?.cards?.map(card => card.id) || []);
        }
    };

    const handleBulkAction = (action) => {
        if (selectedItems.length === 0) return;
        
        if (confirm(`Are you sure you want to ${action} ${selectedItems.length} items?`)) {
            router.post('/admin/content/bulk', {
                action: action,
                items: selectedItems
            }, {
                onSuccess: () => {
                    setSelectedItems([]);
                },
                onError: (errors) => {
                    console.error('Error performing bulk action:', errors);
                }
            });
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <AdminLayout>
            <Head title="Content Management" />

            <div className="py-6 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
                        Content Management
                    </h1>
                    <p className="text-text-muted">
                        Manage Pokemon cards, sets, and platform content
                    </p>
                </div>

                {/* Search and Actions */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search cards, sets, or content..."
                            className="w-full px-4 py-2 bg-surface border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        {selectedItems.length > 0 && (
                            <>
                                <button
                                    onClick={() => handleBulkAction('approve')}
                                    className="px-4 py-2 bg-success text-background rounded-lg hover:bg-success/90 transition"
                                >
                                    Approve ({selectedItems.length})
                                </button>
                                <button
                                    onClick={() => handleBulkAction('reject')}
                                    className="px-4 py-2 bg-danger text-background rounded-lg hover:bg-danger/90 transition"
                                >
                                    Reject ({selectedItems.length})
                                </button>
                            </>
                        )}
                        <button className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition">
                            Add Content
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-surface mb-6">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab("cards")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "cards"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Pokemon Cards
                            {content?.pendingCards > 0 && (
                                <span className="ml-2 px-2 py-1 text-xs bg-warning text-background rounded-full">
                                    {content.pendingCards}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab("sets")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "sets"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Sets
                        </button>
                        <button
                            onClick={() => setActiveTab("news")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "news"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            News & Articles
                        </button>
                        <button
                            onClick={() => setActiveTab("bans")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "bans"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Banned Content
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === "cards" && (
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                            <div className="bg-surface p-4 rounded-lg shadow">
                                <div className="text-2xl font-bold text-text">{content?.totalCards || 0}</div>
                                <div className="text-sm text-text-muted">Total Cards</div>
                            </div>
                            <div className="bg-surface p-4 rounded-lg shadow">
                                <div className="text-2xl font-bold text-warning">{content?.pendingCards || 0}</div>
                                <div className="text-sm text-text-muted">Pending Review</div>
                            </div>
                            <div className="bg-surface p-4 rounded-lg shadow">
                                <div className="text-2xl font-bold text-success">{content?.approvedCards || 0}</div>
                                <div className="text-sm text-text-muted">Approved</div>
                            </div>
                            <div className="bg-surface p-4 rounded-lg shadow">
                                <div className="text-2xl font-bold text-danger">{content?.rejectedCards || 0}</div>
                                <div className="text-sm text-text-muted">Rejected</div>
                            </div>
                        </div>

                        {/* Cards Table */}
                        <div className="bg-surface rounded-lg shadow overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-surface">
                                    <thead className="bg-surface">
                                        <tr>
                                            <th className="px-6 py-3 text-left">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.length === content?.cards?.length}
                                                    onChange={handleSelectAll}
                                                    className="rounded border-surface text-primary focus:ring-primary"
                                                />
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                                                Card
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                                                Set
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                                                Rarity
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                                                Added
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-background divide-y divide-surface">
                                        {content?.cards?.filter(card => 
                                            card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                            card.set.toLowerCase().includes(searchTerm.toLowerCase())
                                        ).map((card) => (
                                            <tr key={card.id} className="hover:bg-surface/50">
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItems.includes(card.id)}
                                                        onChange={() => handleSelectItem(card.id)}
                                                        className="rounded border-surface text-primary focus:ring-primary"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="w-12 h-16 bg-surface rounded flex items-center justify-center mr-3">
                                                            <span className="text-xs text-text-muted">Img</span>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-text">{card.name}</div>
                                                            <div className="text-sm text-text-muted">#{card.number}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-text">{card.set}</td>
                                                <td className="px-6 py-4 text-sm text-text">{card.rarity}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        card.status === 'approved' ? 'bg-success/10 text-success' :
                                                        card.status === 'pending' ? 'bg-warning/10 text-warning' :
                                                        'bg-danger/10 text-danger'
                                                    }`}>
                                                        {card.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-text-muted">
                                                    {formatDate(card.created_at)}
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <div className="flex space-x-2">
                                                        <button className="text-primary hover:text-primary/80">View</button>
                                                        <button className="text-warning hover:text-warning/80">Edit</button>
                                                        <button className="text-danger hover:text-danger/80">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) || (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-8 text-center text-text-muted">
                                                    No cards found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "sets" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Set Management</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {content?.sets?.map((set) => (
                                    <div key={set.id} className="bg-background p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="w-16 h-16 bg-surface rounded flex items-center justify-center">
                                                <span className="text-xs text-text-muted">Logo</span>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                set.status === 'active' ? 'bg-success/10 text-success' :
                                                'bg-text-muted/10 text-text-muted'
                                            }`}>
                                                {set.status}
                                            </span>
                                        </div>
                                        <h4 className="font-medium text-text mb-1">{set.name}</h4>
                                        <p className="text-sm text-text-muted mb-2">{set.series}</p>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-text-muted">{set.card_count} cards</span>
                                            <span className="text-text-muted">{formatDate(set.release_date)}</span>
                                        </div>
                                        <div className="flex space-x-2 mt-3">
                                            <button className="flex-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded hover:bg-primary/20 transition">
                                                Edit
                                            </button>
                                            <button className="flex-1 px-3 py-1 bg-surface text-text text-sm rounded hover:bg-surface/80 transition">
                                                View Cards
                                            </button>
                                        </div>
                                    </div>
                                )) || (
                                    <div className="col-span-full text-center text-text-muted py-8">
                                        No sets found
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "news" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-text">News & Articles</h3>
                                <button className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition">
                                    Create Article
                                </button>
                            </div>
                            <div className="space-y-4">
                                {content?.articles?.map((article) => (
                                    <div key={article.id} className="bg-background p-4 rounded-lg">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className="font-medium text-text mb-1">{article.title}</h4>
                                                <p className="text-sm text-text-muted mb-2">{article.excerpt}</p>
                                                <div className="flex items-center space-x-4 text-sm text-text-muted">
                                                    <span>By {article.author}</span>
                                                    <span>{formatDate(article.published_at)}</span>
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        article.status === 'published' ? 'bg-success/10 text-success' :
                                                        article.status === 'draft' ? 'bg-warning/10 text-warning' :
                                                        'bg-text-muted/10 text-text-muted'
                                                    }`}>
                                                        {article.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 ml-4">
                                                <button className="text-primary hover:text-primary/80">Edit</button>
                                                <button className="text-danger hover:text-danger/80">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )) || (
                                    <div className="text-center text-text-muted py-8">
                                        No articles found
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "bans" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Banned Content</h3>
                            <div className="space-y-4">
                                {content?.bannedItems?.map((item) => (
                                    <div key={item.id} className="bg-background p-4 rounded-lg border-l-4 border-danger">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                        item.type === 'card' ? 'bg-blue/10 text-blue' :
                                                        item.type === 'user' ? 'bg-purple/10 text-purple' :
                                                        'bg-orange/10 text-orange'
                                                    }`}>
                                                        {item.type}
                                                    </span>
                                                    <span className="text-sm text-text-muted">
                                                        Banned on {formatDate(item.banned_at)}
                                                    </span>
                                                </div>
                                                <h4 className="font-medium text-text mb-1">{item.name}</h4>
                                                <p className="text-sm text-text-muted mb-2">{item.reason}</p>
                                                <div className="text-sm text-text-muted">
                                                    Banned by: {item.banned_by}
                                                </div>
                                            </div>
                                            <div className="flex space-x-2 ml-4">
                                                <button className="text-warning hover:text-warning/80">Review</button>
                                                <button className="text-success hover:text-success/80">Unban</button>
                                            </div>
                                        </div>
                                    </div>
                                )) || (
                                    <div className="text-center text-text-muted py-8">
                                        No banned content found
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
