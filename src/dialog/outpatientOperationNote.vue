<template>
  <div class="tab_detail">
    <div class="title">门急诊诊疗手术记录</div>
    <div class="detail_title_header">
      <div class="detail_title_headerone">
        <span>科别:</span>
        <span>姓名: {{ detail.DE02_01_039_00 }}</span>
        <span>性别: {{ detail.AP02_01_102_01 }}</span>
        <span>年龄: {{ detail.DE02_01_032_00 }} 岁</span>
      </div>
      <div class="detail_title_headertwo">
        <span class="span22">门诊号:</span>
      </div>
    </div>
    <p>手术前诊断:</p>
    <p>手术后诊断:</p>
    <p>手术名称: {{ detail.DE06_00_094_00 }}</p>
    <div class="detail_title_dif">
      <p>手术日期: {{format_date(detail.DE06_00_095_00,1)}}</p>
      <p>手术历时:</p>
    </div>
    <div class="detail_title_dif">
      <p>手术者: {{ detail.AP02_01_039_37 }}</p>
      <p>助手:</p>
      <p>护士:</p>
    </div>
    <p>麻醉者: {{ detail.AP02_01_039_76 }}</p>
    <p>体位:</p>
    <p>手术经过: {{ detail.AP06_00_302_00 }}</p>
  </div>
</template>

<script>
export default {
  name: "OutpatientOperationNote", // 门诊诊手术记录
  data() {
    return {
      businessId: "",
      detail: {}
    }
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_ADI_OPEREC_INFO_select",
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
      this.getData()
    } else {
      console.error("未找到BUSINESS_ID.\n\n\n--门诊诊手术记录")
    }
  }
}
</script>

<style lang="scss" scoped>
/* 详情 */
.tab_detail {
  box-sizing: border-box;
  margin: 0 auto;
  min-height: 500px;
  background-color: #fff;
  max-width: 1000px;
  text-align: left;
  min-height: 100vh;
  padding: 0 50px;
  .title {
    text-align: center;
    font-size: 22px;
    margin-bottom: 15px;
  }
  .detail_title_header {
    width: 100%;
  }
  .detail_title_headerone {
    display: flex;
    justify-content: space-around;
    padding-bottom: 10px;
    border-bottom: 2px solid #333;
  }
  .detail_title_headertwo > .span11 {
    margin-left: 100px;
  }
  .detail_title_headertwo > .span22 {
    margin-left: 190px;
  }
  .detail_title_headertwo > .span33 {
    margin-left: 420px;
  }
  .detail_title_dif {
    width: 100%;
    display: block;
  }
  .detail_title_dif:nth-of-type(2) {
    margin-left: 200px;
  }
}
</style>
