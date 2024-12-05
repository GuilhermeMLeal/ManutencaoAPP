/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
<<<<<<< HEAD
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
=======
      ignoreDuringBuilds: true, // Ignora erros de lint no build
    },
    typescript: {
      ignoreBuildErrors: true, // Ignora erros de tipagem no build
>>>>>>> 062ca9c1753ea766a7d56f37e3fa73a28a7f8e85
    },
  };
  
  export default nextConfig;  