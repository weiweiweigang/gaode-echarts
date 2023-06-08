/*
 * @Author: Strayer
 * @Date: 2021-12-06 22:33:30
 * @LastEditTime: 2023-06-08
 * @LastEditors: Strayer
 * @Description: 拓扑元件类型
 * @FilePath: \gaode-echarts\packages\dataModel\topologyType\topologyDeviceType.ts
 */

import { DeviceType } from "../deviceModel";

// 拓扑元件类。
export interface TopologyDevice {
  tpId: string;
  tpType: DeviceType;

  coord: [number, number];
  gisName: string | null;

  // null：元件存在该端口，但端口未连接管道
  connId1: string|null;
  connPort1: number|null ;
  connId2?: string|null;
  connPort2?: number|null;
  connId3?: string|null;
  connPort3?: number|null;
  connId4?: string|null;
  connPort4?: number|null;

  rotationAngle?: number; //undefine: 默认旋转角度为0 
  onOff?: 0 | 1; // 开关 0 关， 1 开

  // 额外信息
  userData: {
    mapGrade?: number, //可显示的地图等级

    unable?: boolean, //是否禁止启用,为true时不在地图上渲染
    hid?: boolean, //是否隐藏，为true是元件为灰色
    chose?: boolean, //是否是被选中的元件 / 只会放大一次数据，只会自动移除其状态
    highlight?: boolean, // 是否高亮 / 任何地图等级都会放到展示高亮数据

    width?: number,
    height?: number,
    color?: string,
    svg?: string,

    status?: {
      delete?: boolean,
    }
  }
}