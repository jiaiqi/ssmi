<template>
  <div class="tab_content">
    <div class="tab_content_title">门急诊诊疗挂号记录</div>
    <div class="tab_content_main">
      <table v-if="tabsData&&tabsData.length>0">
        <tbody>
          <tr>
            <td>医院</td>
            <td>就诊流水号</td>
            <td>就诊科室</td>
            <td>预约途径</td>
            <td>就诊类别</td>
            <td>挂号日期</td>
            <td>数据产生时间</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{ item.DE01_00_010_00 }}</td>
            <td>{{ item.DE08_10_026_00 }}</td>
            <td>{{ item.AP06_00_401_02 }}</td>
            <td>{{ item.BUSINESS_ACTIVE_DES }}</td>
            <td v-if="!item.AP09_00_024_00"></td>
            <td v-if="item.AP09_00_024_00">{{format_date(item.AP09_00_024_00)}}</td>
            <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
          </tr>
        </tbody>
      </table>
      <div class="nodata" v-else>暂无数据......</div>
    </div>
    <!-- <el-pagination
      layout="prev, pager, next"
      :current-page="currentPage"
      :total="totalNum"
      :page-size="pageSize"
      @current-change="changeCurrentPage"
      @size-change="changeSize"
    ></el-pagination>-->
  </div>
</template>

<script>
export default {
  name: "OutpatientRegistrationRecord",
  props: ["elTabsData", "tabData"],
  data() {
    return {
      dialogVisible: false,
      detail: {},
      tabsData: [],
      currentPage: 1,
      totalNum: 1,
      pageSize: 5,

    };
  },
  created() {
    // console.log("data:", this.elTabsData);
    setTimeout(() => {
      this.tabsData = this.elTabsData.mzghjl
    }, 300);
  },
  mounted() {
    console.log('this.elTabsData:', this.elTabsData.mzghjl)
    let tabsData = this.elTabsData.mzghjl
    // this.totalNum = tabsData.length
  },
  methods: {
    changeDialogVisible(item) {
      this.dialogVisible = true;
      this.detail = item;
    },
    changeCurrentPage(val) {
      this.currentPage = val
      console.log(`当前页：${val}`)
    },
    changeSize(val) {
      this.pageSize = val
      console.log(`每页${val}条`)
    },
    prevPage() { },
    nextpage() { }
  }
};
</script>

<style lang="scss" scoped>
.tab_content {
  height: 100%;
  position: relative;
  .tab_content_title {
    text-align: center;
    line-height: 50px;
    font-weight: 600;
    font-size: 16px;
  }
  .tab_content_main {
    table {
      width: 80%;
      border-spacing: 0px;
      border-collapse: collapse;
      margin: 0 auto;
      td {
        min-width: 30px;
        height: 30px;
        text-align: center;
        padding: 0 10px;
        white-space: nowrap;
        font-size: 12px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        color: #7f7f7f;
      }
    }
  }
  .el-pagination {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 150px;
  }
}
</style>
