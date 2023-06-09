/*
 * @Author: Strayer
 * @Date: 2023-06-09
 * @LastEditors: Strayer
 * @LastEditTime: 2023-06-09
 * @Description: ts类型声明文件
 * @FilePath: \gaode-echarts\types\index.d.ts
 */
/// <reference types="@amap/amap-jsapi-types" />
/// <reference types="echarts-extension-amap" />

import * as echartsObj from 'echarts';
declare const echarts: typeof echartsObj;

// 组件
import gaodeMapVue from '../packages/components/gaode-map/index'
declare const gaodeMap: typeof gaodeMapVue;

// 工具
import {
  mercatorToLngLat as mercatorToLngLatType,
  ArrayToObj as ArrayToObjType,
  LineIsShowOnSquare as LineIsShowOnSquareType
} from '../packages/utils/tool'
declare const mercatorToLngLat: typeof mercatorToLngLatType;
declare const ArrayToObj: typeof ArrayToObjType;
declare const LineIsShowOnSquare: typeof LineIsShowOnSquareType;

import { RenderData as  RenderDataType} from '../packages/utils/topologyEcharts';
declare const RenderData: typeof RenderDataType;

// 类型
import { TopologyLine } from '../packages/dataModel/topologyType';
declare type AMapType = typeof AMap

declare const _default: {
  install: (Vue: any) => void
};

export type {
  TopologyLine,
  AMapType
} 

export { 
  echarts,
  gaodeMap,
  mercatorToLngLat,
  ArrayToObj,
  LineIsShowOnSquare,
  RenderData
}

export default _default