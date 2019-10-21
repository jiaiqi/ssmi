<template>
  <div class="table_mabl_content">
    <div class="main_title">
      {{detail.ORGANIZATION_NAME}}
      <div class="little_tittle">{{detail.BASIC_ACTIVE_DES}}</div>
    </div>
    <div class="header"></div>
    <div class="content">
      <div class="content_item_detail">
        兹证明
        <span class="font-bold">{{detail.DE02_01_039_00}}</span>
        同志，
        <span class="font-bold">{{detail.AP02_01_102_01}}</span> ，经在我院
        <span class="font-bold">{{detail.DE08_10_026_00}}</span> 诊治
      </div>
      <div class="content_item_detail">
        诊疗号:
        <span class="font-bold">{{detail.DE01_00_010_00}}</span>
      </div>
      <div class="content_item_detail">
        临床诊断为:
        <span class="font-bold">{{detail.DE05_01_025_00}}</span>
      </div>
      <div class="content_item_detail">曾作处理:</div>
      <!-- <div class="content_item_detail">建议:1.禁烟酒。2避免劳累。3.动态监测相关指标变化。</div> -->
    </div>
    <div class="content_bottom">
      <div class>医师:{{detail.AP02_01_039_29}}</div>
      <div v-if="detail.DE05_01_058_00">确诊日期:{{format_date(detail.DE05_01_058_00)}}</div>
      <div v-else-if="!detail.DE05_01_058_00"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OutpatientDiagnosticRecords", // 门诊诊断记录
  data() {
    return {
      businessId: "",
      detail: {}
    };
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_ADI_DIAREC_INFO_select",
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
      this.getData();
    } else {
      console.error("未找到BUSINESS_ID.\n\n\n--门诊诊断记录");
    }
  }
};
</script>

<style lang="scss" scoped>
.table_mabl_content {
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background-color: #fff;
  // overflow-y: scroll;
  min-height: 100vh;
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
    width: 95%;
    margin: 0 auto;
    border-bottom: 2px solid #333;
    flex-direction: column;
    text-align: left;
    text-indent: 20px;
    .font-bold {
      font-weight: bold;
      padding: 0 0.625rem /* 10/16 */;
    }
  }
  .content_bottom {
    display: flex;
    justify-content: space-around;
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
