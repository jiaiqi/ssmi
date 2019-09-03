<template>
  <div class="tab_content">
    <div class="tab_content_title">门急诊诊疗挂号记录</div>
    <div class="tab_content_main">
      <table>
        <tbody>
          <tr>
            <td>就诊流水号</td>
            <td>姓名</td>
            <td>就诊地点</td>
            <td>就诊科室</td>
            <td>预约途径</td>
            <td>就诊类别</td>
            <td>挂号日期</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{ item.DE01_00_010_00 }}</td>
            <td>{{ item.DE02_01_039_00 }}</td>
            <td>{{ item.ORGANIZATION_NAME }}</td>
            <td>{{ item.DE08_10_026_00 }}</td>
            <td>{{ item.AP06_00_401_02 }}</td>
            <td>{{ item.BUSINESS_ACTIVE_DES }}</td>
            <td v-if="!item.AP09_00_024_00"></td>
            <td
              v-if="item.AP09_00_024_00"
            >{{ item.AP09_00_024_00.slice(0,4)+"年"+item.AP09_00_024_00.slice(4,6)+"月"+item.AP09_00_024_00.slice(6,8)+"日" }}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
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
      DI_ADI_REGISTER_INFO_select: {}
    };
  },
  created() {
    console.log("data:", this.elTabsData);
    setTimeout(() => {
      this.tabsData = this.elTabsData.mzghjl
    }, 500);
  },
  methods: {
    changeDialogVisible(item) {
      this.dialogVisible = true;
      this.detail = item;
    }
  }
};
</script>

<style lang="scss" scoped>
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
.tab_content_title {
  text-align: center;
  line-height: 50px;
  font-weight: 600;
}
</style>
