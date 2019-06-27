<template>
<div class="linesimple">
  <draggable :options="{disabled:disabled,animation:150,ghostClass:'blue-background-class'}" @end="moveEnd" class="moveBox">
    <div v-for="(linechartItem,linechartIndex) in getParentInfo" :key="'lineCharts' + linechartIndex" class='chartmain' :class=linechartItem.chartClass>
      <div class="chartTit">
        <p>{{linechartItem.chartTit}}</p>
        <i class="el-icon-delete" :class="[disabled ? 'offDel':'onDel']" @click="removeChart(linechartIndex)"></i>
        <i class="el-icon-edit" :class="[disabled ? 'offDel':'onDel']" @click="editChart(linechartItem,linechartIndex+1)"></i>
      </div>
      <div class="charShow"></div>
    </div>
  </draggable>
  <editChart ref='editChartRf'></editChart>
</div>
</template>
<script>
import echarts from 'echarts'
import draggable from 'vuedraggable'
import { lineChart,pieChart,barChart } from '../utils/chartview.js'
import editChart from './editChart.vue';
export default {
  data() {
    return {
      lineChart: {}, //echart初始化对象
      getParentInfo: [], //父组件传来的数据
      sortArr: [], //隐性排序移动顺序
      addChartInfo: false, //数据发生改变的flag
      disabled: true, //默认不可移动
      lineChartArr: [], //折线图arr
      pieChartArr: [], //饼图arr
      barChartArr:[],//柱状图arr
      editDialog:false,//编辑弹窗
      disab:true,
    }
  },
  props: ['addEcharts'],
  components: {
    draggable,
    editChart
  },
  computed: {

  },
  created() {

  },
  watch: {
    addEcharts: { //监听添加的数据
      handler(newValue) {
        console.log(newValue)
        this.addChartInfo = true
        for (var i = 0; i < newValue.length; i++) {
          this.sortArr.push(newValue[i])
        }
        this.chartView()
      },
      deep: true
    }
  },
  methods: {
    async getFirCharInfo() {
      let result = await this.$store.dispatch('GET_ALL_CHART_INFO')
      if (result.success) {
        for (var i = 0; i < result.data.length; i++) {
          this.getParentInfo.push(result.data[i])
          this.sortArr.push(result.data[i])
          if (result.data[i].chartType === 'line') {
            this.lineChartArr.push(result.data[i])
          }
          if (result.data[i].chartType === 'pie') {
            this.pieChartArr.push(result.data[i])
          }
          if(result.data[i].chartType === 'bar'){
            this.barChartArr.push(result.data[i])
          }
        }
        this.$nextTick(() => {
          this.chartView()
        })
      }
    },
    editChart(item,index){
      this.$store.dispatch('SET_EIDT_CHART_INFO',{
        charItem:item,
        charInd:index,
        charTit:item.chartTit
      })
      this.$nextTick(() => {
        this.$refs.editChartRf.editdialog(true)
      })
    },
    removeChart(index) {
      var clickChart = this.getParentInfo[index]
      console.log(clickChart)
      for (var i = 0; i < this.sortArr.length; i++) {
        if (this.getParentInfo[index].text === this.sortArr[i].text) {
          this.$store.dispatch('PUSH_DEL_WHICH_ONE', this.sortArr[i].text)
          this.sortArr.splice(i, 1)
          console.log(this.sortArr)
        }
      }
      this.addChartInfo = true;
      this.chartView()
    },
    moveEnd(env) { //修改移动后的数据顺序
      var e = env || window.event
      var moveChart = this.sortArr[env.oldIndex]
      this.sortArr.splice(env.oldIndex, 1)
      this.sortArr.splice(env.newIndex, 0, moveChart)
    },
    chartView() {
      var that = this
      if (this.addChartInfo) {
        this.getParentInfo = []
        this.$nextTick(() => {
          for (var i = 0; i < this.sortArr.length; i++) {
            this.getParentInfo.push(this.sortArr[i])
          }
          this.lineChartArr = []
          this.pieChartArr = []
          this.barChartArr = []
          this.$nextTick(() => {
            for (var i = 0; i < this.getParentInfo.length; i++) {
              if (this.getParentInfo[i].chartType === 'line') {
                this.lineChartArr.push(this.getParentInfo[i])
                lineChart(this.lineChartArr)
              }
              if (this.getParentInfo[i].chartType === 'pie') {
                this.pieChartArr.push(this.getParentInfo[i])
                pieChart(this.pieChartArr)
              }
              if(this.getParentInfo[i].chartType === 'bar'){
                this.barChartArr.push(this.getParentInfo[i])
                barChart(this.barChartArr)
              }
            }
          })
        })
      } else {
        lineChart(this.lineChartArr)
        pieChart(this.pieChartArr)
        barChart(this.barChartArr)
      }
    },
    parentInfo(params) { //父组件传参控制是否可以移动
      this.disabled = params
      if (params) console.log(this.sortArr)
    }
  },
  mounted() {
    this.getFirCharInfo()
  }
};
</script>
<style lang="scss">
.chartmain {
    position: relative;
    display: inline-block;
    margin-bottom: 1vh;
    border-radius: 2px 2px 2px 2px;
    box-shadow: 1px 2px 5px #ccc;
    border: 1px solid #ddd;
    min-height: 29vh;
    width: 24vw;
    margin-right: 0.5vw;
    // padding-top:4vh;
}
.h30 {
    height: 34vh !important;
}
.h20 {
    height: 24vh !important;
}
.h15 {
    height: 19vh !important;
}
.w24 {
    width: 24vw !important;
}
.w49 {
    width: 49vw !important;
}
.w32 {
    width: 32vw !important;
}
.charShow {
    height: calc(100% - 4vh);
    width: 100%;
}
.chartTit {
    top: 0;
    width: 100%;
    height: 4vh;
    border-bottom: 1px solid #e7e7e7;
    p {
        display: inline-block;
        margin-top: 0.5vh;
        margin-left: 1vw;
        font-size: 2.4vh;
        color: #222222;
        font-family: FZZZHONGJW--GB1-0;
    }
    i {
        float: right;
        margin-right: 1vw;
        margin-top: 1vh;
        cursor: pointer;
    }
}
.offDel {
    display: none!important;
}
</style>
