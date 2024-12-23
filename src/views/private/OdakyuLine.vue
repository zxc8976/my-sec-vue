<template>
  <div class="line-info">
    <h2>小田急線</h2>
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
        <li>小田原線：新宿 - 小田原（82.5km）</li>
        <li>江ノ島線：相模大野 - 片瀬江ノ島（27.4km）</li>
        <li>多摩線：新百合ヶ丘 - 唐木田（10.6km）</li>
      </ul>
      <p>特色：連接東京都心與神奈川縣的重要私鐵</p>
      <p>主要轉乘：地下鐵、JR線、箱根登山鉄道</p>
      <p>特別列車：特急ロマンスカー</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { createDelayChecker } from '@/utils/delayCheck';

export default {
  name: 'OdakyuLine',
  setup() {
    const hasDelay = ref(false);
    const delayInfo = ref(null);
    const delayChecker = createDelayChecker('小田急', ['小田原線', '江ノ島線', '多摩線']);

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
  border-bottom: 2px solid #1C2088;
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