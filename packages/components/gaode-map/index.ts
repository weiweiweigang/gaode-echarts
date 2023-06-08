/*
 * @Author: Strayer
 * @Date: 2023-05-31
 * @LastEditors: Strayer
 * @LastEditTime: 2023-05-31
 * @Description: 
 * @FilePath: \gaode-echarts\packages\gaode\index.ts
 */
import gaodeMap from './src/index.vue'
gaodeMap.name = 'gaode-map'

gaodeMap.install = function (Vue: any) {
  Vue.component(gaodeMap.name, gaodeMap)
}

export default gaodeMap