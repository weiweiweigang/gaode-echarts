/*
 * @Author: Strayer
 * @Date: 2023-05-30
 * @LastEditors: Strayer
 * @LastEditTime: 2023-06-09
 * @Description: 
 * @FilePath: \gaode-echarts\packages\index.ts
 */
import 'echarts-extension-amap';
import "@amap/amap-jsapi-types";

import * as echarts from 'echarts'

// 导入单个组件
import gaodeMap from './components/gaode-map'

// 工具
import {
  mercatorToLngLat,
  ArrayToObj,
  LineIsShowOnSquare
} from './utils/tool'
import { RenderData } from './utils/topologyEcharts';


// 以数组的结构保存组件，便于遍历
const components = [
  gaodeMap
]

// 用于按需导入
export {
  echarts,
  
  // 组件
  gaodeMap,

  // 工具
  mercatorToLngLat,
  ArrayToObj,
  LineIsShowOnSquare,
  RenderData,
}

// 定义 install 方法
const install = function (Vue: any) {
  if ((install as any).installed) return;
  (install as any).installed = true
  // 遍历并注册全局组件
  components.map(component => {
      Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  // 导出的对象必须具备一个 install 方法
  install,
}