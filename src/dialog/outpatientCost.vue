<template>
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
          <span>就诊卡号: -</span>
          <span>职业: -</span>
          <span>工作单位: -</span>
        </div>
        <div>
          <span>家庭地址: -</span>
          <span>家庭电话: -</span>
        </div>
        <div>
          <span>联系人姓名: -</span>
          <span>联系人关系: -</span>
          <span>联系人电话: -</span>
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
</template>

<script>
export default {
  name: "OutpatientCost", // 门诊费用记录
  data() {
    return {
      businessId: "",
      detail: {},
      data: [],
      timeNum: ""
    };
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_ADI_EXPSET_INFO_select",
        condition: [
          {
            colName: "BUSINESS_ID",
            ruleType: "eq",
            value: this.businessId
          }
        ]
      };
      let url = this.getServiceUrl("select", params.serviceName, "emr");
      this.axios
        .post(url, params)
        .then(res => {
          console.log(res);
          this.detail = res.data.data[0];
          this.getBotDatas();
        })
        .catch(err => {
          console.error(err);
        });
    },
    getBotDatas() {
      let req = {
        serviceName: "DI_ADI_EXPSET_LIST_select",
        condition: [
          {
            colName: "AP07_00_026_00",
            ruleType: "eq",
            value: this.$route.params.timeNum
          }
        ]
      };
      let url = this.getServiceUrl("select", req.serviceName, "emr");
      this.axios
        .post(url, req)
        .then(res => {
          this.data = res.data.data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    let businessId = this.$route.params.businessId;
    if (businessId) {
      this.businessId = businessId;
    } else {
      console.error("未找到BUSINESS_ID.\n\n\n--门诊费用记录");
    }
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.fymx_wrap {
  background-color: #fff;
  min-height: 100vh;
  max-width: 1000px;
  margin: 0 auto;
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
  .content_bot_top {
    width: 80%;
    margin: 0 auto;

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
