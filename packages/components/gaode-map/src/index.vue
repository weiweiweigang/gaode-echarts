<!--
 * @Author: Strayer
 * @Date: 2023-05-31
 * @LastEditors: Strayer
 * @LastEditTime: 2023-06-08
 * @Description: 
 * @FilePath: \gaode-echarts\packages\components\gaode-map\src\index.vue
-->
<template>
  <div :id="props.boxId" class="gaodeMapContainer">
  </div>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted, shallowRef } from 'vue';
import * as echarts from 'echarts'
import { AmapOpion, getEchartsOption } from "./js/echartsOption";
import { ECharts } from "echarts";
import type { AMapType } from '../../..';

const props = defineProps<{
  boxId: string,
  gaodeKey: string, // 高德Key
  securityJsCode?: string, // 高德安全秘钥 
  amapOption?: AmapOpion
}>()

const mapObj = shallowRef<AMap.Map | null>(null);
const myChart = shallowRef<ECharts | null>(null);
const echartsLayerDiv = shallowRef<HTMLDivElement | null>(null);

defineExpose({ mapObj, myChart, echartsLayerDiv, mapLoaded })

onMounted(() => {
  // 高德秘钥 最好换成服务器代理
  (window as any)._AMapSecurityConfig = {
    securityJsCode: props.securityJsCode,
  }

  initMap()
})

// 地图加载成功后的回调函数
let mapLoadedParam = function(pram: {
  mapObj: AMap.Map,
  myChart: ECharts,
  echartsLayerDiv: HTMLDivElement
}) {console.log(pram)};
function mapLoaded(param: typeof mapLoadedParam) {
  mapLoadedParam = param;
}

function initMap() {
  AMapLoader.load({
    key: props.gaodeKey,             // 申请好的Web端开发者Key，首次调用 load 时必填
    version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap: AMapType)=>{
    mapInit(AMap)
  }).catch(e=>{
    console.log(e);
  })
}

function mapInit (_AMap: AMapType) {
  const boxHtml = document.getElementById(props.boxId);
  if(!boxHtml) return;

  myChart.value = echarts.init(boxHtml);
  myChart.value.setOption(getEchartsOption(props.amapOption ?? {}))

// 获取 ECharts 高德地图组件
// @ts-ignore
var amapComponent = myChart.value.getModel().getComponent('amap');
// 获取高德地图实例，使用高德地图自带的控件
mapObj.value = amapComponent.getAMap();
console.log('%c [ mapObj.value ]-68', 'font-size:13px; background:#a7d733; color:#ebff77;', mapObj.value);
echartsLayerDiv.value = amapComponent.getEChartsLayer();

mapLoadedParam({
  mapObj: mapObj.value!,
  myChart: myChart.value,
  echartsLayerDiv: echartsLayerDiv.value!,
});

// 添加控件 和高德地图API用法相同
// mapObj.value?.addControl(new _AMap.Scale());
// mapObj.value?.addControl(new _AMap.ToolBar());

// 添加标记点
// const marker = new _AMap.Marker({
//   position: [120.76863072551424, 31.32745129516141]
// })
// mapObj.value?.add(marker);

// 坐标转换 需要有秘钥
// _AMap.convertFrom([120.76863072551424, 31.32745129516141], 'gps', function (status, result) {
//   console.log('%c [ result ]-65', 'font-size:13px; background:#bf112b; color:#ff556f;', result);
//   if (result.info === 'ok') {
//     console.log('%c [ result ]-65', 'font-size:13px; background:#bf112b; color:#ff556f;', result);
//   }
// });


// 添加图层
// var satelliteLayer = new _AMap.TileLayer.Satellite();
// var roadNetLayer = new _AMap.TileLayer.RoadNet();
// amap.add([satelliteLayer, roadNetLayer]);

// 禁用 ECharts 图层交互，从而使高德地图图层可以点击交互
// amapComponent.setEChartsLayerInteractive(false);

// echarts 事件监听-鼠标单击
// myChart.value.on('click', (params: any) => {
//   console.log('echarts: %c [ params ]-76', 'font-size:13px; background:#787b76; color:#bcbfba;', params);
//   // 快速的连续点击判断为双击事件,不触发点击事件
//   renderTopology();
// })
// myChart.value.on('mouseup', (params: any) => {
//   console.log('echarts: %c [ params ]-80', 'font-size:13px; background:#17abeb; color:#5befff;', params);
//   // 快速的连续点击判断为双击事件,不触发点击事件
// })

// 高德地图 事件监听 - 鼠标放开
// mapObj.value?.on('mouseup', (params: any) => {
//   console.log('高德：%c [ params ]-90', 'font-size:13px; background:#8d9577; color:#d1d9bb;', params);
//   // 快速的连续点击判断为双击事件,不触发点击事件
// })
}
</script>

<style lang="scss" scoped>
.gaodeMapContainer {
  width: 100%;
  height: 100%;
}
</style>