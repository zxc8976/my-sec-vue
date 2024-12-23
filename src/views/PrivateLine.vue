<template>
  <div class="private-container">
    <h1>私鐵路線資訊</h1>
    <div class="line-grid">
      <router-link to="/private/keio" class="line-card keio">
        <h3>京王線</h3>
        <p>新宿 - 京王八王子</p>
        <div class="status" :class="{ 'delayed': delays.keio }">
          {{ delays.keio ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>
      
      <router-link to="/private/tokyu" class="line-card tokyu">
        <h3>東急線</h3>
        <p>多條路線網絡</p>
        <div class="status" :class="{ 'delayed': delays.tokyu }">
          {{ delays.tokyu ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>
      
      <router-link to="/private/seibu" class="line-card seibu">
        <h3>西武線</h3>
        <p>池袋/新宿 - 多個方向</p>
        <div class="status" :class="{ 'delayed': delays.seibu }">
          {{ delays.seibu ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>
      
      <router-link to="/private/tobu" class="line-card tobu">
        <h3>東武線</h3>
        <p>多條路線網絡</p>
        <div class="status" :class="{ 'delayed': delays.tobu }">
          {{ delays.tobu ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>

      <router-link to="/private/odakyu" class="line-card odakyu">
        <h3>小田急線</h3>
        <p>新宿 - 小田原/江ノ島</p>
        <div class="status" :class="{ 'delayed': delays.odakyu }">
          {{ delays.odakyu ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>

      <router-link to="/private/keisei" class="line-card keisei">
        <h3>京成線</h3>
        <p>上野/押上 - 成田空港</p>
        <div class="status" :class="{ 'delayed': delays.keisei }">
          {{ delays.keisei ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { createDelayChecker } from '@/utils/delayCheck';

export default {
  name: 'PrivateLine',
  setup() {
    const delays = ref({
      keio: false,
      tokyu: false,
      seibu: false,
      tobu: false,
      odakyu: false,
      keisei: false
    });

    const checkDelays = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        
        const lines = {
          keio: createDelayChecker('京王', ['京王線']),
          tokyu: createDelayChecker('東急', ['東横線', '田園都市線', '大井町線', '目黒線']),
          seibu: createDelayChecker('西武', ['池袋線', '新宿線', '有楽町線']),
          tobu: createDelayChecker('東武', ['東上線', '伊勢崎線', '日光線', '野田線']),
          odakyu: createDelayChecker('小田急', ['小田原線', '江ノ島線', '多摩線']),
          keisei: createDelayChecker('京成', ['本線', '押上線', 'スカイアクセス'])
        };

        Object.keys(lines).forEach(line => {
          delays.value[line] = !!lines[line](data);
        });
      } catch (error) {
        console.error('延誤資訊獲取失敗:', error);
      }
    };

    onMounted(() => {
      checkDelays();
      setInterval(checkDelays, 300000);
    });

    return {
      delays
    };
  }
};
</script>

<style scoped>
.private-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.line-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.line-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.line-card:hover {
  transform: translateY(-5px);
}

.line-card h3 {
  margin: 0 0 10px 0;
  font-size: 1.2em;
}

.line-card p {
  margin: 0 0 15px 0;
  color: #666;
}

.status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  font-size: 0.9em;
}

.status.delayed {
  background-color: #f44336;
}

.keio h3 {
  color: #DD1C1A;
}

.tokyu h3 {
  color: #E60012;
}

.seibu h3 {
  color: #00A7DB;
}

.tobu h3 {
  color: #0067C0;
}

.odakyu h3 {
  color: #1C2088;
}

.keisei h3 {
  color: #FF4500;
}
</style> 