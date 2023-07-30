import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    global:{}
  },
  server:{
    proxy:{
      '/api':{
        target: 'https://i.maoyan.com', // 当遇到 /api 路径时，会将其转换成 target 的值
        changeOrigin: true,  // 如果接口跨域，需要进行这个参数配置
      }
    }
  },
  css:{
    modules:{
       // 是对css模块化的默认行为进行覆盖
       localsConvention: 'camelCase', // 修改生成的配置对象的key的展示形式(驼峰还是中划线形式)
       scopeBehaviour: 'local', // 配置当前的模块化行为是模块化还是全局化 (有hash就是开启了模块化的一个标志, 因为他可以保证产生不同的hash值来控制我们的样式类名不被覆盖)
       generateScopedName: '[name]_[local]_[hash:5]',
      //  globalModulePaths: ["./componentB.module.css"], // 代表不想参与到css模块化的路径
    }
  }
})
