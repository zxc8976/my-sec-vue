<template>
  <div class="line-info">
    <h2>JR埼京線</h2>
    <div class="status-container">
      <div :class="['status-indicator', { 'delayed': hasDelay }]">
        {{ hasDelay ? '列車延誤' : '正常運行' }}
      </div>
      <div class="details" v-if="hasDelay">
        <p>{{ delayInfo?.cause || '原因調查中' }}</p>
      </div>
    </div>
    <div class="line-details">
      <h3>路線資訊</h3>
      <p>路線長度：36.9km</p>
      <p>站點數：20站</p>
      <p>起點站：大宮站</p>
      <p>終點站：新宿站（部分列車延伸至涉谷站）</p>
      <p>特色：連接埼玉與東京的重要通勤線路</p>
      <p>主要站點：大宮、赤羽、池袋、新宿</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { createDelayChecker } from '@/utils/delayCheck';

export default {
  name: 'JRSaikyo',
  setup() {
    const hasDelay = ref(false);
    const delayInfo = ref(null);
    const delayChecker = createDelayChecker('JR', ['埼京線']);

    const checkDelay = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        const delay = delayChecker(data);
        hasDelay.value = !!delay;
        delayInfo.value = delay;
      } catch (error) {
        console.error('延誤資訊獲取失敗:', error);
      }
    };

    onMounted(() => {
      checkDelay();
      setInterval(checkDelay, 300000);
    });

    return {
      hasDelay,
      delayInfo
    };
  }
};
</script>

<style scoped>
.line-info {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.status-container {
  margin: 20px 0;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
}

.status-indicator {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
}

.status-indicator.delayed {
  background-color: #f44336;
}

.details {
  margin-top: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
}

.line-details {
  margin-top: 20px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

h2 {
  color: #333;
  border-bottom: 2px solid #2E8B57;
  padding-bottom: 10px;
}

h3 {
  color: #666;
  margin-bottom: 15px;
}

p {
  margin: 8px 0;
  color: #555;
}
</style> 