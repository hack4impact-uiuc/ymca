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
      "dest": "client/static/$1"
    },
    { "src": "favicon.ico", "dest": "/client/favicon.ico" },
    {
      "src": "/asset-manifest.json",
      "dest": "client/asset-manifest.json"
    },
    { "src": "/manifest.json", "dest": "client/manifest.json" },
    {
      "src": "/precache-manifest.(.*)",
      "dest": "client/precache-manifest.$1"
    },
    {
      "src": "/service-worker.js",
      "headers": { "cache-control": "s-maxage=0" },
      "dest": "client/service-worker.js"
    },
    { "src": "/(.*)", "dest": "client/index.html" }
  ],
  "env": {
    "DB_URI": "@lah_db_uri"
  }
}