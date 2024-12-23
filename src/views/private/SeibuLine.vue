<template>
  <div class="line-info">
    <h2>西武線</h2>
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
      <p>主要路線：</p>
      <ul>
        <li>池袋線：池袋 - 飯能（43.7km）</li>
        <li>新宿線：西武新宿 - 本川越（47.5km）</li>
        <li>西武有楽町線：小竹向原 - 新木場（8.5km）</li>
        <li>山口線：西武球場前 - 西武園（2.8km）</li>
      </ul>
      <p>特色：連接東京都心與埼玉縣的大型私鐵系統</p>
      <p>主要轉乘：地下鐵、JR線、東武線</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { createDelayChecker } from '@/utils/delayCheck';

export default {
  name: 'SeibuLine',
  setup() {
    const hasDelay = ref(false);
    const delayInfo = ref(null);
    const delayChecker = createDelayChecker('西武', ['池袋線', '新宿線', '有楽町線']);

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
  border-bottom: 2px solid #00A7DB;
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

ul {
  margin: 8px 0;
  padding-left: 20px;
  color: #555;
}

li {
  margin: 4px 0;
}
</style> 