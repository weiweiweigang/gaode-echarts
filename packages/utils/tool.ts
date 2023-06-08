/*
 * @Author: Strayer
 * @Date: 2023-06-07
 * @LastEditors: Strayer
 * @LastEditTime: 2023-06-08
 * @Description: 
 * @FilePath: \gaode-echarts\packages\utils\tool.ts
 */
import proj4 from 'proj4'

export type MapExtent = {
  xmax: number,
  xmin: number,
  ymax: number,
  ymin: number,
}

// 定义墨卡托投影和经纬度坐标系的转换函数
proj4.defs(
  'EPSG:3857',
  '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'
);
proj4.defs(
  'EPSG:4326',
  '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
);

/**
 * @description: 墨卡托转经纬度
 * @param {*}
 * @return {*}
 */
export function mercatorToLngLat<T extends [number, number] | [number, number] []>(param: T): T {
  if(typeof param[0] === 'number') {
    const [lng, lat] = proj4('EPSG:3857', 'EPSG:4326', [param[0], param[1] as number]);
    return [lng, lat] as T;
  }else {
    const arr: [number, number] [] = [];
    
    (param as [number, number] []).forEach((item) => {
      arr.push(proj4('EPSG:3857', 'EPSG:4326', [item[0] , item[1]]))
    })

    return arr as T
  }
}

/**
 * @description: 把数组转为对象
 * @param {Array} arr 源数组，数组的值必须是对象
 * @param {string} key 对象的key,默认为“tpId"
 * @return {*} 返回转换后的对象
 */
export function ArrayToObj<
  resKeyType extends string | number, 
  valueType extends { [propName: string]: any }
>(
  arr: Array<valueType>,
  key: string
): { [propName in resKeyType]: valueType } {
  const obj: { [propName in resKeyType]: valueType } = {} as any;

  for (const item of arr) {
    // @ts-ignore
    obj[item[key]] = item;
  }

  return obj;
}


/**
 * @description: 管道是否展示在矩形区域中
 * @param {Array} linePoint 需要判断的线坐标
 * @param {MapExtent} extent 坐标范围
 * @return {boolean}
 */
export function LineIsShowOnSquare(linePoint: Array<[number, number]>, extent: MapExtent) {
  // 1. 坐标是否在矩形区域中
  for(const latLngItem of linePoint) {
    if(PortInSquare(latLngItem, extent)) {
      return true;
    }
  }
  // 2.线段是否穿过矩形区域
  if(IsLineIntersectRectangle(linePoint, extent)) return true;

  return false
}

/**
 * @description: 根据正方形的坐标范围计算点是否在范围中
 * @param {array} port 需要判断的点
 * @param {MapExtent} extent 坐标范围
 * @return { boolean } 是否在范围内
 */
function PortInSquare(port: [number, number], extent: MapExtent): boolean {
  if(
    port[0] >= extent.xmin 
    && port[0] <= extent.xmax 
    && port[1] >= extent.ymin 
    && port[1] <= extent.ymax
  ) {
    return true
  }else return false
}

/**
 * @description: 线段是否穿过矩形区域，返回true  false 
 * @param {Array} linePoint 需要判断的线
 * @param {MapExtent} extent 坐标范围
 * @return {boolean}
 */
function IsLineIntersectRectangle(linePoint: Array<[number, number]>, extent: MapExtent)
{
  const linePointY1 = linePoint[0][1];
  const linePointY2 = linePoint[linePoint.length - 1][1];
  const linePointX1 = linePoint[0][0];
  const linePointX2 = linePoint[linePoint.length - 1][0];
  const lineHeight = linePointY1 - linePointY2;
  const lineWidth = linePointX2 - linePointX1; // 计算叉乘
  const c = linePointX1 * linePointY2 - linePointX2 * linePointY1;
  let rectangleLeftTopX = extent.xmin;
  let rectangleLeftTopY = extent.ymin;
  let rectangleRightBottomX = extent.xmax;
  let rectangleRightBottomY = extent.ymax;

  if (
    (lineHeight * rectangleLeftTopX + lineWidth * rectangleLeftTopY + c >= 0 &&
      lineHeight * rectangleRightBottomX +
      lineWidth * rectangleRightBottomY +
      c <=
      0) ||
    (lineHeight * rectangleLeftTopX + lineWidth * rectangleLeftTopY + c <= 0 &&
      lineHeight * rectangleRightBottomX +
      lineWidth * rectangleRightBottomY +
      c >=
      0) ||
    (lineHeight * rectangleLeftTopX + lineWidth * rectangleRightBottomY + c >=
      0 &&
      lineHeight * rectangleRightBottomX + lineWidth * rectangleLeftTopY + c <=
      0) ||
    (lineHeight * rectangleLeftTopX + lineWidth * rectangleRightBottomY + c <=
      0 &&
      lineHeight * rectangleRightBottomX + lineWidth * rectangleLeftTopY + c >=
      0)
  ) {
    if (rectangleLeftTopX > rectangleRightBottomX) {
      const temp = rectangleLeftTopX;
      rectangleLeftTopX = rectangleRightBottomX;
      rectangleRightBottomX = temp;
    }
    if (rectangleLeftTopY < rectangleRightBottomY) {
      const temp1 = rectangleLeftTopY;
      rectangleLeftTopY = rectangleRightBottomY;
      rectangleRightBottomY = temp1;
    }
    if (
      (linePointX1 < rectangleLeftTopX && linePointX2 < rectangleLeftTopX) ||
      (linePointX1 > rectangleRightBottomX &&
        linePointX2 > rectangleRightBottomX) ||
      (linePointY1 > rectangleLeftTopY && linePointY2 > rectangleLeftTopY) ||
      (linePointY1 < rectangleRightBottomY &&
        linePointY2 < rectangleRightBottomY)
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}