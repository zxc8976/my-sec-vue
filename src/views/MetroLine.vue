<template>
  <div class="metro-container">
    <h1>東京地下鐵路線資訊</h1>
    <div class="line-grid">
      <router-link to="/metro/ginza" class="line-card ginza">
        <h3>銀座線</h3>
        <p>淺草 - 渋谷</p>
        <div class="status" :class="{ 'delayed': delays.ginza }">
          {{ delays.ginza ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>
      
      <router-link to="/metro/marunouchi" class="line-card marunouchi">
        <h3>丸之內線</h3>
        <p>池袋 - 荻窪</p>
        <div class="status" :class="{ 'delayed': delays.marunouchi }">
          {{ delays.marunouchi ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>
      
      <router-link to="/metro/hibiya" class="line-card hibiya">
        <h3>日比谷線</h3>
        <p>北千住 - 中目黒</p>
        <div class="status" :class="{ 'delayed': delays.hibiya }">
          {{ delays.hibiya ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>
      
      <router-link to="/metro/tozai" class="line-card tozai">
        <h3>東西線</h3>
        <p>中野 - 西船橋</p>
        <div class="status" :class="{ 'delayed': delays.tozai }">
          {{ delays.tozai ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>

      <router-link to="/metro/chiyoda" class="line-card chiyoda">
        <h3>千代田線</h3>
        <p>北綾瀬 - 代々木上原</p>
        <div class="status" :class="{ 'delayed': delays.chiyoda }">
          {{ delays.chiyoda ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>

      <router-link to="/metro/yurakucho" class="line-card yurakucho">
        <h3>有樂町線</h3>
        <p>和光市 - 新木場</p>
        <div class="status" :class="{ 'delayed': delays.yurakucho }">
          {{ delays.yurakucho ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>

      <router-link to="/metro/hanzomon" class="line-card hanzomon">
        <h3>半藏門線</h3>
        <p>渋谷 - 押上</p>
        <div class="status" :class="{ 'delayed': delays.hanzomon }">
          {{ delays.hanzomon ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>

      <router-link to="/metro/namboku" class="line-card namboku">
        <h3>南北線</h3>
        <p>目黒 - 赤羽岩淵</p>
        <div class="status" :class="{ 'delayed': delays.namboku }">
          {{ delays.namboku ? '列車延誤' : '正常運行' }}
        </div>
      </router-link>

      <router-link to="/metro/fukutoshin" class="line-card fukutoshin">
        <h3>副都心線</h3>
        <p>和光市 - 渋谷</p>
        <div class="status" :class="{ 'delayed': delays.fukutoshin }">
          {{ delays.fukutoshin ? '列車延誤' : '正常運行' }}
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
  name: 'MetroLine',
  setup() {
    const delays = ref({
      ginza: false,
      marunouchi: false,
      hibiya: false,
      tozai: false,
      chiyoda: false,
      yurakucho: false,
      hanzomon: false,
      namboku: false,
      fukutoshin: false
    });

    const checkDelays = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        
        const lines = {
          ginza: createDelayChecker('東京メトロ', ['銀座線']),
          marunouchi: createDelayChecker('東京メトロ', ['丸ノ内線']),
          hibiya: createDelayChecker('東京メトロ', ['日比谷線']),
          tozai: createDelayChecker('東京メトロ', ['東西線']),
          chiyoda: createDelayChecker('東京メトロ', ['千代田線']),
          yurakucho: createDelayChecker('東京メトロ', ['有楽町線']),
          hanzomon: createDelayChecker('東京メトロ', ['半蔵門線']),
          namboku: createDelayChecker('東京メトロ', ['南北線']),
          fukutoshin: createDelayChecker('東京メトロ', ['副都心線'])
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
.metro-container {
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

.ginza h3 {
  color: #FF9500;
}

.marunouchi h3 {
  color: #E60012;
}

.hibiya h3 {
  color: #9CAEB7;
}

.tozai h3 {
  color: #009BBF;
}

.chiyoda h3 {
  color: #00BB85;
}

.yurakucho h3 {
  color: #C1A470;
}

.hanzomon h3 {
  color: #8F76D6;
}

.namboku h3 {
  color: #00AC9B;
}

.fukutoshin h3 {
  color: #9C5E31;
}
</style>
  