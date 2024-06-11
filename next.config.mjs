/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // 이 설정을 추가하면 src/app 디렉토리 구조를 사용할 수 있습니다.
  },
};

export default nextConfig;
