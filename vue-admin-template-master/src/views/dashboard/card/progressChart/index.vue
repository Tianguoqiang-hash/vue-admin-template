<template>
    <div class="progressChart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    mounted(){
        let charts = echarts.init(document.querySelector('.progressChart'))
        charts.setOption({
            xAxis:{
                show: false,
                min: 0,
                max: 100,
            },
            yAxis:{
                show: false,
                type: 'category',
            },
            series:[
                {
                    type: 'bar',
                    data: [78],
                    barWidth: 10,
                    showBackground: true,
                    backgroundStyle: {
                        color: '#eee'
                    },
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            label: {
                show: true
            }
        })
    }
}
</script>

<style>
    .progressChart{
        width: 100%;
        height: 47px;
    }
</style>