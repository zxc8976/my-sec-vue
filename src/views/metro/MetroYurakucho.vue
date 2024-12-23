<template>
  <div class="yurakucho-line">
    <h2>有樂町線</h2>
    <el-table :data="stations" style="width: 100%">
      <el-table-column prop="code" label="站號" width="100" />
      <el-table-column prop="name" label="站名" width="180" />
      <el-table-column prop="nameEn" label="英文站名" width="180" />
      <el-table-column prop="transfer" label="轉乘路線" />
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const stations = ref([
  {
    code: 'Y01',
    name: '和光市',
    nameEn: 'Wakoshi',
    transfer: '東武東上線'
  }
]);
</script>

<style scoped>
.yurakucho-line {
  padding: 20px;
}
</style> 