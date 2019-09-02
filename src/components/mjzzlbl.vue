<template>
  <div class="tab_mzbl-content">
    <div class="tab_content_title">门急诊诊疗病历</div>
    <div class="tab_content_main">
      <table>
        <tbody>
          <tr>
            <td>流水号</td>
            <td>就诊时间</td>
            <td>就诊科室</td>
            <td>处理意见</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabData" :key="index">
            <td>{{ item.DE06_00_062_00 }}</td>
            <td v-if="!item.DE06_00_062_00"></td>
            <td
              v-if="item.DE06_00_062_00"
            >{{ item.DE06_00_062_00.slice(0,4)+'-'+item.DE06_00_062_00.slice(4,6)+'-'+item.DE06_00_062_00.slice(6,8) }}</td>
            <td>{{ item.DE08_10_026_00 }}</td>
            <td>{{item.DE06_00_087_00}}</td>
            <td class="handle" @click="changeDialogVisible(item)">详情</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <!-- <td class="handle" @click="changeDialogVisible()">详情</td> -->
          </tr>
          <el-dialog width="1000px" :visible.sync="dialogVisible">
            <div class="table_mzbl_content">
              <div class="main_title">{{detail.AP08_10_013_04}}{{detail.BASIC_ACTIVE_DES}}</div>
              <div class="header">
                <div class="header_item">门诊号：{{detail.DE01_00_010_00}}</div>
                <div class="header_item">姓名:{{detail.DE02_01_039_00}}</div>
                <div class="header_item">性别:{{detail.AP02_01_102_01}}</div>
                <div class="header_item">年龄：{{detail.DE02_01_032_00}}</div>
                <div class="header_item">就诊科室:{{detail.DE08_10_026_00}}</div>
                <div
                  class="header_item"
                  v-if="detail.DE06_00_062_00"
                >就诊时间:{{detail.DE06_00_062_00.slice(0,4)+'-'+detail.DE06_00_062_00.slice(4,6)+'-'+detail.DE06_00_062_00.slice(6,8)}}</div>
              </div>
              <div class="content">
                <div class="content_item_title">主诉:</div>
                <div class="content_item_detail">{{detail.DE04_01_119_00}}</div>
                <div class="content_item_title">病史:</div>
                <div class="content_item_detail">{{detail.DE02_10_071_00}}</div>
                <div class="content_item_title">过敏史:</div>
                <div class="content_item_detail">{{detail.DE02_10_022_00}}</div>
                <div class="content_item_title">查体情况:</div>
                <div class="content_item_detail">{{detail.AP06_00_403_00}}</div>
                <div class="content_item_title">检查:</div>
                <div class="content_item_detail"></div>
                <div class="content_item_title">检验:</div>
                <div class="content_item_detail"></div>
                <div class="content_item_title">治疗建议:</div>
                <div class="content_item_detail">{{detail.AP06_00_403_00}}</div>
                <!-- <div class="content_footer">初步诊断:</div> -->
              </div>
              <div class="footer">
                <div class="footer_item">打印日期:</div>
                <div class="footer_item">医师:{{detail.AP02_01_039_29}}</div>
                <div class="footer_item"></div>
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
  name: "OutpatientMedicalRecords", // 门急诊诊疗病历
  props: ["tabData"],
  data() {
    return {
      dialogVisible: false,
      detail: []
    };
  },
  created() {
    console.log("门急诊诊疗病历:", this.tabData);
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

<style lang='scss' scoped>
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
      color: rgba(68, 136, 226, 0.8);
    }
  }
}

.tab_content_title {
  font-size: 18px;
  font-weight: 600;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.table_mzbl_content {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 500px;

  .main_title {
    width: 100%;
    letter-spacing: 5px;
    font-size: 20px;
    font-weight: 600;
    line-height: 50px;
    text-align: center;
  }
  .little_tittle {
    letter-spacing: 5px;
    font-size: 18px;
    font-weight: 600;
    height: 20px;
    line-height: 20px;
  }
  .header {
    width: 90%;
    display: flex;
    box-shadow: none;
    margin: 0 auto;
    height: 50px;
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 3px solid #333;
    justify-content: space-between;
    .header_item {
      height: 30px;
      line-height: 30px;
    }
  }
  .content {
    width: 90%;
    margin: 0 auto;
    padding-bottom: 20px;
    min-height: 500px;
    margin-bottom: 20px;
    border-bottom: 3px solid #333;
    display: flex;
    flex-direction: column;
    text-align: left;
    .content_item_title {
      text-indent: 32px;
      font-weight: 600;
      padding-top: 30px;
    }
    .content_item_detail {
      text-indent: 32px;
      line-height: 30px;
    }
    .content_footer {
      text-align: right;
    }
  }
  .footer {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }
}
</style>
