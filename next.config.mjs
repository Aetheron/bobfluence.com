/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/**"
      ),
    ],
  },
}

export default nextConfig
