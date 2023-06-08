/*
 * @Author: Strayer
 * @Date: 2023-05-31
 * @LastEditors: Strayer
 * @LastEditTime: 2023-06-08
 * @Description: 
 * @FilePath: \gaode-echarts\packages\components\gaode-map\src\js\echartsOption.ts
 */

import { getLinesBusData } from "./data";

export function getEchartsOption() {
  return {
    // 加载 amap 组件
    amap: {
      // 3D模式，无论你使用的是1.x版本还是2.x版本，都建议开启此项以获得更好的渲染体验
      viewMode: '3D',
      // 高德地图中心经纬度
      center: [116.46, 39.92],
      // 高德地图缩放
      zoom: 10,
      // 启用resize
      resizeEnable: true,
      // 自定义地图样式主题
      mapStyle: 'amap://styles/normal',
      // 移动过程中实时渲染 默认为true 如数据量较大 建议置为false
      renderOnMoving: true,
      // ECharts 图层的 zIndex 默认 2000
      // 从 v1.9.0 起 此配置项已被弃用 请使用 `echartsLayerInteractive` 代替
      // echartsLayerZIndex: 2019,
      // 设置 ECharts 图层是否可交互 默认为 true
      // 设置为 false 可实现高德地图自身图层交互
      // 此配置项从 v1.9.0 起开始支持
      echartsLayerInteractive: false,
      features: ['bg', 'building', 'road'],
      // features Array<String> (default ['bg','point','road','building'])
      // 是否启用大数据模式 默认为 false
      // 此配置项从 v1.9.0 起开始支持
      largeMode: false
      // 说明：如果想要添加卫星、路网等图层
      // 暂时先不要使用layers配置，因为存在Bug
      // 建议使用amap.add的方式，使用方式参见最下方代码
    },
    series: [],
  //   series: [{
  //     name: 'pipeLines',
  //     type: 'lines',
  //     // 使用高德地图坐标系
  //     coordinateSystem: 'amap',
  //     polyline: true,
  //     data: getLinesBusData(),
  //     silent: true,
  //     lineStyle: {
  //       opacity: 0.2,
  //       width: 1
  //     },
  //     progressiveThreshold: 500,
  //     progressive: 200
  //   }, {
  //     type: 'lines',
  //     // 使用高德地图坐标系
  //     coordinateSystem: 'amap',
  //     polyline: true,
  //     data: getLinesBusData(),
  //     lineStyle: {
  //       width: 0
  //     },
  //     effect: {
  //       constantSpeed: 20,
  //       show: true,
  //       trailLength: 0.1,
  //       symbolSize: 1.5
  //     },
  //     zlevel: 1
  //   }, 
  //   { //中心点标识
  //     type: 'effectScatter',
  //     coordinateSystem: 'amap',
  //     data: [{
  //       value: [120.76863072551424, 31.32745129516141]
  //     }],
  //     symbolSize: 34,
  //     showEffectOn: 'render',
  //     rippleEffect: {
  //       period: 4, // 涟漪特效的动画周期
  //       scale: 2.5, // 涟漪特效动画中波纹的最大缩放比例
  //       brushType: 'stroke' // 涟漪特效的波纹绘制方式
  //     },
  //     // hoverAnimation: true,
  //     itemStyle: {
  //       color: '#ff0033',
  //       opacity: 0.7
  //     },
  //     zlevel: 7,
  //   }
  // ]
  }
}