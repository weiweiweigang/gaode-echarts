import { EChartsOption } from "echarts";
import { LineIsShowOnSquare } from "../..";
import { TopologyLine } from "../../dataModel/topologyType";

/*
 * @Author: Strayer
 * @Date: 2023-06-08
 * @LastEditors: Strayer
 * @LastEditTime: 2023-06-08
 * @Description: 
 * @FilePath: \gaode-echarts\packages\utils\topologyEcharts\line.ts
 */
export function GetLineOption(param: {
  mapObj: AMap.Map,
  topologyLine: TopologyLine []
}) {
  const { lines: linesArr} = GetTopologyLinesOfRender(param);
  console.log('%c [ linesArr ]-18', 'font-size:13px; background:#b951aa; color:#fd95ee;', linesArr);

  const data: EChartsOption['series'] = {
    name: 'pipeLines',
    type: 'lines',
    // 使用高德地图坐标系
    coordinateSystem: 'amap',
    polyline: true,
    data: linesToEcharts({
      linesArr
    }),
    silent: false,
    progressiveThreshold: 3000,
    progressive: 5000,
    lineStyle: {
      opacity:0.9,
      width: 4,
    },
    zlevel: 1,
  }

  return data
}

/**
 * @description: 获取渲染用的管道
 * @param {*}
 * @return {*}
 */
interface topologyLineOfRender extends TopologyLine {
  equipmentType: 'line'
}
export function GetTopologyLinesOfRender(param: {
  mapObj: AMap.Map, 
  topologyLine: TopologyLine []
}) {

  let chooseLines: topologyLineOfRender [] = [];
  let chooseLinesOfFlow: topologyLineOfRender [] = [];

  const bounds = param.mapObj.getBounds();
  const extent = {
    xmin: bounds.southWest.lng,
    xmax: bounds.northEast.lng,
    ymin: bounds.southWest.lat,
    ymax: bounds.northEast.lat,
  }
  const maxLineCount = 4800

  // ## 2.短管数据
  for(const item of param.topologyLine) {
    if(item.userData.status?.delete || item.userData.unable) continue;

    //3.如果是符合显示压力类型的管道，则看整个管是否在视图范围内
    if(LineIsShowOnSquare(item.coord, extent)) {
      const obj: topologyLineOfRender = {
        ...item,
        equipmentType: 'line'
      }
      chooseLines.push(obj)
      chooseLinesOfFlow.push(obj)
    }

    // 短管最大渲染量
    if(chooseLines.length > maxLineCount) break;
  }
  
  return {
    lines: chooseLines,
    linesFlow: chooseLinesOfFlow
  }
  
}

/**
 * @description: 把管道数据转换为echarts可以用的格式
 * @param {*} linesArr 需要转换的源数据
 * @return {*}
 */
function linesToEcharts(param: {
  linesArr: Array<topologyLineOfRender>, 
  doHasFlow?: boolean
}) {
  const echartsLines: any[] = [];

  for(const item of param.linesArr) {
    const isShort = item.equipmentType === 'line'

    // 管道宽度
    let width = (isShort? item.userData.width:null) ?? 4;

    //1.短管颜色
    // 管道颜色优先顺序： 自己的特定颜色 > 该管道类型的颜色 > 其他管道类型的颜色 > 默认颜色
    let shortColor = '';
    if(isShort) shortColor = item.userData.color ?? ''; 
    if(!shortColor) shortColor = '#ff00ff';

    // 如果存在选中数据
    if(isShort && item.userData.chose) {
      width = width * 2 + 2;
      Reflect.deleteProperty(item.userData, 'chose')
    }

    // 当前管道应用的颜色
    const color = shortColor;
    
    // 管道坐标
    const lineLatLng: [number, number][] = item.coord;

    const option = {
      coords: lineLatLng,
      lineStyle: {
        color,
        width,
        opacity: 0.9
      },
      tpId: item.tpId,
      equipmentType: item.equipmentType
    }

    // 是否倒流
    // const flowD = isShort ? item.userData.flowD : item.userData.children[0].userData.flowD;
    // 显示流向但该管道流向为0 
    // if(doHasFlow && (flowD === 0 || item.userData.hidFlow)) {
    //   (option.lineStyle as any).opacity = baseOpacity;
    // }

    echartsLines.push(option)
    
  }
  return echartsLines
}