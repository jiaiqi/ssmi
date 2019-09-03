<template>
  <div class="tab_content">
    <div class="tab_content_title">住院诊疗诊断记录信息</div>
    <div class="tab_content_main">
      <table>
        <tbody>
          <tr>
            <td>姓名</td>
            <td>年龄</td>
            <td>诊断疾病名称</td>
            <td>科室</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{ item.DE02_01_039_00 }}</td>
            <td>{{ item.DE02_01_032_00 }}</td>
            <td>{{ item.AP05_01_025_01 }}</td>
            <td>{{ item.AP08_10_026_11 }}</td>
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
                >兹证明 {{detail.DE02_01_039_00}}同志， {{detail.AP02_01_102_01}} ，经在我院 {{detail.AP08_10_026_11}} 诊治</div>
                <div class="content_item_detail">住院号:{{detail.DE01_00_014_00}}</div>
                <div class="content_item_detail">疾病状态为: {{detail.AP05_01_114_00}}</div>
                <div class="content_item_detail">疾病诊断名称: {{detail.AP05_01_025_01}}</div>
                <div class="content_item_detail">诊断依据:{{detail.AP05_01_010_00}}</div>
                <div class="content_item_detail">建议：</div>
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
  name: "zyzlzdjlxx",
  props: ["tabData", "elTabsData"],
  data() {
    return {
      dialogVisible: false,
      detail: {},
      tabsData: []
    };
  },
  created() {
    setTimeout(() => {
      this.tabsData = this.elTabsData.zyzdjl
    }, 500);
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
.tab_content {
  width: 100%;
  height: 100%;
  text-align: center;
}

.tab_content_title {
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  height: 60px;
  line-height: 60px;
  font-style: normal;
  font-size: 16px;
  color: #7f7f7f;
}

/* 详情 */
.tab_detail {
  box-sizing: border-box;
  // width: 900px;
  margin: 0 auto;
  min-height: 500px;
  text-align: left;
  p {
    margin-left: 2%;
  }
}

.detail_title {
  display: flex;
  justify-content: space-around;
  padding-bottom: 5px;
  border-bottom: 1px solid #333;
}

.detail_title_block {
  width: 25%;
  line-height: 20px;
  display: flex;
  text-align: left;
  flex-direction: column;
}
.detail {
  display: flex;
  justify-content: space-between;
  .detail_left {
    width: 45%;
    min-height: 530px;
    text-align: left;
    border-right: 1px solid black;
    p {
      margin-left: 5%;
    }
  }
  .detail_rig {
    width: 45%;
    text-align: left;
    margin-right: 2%;
    p {
      margin-right: 5%;
    }
  }
}

.read_card {
  min-height: 100px;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
}
/* 内容 */
.detail_content_title {
  display: flex;
  width: 100%;
}

.title_left {
  flex: 1;

  display: flex;
  justify-content: space-around;
  table,
  tr,
  td {
    border: 1px solid #333;
    margin-top: 15px;
  }
  table {
    width: 100%;
  }
}

.title_right {
  display: flex;
  justify-content: space-around;
  flex: 1;
}

.detail_content_content {
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: space-between;
}

.detail_content_left {
  border-right: 1px #333 solid;
  height: 300px;
  width: 50%;
}

.detail_content_right {
  height: 300px;
  width: 50%;
}

table {
  width: 80%;
  border-spacing: 0px;
  border-collapse: collapse;
  margin: 0 auto;
}

table td {
  min-width: 30px;
  height: 30px;
  text-align: center;
  padding: 0 10px;
  white-space: nowrap;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: #7f7f7f;
}

td.handle {
  cursor: pointer;
  color: blue;
}

.text {
  margin: 0;
  padding: 0;
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
