import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/React-Quiz-App/", // github repo name (CI/CD Pipeline 配置 非常重要！！！)
  plugins: [react()],
})
