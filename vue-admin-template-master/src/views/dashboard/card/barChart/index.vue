<template>
    <div class="barChart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    mounted(){
        let charts = echarts.init(document.querySelector('.barChart'))
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
                    type: 'bar',
                    data: [10,20,5,60,40,50,10,9,23,34,45],
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            tooltip: {}
        })
    }
}
</script>

<style>
    .barChart{
        width: 100%;
        height: 47px;
    }
</style>