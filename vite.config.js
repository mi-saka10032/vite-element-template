import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { VitePWA } from 'vite-plugin-pwa'
import compressPlugin from 'vite-plugin-compression'

// compress: 'gzip' | 'brotli' | 'none'
function configCompressPlugin(isBuild, compress) {
  const plugins = []
  if (!isBuild) return plugins
  const compressList = compress.split(',')
  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    )
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'brotliCompress',
        ext: '.br'
      })
    )
  }
  return plugins
}

export default ({ mode }) => {
  const isBuild = mode === 'production' // mode == production
  const port = loadEnv(mode, process.cwd()).PORT || 9528 // dev port
  return defineConfig({
    plugins: [
      createVuePlugin(),
      vueJsx(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      VitePWA({
        includeAssets: ['favicon.svg'],
        manifest: false,
        registerType: 'autoUpdate',
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /someInterface/i, // 接口缓存 此处填你想缓存的接口正则匹配
              handler: 'CacheFirst',
              options: {
                cacheName: 'interface-cache'
              }
            },
            {
              urlPattern: /(.*?)\.(js|css|ts)/, // js /css /ts静态资源缓存
              handler: 'CacheFirst',
              options: {
                cacheName: 'js-css-cache'
              }
            },
            {
              urlPattern: /(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/, // 图片缓存
              handler: 'CacheFirst',
              options: {
                cacheName: 'image-cache'
              }
            }
          ]
        }
      }),
      ...configCompressPlugin(isBuild, 'gzip')
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    base: '/',
    server: {
      port,
      open: true,
      hmr: { overlay: false }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'static',
      sourcemap: false,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks(id) { // 静态资源分拆打包
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isBuild, // 打包时删除log
          drop_debugger: isBuild, // 打包时删除debugger
          pure_funcs: isBuild ? ['console.log'] : []
        },
        output: {
          comments: isBuild // 去掉注释
        }
      }
    }
  })
}
