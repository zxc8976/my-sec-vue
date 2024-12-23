<template>
  <div class="toei-container">
    <h1>都營地下鐵路線資訊</h1>
    <div class="line-grid">
      <router-link to="/toei/asakusa" class="line-card asakusa">
        <h3>淺草線</h3>
        <p>西馬込 - 押上</p>
        <div class="status" :class="{ 'delayed': delays.asakusa }">
          {{ delays.asakusa ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>
      
      <router-link to="/toei/mita" class="line-card mita">
        <h3>三田線</h3>
        <p>目黒 - 西高島平</p>
        <div class="status" :class="{ 'delayed': delays.mita }">
          {{ delays.mita ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>
      
      <router-link to="/toei/shinjuku" class="line-card shinjuku">
        <h3>新宿線</h3>
        <p>新宿 - 本八幡</p>
        <div class="status" :class="{ 'delayed': delays.shinjuku }">
          {{ delays.shinjuku ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>
      
      <router-link to="/toei/oedo" class="line-card oedo">
        <h3>大江戶線</h3>
        <p>都庁前 - 都庁前（環狀）</p>
        <div class="status" :class="{ 'delayed': delays.oedo }">
          {{ delays.oedo ? '列車延誤' : '正常運行' }}
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
  name: 'ToeiLine',
  setup() {
    const delays = ref({
      asakusa: false,
      mita: false,
      shinjuku: false,
      oedo: false
    });

    const checkDelays = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        
        const lines = {
          asakusa: createDelayChecker('都営', ['浅草線']),
          mita: createDelayChecker('都営', ['三田線']),
          shinjuku: createDelayChecker('都営', ['新宿線']),
          oedo: createDelayChecker('都営', ['大江戸線'])
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
.toei-container {
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

.asakusa h3 {
  color: #FF9800;
}

.mita h3 {
  color: #0066CC;
}

.shinjuku h3 {
  color: #6CBE45;
}

.oedo h3 {
  color: #B6007A;
}
</style>
  