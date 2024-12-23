<template>
  <div class="chiyoda-line">
    <h2>千代田線</h2>
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
    code: 'C01',
    name: '代々木上原',
    nameEn: 'Yoyogi-Uehara',
    transfer: '小田急小田原線'
  }
]);
</script>

<style scoped>
.chiyoda-line {
  padding: 20px;
}
</style> 