import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import '../dist/style.css'
import gaodeEcharts from "../dist/gaode-echarts.es.js";

const app = createApp(App);
app.use(gaodeEcharts)
app.mount('#app');
