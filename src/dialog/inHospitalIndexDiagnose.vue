<template>
  <div></div>
</template>

<script>
export default {
  name: "InHospitalIndexDiagnose", // 住院病案首页诊断记录
  data() {
    return {
      businessId: "",
      detail: {}
    }
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_HAI_DIAREC_INFO_MR_select",
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
      console.error("未找到BUSINESS_ID.\n\n\n--住院病案首页诊断记录")
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
