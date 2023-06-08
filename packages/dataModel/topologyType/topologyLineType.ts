/*
 * @Author: Strayer
 * @Date: 2021-12-06 22:42:11
 * @LastEditTime: 2023-06-08
 * @LastEditors: Strayer
 * @Description: In User Settings Edit
 * @FilePath: \gaode-echarts\packages\dataModel\topologyType\topologyLineType.ts
 */

// 拓扑管道数据格式
export interface TopologyLine {
  tpId: string;
  coord: [number, number][];
  gisName: string | null;

  // 连接关系
  connId1: string|null ;
  connPort1: number|null ;
  connId2: string|null ;
  connPort2: number|null ;
  
  // 额外信息
  userData: {
    flowD?: -1 | 0 | 1, // flowDirection 流向： -1反向， 0 禁止流动 ， 1 | undefine 正向流动

    unable?: boolean, //是否禁止启用,为true时不在地图上渲染
    hid?: boolean, //是否隐藏，为true是管道为灰色
    hidFlow?: boolean, // 隐藏流向，默认不隐藏
    chose?: boolean, //是否是被选中的管道 

    width?: number,
    color?: string,

    status?: {
      delete?: boolean,
    }
  }
}

export class LongLine {
  constructor(public tpId: string) {
    this.userData = {
      children: [],
      shapeLength: 1,
    }
  }
  
  latLng: [number, number][] = [];
  
  userData: {
    children: TopologyLine [], //子管
    shapeLength: number,  //坐标长度
    flowR?: boolean, //是否和第一个子管的流向相反
  }
}