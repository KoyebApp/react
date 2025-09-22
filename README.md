# Additional Configuration Files

## PostCSS Config (postcss.config.js)

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## TypeScript Config (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## ESLint Config (.eslintrc.cjs)

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
```

## Environment Variables (.env.example)

```env
# API Configuration
VITE_API_BASE_URL=https://api.topaz.com
VITE_API_VERSION=v1

# Application Settings
VITE_APP_NAME=TOPAZ API Platform
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Comprehensive API Testing Platform

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_REPORTING=true
VITE_ENABLE_DEBUG_MODE=false

# External Services (Optional)
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_SENTRY_DSN=YOUR_SENTRY_DSN
```

## Project Structure

```
topaz-api-platform/
├── public/
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Table.jsx
│   │   ├── TestModal.jsx
│   │   ├── HomePage.jsx
│   │   ├── APIsPage.jsx
│   │   └── Sidebar.jsx
│   ├── config/
│   │   ├── endpoints.js
│   │   └── categories.js
│   ├── hooks/
│   │   ├── useTheme.js
│   │   ├── useLocalStorage.js
│   │   └── useAPI.js
│   ├── utils/
│   │   ├── api.js
│   │   ├── constants.js
│   │   └── helpers.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── components.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.js
└── README.md
```

## Main CSS File (src/index.css)

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground font-sans;
    font-feature-settings: "rlig" 1, "calt" 1;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  .btn {
    @apply inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background;
  }

  .btn-primary {
    @apply bg-primary text-primary-foreground hover:bg-primary/90 shadow;
  }

  .btn-secondary {
    @apply bg-secondary text-secondary-foreground hover:bg-secondary/80;
  }

  .btn-ghost {
    @apply hover:bg-accent hover:text-accent-foreground;
  }

  .card {
    @apply rounded-xl border bg-card text-card-foreground shadow-soft;
  }

  .glass {
    @apply bg-white/10 backdrop-blur-md border border-white/20;
  }

  .dark .glass {
    @apply bg-black/10 border-white/10;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-400 dark:bg-gray-600 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-500 dark:bg-gray-500;
}

/* Animation utilities */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dark mode transitions */
* {
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}
```

## HTML Template (index.html)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="TOPAZ API - Comprehensive API Testing Platform with 500+ endpoints" />
    <meta name="keywords" content="API, testing, documentation, platform, REST, endpoints" />
    <meta name="author" content="GlobalTechInfo" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://topaz-api.vercel.app/" />
    <meta property="og:title" content="TOPAZ API Platform" />
    <meta property="og:description" content="The ultimate API testing platform with 500+ endpoints" />
    <meta property="og:image" content="/og-image.png" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://topaz-api.vercel.app/" />
    <meta property="twitter:title" content="TOPAZ API Platform" />
    <meta property="twitter:description" content="The ultimate API testing platform with 500+ endpoints" />
    <meta property="twitter:image" content="/og-image.png" />

    <title>TOPAZ API Platform</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## Endpoints Configuration (src/config/endpoints.js)

```javascript
export const endpoints = {
  download: [
    { 
      name: "YouTube Audio", 
      method: "GET", 
      inputs: ["url"], 
      url: "/api/dl/ytmp3",
      status: "active",
      description: "Download audio from YouTube videos in MP3 format",
      responseType: "json",
      plan: "free",
      requiresFormData: false
    },
    { 
      name: "File Upload", 
      method: "POST", 
      inputs: ["file"], 
      url: "/api/upload",
      status: "active",
      description: "Upload and process files",
      responseType: "json",
      plan: "pro",
      requiresFormData: true
    }
    // Add more endpoints here...
  ],
  // Add more categories here...
};

export default endpoints;
```
