throttler/
│
├── 📁 src/
│ ├── 📁 config/
│ │ └── redisClient.js # Redis connection setup
│ │
│ ├── 📁 routes/
│ │ ├── clientRoutes.js # Public: register, check-limit
│ │ └── adminRoutes.js # Protected: client list, update limits
│ │
│ ├── 📁 middlewares/
│ │ ├── validateApiKey.js # Validates client API key
│ │ ├── validateAdminKey.js # Validates admin key
│ │ └── errorHandler.js # Centralized error handling
│ │
│ ├── 📁 services/
│ │ ├── clientService.js # Register, get/update client config
│ │ ├── rateLimiterService.js # Fixed window (and token bucket, later)
│ │ ├── usageService.js # Logs, stats, usage data
│ │ └── tierService.js # Tier logic (Free, Pro, etc.)
│ │
│ ├── 📁 utils/
│ │ ├── generateApiKey.js # Secure key generator
│ │ └── time.js # Utility: get current window etc.
│ │
│ ├── app.js # Express app setup, middlewares, routes
│ └── server.js # Entry point (starts Express server)
│
├── .env # Environment variables
├── .gitignore
├── package.json
├── README.md
└── postman_collection.json # Postman test cases (if exporting later)
