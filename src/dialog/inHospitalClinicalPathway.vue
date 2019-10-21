<template>
  <div class="zyzllclj">
    <div class="title"></div>
    <div class="little_title">临床路径</div>
    <div class="bcjl_head">
      <div>姓名: {{ detail.DE02_01_039_00 }}</div>
      <div>性别: {{ detail.AP02_01_102_01 }}</div>
      <div>年龄: {{ detail.DE02_01_032_00 }}</div>
      <div>科室: {{ detail.AP08_10_026_11 }}</div>
      <div>住院号: {{ detail.DE01_00_014_00 }}</div>
    </div>
    <div class="bcjl_content">
      <div class="date_time"></div>
      <!-- <div class="content_title">首次病程记录</div> -->
      <div
        class="main_content"
      >患者 {{ detail.DE02_01_039_00 }} ，{{ detail.DE02_01_032_00 }} 岁，因 {{ detail.AP05_01_215_02}} 于 {{format_date(detail.AP05_01_212_00)}} 入院</div>
      <div class="main_content">
        <p>病例特点:</p>
        <p class="content_text"></p>
        <p>初步诊断:</p>
        <p class="content_text">{{ detail.AP05_01_215_02}}</p>
        <p>诊断依据</p>
        <p class="content_text"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InHospitalClinicalPathway", // 住院诊疗临床路径记录
  data() {
    return {
      businessId: "",
      detail: {}
    }
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_HDI_CPATH_INFO_select",
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
      console.error("未找到business ID\n\n--住院诊疗临床路径记录")
    }
  },
}
</script>

<style lang="scss" scoped>
.zyzllclj {
  display: flex;
  flex-direction: column;
  padding: 3.125rem /* 50/16 */ 6.25rem /* 100/16 */ 0;
  background-color: #fff;
  max-width: 1000px;
  // overflow-y: scroll;
  margin: 0 auto;
  min-height: calc(100vh - 3.125rem);
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
  .little_title {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
  .bcjl_head {
    display: flex;
    line-height: 50px;
    border-bottom: 1px solid #333;
    div {
      flex: 1;
      min-width: 150px;
      text-align: left;
    }
  }
  .bcjl_content {
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 300px;
    .date_time {
      position: absolute;
      left: 20px;
    }
    .content_title {
      width: 100%;
      text-align: center;
      font-weight: 600;
      line-height: 50px;
    }
    .main_content {
      text-align: left;
      p {
        font-weight: 600;
      }
      .content_text {
        min-height: 50px;
        font-weight: 100;
      }
    }
  }
}
</style>
