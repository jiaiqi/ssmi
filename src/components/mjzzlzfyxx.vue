<template>
  <el-tab-pane label="门急诊诊疗总费用信息" name="门急诊诊疗总费用信息">
    <div class="tab_content">
      <div class="tab_content_title">门急诊诊疗总费用信息</div>
      <div class="tab_content_main">
        <table>
          <tbody>
            <tr>
              <td>就诊流水号</td>
              <td>医院</td>
              <td>姓名</td>
              <td>结算日期</td>
              <td>缴费科室</td>
              <td>机构名称</td>
              <td>数据产生时间</td>
              <td>操作</td>
            </tr>
            <tr v-for="(item, index) in tabsData" :key="index">
              <td>{{item.ORGANIZATION_NAME}}</td>
              <td>{{item.DE01_00_010_00}}</td>
              <td>{{item.DE02_01_039_00}}</td>
              <td v-if="item.AP07_00_026_00">{{fromat_date(item.AP07_00_026_00)}}</td>
              <td>{{item.DE08_10_026_00}}</td>
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
              <!-- <td class="handle" @click="changeDialogVisible()">详情</td> -->
            </tr>
            <el-dialog :visible.sync="dialogVisible" width="1000px">
              <div class="fymx_wrap">
                <div class="header">
                  <div class="header_top">
                    <h2>门急诊诊疗总费用信息</h2>
                  </div>
                  <div class="header_cen">
                    <ul>
                      <li>
                        <p>
                          姓名:
                          <span>{{detail.DE02_01_039_00}}</span>
                        </p>
                        <p>
                          性别:
                          <span>{{detail.AP02_01_102_01}}</span>
                        </p>
                        <p>
                          年龄:
                          <span>{{detail.DE02_01_032_00}}</span>岁
                        </p>
                      </li>
                      <li>
                        <p>
                          职业:
                          <span>其他</span>
                        </p>
                        <p>
                          工作单位:
                          <span></span>
                        </p>
                      </li>
                      <li>
                        <p>
                          家庭地址:
                          <span></span>
                        </p>
                        <p>
                          家庭电话:
                          <span></span>
                        </p>
                      </li>
                      <li>
                        <p>
                          联系人姓名:
                          <span></span>
                        </p>
                        <p>
                          联系人关系:
                          <span></span>
                        </p>
                        <p>
                          联系人电话:
                          <span></span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="content">
                  <div class="content_top">
                    <div class="content_top_t">
                      <p>结账分类费用</p>
                    </div>
                    <div class="content_top_b">
                      <table>
                        <tr>
                          <td>医保范围总额</td>
                          <td>医保范围外个人自费</td>
                          <td>医保基金支付</td>
                          <td>医保自负部分</td>
                          <td>收费科室</td>
                          <td>支付方式</td>
                          <td>总费用</td>
                        </tr>
                        <tr>
                          <td>{{detail.AP07_00_044_00}}</td>
                          <td>{{detail.DE07_00_001_00}}</td>
                          <td>{{detail.AP07_00_044_01}}</td>
                          <td>{{detail.AP07_00_044_02}}</td>
                          <td>{{detail.DE08_10_026_00}}</td>
                          <td>{{detail.AP07_00_011_01}}</td>
                          <td>{{detail.DE07_00_004_00}}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </el-dialog>
          </tbody>
        </table>
      </div>
    </div>
  </el-tab-pane>
</template>

<script>
export default {
  name: "OutpatientTotalCostInfo",
  props: ["tabData", "elTabsData"],
  data() {
    return {
      dialogVisible: false,
      detail: [],
      tabsData: []
    };
  },
  created() {
    setTimeout(() => {
      this.tabsData = this.elTabsData.mzfyjl
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
  color: #409eff;
}

.text {
  margin: 0;
  padding: 0;
}

.fymx_wrap {
  .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: none;
  }
  .header_top {
    text-align: center;
    margin: 15px 0;
  }
  .header_cen ul li {
    overflow: hidden;
    margin-top: 5px;
  }
  .header_cen ul li p {
    float: left;
    margin-right: 5%;
    padding: 0;
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .content_top_t {
    overflow: hidden;
  }
  .content_top_t p {
    text-align: center;
  }
  .content_top_b {
    overflow: hidden;
  }

  table,
  td,
  tr {
    border: 1px solid black;
    text-align: center;
    font-size: 14px;
    border-left: none;
  }
  table {
    border-collapse: collapse;
    width: 22%;
  }
  td {
    padding: 2px 5px;
  }
  .content_top_b table:nth-child(1) {
    border-left: 1px solid black;
  }
  .content_bot_b table:nth-child(1) {
    border-left: 1px solid black;
  }
  .content_top_b table {
    margin: 0 auto;
  }
  .content_bot_b table {
    width: 49%;
    margin: 0 auto;
  }
  .content_bot_top,
  .content_top_t {
    margin-bottom: 5px;
  }
}
</style>
