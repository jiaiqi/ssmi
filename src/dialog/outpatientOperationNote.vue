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
        <!-- <span class="span11">床号: {{ detail.AP02_01_102_01 }}</span> -->
        <span class="span22">门诊号:</span>
        <!-- <span class="span33">住院号:</span> -->
      </div>
      <!-- <span>医师:{{ detail.AP02_01_039_37 }}</span> -->
      <!-- <span>床号:</span>
                            <span
                              v-if="detail.DE06_00_095_00"
                            >就诊时间: {{ detail.DE06_00_095_00.slice(0,4)+'-'+detail.DE06_00_095_00.slice(4,6)+'-'+detail.DE06_00_095_00.slice(6,8) }}</span>
      <span>医院:{{detail.HOSPITAL_NAME}}</span>-->
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
    } else {
      console.error("未找到BUSINESS_ID.\n\n\n--门诊诊手术记录")
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
}
</style>
