import React, { useState, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Settings({ auth, settings }) {
    const [activeTab, setActiveTab] = useState("general");
    const [formData, setFormData] = useState({
        siteName: settings?.site?.name || 'Dexo',
        siteDescription: settings?.site?.description || '',
        maintenanceMode: settings?.site?.maintenanceMode || false,
        allowRegistrations: settings?.site?.allowRegistrations || true,
        emailNotifications: settings?.notifications?.email || true,
        pushNotifications: settings?.notifications?.push || false,
        maxFileSize: settings?.uploads?.maxFileSize || 10,
        allowedFileTypes: settings?.uploads?.allowedFileTypes || ['jpg', 'png', 'gif'],
        backupFrequency: settings?.backup?.frequency || 'daily',
        retentionDays: settings?.backup?.retentionDays || 30,
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async (section) => {
        setIsSaving(true);
        try {
            await router.post('/admin/settings', {
                section: section,
                data: formData
            }, {
                onSuccess: () => {
                    // Settings saved successfully
                },
                onError: (errors) => {
                    console.error('Error saving settings:', errors);
                },
                onFinish: () => {
                    setIsSaving(false);
                }
            });
        } catch (error) {
            console.error('Error saving settings:', error);
            setIsSaving(false);
        }
    };

    return (
        <AdminLayout>
            <Head title="Settings" />

            <div className="py-6 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold text-text mb-2">
                        Platform Settings
                    </h1>
                    <p className="text-text-muted">
                        Configure platform-wide settings and preferences
                    </p>
                </div>

                {/* Tabs */}
                <div className="border-b border-surface mb-6">
                    <nav className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab("general")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "general"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            General
                        </button>
                        <button
                            onClick={() => setActiveTab("notifications")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "notifications"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Notifications
                        </button>
                        <button
                            onClick={() => setActiveTab("uploads")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "uploads"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Uploads
                        </button>
                        <button
                            onClick={() => setActiveTab("backup")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "backup"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Backup
                        </button>
                        <button
                            onClick={() => setActiveTab("security")}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === "security"
                                    ? "border-primary text-primary"
                                    : "border-transparent text-text-muted hover:text-text"
                            }`}
                        >
                            Security
                        </button>
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === "general" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Site Configuration</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text mb-2">
                                        Site Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.siteName}
                                        onChange={(e) => handleInputChange('siteName', e.target.value)}
                                        className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text mb-2">
                                        Site Description
                                    </label>
                                    <textarea
                                        value={formData.siteDescription}
                                        onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-text">Maintenance Mode</div>
                                        <div className="text-sm text-text-muted">
                                            Enable to show maintenance page to all users except admins
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleInputChange('maintenanceMode', !formData.maintenanceMode)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                            formData.maintenanceMode ? 'bg-primary' : 'bg-surface'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-background transition ${
                                                formData.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-text">Allow Registrations</div>
                                        <div className="text-sm text-text-muted">
                                            Enable new user registration on the platform
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleInputChange('allowRegistrations', !formData.allowRegistrations)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                            formData.allowRegistrations ? 'bg-primary' : 'bg-surface'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-background transition ${
                                                formData.allowRegistrations ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={() => handleSave('general')}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "notifications" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Notification Settings</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-text">Email Notifications</div>
                                        <div className="text-sm text-text-muted">
                                            Send email notifications for important events
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleInputChange('emailNotifications', !formData.emailNotifications)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                            formData.emailNotifications ? 'bg-primary' : 'bg-surface'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-background transition ${
                                                formData.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium text-text">Push Notifications</div>
                                        <div className="text-sm text-text-muted">
                                            Enable browser push notifications
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleInputChange('pushNotifications', !formData.pushNotifications)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                                            formData.pushNotifications ? 'bg-primary' : 'bg-surface'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-background transition ${
                                                formData.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={() => handleSave('notifications')}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "uploads" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">File Upload Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text mb-2">
                                        Maximum File Size (MB)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.maxFileSize}
                                        onChange={(e) => handleInputChange('maxFileSize', parseInt(e.target.value))}
                                        min="1"
                                        max="100"
                                        className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text mb-2">
                                        Allowed File Types
                                    </label>
                                    <div className="space-y-2">
                                        {['jpg', 'jpeg', 'png', 'gif', 'webp'].map((type) => (
                                            <label key={type} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.allowedFileTypes.includes(type)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            handleInputChange('allowedFileTypes', [...formData.allowedFileTypes, type]);
                                                        } else {
                                                            handleInputChange('allowedFileTypes', formData.allowedFileTypes.filter(t => t !== type));
                                                        }
                                                    }}
                                                    className="rounded border-surface text-primary focus:ring-primary mr-2"
                                                />
                                                <span className="text-text">.{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={() => handleSave('uploads')}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "backup" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Backup Configuration</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-text mb-2">
                                        Backup Frequency
                                    </label>
                                    <select
                                        value={formData.backupFrequency}
                                        onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                                        className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="hourly">Hourly</option>
                                        <option value="daily">Daily</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text mb-2">
                                        Retention Period (Days)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.retentionDays}
                                        onChange={(e) => handleInputChange('retentionDays', parseInt(e.target.value))}
                                        min="1"
                                        max="365"
                                        className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div className="flex space-x-4">
                                    <button className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition">
                                        Create Backup Now
                                    </button>
                                    <button className="px-4 py-2 bg-surface text-text rounded-lg hover:bg-surface/80 transition">
                                        View Backup History
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={() => handleSave('backup')}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "security" && (
                    <div className="space-y-6">
                        <div className="bg-surface p-6 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-text mb-4">Security Settings</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <div>
                                            <div className="font-medium text-warning">Security Notice</div>
                                            <div className="text-sm text-warning/80">
                                                Changing security settings may affect user access. Proceed with caution.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-medium text-text mb-2">Password Policy</h4>
                                        <div className="space-y-2">
                                            <label className="flex items-center">
                                                <input type="checkbox" defaultChecked className="rounded border-surface text-primary focus:ring-primary mr-2" />
                                                <span className="text-text">Require minimum 8 characters</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" defaultChecked className="rounded border-surface text-primary focus:ring-primary mr-2" />
                                                <span className="text-text">Require uppercase and lowercase letters</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" defaultChecked className="rounded border-surface text-primary focus:ring-primary mr-2" />
                                                <span className="text-text">Require numbers</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="rounded border-surface text-primary focus:ring-primary mr-2" />
                                                <span className="text-text">Require special characters</span>
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h4 className="font-medium text-text mb-2">Session Management</h4>
                                        <div className="space-y-2">
                                            <div>
                                                <label className="block text-sm text-text-muted mb-1">Session Timeout (minutes)</label>
                                                <input
                                                    type="number"
                                                    defaultValue="120"
                                                    min="5"
                                                    max="1440"
                                                    className="w-full px-4 py-2 bg-background border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                />
                                            </div>
                                            <label className="flex items-center">
                                                <input type="checkbox" defaultChecked className="rounded border-surface text-primary focus:ring-primary mr-2" />
                                                <span className="text-text">Force logout on password change</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    onClick={() => handleSave('security')}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                                >
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
