{
  "version": 2,
  "name": "ymca",
  "builds": [
    { "src": "api/src/app.js", "use": "@now/node" },
    {
      "src": "client/package.json",
      "use": "@now/static-build",
      "config": { "distDir": "build" }
    }
  ],
  "routes": [
    {
      "src": "/src/api/(.*)",
      "headers": { "cache-control": "s-maxage=0" },
      "dest": "api/src/app.js"
    },

    {
      "src": "/static/(.*)",
      "headers": { "cache-control": "s-maxage=31536000,immutable" },
      "dest": "frontend/static/$1"
    },
    { "src": "favicon.ico", "dest": "/frontend/favicon.ico" },
    {
      "src": "/asset-manifest.json",
      "dest": "frontend/asset-manifest.json"
    },
    { "src": "/manifest.json", "dest": "frontend/manifest.json" },
    {
      "src": "/precache-manifest.(.*)",
      "dest": "frontend/precache-manifest.$1"
    },
    {
      "src": "/service-worker.js",
      "headers": { "cache-control": "s-maxage=0" },
      "dest": "frontend/service-worker.js"
    },
    { "src": "/(.*)", "dest": "frontend/index.html" }
  ],
  "env": {
    "DB_URI": "@lah_db_uri"
  }
}