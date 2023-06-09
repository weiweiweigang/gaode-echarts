<!--
 * @FilePath: \gaode-echarts\examples\App.vue
-->
<template>
  <div class="main">
    <gaodeMap 
      ref="gaodeMapObj"
      boxId="box1"
      gaode-key="1210df51ce6f2cd0218440f8b2da10e1"
      security-js-code="b7be4ed5f538964d6cbd94015c233f12"
      :amapOption=" {
        center: [120.67326402074302, 31.343713847380716]
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue';
import { RenderData, gaodeMap, mercatorToLngLat } from '../packages'
import type { TopologyLineOfGaodeEcharts } from '../packages'
import { ECharts } from 'echarts';

const gaodeMapObj = ref<InstanceType<typeof gaodeMap>>();
const mapObj = shallowRef<AMap.Map | null>(null);
const myChart = shallowRef<ECharts | null>(null);
const echartsLayerDiv = shallowRef<HTMLDivElement | null>(null);
const topologyLines = shallowRef<TopologyLineOfGaodeEcharts []>([])

onMounted(() => {
  getData();
  
  gaodeMapObj.value?.mapLoaded((param) => {
    mapObj.value = param.mapObj;
    myChart.value = param.myChart;
    echartsLayerDiv.value = param.echartsLayerDiv;
    renderTopology();

    // 高德地图 事件监听 - 鼠标放开
    mapObj.value?.on('click', (params: any) => {
      console.log('高德：%c [ params ]-90', 'font-size:13px; background:#8d9577; color:#d1d9bb;', params);
      // 快速的连续点击判断为双击事件,不触发点击事件
      // renderTopology();
    })
  })
});


function getData() {
  fetch('http://127.0.0.1:4523/m1/2828959-0-default/topologyInfo/getTopologyMust').then(res => {
    return res.json()
  }).then(res => {
      
    res.data.topologyPipelineMusts.forEach(item => {
      item.coord = mercatorToLngLat(JSON.parse(item.latLng));
      item.userData = {};
    })
    res.data.topologyPointMusts.forEach(item => {
      item.coord = mercatorToLngLat(JSON.parse(item.latLng));
      item.userData = {};
    })
    console.log(res);
    topologyLines.value = res.data.topologyPipelineMusts
  })
}

function renderTopology() {
  if(!myChart.value || !mapObj.value) return;
  RenderData(myChart.value, {
    renderName: [ 'topologyLines' ],
    mapObj: mapObj.value,
    data: {
      topologyLines: topologyLines.value
    }
  })
}
</script>

<style scoped>
.main {
  width: 90vw;
  height: 80vh;
}
</style>
