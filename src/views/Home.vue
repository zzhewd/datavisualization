<template>
  <div class="home">
      <div class="funcBtn">
        <el-button type="primary" plain @click="compileBtnFunc()">编辑</el-button>
        <el-button type="primary" plain @click="saveBtnFunc()" :disabled='disab'>保存</el-button>
        <NavMenu v-on:addEchart='selectchart' class="echartNav" ></NavMenu>
      </div>
      <LineSimple
        :addEcharts = 'addEcharts'
        ref="lineChartsFunc"
        :disab="disabled">
      </LineSimple>
  </div>
</template>

<script>
import LineSimple from "@/components/LineSimple.vue";
import draggable from 'vuedraggable'
import NavMenu from '@/components/NavMenu.vue'
export default {
  data() {
      return {
        addEcharts:[],
        disabled:true,
        disab:true
      };
    },
    computed:{

    },
    created() {

    },
    mounted () {

      },
    methods: {
      selectchart(data){
        this.addEcharts = []
        this.addEcharts.push(data)
        this.$nextTick(()=>{
          this.addEcharts = []
        })
      },
      compileBtnFunc(){
        this.$refs.lineChartsFunc.parentInfo(false)
        this.disab = false
        this.disabled = false
      },
      saveBtnFunc(){
        this.$refs.lineChartsFunc.parentInfo(true)
        this.disab = true
        this.disabled = true
      }
    },
    components: {
      draggable,
      LineSimple,
      NavMenu
    },
};
</script>
<style lang="scss">
.color-item{
        border:1px solid #f1f1f1;
        padding:10px 5px;
        margin:5px 0;
        border-radius: 4px;
    }
.home{
  height:100%;
  width:100%;
  .funcBtn{
    height:6.5vh;
    padding-top:.5vh;
    width:100%;
    text-align: right;
  }
  .echart1Box,.echart2Box,.echart3Box{
    height:100%;
    background:#f0f;
    .chartmain{
      position:relative;
      display:inline-block;
      margin-bottom:1vh;
      border-radius: 2px 2px 2px 2px;
      box-shadow: 1px 2px 5px #ccc;
      border: 1px solid #ddd;
      min-height:29vh;
      width:24vw;
      margin-right:.5vw;
    }
  }
  .echart2Box{
    background:#ff0;
  }
  .echart3Box{
    min-height:38.5vh;
    background:#0ff;
  }
  .h30{
    height:34vh !important;
  }
  .h20{
    height:24vh !important;
  }
  .h15{
    height:19vh !important;
  }
  .w24{
    width:24vw !important;
  }
  .w49{
     width:49vw !important;
  }
  .w32{
     width:32vw !important;
  }
  .itemclass{
    background:red;
  }
}
</style>
