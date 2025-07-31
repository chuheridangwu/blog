import DefaultTheme from 'vitepress/theme'
import { h, nextTick } from 'vue'
import DynamicFooter from './components/DynamicFooter.vue'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => {
        // 检查当前页面是否有侧边栏
        if (typeof window !== 'undefined') {
          // 使用 nextTick 确保 DOM 已渲染
          nextTick(() => {
            const hasSidebar = document.querySelector('.VPSidebar') !== null
            const footerEl = document.querySelector('.dynamic-footer') as HTMLElement
            if (footerEl) {
              footerEl.style.display = hasSidebar ? 'none' : 'block'
            }
          })
        }
        return h(DynamicFooter)
      }
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('DynamicFooter', DynamicFooter)
    
    // 监听路由变化，重新检查侧边栏
    if (typeof window !== 'undefined') {
      router.onAfterRouteChanged = () => {
        nextTick(() => {
          const hasSidebar = document.querySelector('.VPSidebar') !== null
          const footerEl = document.querySelector('.dynamic-footer') as HTMLElement
          if (footerEl) {
            footerEl.style.display = hasSidebar ? 'none' : 'block'
          }
        })
      }
    }
    
    // 滚动条显示逻辑
    if (typeof window !== 'undefined') {
      let scrollTimer: NodeJS.Timeout | null = null
      
      const handleScroll = () => {
        document.body.classList.add('scrolling')
        document.querySelector('.VPContent')?.classList.add('scrolling')
        
        if (scrollTimer) {
          clearTimeout(scrollTimer)
        }
        
        scrollTimer = setTimeout(() => {
          document.body.classList.remove('scrolling')
          document.querySelector('.VPContent')?.classList.remove('scrolling')
        }, 1000)
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      
      const contentEl = document.querySelector('.VPContent')
      if (contentEl) {
        contentEl.addEventListener('scroll', handleScroll, { passive: true })
      }
    }
  }
}
