<template>
    <div class="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    mounted(){
        let charts = echarts.init(document.querySelector('.charts'))
        charts.setOption({
            xAxis:{
                show: false,
                type: 'category',
            },
            yAxis:{
                show: false
            },
            series:[
                {
                    type: 'line',
                    data: [10,20,5,60,40,50,10],
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#5470c6' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'white' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                            }
                    },
                    smooth: true,
                    itemStyle: {
                        opacity: 0
                    }
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        })
    }
}
</script>

<style>
    .charts{
        width: 100%;
        height: 47px;
    }
</style>