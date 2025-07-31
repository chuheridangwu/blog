<template>
  <footer class="dynamic-footer">
    <div class="footer-content">
      <div class="runtime">本站已安全运行 {{ runTime }}</div>
      <div class="copyright">Copyright © 2020 - 至今</div>
      <div class="author">
        <a
          href="https://gitee.com/pandauser/Lean"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mr.Panda
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const runTime = ref("");
let timer = null;

const calculateRunTime = () => {
  const startTime = new Date("2020-01-01 00:00:00");
  const now = new Date();
  const diff = now - startTime;

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  runTime.value = `${years} 年 ${days} 天 ${hours} 小时 ${minutes} 分 ${seconds} 秒`;
};

onMounted(() => {
  calculateRunTime();
  timer = setInterval(calculateRunTime, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
.dynamic-footer {
  background: #ffffff;
  color: #333333;
  text-align: center;
  padding: 24px 16px;
  border-top: 1px solid #e5e5e5;
  margin-top: 48px;
}

.dark .dynamic-footer {
  background: #1a1a1a;
  color: #cccccc;
  border-top-color: #333333;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.runtime {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #2c3e50;
}

.dark .runtime {
  color: #e5e5e5;
}

.copyright {
  font-size: 14px;
  color: #666666;
  margin-bottom: 8px;
}

.dark .copyright {
  color: #999999;
}

.author a {
  color: #646cff;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.3s ease;
}

.author a:hover {
  color: #747bff;
  text-decoration: underline;
}

.dark .author a {
  color: #9499ff;
}

.dark .author a:hover {
  color: #a5a9ff;
}
</style>
