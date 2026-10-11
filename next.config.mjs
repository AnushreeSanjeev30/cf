/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Interim: photos are served from the old WordPress site until the client's
    // new photography lands in /public/images. Remove this once it does.
    remotePatterns: [
      { protocol: "https", hostname: "canaraflex.com", pathname: "/wp-content/uploads/**" },
    ],
  },
};
export default nextConfig;
