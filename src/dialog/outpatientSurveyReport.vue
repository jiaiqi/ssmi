<template>
  <div class="tab_detail">
    <div class="detail_title">
      <div class="detail_title_block" v-if="head">
        <span>姓名:{{head.DE02_01_039_00}}</span>
        <span>性别:{{head.AP02_01_102_01}}</span>
        <span>年龄:{{head.DE02_01_032_00}}</span>
      </div>
      <div class="detail_title_block">
        <span>样本号:</span>
        <span>送检医生:{{head.AP02_01_122_00}}</span>
        <span>备注:</span>
      </div>
    </div>
    <div class="detail_content" style="padding:0 10px;">
      <div class="detail_content_title">
        <div class="title_left">
          <table>
            <tr>
              <td>检验方法</td>
              <td>项目名称</td>
              <td>结果</td>
              <td>单位</td>
              <td>参考范围</td>
            </tr>
            <tr v-for="(item,index) in detail" :key="index">
              <td>{{item.AP04_50_067_00}}</td>
              <td>{{item.DE04_30_020_00}}</td>
              <td>{{item.AP04_30_003_00}}</td>
              <td>{{item.DE04_30_016_00}}</td>
              <td>{{item.AP05_10_042_00}}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- <div class="detail_content_content">
        <div class="detail_content_right"></div>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "OutpatientSurveyReport", // 门诊检验报告
  data() {
    return {
      businessId: "",
      oddNum: "", // 检验报告单号
      head: {},
      detail: {}
    };
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_ADI_LAREXA_INFO_select",
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
          this.head = res.data.data[0];
        })
        .catch(err => {
          console.error(err);
        });
      let params2 = {
        serviceName: "DI_ADI_LAREXADET_LIST_select",
        condition: [
          {
            colName: "AP04_50_057_00",
            ruleType: "eq",
            value: this.oddNum
          }
        ]
      };
      let url2 = this.getServiceUrl("select", params2.serviceName, "emr");
      this.axios
        .post(url2, params2)
        .then(res => {
          console.log(res);
          this.detail = res.data.data;
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    let businessId = this.$route.params.businessId;
    let oddNum = this.$route.params.oddNum;
    if (businessId && oddNum) {
      this.businessId = businessId;
      this.oddNum = oddNum;
      this.getData();
    } else if (!businessId) {
      console.error("未找到BUSINESS_ID.\n\n\n--门诊检验报告");
    } else if (!oddNum) {
      console.error("未找到检验报告单号.\n\n\n--门诊检验报告");
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
}
/* 详情 */
.tab_detail {
  background-color: #fff;
  min-height: 100vh;
  max-width: 1000px;
  box-sizing: border-box;
  // width: 900px;
  margin: 0 auto;
  // overflow-y: scroll;
  text-align: left;
  p {
    margin-left: 2%;
  }

  .detail_title {
    display: flex;
    justify-content: space-around;
    padding-bottom: 5px;
    border-bottom: 1px solid #333;
    margin: 0 10px;
  }
  .detail_title_block {
    width: 25%;
    line-height: 20px;
    display: flex;
    text-align: left;
    flex-direction: column;
  }
}
/* 内容 */
.detail_content_title {
  display: flex;

  width: 100%;
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

.title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 15px;
}
</style>
