import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 滚动条显示逻辑
    if (typeof window !== 'undefined') {
      let scrollTimer: NodeJS.Timeout | null = null
      
      const handleScroll = () => {
        // 添加滚动状态类
        document.body.classList.add('scrolling')
        document.querySelector('.VPContent')?.classList.add('scrolling')
        
        // 清除之前的定时器
        if (scrollTimer) {
          clearTimeout(scrollTimer)
        }
        
        // 滚动停止后隐藏滚动条
        scrollTimer = setTimeout(() => {
          document.body.classList.remove('scrolling')
          document.querySelector('.VPContent')?.classList.remove('scrolling')
        }, 1000) // 1秒后隐藏
      }
      
      // 监听滚动事件
      window.addEventListener('scroll', handleScroll, { passive: true })
      
      // 监听内容区域滚动
      const contentEl = document.querySelector('.VPContent')
      if (contentEl) {
        contentEl.addEventListener('scroll', handleScroll, { passive: true })
      }
    }
  }
}
