<template>
  <div class="home-content">
    <div class="system-status">
      <h2>系統運行狀況</h2>
      <div class="delay-summary" v-if="hasDelays">
        <h3>目前有延誤路線：</h3>
        <div class="delay-list">
          <div v-for="(info, line) in delayedLines" :key="line" class="delay-item">
            <span class="line-name" :class="line">{{ info.name }}</span>
            <span class="delay-status">列車延誤</span>
            <p class="delay-cause" v-if="info.cause">{{ info.cause }}</p>
          </div>
        </div>
      </div>
      <div v-else class="normal-status">
        <p>目前所有路線正常運行</p>
      </div>
    </div>

    <div class="system-info">
      <h2>系統資訊</h2>
      <div class="info-grid">
        <div class="info-card metro">
          <h3>東京地下鐵</h3>
          <p>路線數：9條</p>
          <p>總站數：180站</p>
          <p>總營運里程：195.1km</p>
          <router-link to="/metro" class="more-info">查看詳情</router-link>
        </div>
        
        <div class="info-card toei">
          <h3>都營地下鐵</h3>
          <p>路線數：4條</p>
          <p>總站數：106站</p>
          <p>總營運里程：109.0km</p>
          <router-link to="/toei" class="more-info">查看詳情</router-link>
        </div>

        <div class="info-card jr">
          <h3>JR東日本</h3>
          <p>路線數：在東京都內運營13條主要路線</p>
          <p>總站數：東京都內78站</p>
          <p>山手線：29站，全長34.5km</p>
          <router-link to="/jr" class="more-info">查看詳情</router-link>
        </div>
      </div>
    </div>

    <div class="news-section">
      <h2>最新消息</h2>
      <div class="news-list">
        <div class="news-item">
          <span class="news-date">2024-01-20</span>
          <p>東京地下鐵將於3月開始實施新型IC卡系統測試</p>
        </div>
        <div class="news-item">
          <span class="news-date">2024-01-18</span>
          <p>山手線將於週末進行夜間維修工程</p>
        </div>
        <div class="news-item">
          <span class="news-date">2024-01-15</span>
          <p>都營地下鐵新型列車將於春季投入服務</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { createDelayChecker } from '@/utils/delayCheck';

export default {
  name: 'HomePage',
  setup() {
    const delayedLines = ref({});
    const hasDelays = computed(() => Object.keys(delayedLines.value).length > 0);

    const checkAllDelays = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT');
        const data = await response.json();
        
        const lines = {
          ginza: { name: '銀座線', checker: createDelayChecker('東京メトロ', ['銀座線']) },
          marunouchi: { name: '丸之內線', checker: createDelayChecker('東京メトロ', ['丸ノ内線']) },
          hibiya: { name: '日比谷線', checker: createDelayChecker('東京メトロ', ['日比谷線']) },
          tozai: { name: '東西線', checker: createDelayChecker('東京メトロ', ['東西線']) },
          chiyoda: { name: '千代田線', checker: createDelayChecker('東京メトロ', ['千代田線']) },
          yurakucho: { name: '有樂町線', checker: createDelayChecker('東京メトロ', ['有楽町線']) },
          hanzomon: { name: '半藏門線', checker: createDelayChecker('東京メトロ', ['半蔵門線']) },
          namboku: { name: '南北線', checker: createDelayChecker('東京メトロ', ['南北線']) },
          fukutoshin: { name: '副都心線', checker: createDelayChecker('東京メトロ', ['副都心線']) }
        };

        const newDelayedLines = {};
        Object.entries(lines).forEach(([key, value]) => {
          const delay = value.checker(data);
          if (delay) {
            newDelayedLines[key] = {
              name: value.name,
              cause: delay.cause
            };
          }
        });

        delayedLines.value = newDelayedLines;
      } catch (error) {
        console.error('延誤資訊獲取失敗:', error);
      }
    };

    onMounted(() => {
      checkAllDelays();
      setInterval(checkAllDelays, 300000);
    });

    return {
      delayedLines,
      hasDelays
    };
  }
};
</script>

<style scoped>
.home-content {
  display: grid;
  gap: 2rem;
}

.system-status {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.delay-summary {
  margin-top: 1rem;
}

.delay-list {
  margin-top: 1rem;
}

.delay-item {
  padding: 1rem;
  background: #fff5f5;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.line-name {
  font-weight: bold;
  margin-right: 1rem;
}

.delay-status {
  color: #e53e3e;
  font-weight: 500;
}

.delay-cause {
  margin-top: 0.5rem;
  color: #666;
}

.normal-status {
  color: #38a169;
  font-weight: 500;
  text-align: center;
  padding: 2rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.info-card h3 {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid;
}

.metro h3 {
  border-color: #00b9ef;
}

.toei h3 {
  border-color: #6cbb5a;
}

.jr h3 {
  border-color: #ff7e00;
}

.more-info {
  display: inline-block;
  margin-top: 1rem;
  color: #4299e1;
  text-decoration: none;
}

.more-info:hover {
  text-decoration: underline;
}

.news-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.news-list {
  margin-top: 1rem;
}

.news-item {
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
}

.news-date {
  color: #666;
  font-size: 0.9rem;
}

/* 路線顏色 */
.ginza { color: #FF9500; }
.marunouchi { color: #E60012; }
.hibiya { color: #9CAEB7; }
.tozai { color: #009BBF; }
.chiyoda { color: #00BB85; }
.yurakucho { color: #C1A470; }
.hanzomon { color: #8F76D6; }
.namboku { color: #00AC9B; }
.fukutoshin { color: #9C5E31; }
</style> 