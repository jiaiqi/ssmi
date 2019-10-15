<template>
  <div class="tab_content">
    <div class="tab_content_title">出院记录</div>
    <div class="tab_content_main">
      <table v-if="tabsData&&tabsData.length>0">
        <tbody>
          <tr>
            <td>医院</td>
            <td>住院号</td>
            <td>姓名</td>
            <td>住院患者入院科室</td>
            <td>入院日期</td>
            <td>出院日期</td>
            <td>数据产生时间</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{ item.DE01_00_014_00 }}</td>
            <td>{{ item.DE02_01_039_00 }}</td>
            <td>{{ item.AP08_10_026_01 }}</td>
            <td
              v-if="item.DE06_00_092_00"
            >{{ item.DE06_00_092_00.slice(0,4)+'-'+item.DE06_00_092_00.slice(4,6)+'-'+item.DE06_00_092_00.slice(6,8) }}</td>
            <td
              v-if="item.DE06_00_016_00"
            >{{ item.DE06_00_016_00.slice(0,4)+'-'+item.DE06_00_016_00.slice(4,6)+'-'+item.DE06_00_016_00.slice(6,8) }}</td>
            <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
            <td class="handle" @click="changeDialogVisible(item)">
              <span>详情</span>
            </td>
          </tr>

          <el-dialog :visible.sync="dialogVisible" width="1100px">
            <div class="tab_detail">
              <div class="table_cy_content">
                <div class="main_title">{{ detail.AP08_10_013_06 }}</div>
                <div class="header">
                  <div class="header_item">住院科室:{{ detail.AP08_10_026_01 }}</div>
                  <div class="header_item">
                    <div class="header_item_top">出院记录</div>
                    <div class="header_item_bottom">姓名:{{ detail.DE02_01_039_00 }}</div>
                  </div>
                  <div class="header_item">
                    <div class="header_item_item">
                      <span class="item_title">住院号:</span>
                      <span class="item_text">{{ detail.DE01_00_014_00 }}</span>
                    </div>
                    <div class="header_item_item">
                      <span class="item_title">影像号:</span>
                      <span class="item_text"></span>
                    </div>
                    <div class="header_item_item">
                      <span class="item_title">床 &nbsp;号:</span>
                      <span class="item_text">{{ detail.AP08_10_001_00 }}</span>
                    </div>
                  </div>
                </div>
                <div class="top">
                  <table class="table">
                    <tr class="row">
                      <td>姓名:</td>
                      <td colspan="2">{{ detail.DE02_01_039_00 }}</td>
                      <td>性别:</td>
                      <td>{{ detail.AP02_01_102_01 }}</td>
                      <td>年龄:</td>
                      <td>{{ detail.DE02_01_032_00 }}</td>
                      <td>住院患者出院科室:</td>
                      <td colspan="3">{{ detail.AP08_10_026_08 }}</td>
                    </tr>
                    <tr>
                      <td>籍贯:</td>
                      <td colspan="4">陕西，延安</td>
                      <td>医疗费用支付方式:</td>
                      <td colspan="5">{{ detail.AP07_00_011_01 }}</td>
                    </tr>
                    <tr v-if="detail.DE06_00_092_00">
                      <td colspan="2">住院日期:</td>
                      <td colspan="2" v-if="detail.DE06_00_092_00">
                        {{
                        detail.DE06_00_092_00.slice(0, 4) +
                        "-" +
                        detail.DE06_00_092_00.slice(4, 6) +
                        "-" +
                        detail.DE06_00_092_00.slice(6, 8)
                        }}
                      </td>
                      <td>出院日期:</td>
                      <td colspan="2" v-if="detail.DE06_00_016_00">
                        {{
                        detail.DE06_00_016_00.slice(0, 4) +
                        "-" +
                        detail.DE06_00_016_00.slice(4, 6) +
                        "-" +
                        detail.DE06_00_016_00.slice(6, 8)
                        }}
                      </td>
                      <td>住院天数</td>
                      <td>{{this.dateDiff(detail.DE06_00_092_00,detail.DE06_00_016_00)}}</td>
                    </tr>
                  </table>
                  <div class="cy_content">
                    <div class="cy_content_box">
                      <div class="content_item_title">入院时情况:</div>
                      <div class="content_item_detail">{{detail.AP05_01_217_00}}</div>
                    </div>
                    <div class="cy_content_box">
                      <div class="content_item_title">并发症:</div>
                      <div class="content_item_detail">{{detail.AP05_01_032_00}}</div>
                    </div>
                    <div class="cy_content_box">
                      <div class="content_item_title">住院患者出院病室:</div>
                      <div class="content_item_detail">{{detail.AP08_10_026_08}}</div>
                    </div>
                    <div class="cy_content_box">
                      <div class="content_item_title">出院后用药及建议:</div>
                      <div class="content_item_detail">{{detail.AP06_00_333_00}}</div>
                    </div>
                    <div class="cy_content_box">
                      <div class="content_item_title">出院情况:</div>
                      <div class="content_item_detail">{{detail.AP05_01_032_00}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-dialog>
        </tbody>
      </table>
      <div class="nodata" v-else>暂无数据......</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "zyzlcy",
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
      this.tabsData = this.elTabsData.zycyjl
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
    min-width: 150px;
    text-align: cneter;
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
</style>
