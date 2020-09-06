<template>
  <div>
    <div ref="myChart2" :style="{width: '500px', height: '300px'}"></div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import echarts from 'echarts'
import daily from '@/api/sta'
export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      dailyData: {
        loginNum: 0,
        registerNum: 0,
        videoViewNum: 0,
        episodeNum: 0
      },
    }
  },
  mounted() {
    // this.drawLine()
    this.showDaily();
  },
  methods: {
    // drawLine() {
    //   // 基于准备好的dom，初始化echarts实例
    //   const myChart = echarts.init(document.getElementById('myChart1'))
    //   // 绘制图表
    //   myChart.setOption({
    //     title: { text: '在Vue中使用echarts' },
    //     tooltip: {},
    //     xAxis: {
    //       data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //     },
    //     yAxis: {},
    //     series: [{
    //       name: '销量',
    //       type: 'bar',
    //       data: [5, 20, 36, 10, 10, 800]
    //     }]
    //   })
    // },
    showDaily(){
      daily.showDaily(this.$route.query.id)
      .then(
        response => {
          this.dailyData = response.data.dailyData
          const myChart2 =echarts.init(this.$refs.myChart2)
          myChart2.setOption({
            title: {text: '数据统计'},
            tooltip: {},
            xAxis: {
              data: ['登录','注册','视频播放','新增资源']
            },
            yAxis: {},
            series: [{
              name: '人数',
              type: 'bar',
              data: [this.dailyData.loginNum, this.dailyData.registerNum,  this.dailyData.videoViewNum, this.dailyData.episodeNum]
            }]
          })
        }
      )
    }
  }
}

</script>
