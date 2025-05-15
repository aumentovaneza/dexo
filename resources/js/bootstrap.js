import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Import Ziggy for route handling
import { route } from 'ziggy-js';

// Make route function globally available
window.route = route;
