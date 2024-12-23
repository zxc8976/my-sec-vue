import { createRouter, createWebHistory } from 'vue-router';

// Metro 路線
import MetroLine from '@/views/MetroLine.vue';
import MetroGinza from '@/views/metro/MetroGinza.vue';
import MetroMarunouchi from '@/views/metro/MetroMarunouchi.vue';
import MetroHibiya from '@/views/metro/MetroHibiya.vue';
import MetroTozai from '@/views/metro/MetroTozai.vue';
import MetroChiyoda from '@/views/metro/MetroChiyoda.vue';
import MetroYurakucho from '@/views/metro/MetroYurakucho.vue';
import MetroHanzomon from '@/views/metro/MetroHanzomon.vue';
import MetroNamboku from '@/views/metro/MetroNamboku.vue';
import MetroFukutoshin from '@/views/metro/MetroFukutoshin.vue';

// 都營地下鐵路線
import ToeiLine from '@/views/ToeiLine.vue';
import ToeiAsakusa from '@/views/toei/ToeiAsakusa.vue';
import ToeiMita from '@/views/toei/ToeiMita.vue';
import ToeiShinjuku from '@/views/toei/ToeiShinjuku.vue';
import ToeiOedo from '@/views/toei/ToeiOedo.vue';

// JR 路線
import JRLine from '@/views/JRLine.vue';
import JRYamanote from '@/views/jr/JRYamanote.vue';
import JRChuoSobu from '@/views/jr/JRChuoSobu.vue';
import JRKeihin from '@/views/jr/JRKeihin.vue';
import JRSaikyo from '@/views/jr/JRSaikyo.vue';
import JRShonan from '@/views/jr/JRShonan.vue';

// 私鐵路線
import PrivateLine from '@/views/PrivateLine.vue';
import KeioLine from '@/views/private/KeioLine.vue';
import TokyuLine from '@/views/private/TokyuLine.vue';
import SeibuLine from '@/views/private/SeibuLine.vue';
import TobuLine from '@/views/private/TobuLine.vue';
import OdakyuLine from '@/views/private/OdakyuLine.vue';
import KeiseiLine from '@/views/private/KeiseiLine.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/metro',
    name: 'Metro',
    component: MetroLine,
    children: [
      { path: 'ginza', component: MetroGinza },
      { path: 'marunouchi', component: MetroMarunouchi },
      { path: 'hibiya', component: MetroHibiya },
      { path: 'tozai', component: MetroTozai },
      { path: 'chiyoda', component: MetroChiyoda },
      { path: 'yurakucho', component: MetroYurakucho },
      { path: 'hanzomon', component: MetroHanzomon },
      { path: 'namboku', component: MetroNamboku },
      { path: 'fukutoshin', component: MetroFukutoshin }
    ]
  },
  {
    path: '/toei',
    name: 'Toei',
    component: ToeiLine,
    children: [
      { path: 'asakusa', component: ToeiAsakusa },
      { path: 'mita', component: ToeiMita },
      { path: 'shinjuku', component: ToeiShinjuku },
      { path: 'oedo', component: ToeiOedo }
    ]
  },
  {
    path: '/jr',
    name: 'JR',
    component: JRLine,
    children: [
      { path: 'yamanote', component: JRYamanote },
      { path: 'chuo-sobu', component: JRChuoSobu },
      { path: 'keihin', component: JRKeihin },
      { path: 'saikyo', component: JRSaikyo },
      { path: 'shonan', component: JRShonan }
    ]
  },
  {
    path: '/private',
    name: 'Private',
    component: PrivateLine,
    children: [
      { path: 'keio', component: KeioLine },
      { path: 'tokyu', component: TokyuLine },
      { path: 'seibu', component: SeibuLine },
      { path: 'tobu', component: TobuLine },
      { path: 'odakyu', component: OdakyuLine },
      { path: 'keisei', component: KeiseiLine }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;