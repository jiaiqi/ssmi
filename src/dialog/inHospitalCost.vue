<template>
  <div class="fymx_wrap">
    <div class="header">
      <div class="header_top">
        <h2>住院诊疗费用结算</h2>
      </div>
      <div class="header_cen">
        <ul>
          <li>
            <p>
              住院号:
              <span>{{detail.DE01_00_014_00}}</span>
            </p>
            <p>
              姓名:
              <span>{{detail.DE02_01_039_00}}</span>
            </p>
            <p>
              性别:
              <span>{{detail.AP02_01_102_01}}</span>
            </p>
            <p>
              年龄:
              <span>{{detail.DE02_01_032_00}}</span>岁
            </p>
          </li>
          <li>
            <p>
              就诊卡号:
              <span></span>
            </p>
            <p>
              职业:
              <span></span>
            </p>
            <p>
              工作单位:
              <span></span>
            </p>
            <p>
              家庭地址:
              <span></span>
            </p>
            <p>
              家庭电话:
              <span></span>
            </p>
          </li>
          <li>
            <p>
              联系人姓名:
              <span></span>
            </p>
            <p>
              联系人关系:
              <span></span>
            </p>
            <p>
              联系人电话:
              <span></span>
            </p>
            <p>
              入院日期:
              <span></span>
            </p>
            <p>
              出院日期:
              <span></span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="content_top">
        <div class="content_top_t">
          <p>结账分类费用</p>
        </div>
        <div class="content_top_b" style="margin-bottom:20px;">
          <table>
            <tr>
              <td>时间</td>
              <td>收费科室</td>
              <!-- <td>项目代码</td> -->
              <td>项目名称</td>
              <td>数量</td>
              <td>金额（元）</td>
            </tr>
            <tr v-for="(item,index) in datalist" :key="index">
              <td>{{format_date(item.AP07_00_027_00)}}</td>
              <td>{{item.AP08_10_055_02}}</td>
              <!-- <td>{{item.AP06_00_290_01}}</td> -->
              <td>{{item.AP07_00_018_00}}</td>
              <td>{{item.AP07_00_021_00}}</td>
              <td>{{item.AP07_00_022_00}}</td>
            </tr>
          </table>
        </div>
        <div class="content_top_b">
          <table>
            <tr>
              <td>医保范围总额</td>
              <td>医保范围外个人自费</td>
              <td>医保基金支付</td>
              <td>医保自负部分</td>
              <td>支付方式</td>
              <td>总费用</td>
            </tr>
            <tr>
              <td>{{detail.AP07_00_044_00}}</td>
              <td>{{detail.DE07_00_001_00}}</td>
              <td>{{detail.AP07_00_044_01}}</td>
              <td>{{detail.AP07_00_044_02}}</td>
              <td>{{detail.AP07_00_011_01}}</td>
              <td>{{detail.AP07_00_003_00}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InHospitalCost", // 住院诊疗费用结算
  data() {
    return {
      businessId: "",
      detail: {}
    }
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_HDI_EXPSET_INFO_select",
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
      console.error("未找到BUSINESS_ID.\n\n\n--住院诊疗费用结算")
    }
  }
}
</script>

<style lang="scss" scoped>
.fymx_wrap {
  .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: none;
  }
  .header_top {
    text-align: center;
    margin: 15px 0;
  }
  .header_cen {
    width: 85%;
    margin: 0 auto;
  }
  .header_cen ul li {
    overflow: hidden;
    margin-top: 5px;
  }
  .header_cen ul li p {
    min-width: 150px;
    text-align: left;
    margin: 0;
    line-height: 25px;
    float: left;
    padding: 0;
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .content_top_t {
    overflow: hidden;
  }
  .content_top_t p {
    text-align: center;
  }
  .content_top_b {
    overflow: hidden;
  }

  table,
  td,
  tr {
    border: 1px solid black;
    text-align: center;
    font-size: 14px;
    border-left: none;
  }
  table {
    border-collapse: collapse;
    width: 22%;
  }
  td {
    padding: 2px 5px;
  }
  .content_top_b table:nth-child(1) {
    border-left: 1px solid black;
  }
  .content_bot_b table:nth-child(1) {
    border-left: 1px solid black;
  }
  .content_top_b table {
    margin: 0 auto;
  }
  .content_bot_b table {
    width: 49%;
    margin: 0 auto;
  }
  .content_bot_top,
  .content_top_t {
    margin-bottom: 5px;
  }
}
</style>
