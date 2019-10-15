<template>
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
      <div class="content_item_detail">建议:</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InHospitalDiagnoseRecord", // 住院诊疗诊断记录
  data() {
    return {
      businessId: "",
      detail: {}
    }
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_HDI_DIAREC_INFO_select",
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
      console.error("未找到BUSINESS_ID.\n\n\n--住院诊疗诊断记录")
    }
  }
}
</script>

<style lang="scss" scoped>
.table_mabl_content {
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
