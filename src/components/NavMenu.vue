<template>
<div class="navMenu">
  <el-button type="primary" plain @click="dialogTableVisible = true">添加</el-button>
  <el-dialog title="添加图表" :visible.sync="dialogTableVisible">
    <div class="choseWhichOneChart">
      <span class="describe">选择图表:</span>
      <el-select v-model="choseCWhichOne" placeholder="请选择图表" class="selectInfo" @change='seleChart'>
        <el-option v-for="Choseitem in choseCharts" :key="Choseitem.value" :label="Choseitem.label" :value="Choseitem.value">
        </el-option>
      </el-select>
      <span class="notice">(选择的图表仅供参考，不代表真实数据)</span>
      <div class="showCharts">
        <img v-for='(whichOneChartsItem,whichOneChartsIndex) in imgArr' :key="'imgArr' + whichOneChartsIndex" :src=whichOneChartsItem.imgSrc :class="{ clickChart:whichOneChartsIndex === clickChart}"
          @click="clickChoseChart(whichOneChartsItem,whichOneChartsIndex)" />
      </div>
    </div>
    <div class="chartTie">
      <span class="describe">图表名称:</span>
      <el-input v-model="chartTie" placeholder="请输入图表名称" class="selectInfo pintcharname"></el-input>
    </div>
    <div class="chartcolo">
      <selectColor :chartType='choseCWhichOne' :definiteChartType='selectChartType' v-on:changeColor='changeColo'></selectColor>
    </div>
    <div class="chartChoseHW">
      <span class="describe">宽:</span>
      <el-select v-model="wChoseWhichOne" placeholder="请选择宽度" class="selectInfo">
        <el-option v-for="wItem in chartChoseW" :key="wItem.value" :label="wItem.label" :value="wItem.value">
          <span style="float: left">{{ wItem.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ wItem.value }}</span>
        </el-option>
      </el-select>
      <span class="describe">高:</span>
      <el-select v-model="HChoseWhichOne" placeholder="请选择高度" class="selectInfo">
        <el-option v-for="HItem in chartChoseH" :key="HItem.value" :label="HItem.label" :value="HItem.value">
          <span style="float: left">{{ HItem.label }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">{{ HItem.value }}</span>
        </el-option>
      </el-select>
    </div>
    <el-button type="text">高级选项</el-button>
    <el-button @click="dialogTableVisible = false">取消</el-button>
    <el-button @click="getChartInfo" type="primary">确定</el-button>
  </el-dialog>
</div>
</template>
<script>
import * as seleData from '../utils/dataInfor.js'
import selectColor from './selectColor'
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      isCollapse: true,
      addNum:-1,
      dialogTableVisible: false,
      clickChart: -1,
      choseCharts: seleData.default.choseCharts,
      choseCWhichOne: '', //选择图表
      selectChartType: '', //详细图表
      chartTie: '', //图表名称
      imgArr: [],
      chartChoseW: seleData.default.chartChoseW,
      wChoseWhichOne: '', //选择的宽度
      chartChoseH: seleData.default.chartChoseH,
      HChoseWhichOne: '', //选择的高度
      seleColor:[],//选择的颜色
      colorArr:[],//颜色重新填充
    };
  },
  watch: {
    dialogTableVisible(val) {
      if (!val) {
        this.choseCWhichOne = ''
        this.selectChartType = ''
        this.imgArr = []
        this.wChoseWhichOne = ''
        this.HChoseWhichOne = ''
        this.clickChart = -1
        this.chartTie = ''
      }
    }
  },
  created() {

  },
  computed: {
    ...mapState({
      delText: 'delText'
    })
  },
  methods: {
    seleChart() {
      this.imgArr = []
      for (var i = 0; i < this.choseCharts.length; i++) {
        if (this.choseCharts[i].value === this.choseCWhichOne) {
          this.imgArr = this.choseCharts[i].chartType
        }
      }
      this.clickChart = -1
      this.selectChartType = ''
    },
    clickChoseChart(params, index) {
      this.selectChartType = params.type
      this.clickChart = index
    },
    changeColo(data){
      this.seleColor = data
    },
    async getChartInfo() {
      var seriesData = [] ,doubleArr =[]
      if (this.choseCWhichOne === '' || this.selectChartType === '' || this.wChoseWhichOne === '' || this.HChoseWhichOne === '' || this.chartTie === '' || this.seleColor.length === 0) {
        this.$message.error('请检查是否有未选或未填项');
        return
      }
      for(var i=0;i<this.seleColor.length;i++){
        this.colorArr.push(this.seleColor[i].colorItem)
      }
      let result = await this.$store.dispatch('GET_LINE_CHART_INFO', {
        chartType: this.choseCWhichOne,
        chartDetailType: this.selectChartType
      })
      if (result.success) {
        if (this.delText === -1) {
          this.addNum = document.querySelector('.moveBox').children.length + 1
        } else if(this.delText != -1 ) {
          this.addNum = this.delText
        }
        if(this.selectChartType === 'doubleLine'){
          for(var j=0;j<result.data.seriesData.length;j++){
            for(var x=0;x<this.colorArr.length;x++){
              if(j === x){
                doubleArr.push({data:result.data.seriesData[j].data,color:this.colorArr[x]})
              }
            }
          }
          seriesData = doubleArr
        }else{
          seriesData = result.data.seriesData
        }
        var inserInfo = {
          chartClass: this.HChoseWhichOne + ' ' + this.wChoseWhichOne + ' ' + 'chartMain' + this.addNum,
          text: this.addNum,
          chartType: this.choseCWhichOne,
          chartDetailType: this.selectChartType,
          chartTit: this.chartTie,
          chartMainClass: '.chartMain' + this.addNum,
          xData: result.data.xData,
          chartColor:this.colorArr,
          seriesData: seriesData
        }
        this.$nextTick(() => {
          this.$emit('addEchart', inserInfo)
          this.dialogTableVisible = false
          this.colorArr = []
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.$store.dispatch('PUSH_DEL_WHICH_ONE', -1)
        })
      }
    }
  },
  components: {
      selectColor
    },
};
</script>
<style lang="scss">
.navMenu {
    display: inline-block;
    margin-left: 1vw;
    margin-right: 2vw;
}
.el-dialog__header {
    text-align: left;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 400px;
}
.chartChoseHW,
.chartTie,
.chartcolo,
.choseWhichOneChart,
.editName {
    text-align: left;
    margin-bottom: 1vh;
    .describe {
        padding-left: 3vw;
    }
    .selectInfo {
        margin-left: 2vw;
    }
    .coloTit{
      margin-right: 2vw;
    }
    .selectcolor{
      display:inline-block;
      margin-right:1vw;
    }
    .notice {
        font-size: 1.8vh;
        color: #aaa;
        padding-left: 1vw;
    }
    .pintcharname{
      width:15vw;
    }
}
.showCharts {
    width: 100%;
    margin-top: 1vh;
    img {
        height: 20vh;
        margin-left: 1vw;
        display: inline-block;
        cursor: pointer;
        border: 1px solid #fff;
    }
    .clickChart {
        border: 1px solid #b3d8ff;
    }
}
</style>
