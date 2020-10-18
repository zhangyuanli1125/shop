<template>
  <div class=''>
    <el-card>
    <v-chart :options="barOptions" />
    </el-card>
      <el-card>
    <v-chart :options="lineOptions" />
    </el-card>
     <el-card>
 <v-chart :options="pieOptions" />
    </el-card>
   
  </div>
</template>

<script>
import vcharts from "vue-echarts"
import "echarts/lib/chart/line"
import "echarts/lib/chart/bar"
import "echarts/lib/chart/pie"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/toolbox"
export default {
  name: '',
   components: {
    "v-chart":vcharts
  },
  data(){
    return {
      saleData:[],
      xData:[],
      yData:[],
   barOptions:{
     title:{
       text:"月度销售业绩柱状图"
     },
     tooltip:{},
    xAxis: {
       type: "category"
    },
    yAxis: {
      type:"value"
    },
    series: [{
        
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
        }
    }]
},
lineOptions: {
  title:{
    text:"月度销售业绩折线图"
  },
  tooltip:{},
    xAxis: {
        type: 'category',
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        type: 'line'
    }]
},
pieOptions : {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                // {value: 335, name: '直接访问'},
                // {value: 310, name: '邮件营销'},
                // {value: 234, name: '联盟广告'},
                // {value: 135, name: '视频广告'},
                // {value: 1548, name: '搜索引擎'}
            ]
        }
    ]
}
    }
  },

  created(){
    this.Data()
  }
,
  methods: {
    async Data(){
      const res=await this.$axios.get('/api/charts')
      if(res.code==200){
        this.saleData=res.list
        this.saleData.forEach(item=>{
          this.xData.push(item.month+'月')
          this.yData.push(item.total)
        })
        this.barOptions=Object.assign(this.barOptions,{
          xAxis:{data:this.xData},
          series:{data:this.yData}
        })
        this.lineOptions=Object.assign(this.lineOptions,{
          xAxis:{data:this.xData},
          series:{data:this.yData}
        })
     
      }
    }
  }
}
</script>
<style scoped>
.echarts{
    height: 400px;
}
</style>
