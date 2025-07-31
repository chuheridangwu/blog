import 'virtual:group-icons.css'; //代码组样式
import googleAnalytics from 'vitepress-plugin-google-analytics'
import DefaultTheme from 'vitepress/theme'
import { h, nextTick } from 'vue'
import DynamicFooter from './components/DynamicFooter.vue'
import './custom.css'
import './style/vp-code-group.css'

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => {
        if (typeof window !== 'undefined') {
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
    app.component('DynamicFooter', DynamicFooter)

     googleAnalytics({
      id: 'G-7KBSX9XX3Z', //跟踪ID，在analytics.google.com注册即可
    })
    
    if (typeof window !== 'undefined') {
      router.onAfterRouteChanged = () => {
        nextTick(() => {
          const hasSidebar = document.querySelector('.VPSidebar') !== null
          const footerEl = document.querySelector('.dynamic-footer') as HTMLElement
          if (footerEl) {
            footerEl.style.display = hasSidebar ? 'none' : 'block'
          }
          
          // 重新绑定图片点击事件
          initImageZoom()
        })
      }
      
      // 初始化图片放大功能
      nextTick(() => {
        initImageZoom()
      })
      
      // 滚动条显示逻辑
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

// 图片放大功能
function initImageZoom() {
  const images = document.querySelectorAll('.vp-doc img')
  
  images.forEach(img => {
    img.removeEventListener('click', handleImageClick)
    img.addEventListener('click', handleImageClick)
  })
}

function handleImageClick(e: Event) {
  const img = e.target as HTMLImageElement
  const overlay = document.createElement('div')
  overlay.className = 'image-overlay'
  
  const clonedImg = img.cloneNode(true) as HTMLImageElement
  overlay.appendChild(clonedImg)
  
  document.body.appendChild(overlay)
  document.body.style.overflow = 'hidden'
  
  // 显示动画
  requestAnimationFrame(() => {
    overlay.classList.add('show')
  })
  
  // 点击关闭
  overlay.addEventListener('click', () => {
    overlay.classList.remove('show')
    setTimeout(() => {
      document.body.removeChild(overlay)
      document.body.style.overflow = ''
    }, 300)
  })
  
  // ESC键关闭
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      overlay.click()
      document.removeEventListener('keydown', handleKeyDown)
    }
  }
  document.addEventListener('keydown', handleKeyDown)
}
