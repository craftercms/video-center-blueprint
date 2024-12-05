import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => ({
    base: command === 'serve' ? '/' : '/static-assets/app',
    plugins: [react()],
    server: {
        open: true,
        port: 3000,
        cors: true,
        host: true,
        proxy: {
            '/static-assets/': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
          '/api/': {
            target: 'http://localhost:8080',
            changeOrigin: true,
            secure: false,
            ws: true,
          }
        }
    },
    build: {
        emptyOutDir: true,
        outDir: '../../static-assets/app',
        minify: true
    }
}))
