<template>
  <div class="tab_detail">
    <div class="table_cy_content">
      <div class="main_title">{{ detail.AP08_10_013_06 }}</div>
      <div class="header">
        <div class="header_item">住院科室:{{ detail.AP08_10_026_01 }}</div>
        <div class="header_item">
          <div class="header_item_top">出院记录</div>
          <div class="header_item_bottom">姓名:{{ detail.DE02_01_039_00 }}</div>
        </div>
        <div class="header_item">
          <div class="header_item_item">
            <span class="item_title">住院号:</span>
            <span class="item_text">{{ detail.DE01_00_014_00 }}</span>
          </div>
          <div class="header_item_item">
            <span class="item_title">影像号:</span>
            <span class="item_text"></span>
          </div>
          <div class="header_item_item">
            <span class="item_title">床 &nbsp;号:</span>
            <span class="item_text">{{ detail.AP08_10_001_00 }}</span>
          </div>
        </div>
      </div>
      <div class="top">
        <table class="table">
          <tr class="row">
            <td>姓名:</td>
            <td colspan="2">{{ detail.DE02_01_039_00 }}</td>
            <td>性别:</td>
            <td>{{ detail.AP02_01_102_01 }}</td>
            <td>年龄:</td>
            <td>{{ detail.DE02_01_032_00 }}</td>
            <td>住院患者出院科室:</td>
            <td colspan="3">{{ detail.AP08_10_026_08 }}</td>
          </tr>
          <tr>
            <td>籍贯:</td>
            <td colspan="4">陕西，延安</td>
            <td>医疗费用支付方式:</td>
            <td colspan="5">{{ detail.AP07_00_011_01 }}</td>
          </tr>
          <tr v-if="detail.DE06_00_092_00">
            <td colspan="2">住院日期:</td>
            <td colspan="2" v-if="detail.DE06_00_092_00">
              {{
              detail.DE06_00_092_00.slice(0, 4) +
              "-" +
              detail.DE06_00_092_00.slice(4, 6) +
              "-" +
              detail.DE06_00_092_00.slice(6, 8)
              }}
            </td>
            <td>出院日期:</td>
            <td colspan="2" v-if="detail.DE06_00_016_00">
              {{
              detail.DE06_00_016_00.slice(0, 4) +
              "-" +
              detail.DE06_00_016_00.slice(4, 6) +
              "-" +
              detail.DE06_00_016_00.slice(6, 8)
              }}
            </td>
            <td>住院天数</td>
            <td>{{this.dateDiff(detail.DE06_00_092_00,detail.DE06_00_016_00)}}</td>
          </tr>
        </table>
        <div class="cy_content">
          <div class="cy_content_box">
            <div class="content_item_title">入院时情况:</div>
            <div class="content_item_detail">{{detail.AP05_01_217_00}}</div>
          </div>
          <div class="cy_content_box">
            <div class="content_item_title">并发症:</div>
            <div class="content_item_detail">{{detail.AP05_01_032_00}}</div>
          </div>
          <div class="cy_content_box">
            <div class="content_item_title">住院患者出院病室:</div>
            <div class="content_item_detail">{{detail.AP08_10_026_08}}</div>
          </div>
          <div class="cy_content_box">
            <div class="content_item_title">出院后用药及建议:</div>
            <div class="content_item_detail">{{detail.AP06_00_333_00}}</div>
          </div>
          <div class="cy_content_box">
            <div class="content_item_title">出院情况:</div>
            <div class="content_item_detail">{{detail.AP05_01_032_00}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InHospitalDischargeRecord", // 住院诊疗出院记录
  data() {
    return {
      businessId: "",
      detail: {}
    }
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_HDI_OUTRECORD_INFO_select",
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
      console.error("未找到BUSINESS_ID.\n\n\n--住院诊疗出院记录")
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
.table_cy_content {
  // width: 800px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: left;
  .main_title {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
  .header {
    width: 100%;
    display: flex;
    padding-bottom: 5px;
    margin-bottom: 5px;
    border-bottom: 3px solid #333;
    box-shadow: none;
  }
  .header_item {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
  }
  .header_item:nth-child(2) {
    text-align: center;
  }
  .header_item:nth-child(3) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .header_item_top {
    font-size: 24px;
    font-weight: 600;
    height: 50px;
    line-height: 50px;
  }
  .header_item_item {
    display: flex;
    min-width: 150px;
    text-align: cneter;
  }
  .item_title {
    display: inline-block;
    letter-spacing: 3px;
    width: 80px;
  }
  .top {
    width: 100%;
    min-height: 300px;
    box-sizing: border-box;
  }
  /**table**/
  .table {
    width: 100%;
    box-sizing: border-box;
    border-collapse: collapse;
    .row {
      box-sizing: border-box;
    }
  }
  /** content**/
  .cy_content {
    min-height: 400px;
    padding: 20px 0;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    border-bottom: 3px solid #333;
    .cy_content_box {
      min-height: 100px;
    }
    .content_item_title {
      text-indent: 32px;
      font-weight: 600;
    }
    .content_item_detail {
      text-indent: 32px;
    }
  }
}
</style>
