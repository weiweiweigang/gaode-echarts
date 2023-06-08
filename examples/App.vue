<!--
 * @FilePath: \gaode-echarts\examples\App.vue
-->
<template>
  <div class="main">
    <gaodeMap 
      boxId="box1"
      gaode-key="1210df51ce6f2cd0218440f8b2da10e1"
      security-js-code="b7be4ed5f538964d6cbd94015c233f12"
    />
  </div>
</template>

<script setup lang="ts">
// import { elButton } from "../dist/gaode-echarts.es.js";
import { gaodeMap } from '../packages'
import { mercatorToLngLat } from '../packages/index'

fetch('http://127.0.0.1:4523/m1/2828959-0-default/topologyInfo/getTopologyMust').then(res => {
    return res.json()
}).then(res => {
    
    res.data.topologyPipelineMusts.forEach(item => {
      item.coord = mercatorToLngLat(JSON.parse(item.latLng))
    })
    res.data.topologyPointMusts.forEach(item => {
      item.coord = mercatorToLngLat(JSON.parse(item.latLng))
    })
    console.log(res);

})
</script>

<style scoped>
.main {
  width: 90vw;
  height: 80vh;
}
</style>
