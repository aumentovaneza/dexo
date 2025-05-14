<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Tailwind Colors</title>
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>
<body class="p-8">
    <h1 class="text-3xl font-bold mb-6">Tailwind Color Test</h1>
    
    <h2 class="text-2xl font-bold mt-6 mb-4">Tailwind Classes</h2>
    <div class="space-y-4">
        <!-- Custom Colors from Config -->
        <div class="p-4 bg-primary text-background rounded">Primary Background</div>
        <div class="p-4 bg-secondary text-background rounded">Secondary Background</div>
        <div class="p-4 bg-background text-text rounded">Background with Text</div>
        <div class="p-4 bg-surface text-text rounded">Surface with Text</div>
        <div class="p-4 bg-white">
            <p class="text-text">Default Text</p>
            <p class="text-text-muted">Muted Text</p>
        </div>
        <div class="p-4 bg-danger text-white rounded">Danger</div>
        <div class="p-4 bg-success text-white rounded">Success</div>
        
        <!-- Default Tailwind Colors -->
        <div class="p-4 bg-blue-500 text-white rounded">Tailwind Blue</div>
        <div class="p-4 bg-red-500 text-white rounded">Tailwind Red</div>
        <div class="p-4 bg-green-500 text-white rounded">Tailwind Green</div>
    </div>
    
    <h2 class="text-2xl font-bold mt-8 mb-4">Fallback Classes</h2>
    <div class="space-y-4">
        <!-- Fallback Custom Colors -->
        <div class="p-4 bg-primary-fallback text-background-fallback rounded">Primary Background (Fallback)</div>
        <div class="p-4 bg-secondary-fallback text-background-fallback rounded">Secondary Background (Fallback)</div>
        <div class="p-4 bg-background-fallback text-text-fallback rounded">Background with Text (Fallback)</div>
        <div class="p-4 bg-surface-fallback text-text-fallback rounded">Surface with Text (Fallback)</div>
        <div class="p-4 bg-white">
            <p class="text-text-fallback">Default Text (Fallback)</p>
            <p class="text-text-muted-fallback">Muted Text (Fallback)</p>
        </div>
    </div>
</body>
</html> 