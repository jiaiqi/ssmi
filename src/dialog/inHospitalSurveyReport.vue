<template>
  <div class="tab_detail">
    <h3>住院诊疗检验报告</h3>
    <div class="detail_title">
      <div class="detail_title_block">
        <span>姓名:{{detail.DE02_01_039_00}}</span>
        <span>性别:{{detail.AP02_01_102_01}}</span>
        <span>年龄:{{detail.DE02_01_032_00}}</span>
      </div>
      <div class="detail_title_block">
        <span>病人ID:</span>
        <span>科室:{{detail.AP08_10_059_02}}</span>
        <span>床号:{{detail.AP08_10_001_00}}</span>
      </div>
      <div class="detail_title_block">
        <span>标本种类:{{detail.AP04_50_054_00}}</span>
        <span>核收日期:{{format_date(detail.AP09_00_074_00)}}</span>
        <span>诊断:{{detail.DE05_01_025_00}}</span>
      </div>
      <div class="detail_title_block">
        <span>样本号:</span>
        <span>送检医生:{{detail.AP02_01_122_00}}</span>
        <span>备注:</span>
      </div>
    </div>
    <div class="detail_content">
      <div class="detail_content_title">
        <div class="title_left">
          <span>序号</span>
          <span>项目名称</span>
          <span>结果</span>
          <span>参考范围</span>
        </div>
        <!-- <div class="title_right">
              <span>序号</span>
              <span>项目名称</span>
              <span>结果</span>
              <span>单位</span>
              <span>参考范围</span>
        </div>-->
      </div>
      <div class="detail_content_content">
        <div class="detail_content_left">
          <div class="content_detail_item" v-for="(item,index) in this.detailData" :key="index">
            <div class>{{item.AP01_00_102_00}}</div>
            <div class>{{item.DE04_30_020_00}}</div>
            <div class>{{item.AP04_30_003_00}}</div>
            <div class>{{item.AP05_10_042_00}}</div>
          </div>
        </div>
        <!-- <div class="detail_content_right">
              <div class="content_detail_item">
                <div class></div>
                <div class></div>
                <div class></div>
                <div class></div>
                <div class></div>
              </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InHospitalSurveyReport", // 住院诊疗检验报告
  data() {
    return {
      businessId: "",
      detail: {},
      detailData: []
    };
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_HDI_LAREXA_INFO_select",
        condition: [
          {
            colName: "BUSINESS_ID",
            ruleType: "eq",
            value: this.businessId
          },
          {
            colName: "AP04_50_057_00",
            ruleType: "eq",
            value: this.seats
          }
        ]
      };
      let url = this.getServiceUrl("select", params.serviceName, "emr");
      this.axios
        .post(url, params)
        .then(res => {
          console.log(res);
          this.detail = res.data.data[0];
          this.getBotData();
        })
        .catch(err => {
          console.error(err);
        });
    },
    getBotData() {
      let params = {
        serviceName: "DI_HDI_LAREXADET_LIST_select",
        condition: [
          {
            colName: "AP01_00_024_00",
            value: this.detail.AP01_00_024_00,
            ruleType: "eq"
          }
        ]
      };
      let url = this.getServiceUrl("select", params.serviceName, "emr");
      this.axios
        .post(url, params)
        .then(res => {
          console.log(res);
          this.detailData = res.data.data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    let businessId = this.$route.params.businessId;
    let seats = this.$route.params.seats;
    if (businessId && seats) {
      this.businessId = businessId;
      this.seats = seats;
      this.getData();
    } else {
      console.error("未找到BUSINESS_ID.\n\n\n--住院诊疗检验报告");
    }
  }
};
</script>

<style lang="scss" scoped>
.tab_detail {
  background: white;
  overflow-y: scroll;
  box-sizing: border-box;
  width: 900px;
  margin: 0rem auto;
  padding-top: 4rem;
  min-height: calc(100vh - 4rem);
  max-width: 1000px;
  h3 {
    width: 20%;
    margin: 1rem auto;
    text-align: center;
  }
  .detail_title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
    border-bottom: 1px solid #333;
    margin: 10px 10px 0 10px;
    .detail_title_block {
      width: 25%;
      line-height: 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
    }
  }
  .detail_content {
    padding: 0px 10px 10px 10px;
  }
  .detail_content_title {
    display: flex;
    width: 100%;
    .title_left {
      flex: 1;
      border-right: 1px #333 solid;
      border-left: 1px #333 solid;
      // border-top: 1px #333 solid;
      border-bottom: 1px #333 solid;
      display: flex;
      justify-content: space-around;
      span {
        flex: 0.8;
        text-align: left;
        text-indent: 20px;
        &:first-child {
          text-align: left;
          flex: 0.3;
        }
        &:nth-child(2) {
          text-align: left;
          flex: 1.5;
        }
      }
    }
    .title_right {
      border-top: 1px #333 solid;
      border-bottom: 1px #333 solid;
      display: flex;
      justify-content: space-around;
      flex: 1;
    }
  }
  .detail_content_content {
    width: 100%;
    // min-height: 300px;
    display: flex;
    justify-content: space-between;
    .detail_content_left {
      border-right: 1px #333 solid;
      border-left: 1px #333 solid;
      width: 100%;
      .content_detail_item {
        display: flex;
        border-bottom: 1px solid #333;
        div {
          flex: 0.8;
          text-align: left;
          text-indent: 20px;
          min-height: 35px;
          line-height: 35px;
          &:first-child {
            text-indent: 30px;
            text-align: left;
            flex: 0.3;
          }
          &:nth-child(2) {
            text-indent: 20px;
            text-align: left;
            flex: 1.5;
          }
        }
      }
    }
    .detail_content_right {
      width: 50%;
      .content_detail_item {
        display: flex;
        border-bottom: 1px solid #333;
        div {
          flex: 1;
          min-height: 35px;
        }
      }
    }
  }
}
</style>
