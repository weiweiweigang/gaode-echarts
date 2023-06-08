
/*
 * @Author: Strayer
 * @Date: 2023-05-31
 * @LastEditors: Strayer
 * @LastEditTime: 2023-05-31
 * @Description: 
 * @FilePath: \gaode-echarts\packages\gaode\src\js\data.ts
 */
import * as echarts from 'echarts'
import { linesBusData } from "./jsonData";

// 公交路线数据
export function getLinesBusData() {
  const hStep = 300 / (linesBusData.length - 1);
  
  return linesBusData.map(function (busLine, idx) {
    var prevPt = [busLine[0], busLine[1]];
  
    var points = [];
    for (var i = 0; i < busLine.length; i += 2) {
      var pt = [busLine[i], busLine[i + 1]];
      if (i > 0) {
        pt = [
          prevPt[0] + pt[0],
          prevPt[1] + pt[1]
        ];
      }
      prevPt = pt;
  
      points.push([pt[0] / 1e4, pt[1] / 1e4]);
    }
    return {
      coords: points,
      lineStyle: {
        color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
      }
    };
  })
}