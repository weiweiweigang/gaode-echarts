/*
 * @Author: Strayer
 * @Date: 2023-06-02
 * @LastEditors: Strayer
 * @LastEditTime: 2023-06-08
 * @Description: 
 * @FilePath: \gaode-echarts\packages\components\gaode-map\src\js\gaode.ts
 */

export function addGaodeEvent(mapObj: AMap.Map, renderTopology: Function) {
  mapObj.on('resize', e=> {
    console.log('resize: ', e)
  })
  mapObj.on('click', e=> {
    console.log('click: ', e)
  })
  mapObj.on('dblclick', e=> {
    console.log('dblclick: ', e)
  })
  mapObj.on('hotspotclick', e=> {
    console.log('hotspotclick: ', e)
  })
  mapObj.on('moveend', e=> {
    console.log('moveend: ', e)
    // renderTopology();
  })
  mapObj.on('zoomchange', e=> {
    console.log('zoomchange: ', e)
  })
  mapObj.on('rotatechange', e=> {
    console.log('rotatechange: ', e)
  })
  mapObj.on('dragend', e=> {
    console.log('dragend: ', e)
  })
}