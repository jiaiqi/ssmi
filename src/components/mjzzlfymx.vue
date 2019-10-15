<template>
  <div class="tab_content">
    <div class="tab_content_title">门急诊诊疗费用明细信息</div>
    <div class="tab_content_main">
      <table v-if="tabsData&&tabsData.length>0">
        <tbody>
          <tr>
            <td>医院</td>
            <td>就诊流水号</td>
            <td>姓名</td>
            <td>缴费科室</td>
            <td>费用支付方式</td>
            <td>机构名称</td>
            <td>数据产生时间</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item,index) in tabsData" :key="index">
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td>{{item.DE01_00_010_00}}</td>
            <td>{{item.DE02_01_039_00}}</td>
            <td>{{item.DE08_10_026_00}}</td>
            <td>{{item.AP07_00_011_01}}</td>
            <td>{{item.AP08_10_013_04}}</td>
            <td>{{format_date(item.DATAGENERATE_DATE)}}</td>
            <td class="handle" @click="changeDialogVisible(item)">详情</td>
          </tr>

          <el-dialog :visible.sync="dialogVisible" width="1000px">
            <div class="fymx_wrap">
              <div class="header">
                <div class="header_top">
                  <h3>门急诊诊疗费用明细信息</h3>
                </div>
                <div class="header_cen">
                  <div>
                    <span>姓名:{{detail.DE02_01_039_00}}</span>
                    <span>性别:{{detail.AP02_01_102_01}}</span>
                    <span>年龄:{{detail.DE02_01_032_00}}</span>
                  </div>
                  <div>
                    <span>就诊卡号:</span>
                    <span>职业:</span>
                    <span>工作单位:</span>
                  </div>
                  <div>
                    <span>家庭地址</span>
                    <span>家庭电话:</span>
                  </div>
                  <div>
                    <span>联系人姓名:</span>
                    <span>联系人关系:</span>
                    <span>联系人电话:</span>
                  </div>
                  <!-- <div>
                    <span>入院日期:</span>
                    <span>出院日期:</span>
                  </div>-->
                </div>
              </div>
              <div class="content">
                <div class="content_bot">
                  <div class="content_bot_top">
                    <p>结账费用明细</p>
                  </div>
                  <div class="content_bot_b">
                    <table>
                      <tr>
                        <td>日期</td>
                        <td>项目名</td>
                        <td>单价（元）</td>
                        <td>金额（元）</td>
                        <td>收费科室</td>
                      </tr>
                      <tr v-for="(item,index) in data" :key="index">
                        <td v-if="!item.AP07_00_026_00"></td>
                        <td v-if="item.AP07_00_026_00">{{format_date(item.AP07_00_026_00)}}</td>
                        <td>{{item.AP07_00_018_00}}</td>
                        <td>{{item.AP07_00_022_00}}</td>
                        <td>{{item.AP07_00_022_00}}</td>
                        <td>{{item.DE08_10_026_00}}</td>
                      </tr>
                    </table>
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
import axios from 'axios'
export default {
  name: "OutpatientCostDetail",
  props: ["tabData", "elTabsData"],
  data() {
    return {
      dialogVisible: false,
      detail: {},
      tabsData: [],
      data: []
    };
  },
  created() {
    setTimeout(() => {
      this.tabsData = this.elTabsData.mzfyjl
    }, 300);
  },
  methods: {
    changeDialogVisible(item) {
      if (item) {
        this.detail = item
      }
      this.dialogVisible = true;
      let req = {
        serviceName: "DI_ADI_EXPSET_LIST_select"
      };
      let url = this.getServiceUrl("select", req.serviceName, "emr");
      axios({
        method: "POST",
        url: url,
        data: req,
        headers: { bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket") }
      }).then(res => {
        this.data = res.data.data;
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
      color: #7f7f7f;
      &.handle {
        cursor: pointer;
        color: #409eff;
      }
    }
  }
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
  }
  .header_cen {
    div {
      display: flex;
      width: 80%;
      margin: 0 auto;
      span {
        display: inline-block;
        text-align: left;
        min-width: 300px;
      }
    }
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .content_bot_top {
    p {
      font-weight: 600;
    }
  }
  table td tr {
    border: 1px solid black;
    text-align: center;
    font-size: 14px;
    border-left: none;
  }
  table {
    border-collapse: collapse;
    width: 80%;
    margin-bottom: 50px;
    td {
      padding: 2px 5px;
      min-height: 30px;
    }
  }
}
</style>
