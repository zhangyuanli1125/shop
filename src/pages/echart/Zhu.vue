<template>
  <div class=''>
      <div id="main">

      </div>
  </div>
</template>

<script>
import echarts from "echarts"
export default {
  name: '',
  data(){
    return {
   options:{
    xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
        }
    }]
}

    }
  },
  components: {

  },
  created(){},
  mounted(){
      var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption(this.options);
  },
  methods: {}
}
</script>
<style scoped>
#main{
    height: 400px;
}
</style>
