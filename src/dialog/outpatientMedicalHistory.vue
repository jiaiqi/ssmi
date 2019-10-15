<template>
  <div class="table_mzbl_content">
    <div class="main_title">{{detail.AP08_10_013_04}}{{detail.BASIC_ACTIVE_DES}}</div>
    <div class="header">
      <div class="header_item">门诊号:{{detail.DE01_00_010_00}}</div>
      <div class="header_item">姓名:{{detail.DE02_01_039_00}}</div>
      <div class="header_item">性别:{{detail.AP02_01_102_01}}</div>
      <div class="header_item">年龄:{{detail.DE02_01_032_00}}</div>
      <div class="header_item">就诊科室:{{detail.DE08_10_026_00}}</div>
      <div
        class="header_item"
        v-if="detail.DE06_00_062_00"
      >就诊时间:{{format_date(detail.DE06_00_062_00)}}</div>
    </div>
    <div class="content">
      <div class="content_item_title">主诉:</div>
      <div class="content_item_detail">{{detail.DE04_01_119_00}}</div>
      <div class="content_item_title">病史:</div>
      <div class="content_item_detail">{{detail.DE02_10_071_00}}</div>
      <div class="content_item_title">过敏史:</div>
      <div class="content_item_detail">{{detail.DE02_10_022_00}}</div>
      <div class="content_item_title">查体情况:</div>
      <div class="content_item_detail">{{detail.AP06_00_403_00}}</div>
      <div class="content_item_title">检验:</div>
      <div class="content_item_detail"></div>
      <div class="content_item_title">处理意见:</div>
      <div class="content_item_detail">{{detail.DE06_00_087_00}}</div>
    </div>
    <div class="footer">
      <div class="footer_item">数据产生日期:{{format_date(detail.DATAGENERATE_DATE)}}</div>
      <div class="footer_item">医师:{{detail.AP02_01_039_29}}</div>
      <div class="footer_item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "", // 门诊病历
  data() {
    return {
      businessId: "",
      detail: {}
    }
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_ADI_RECORD_INFO_select",
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
      console.error("未找到BUSINESS_ID.\n\n\n--门诊病历")
    }
  }
}
</script>

<style lang="scss" scoped>
.table_mzbl_content {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  min-height: 500px;

  .main_title {
    width: 100%;
    letter-spacing: 5px;
    font-size: 20px;
    font-weight: 600;
    line-height: 50px;
    text-align: center;
  }
  .little_tittle {
    letter-spacing: 5px;
    font-size: 18px;
    font-weight: 600;
    height: 20px;
    line-height: 20px;
  }
  .header {
    width: 90%;
    display: flex;
    box-shadow: none;
    margin: 0 auto;
    height: 50px;
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 3px solid #333;
    justify-content: space-between;
    .header_item {
      height: 30px;
      line-height: 30px;
    }
  }
  .content {
    width: 90%;
    margin: 0 auto;
    padding-bottom: 20px;
    min-height: 500px;
    margin-bottom: 20px;
    border-bottom: 3px solid #333;
    display: flex;
    flex-direction: column;
    text-align: left;
    .content_item_title {
      text-indent: 32px;
      font-weight: 600;
      padding-top: 10px;
    }
    .content_item_detail {
      text-indent: 32px;
      line-height: 30px;
      min-height: 50px;
    }
    .content_footer {
      text-align: right;
    }
  }
  .footer {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }
}
</style>
