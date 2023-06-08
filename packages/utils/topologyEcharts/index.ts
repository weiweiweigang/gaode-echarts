/*
 * @Author: Strayer
 * @Date: 2023-06-08
 * @LastEditors: Strayer
 * @LastEditTime: 2023-06-08
 * @Description: 
 * @FilePath: \gaode-echarts\packages\utils\topologyEcharts\index.ts
 */

import { ECharts, EChartsOption } from "echarts";
import { GetLineOption } from "./line";
import { TopologyLine } from "../../dataModel/topologyType";

export type RenderNameType = 
  'topologyDevices' 
  | 'topologyLines' 
  | 'topologyLinesFlow' 

export function RenderData(myChart: ECharts, param: {
  renderName: RenderNameType[],
  mapObj: AMap.Map,
  data: {
    topologyLines?: TopologyLine [],
  }
}) {
  const seriesArr: EChartsOption['series'] = [];
  
  // 元件一定要在管道之前渲染。因为渲染过程中元件的宽高会改变，这是管道连接的端口位置就需要跟着改变
  if(param.renderName.includes('topologyLines')) {
    const option = GetLineOption({
      mapObj: param.mapObj  ,
      topologyLine: param.data.topologyLines ?? [],
    });
    if((option.data?.length ?? 0) > 0) {
      seriesArr.push(option);
    }
  }

  // 开始渲染.mapObj
  const option: EChartsOption  = {
    series: seriesArr,
    animation: false,
  }

  // myChart.clear(); //先清空一遍数据可以去除数据的移动动画 TODO: 调用报错
  console.log('%c [ option ]-78', 'font-size:13px; background:#008b38; color:#44cf7c;', option);
  console.time('渲染耗时')
  myChart.setOption(option, {
    replaceMerge: ['series'], // 只替换series
    lazyUpdate: false,  // 同步更新
  });
  console.timeEnd('渲染耗时')
}