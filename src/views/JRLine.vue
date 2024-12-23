<template>
  <div class="jr-container">
    <h1>JR路線資訊</h1>
    <div class="line-grid">
      <router-link to="/jr/yamanote" class="line-card yamanote">
        <h3>山手線</h3>
        <p>環狀運行</p>
        <div class="status" :class="{ 'delayed': delays.yamanote }">
          {{ delays.yamanote ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>
      
      <router-link to="/jr/chuo-sobu" class="line-card chuo-sobu">
        <h3>中央總武線</h3>
        <p>東京 - 三鷹/千葉</p>
        <div class="status" :class="{ 'delayed': delays.chuoSobu }">
          {{ delays.chuoSobu ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>
      
      <router-link to="/jr/keihin" class="line-card keihin">
        <h3>京濱東北線</h3>
        <p>大宮 - 橫濱</p>
        <div class="status" :class="{ 'delayed': delays.keihin }">
          {{ delays.keihin ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>
      
      <router-link to="/jr/saikyo" class="line-card saikyo">
        <h3>埼京線</h3>
        <p>大宮 - 新宿</p>
        <div class="status" :class="{ 'delayed': delays.saikyo }">
          {{ delays.saikyo ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>

      <router-link to="/jr/shonan" class="line-card shonan">
        <h3>湘南新宿線</h3>
        <p>大宮 - 大船</p>
        <div class="status" :class="{ 'delayed': delays.shonan }">
          {{ delays.shonan ? '列車延誤' : '正常運行' }}
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
  name: 'JRLine',
  setup() {
    const delays = ref({
      yamanote: false,
      chuoSobu: false,
      keihin: false,
      saikyo: false,
      shonan: false
    });

    const checkDelays = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        
        const lines = {
          yamanote: createDelayChecker('JR', ['山手線']),
          chuoSobu: createDelayChecker('JR', ['中央線', '総武線']),
          keihin: createDelayChecker('JR', ['京浜東北線']),
          saikyo: createDelayChecker('JR', ['埼京線']),
          shonan: createDelayChecker('JR', ['湘南新宿ライン'])
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
.jr-container {
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

.yamanote h3 {
  color: #9ACD32;
}

.chuo-sobu h3 {
  color: #FFA500;
}

.keihin h3 {
  color: #00BFFF;
}

.saikyo h3 {
  color: #2E8B57;
}

.shonan h3 {
  color: #4169E1;
}
</style>
