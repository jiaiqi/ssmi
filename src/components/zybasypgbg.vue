<template>
  <div class="tab_content">
    <div class="tab_content_title">住院病案首页评估报告</div>
    <div class="tab_content_main">
      <table>
        <tbody>
          <tr>
            <td>医院</td>
            <td>住院号</td>
            <td>姓名</td>
            <td>性别</td>
            <td>年龄</td>
            <td>入院日期</td>
            <td>机构名称</td>
            <td>数据产生时间</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{item.DE01_00_014_00}}</td>
            <td>{{item.DE02_01_039_00}}</td>
            <td>{{item.AP02_01_102_01}}</td>
            <td>{{item.DE02_01_032_00}}</td>
            <td v-if="item.DE06_00_092_00">{{format_date(item.DE06_00_092_00)}}</td>
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
            <td class="handle" @click="changeDialogVisible(item)">详情</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <!-- <td class="handle" @click="changeDialogVisible()">详情</!-->
            -->
          </tr>
          <el-dialog title :visible.sync="dialogVisible" width="1000px">
            <div class="dialog_rypg">
              <div class="dialog_title">住院病案首页评估</div>
              <div class="dialog_head">
                <div class="dialog_head_items">
                  <div class="dialog_head_item">入院科室:{{detail.AP08_10_026_01}}</div>
                  <div class="dialog_head_item">住院号:{{detail.DE01_00_014_00}}</div>
                  <div class="dialog_head_item">姓名:{{detail.DE02_01_039_00}}</div>
                  <div class="dialog_head_item">年龄:{{detail.DE02_01_032_00}}岁</div>
                  <div class="dialog_head_item">病案号:{{detail.DE01_00_004_00}}</div>
                </div>
                <div class="dialog_head_items">
                  <div class="dialog_head_item">职业:{{detail.AP02_01_125_02}}</div>
                  <div class="dialog_head_item">民族:{{detail.AP02_01_025_03}}</div>
                  <div class="dialog_head_item">籍贯:{{detail.AP02_01_099_00}}</div>
                </div>
                <div class="dialog_head_items">
                  <div
                    v-if="detail.DE06_00_092_00"
                    class="dialog_head_item"
                  >入院日期:{{format_date(detail.DE06_00_092_00)}}</div>
                  <div class="dialog_head_item">联系电话:{{detail.DE02_01_010_00}}</div>
                </div>
                <div class="dialog_head_items">
                  <div class="dialog_head_item">现住址:{{detail.AP02_01_009_00}}</div>
                </div>
                <div class="dialog_head_items">
                  <div class="dialog_head_item">入院途径:{{detail.AP06_00_369_00}}</div>
                </div>
              </div>
              <div class="dialog_content">
                <div class="content">
                  <div class="content_item">1.入院体重:{{detail.AP04_10_188_00}}</div>
                  <div class="content_item">2.ABO血型:{{detail.AP04_50_022_00}}</div>
                  <div class="content_item">3.RH血型:{{detail.AP04_50_023_00}}</div>
                  <div class="content_item">4.住院患者过敏源名称:{{detail.AP05_01_174_00}}</div>
                  <div class="content_item">5.住院患者过敏源名称:{{detail.AP05_01_175_00}}</div>
                  <div class="content_item">6.住院患者诊断符合情况:{{detail.AP05_10_006_00}}</div>
                  <div class="content_item">7.住院患者出院方式:{{detail.AP06_00_375_00}}</div>
                  <div class="content_item">8.治疗类别:{{detail.AP06_00_373_00}}</div>
                  <div class="content_item">9.医疗费用支付方式:{{detail.AP07_00_011_01}}</div>
                  <div class="content_item">10.住院机构名称:{{detail.AP08_10_013_06}}</div>
                  <div class="content_item">11.住院患者住院次数:{{detail.DE02_10_090_00}}</div>
                </div>
              </div>
            </div>
          </el-dialog>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "zybasypgbg",
  props: ["tabData", "elTabsData"],
  data() {
    return {
      dialogVisible: false,
      detail: {}
    };
  },
  created() {
    setTimeout(() => {
      this.tabsData = this.elTabsData.zybasy
    }, 300);
  },
  methods: {
    changeDialogVisible(item) {
      this.dialogVisible = true;
      if (item) {
        this.detail = item;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/* header */
.heade {
  width: 100%;
  margin: 0 auto;
  display: flex;
  // height: 80px;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  background-color: #fff;
  color: #333;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
}

.content {
  /* height: 550px; */
  height: 700px;
  margin-top: 10px;
  box-sizing: border-box;
}

.tab_content {
  width: 100%;
  height: 100%;
  text-align: center;
  .tab_content_title {
    font-family: "Arial Negreta", "Arial Normal", "Arial";
    font-weight: 700;
    height: 60px;
    line-height: 60px;
    font-style: normal;
    font-size: 16px;
    color: #7f7f7f;
  }
}

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
    &.handle {
      cursor: pointer;
      color: #409eff;
    }
  }
}

.text {
  margin: 0;
  padding: 0;
}

.dialog_rypg {
  display: flex;
  flex-direction: column;
  width: 800px;
  padding: 10px 20px;
  background-color: #fff;
  margin: 50px auto;
  .bold {
    font-weight: 600;
    min-width: 100px;
  }
  .dialog_title {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    line-height: 50px;
    height: 50px;
    border-bottom: 1px solid #333;
  }
  .dialog_head {
    padding-top: 20px;
    .dialog_head_items {
      display: flex;
      justify-content: space-between;
    }
  }
  .dialog_content {
    .title {
      padding-top: 10px;
      text-align: left;
      line-height: 20px;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      .content_item {
        margin-left: 5px;
      }
    }
  }
}
</style>
