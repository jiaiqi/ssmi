<template>
  <div class="tab_detail">
    <div class="title">住院诊疗手术记录</div>
    <div class="detail_title_header">
      <div class="detail_title_headerone">
        <span>科别:</span>
        <span>姓名:{{detail.DE02_01_039_00}}</span>
        <span>性别:{{detail.AP02_01_102_01}}</span>
        <span>年龄:{{detail.DE02_01_032_00}}</span>
      </div>
      <div class="detail_title_headertwo"></div>
    </div>
    <p>
      <strong>手术前诊断:</strong>
      &nbsp;&nbsp;{{ detail.AP05_01_115_00}}
    </p>
    <p>
      <strong>手术后诊断:</strong>
      &nbsp;&nbsp;{{ detail.AP05_01_117_00}}
    </p>
    <p>
      <strong>手术名称:</strong>
      &nbsp;&nbsp;{{detail.DE06_00_094_00}}
    </p>
    <div class="detail_title_dif1">
      <p>
        <strong>手术日期:</strong>
        &nbsp;&nbsp;{{format_date(detail.DE06_00_095_00)}}
      </p>
    </div>
    <div class="detail_title_dif2">
      <p>
        <strong>手术者:</strong>
        &nbsp;&nbsp;{{detail.AP02_01_039_37}}
      </p>
      <p class="detail_title_dif2_two">
        <strong>助手:</strong>
        &nbsp;&nbsp;{{detail.AP02_01_039_75}}
      </p>
      <p class="detail_title_dif2_three">
        <strong>护士:</strong>
      </p>
    </div>
    <p>
      <strong>麻醉者:</strong>
      &nbsp;&nbsp;{{detail.AP02_01_039_76}}
    </p>
    <p>
      <strong>体位:</strong>
    </p>
    <p>
      <strong>手术经过:</strong>
      &nbsp;&nbsp;{{detail.AP06_00_302_00}}
    </p>
  </div>
</template>

<script>
export default {
  name: "InHospitalOperationNote", // 住院诊疗手术记录
  data() {
    return {
      businessId: "",
      detail: {}
    };
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_HDI_OPEREC_INFO_select",
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
      console.error("未找到BUSINESS_ID.\n\n\n--住院诊疗手术记录");
    }
  }
};
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
  .detail_title {
    display: flex;
    justify-content: space-around;
    padding-bottom: 5px;
    border-bottom: 1px solid #333;
  }

  .detail {
    display: flex;
    justify-content: space-between;
    .detail_left {
      width: 45%;
      min-height: 530px;
      text-align: left;
      border-right: 1px solid black;
      p {
        margin-left: 5%;
      }
    }
  }
}
</style>
