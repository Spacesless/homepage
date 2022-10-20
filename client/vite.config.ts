import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          resolveIcons: true
        })
      ],
      dts: true
    }),
    viteCompression()
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/styles/settings/variables.less";'
      }
    }
  }
})
