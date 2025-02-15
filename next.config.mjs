/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Content-Security-Policy",
              value: [
                "default-src 'self';",
                "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://clerk.accounts.dev https://scdn.clerk.com https://js.sentry-cdn.com https://tender-gator-38.clerk.accounts.dev;",
                "worker-src 'self' blob:;",
                "connect-src 'self' https://clerk.accounts.dev https://scdn.clerk.com https://tender-gator-38.clerk.accounts.dev;",
                "img-src 'self' data: https://clerk.accounts.dev https://scdn.clerk.com https://img.clerk.com;",
                "style-src 'self' 'unsafe-inline' https://scdn.clerk.com;",
                "frame-src 'self' https://clerk.accounts.dev https://scdn.clerk.com;",
              ].join(" "),
            },
            {
              key: "X-Content-Type-Options",
              value: "nosniff",
            },
            {
              key: "Referrer-Policy",
              value: "strict-origin-when-cross-origin",
            },
          ],
        },
      ];
    },
  
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = { fs: false };
      }
      return config;
    },
  };
  
  export default nextConfig;
  