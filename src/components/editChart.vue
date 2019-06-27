<template>
  <div class="editChart">
    <!-- <el-dialog :title="editChartinfo.charTit === undefined?'编辑':editChartinfo.charTit+'-修改'" :visible.sync="editchartDialog" > -->
    <el-dialog title="编辑" :visible.sync="editchartDialog" >
        <div class="editName">
            <span class="describe">图表名称:</span>
            <el-input v-model="editChartinfo.charTit" placeholder="修改图表名称" class="selectInfo pintcharname"></el-input>
        </div>
        <div class="funcBtn">
            <el-button @click="editchartDialog = false">取消</el-button>
            <el-button @click="affirmEdit" type="primary">确定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  data() {
      return {
        editchartDialog:false,
        editChartinfo:{}
      };
    },
    watch: {
      
    },
    computed:{
        ...mapState({
            editChartInfo: 'editChartInfo'
        })
    },
    created() {

    },
    mounted () {

    },
    methods: {
      editdialog(data){
        this.editchartDialog = data
        this.editChartinfo = this.editChartInfo
      },
      affirmEdit(){
        this.editchartDialog = false
        this.editChartinfo.charItem.chartTit = this.editChartinfo.charTit
      }
    },
    components: {

    },
};
</script>
<style lang="scss">
.editChart{
    display: inline-block;
    float: right;
    margin-right: 1vw;
    margin-top: 0.6vh;
    cursor: pointer;
}
</style>
