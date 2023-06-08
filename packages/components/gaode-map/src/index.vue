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

import { getEchartsOption } from "./js/echartsOption";
import { addGaodeEvent } from "./js/gaode";
import { RenderData } from "../../../utils/topologyEcharts";
import { ECharts } from "echarts";
import { TopologyLine } from "../../../dataModel/topologyType";
import { mercatorToLngLat } from "../../../utils/tool";

const mapObj = shallowRef<null | AMap.Map>(null);

const props = defineProps<{
  boxId: string,
  gaodeKey: string, // 高德Key
  securityJsCode?: string, // 高德安全秘钥 
}>()


onMounted(() => {
  // TODO：高德秘钥 最好换成服务器代理
  (window as any)._AMapSecurityConfig = {
    securityJsCode: props.securityJsCode,
  }


  initMap()
})

const myChart = shallowRef<ECharts | null>(null)
const topologyLines = shallowRef<TopologyLine []>([])

type AMapType = typeof AMap

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

function initMap() {
  AMapLoader.load({
    // TODO：换成外部传入，外部放在配置文件中
    key: props.gaodeKey,             // 申请好的Web端开发者Key，首次调用 load 时必填
    version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  }).then((AMap: AMapType)=>{
    // mapObj.value = new AMap.Map("gaodeMapContainer",{  //设置地图容器id
    //   viewMode:"3D",    //是否为3D地图模式
    //   zoom: 5,           //初始化地图级别
    //   center:[105.602725,37.076636], //初始化地图中心点位置
    // });
    mapInit(AMap)
  }).catch(e=>{
    console.log(e);
  })
}


function renderTopology() {
  console.log('%c [ 111 ]-60', 'font-size:13px; background:#0b749d; color:#4fb8e1;', );
  if(!myChart.value || !mapObj.value) return;
  // myChart.value.setOption({
  //   series: [],
  // }, {
  //   replaceMerge: ['series'], // 只替换series
  //   lazyUpdate: false,  // 同步更新
  // })
  RenderData(myChart.value, {
    renderName: [ 'topologyLines' ],
    mapObj: mapObj.value,
    data: {
      topologyLines: topologyLines.value
    }
  })
}

function mapInit (AMap: AMapType) {
  myChart.value = echarts.init(document.getElementById(props.boxId));

  myChart.value.setOption(getEchartsOption())

// 获取 ECharts 高德地图组件
var amapComponent = myChart.value.getModel().getComponent('amap');
// 获取高德地图实例，使用高德地图自带的控件
mapObj.value = amapComponent.getAMap();
const echartsLayer = amapComponent.getEChartsLayer();
// 添加控件 和高德地图API用法相同
// mapObj.value?.addControl(new AMap.Scale());
// mapObj.value?.addControl(new AMap.ToolBar());

const marker = new AMap.Marker({
  position: [120.76863072551424, 31.32745129516141]
})
mapObj.value?.add(marker);

AMap.convertFrom([120.76863072551424, 31.32745129516141], 'gps', function (status, result) {
  console.log('%c [ result ]-65', 'font-size:13px; background:#bf112b; color:#ff556f;', result);
  if (result.info === 'ok') {
    console.log('%c [ result ]-65', 'font-size:13px; background:#bf112b; color:#ff556f;', result);
  }
});

console.log('echartLayer:', echartsLayer)
console.log('layer:', mapObj.value?.getLayers()[0])
console.log('bounds: ', mapObj.value?.getBounds())

// 添加图层
// var satelliteLayer = new AMap.TileLayer.Satellite();
// var roadNetLayer = new AMap.TileLayer.RoadNet();
// amap.add([satelliteLayer, roadNetLayer]);
//  添加一个 Marker
// amap.add(new AMap.Marker({
//   position: [115, 35]
// }));
// 禁用 ECharts 图层交互，从而使高德地图图层可以点击交互
// amapComponent.setEChartsLayerInteractive(false);

  // 鼠标单击
  // myChart.value.on('click', (params: any) => {
  //   console.log('echarts: %c [ params ]-76', 'font-size:13px; background:#787b76; color:#bcbfba;', params);
  //   // 快速的连续点击判断为双击事件,不触发点击事件
  //   renderTopology();
  // })
  // myChart.value.on('mouseup', (params: any) => {
  //   console.log('echarts: %c [ params ]-80', 'font-size:13px; background:#17abeb; color:#5befff;', params);
  //   // 快速的连续点击判断为双击事件,不触发点击事件
  // })

  // // 鼠标单击
  mapObj.value?.on('click', (params: any) => {
    console.log('高德：%c [ params ]-86', 'font-size:13px; background:#d8e7d4; color:#ffffff;', params);
    console.log(mapObj.value?.getBounds())
    // 快速的连续点击判断为双击事件,不触发点击事件
    renderTopology();
  })
  // mapObj.value?.on('mouseup', (params: any) => {
  //   console.log('高德：%c [ params ]-90', 'font-size:13px; background:#8d9577; color:#d1d9bb;', params);
  //   // 快速的连续点击判断为双击事件,不触发点击事件
  // })
  // addGaodeEvent(mapObj.value!, renderTopology);
}
</script>

<style lang="scss" scoped>
.gaodeMapContainer {
  width: 100%;
  height: 100%;
}
</style>