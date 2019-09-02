<template>
  <div class="tab_content">
    <div class="tab_content_title">门急诊诊疗诊断记录</div>
    <div class="tab_content_main">
      <table>
        <tbody>
          <tr>
            <td>流水号</td>
            <td>姓名</td>
            <td>年龄</td>
            <td>诊断疾病名称</td>
            <td>医师</td>
            <td>科室</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabData" :key="index">
            <td>{{ item.BASIC_ACTIVE_ID }}</td>
            <td>{{ item.DE02_01_039_00 }}</td>
            <td>{{ item.DE02_01_032_00 }}</td>
            <td>{{ item.DE05_01_025_00 }}</td>
            <td>{{ item.AP02_01_039_29 }}</td>
            <td>{{ item.DE08_10_026_00 }}</td>
            <td class="handle" @click="changeDialogVisible(item)">
              <span>详情</span>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <!-- <td class="handle" @click="changeDialogVisible()">
              <span>详情</span>
            </td>-->
          </tr>
          <el-dialog :visible.sync="dialogVisible" width="1000px">
            <div class="table_mabl_content">
              <div class="main_title">
                {{detail.ORGANIZATION_NAME}}
                <div class="little_tittle">{{detail.BASIC_ACTIVE_DES}}</div>
              </div>
              <div class="header"></div>
              <div class="content">
                <div
                  class="content_item_detail"
                >兹证明 {{detail.DE02_01_039_00}}同志， {{detail.AP02_01_102_01}} ，经在我院 {{detail.DE08_10_026_00}} 诊治</div>
                <div class="content_item_detail">诊疗号:{{detail.DE01_00_010_00}}</div>
                <div class="content_item_detail">临床诊断为: {{detail.DE05_01_025_00}}</div>
                <div class="content_item_detail">曾作处理:</div>
                <!-- <div class="content_item_detail">建议：1.禁烟酒。2避免劳累。3.动态监测相关指标变化。</div> -->
              </div>
              <div class="content_bottom">
                <div class>医师：{{detail.AP02_01_039_29}}</div>
                <div
                  v-if="detail.DE05_01_058_00"
                >确诊日期：{{detail.DE05_01_058_00.slice(0,4)+'-'+detail.DE05_01_058_00.slice(4,6)+'-'+detail.DE05_01_058_00.slice(6)}}</div>
                <div v-else-if="!detail.DE05_01_058_00"></div>
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
  name: "zjzzlzdjl",
  props: ["tabData"],
  data() {
    return {
      dialogVisible: false,
      detail: []
    };
  },
  created() {
    console.log("门急诊诊疗诊断记录：", this.tabData);
  },
  methods: {
    changeDialogVisible(item) {
      this.dialogVisible = true;
      if (item) {
        this.detail = item;
        console.log(this.detail)
        this.detail.DE05_01_058_00 = this.detail.DE05_01_058_00.toString()
      }
    }
  }
};
</script>

<style lang='scss' scoped>
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
      color: #333;
      &.handle {
        cursor: pointer;
        color: blue;
      }
    }
  }
}

.table_cy_content {
  // width: 800px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: left;
  .main_title {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
  .header {
    width: 100%;
    display: flex;
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 3px solid #333;
    box-shadow: none;
  }
  .header_item {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
  }
  .header_item:nth-child(2) {
    text-align: center;
  }
  .header_item:nth-child(3) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .header_item_top {
    font-size: 24px;
    font-weight: 600;
    height: 50px;
    line-height: 50px;
  }
  .header_item_item {
    display: flex;
  }
  .item_title {
    display: inline-block;
    letter-spacing: 3px;
    width: 80px;
  }
  .top {
    width: 100%;
    min-height: 300px;
    box-sizing: border-box;
  }
  /**table**/
  .table {
    width: 100%;
    box-sizing: border-box;
    border-collapse: collapse;
    .row {
      box-sizing: border-box;
    }
  }
  /** content**/
  .cy_content {
    min-height: 400px;
    padding: 20px 0;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    border-bottom: 3px solid #333;
    .cy_content_box {
      min-height: 100px;
    }
    .content_item_title {
      text-indent: 32px;
      font-weight: 600;
    }
    .content_item_detail {
      text-indent: 32px;
    }
  }
}
.table_mzbl_content {
  width: 1000px;
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
    justify-content: space-between;
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 3px solid #333;
    .header_item {
      height: 30px;
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
    // padding: 0 30px;
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }
}
.content_bottom {
  display: flex;
  justify-content: space-around;
}
.table_mabl_content {
  width: 1000px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 500px;
  .main_title {
    width: 100%;
    letter-spacing: 5px;
    font-size: 20px;
    font-weight: 600;
    /* height: 50px; */
    line-height: 50px;
    text-align: center;
  }
  .little_tittle {
    letter-spacing: 5px;
    font-size: 18px;
    font-weight: 600;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }
  .header {
    width: 95%;
    box-shadow: none;
    margin: 0 auto;
    height: 20px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 2px solid #333;
  }

  .content {
    padding-bottom: 20px;
    min-height: 500px;
    margin-bottom: 20px;
    border-bottom: 2px solid #333;
    flex-direction: column;
    text-align: left;
    text-indent: 20px;
  }
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

  .footer {
    padding: 0 30px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
