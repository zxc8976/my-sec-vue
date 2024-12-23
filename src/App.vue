<template>
  <div class="app-container">
    <nav class="main-nav">
      <router-link to="/" class="nav-logo">東京鐵路即時資訊</router-link>
      <div class="nav-menu">
        <el-menu mode="horizontal" router :default-active="activeIndex">
          <!-- Metro 下拉選單 -->
          <el-sub-menu index="/metro">
            <template #title>地下鐵</template>
            <el-menu-item index="/metro/ginza">銀座線</el-menu-item>
            <el-menu-item index="/metro/marunouchi">丸之內線</el-menu-item>
            <el-menu-item index="/metro/hibiya">日比谷線</el-menu-item>
            <el-menu-item index="/metro/tozai">東西線</el-menu-item>
            <el-menu-item index="/metro/chiyoda">千代田線</el-menu-item>
            <el-menu-item index="/metro/yurakucho">有樂町線</el-menu-item>
            <el-menu-item index="/metro/hanzomon">半藏門線</el-menu-item>
            <el-menu-item index="/metro/namboku">南北線</el-menu-item>
            <el-menu-item index="/metro/fukutoshin">副都心線</el-menu-item>
          </el-sub-menu>

          <!-- 都營地下鐵下拉選單 -->
          <el-sub-menu index="/toei">
            <template #title>都營地下鐵</template>
            <el-menu-item index="/toei/asakusa">淺草線</el-menu-item>
            <el-menu-item index="/toei/mita">三田線</el-menu-item>
            <el-menu-item index="/toei/shinjuku">新宿線</el-menu-item>
            <el-menu-item index="/toei/oedo">大江戶線</el-menu-item>
          </el-sub-menu>

          <!-- JR 下拉選單 -->
          <el-sub-menu index="/jr">
            <template #title>JR線路</template>
            <el-menu-item index="/jr/yamanote">山手線</el-menu-item>
            <el-menu-item index="/jr/chuo-sobu">中央總武線</el-menu-item>
            <el-menu-item index="/jr/keihin">京濱東北線</el-menu-item>
            <el-menu-item index="/jr/saikyo">埼京線</el-menu-item>
            <el-menu-item index="/jr/shonan">湘南新宿線</el-menu-item>
          </el-sub-menu>

          <!-- 私鐵下拉選單 -->
          <el-sub-menu index="/private">
            <template #title>私鐵</template>
            <el-menu-item index="/private/keio">京王電鐵</el-menu-item>
            <el-menu-item index="/private/tokyu">東急電鐵</el-menu-item>
            <el-menu-item index="/private/seibu">西武鐵道</el-menu-item>
            <el-menu-item index="/private/tobu">東武鐵道</el-menu-item>
            <el-menu-item index="/private/odakyu">小田急電鐵</el-menu-item>
            <el-menu-item index="/private/keisei">京成電鐵</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </nav>

    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'App',
  setup() {
    const route = useRoute();
    const activeIndex = ref('/');

    watch(
      () => route.path,
      (newPath) => {
        activeIndex.value = newPath;
      }
    );

    return {
      activeIndex
    };
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

.app-container {
  min-height: 100vh;
}

.main-nav {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-logo {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  margin-right: 2rem;
}

.nav-menu {
  flex: 1;
}

.el-menu {
  border-bottom: none !important;
}

.el-menu--horizontal {
  border-bottom: none;
}

.el-menu--horizontal > .el-menu-item,
.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  height: 60px;
  line-height: 60px;
  color: #333;
  padding: 0 20px;
}

.el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title {
  border-bottom: 2px solid #409EFF;
  color: #409EFF;
}

.el-menu--horizontal > .el-sub-menu:hover .el-sub-menu__title {
  color: #409EFF;
}

.el-menu--popup {
  min-width: 200px;
}

.el-menu--popup .el-menu-item {
  height: 40px;
  line-height: 40px;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
