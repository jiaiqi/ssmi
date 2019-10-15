<template>
  <div class="tab_detail">
    <div class="detail_title">
      <div class="detail_title_block" v-if="detail">
        <span>姓名:{{detail.DE02_01_039_00}}</span>
        <span>性别:{{detail.AP02_01_102_01}}</span>
        <span>年龄:{{detail.DE02_01_032_00}}</span>
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
          <table>
            <tr>
              <td>检验方法</td>
              <td>项目名称</td>
              <td>结果</td>
              <td>单位</td>
              <td>参考范围</td>
            </tr>
            <tr>
              <td>{{detail.AP04_50_067_00}}</td>
              <td>{{detail.DE04_30_020_00}}</td>
              <td>{{detail.AP04_30_003_00}}</td>
              <td>{{detail.DE04_30_016_00}}</td>
              <td>{{detail.AP05_10_042_00}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="detail_content_content">
        <div class="detail_content_right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OutpatientSurveyReport", // 门诊检验报告
  data() {
    return {
      businessId: "",
      detail: {}
    }
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
      }
      let url = this.getServiceUrl("select", params.serviceName, "emr");
      this.axios.post(url, params)
        .then(res => {
          console.log(res)
          this.detail = res.data.data[0]
        })
        .catch(err => {
          console.error(err);
        })
    },
  },
  mounted() {
    let businessId = this.$route.params.businessId
    if (businessId) {
      this.businessId = businessId
    } else {
      console.error("未找到BUSINESS_ID.\n\n\n--门诊检验报告")
    }
  }
}
</script>

<style lang="scss" scoped>
.tab_detail {
  box-sizing: border-box;
  // width: 900px;
  margin: 0 auto;
  min-height: 500px;
  text-align: left;
  p {
    margin-left: 2%;
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
}
</style>
