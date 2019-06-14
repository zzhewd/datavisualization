<template>
  <div class="selectColor">
      <span class="describe coloTit">图表颜色:</span>
      <div v-for='(color,index) in colorList' :key="'colorList' + index" class="selectcolor">
        <el-color-picker v-model="color.colorItem" size="mini" :show-alpha = 'color.showalpha'></el-color-picker>
      </div>
  </div>
</template>

<script>

export default {
  data() {
      return {
        colorList:[{
            colorItem:null
        }],
        singleLineColor:[{
            colorItem:'#EB3841'
        },{
            colorItem:'#FEB4B4'
        }],
        doubleLineColor:[{
            colorItem:'#EB3841'
        },{
            colorItem:'#6086FF'
        }],
        rowBarColor:[{
            colorItem:'#6086FF'
        },{
            colorItem:'#98D1FF'
        },{
            colorItem:'#FEA145'
        },{
            colorItem:'#FB764A'
        }],
        columnBarColor:[{
            colorItem:'rgba(152,209,255,0.2)',
            showalpha:true
        },{
            colorItem:'#83bff6'
        },{
            colorItem:'#188df0'
        },{
            colorItem:'#188df0'
        }],
        areaPieColor:[{
            colorItem:'#67A8FF'
        },{
            colorItem:'#D0F6FF'
        },{
            colorItem:'#FFE059'
        },{
            colorItem:'#FB764A'
        }],
        circlePieColor:[{
            colorItem:'#EB3841'
        },{
            colorItem:'#FB764A'
        },{
            colorItem:'#FEA145'
        },{
            colorItem:'#FFE059'
        },{
            colorItem:'#D0F6FF'
        },{
            colorItem:'#98D1FF'
        },{
            colorItem:'#67A8FF'
        },{
            colorItem:'#6086FF'
        }],
        copysingleLineColor:[]
      };
    },
    props: ['chartType','definiteChartType'],
    watch: {
        pchartType:{
            handler(val){
                // console.log(val)
            }
        },
        pdefiniteChartType:{
            handler(val){
                // console.log(val)
                this.changeColor()
            },
        }
    },
    computed:{
        pchartType(){
            return this.chartType
        },
        pdefiniteChartType(){
            return this.definiteChartType
        }
    },
    created() {
        
    },
    mounted () {

    },
    methods: {
        changeColor(){
            if(this.pchartType === '' || this.pdefiniteChartType === ''){
                this.colorList = [{colorItem:null}]
            }else{
                if(this.pchartType === 'line' && this.pdefiniteChartType === 'singleLine')this.colorList = this.singleLineColor
                if(this.pchartType === 'line' && this.pdefiniteChartType === 'doubleLine')this.colorList = this.doubleLineColor
                if(this.pchartType === 'bar' && this.pdefiniteChartType === 'rowBar')this.colorList = this.rowBarColor
                if(this.pchartType === 'bar' && this.pdefiniteChartType === 'columnBar')this.colorList = this.columnBarColor
                if(this.pchartType === 'pie' && this.pdefiniteChartType === 'areaPie')this.colorList = this.areaPieColor
                if(this.pchartType === 'pie' && this.pdefiniteChartType === 'circlePie')this.colorList = this.areaPieColor
                this.$emit('changeColor', this.colorList)
            }
        }
    },
    components: {
      
    },
};
</script>
<style lang="scss">

</style>
