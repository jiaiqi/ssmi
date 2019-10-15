<template>
  <div class="yz_wrap">
    <div class="header">
      <div class="header_top">
        <h3>门急诊诊疗医嘱</h3>
      </div>
      <div class="header_bot">
        <ul>
          <li>
            姓名:
            <span>{{detail.DE02_01_039_00}}</span>
          </li>
          <li>
            性别:
            <span>{{detail.AP02_01_102_01}}</span>
          </li>
          <li>
            年龄:
            <span>{{detail.DE02_01_032_00}}</span>
          </li>
          <li>
            科室:
            <span>{{detail.DE08_10_026_00}}</span>
          </li>
          <li>
            留观号:
            <span></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <table>
        <tr>
          <td>列数</td>
          <td colspan="2">开始时间</td>
          <td colspan="2">临时医嘱</td>
          <td>医师签名</td>
          <td>执行时间</td>
          <td>护士签名</td>
          <td>嘱托</td>
        </tr>
        <tr>
          <td></td>
          <td>{{format_date(detail.AP06_00_200_00)}}</td>
          <td>{{format_date(detail.AP06_00_200_00,2)}}</td>
          <td>{{detail.AP06_00_278_00}}</td>
          <td class="five">{{detail.AP06_00_265_00}}</td>
          <!-- <td></td>
          <td></td>-->
          <td>{{ detail.AP02_01_039_72 }}</td>
          <td>{{format_date(detail.AP06_00_200_00,1)}}</td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
    <div class="bottom">
      <p>
        医师签名:
        <span>{{detail.AP02_01_039_72}}</span>
      </p>
      <p>
        护士签名:
        <span></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "", // 门诊医嘱
  data() {
    return {
      businessId: "",
      detail: {}
    }
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_ADI_DRUREC_INFO_select",
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
      console.error("未找到BUSINESS_ID.\n\n\n--门诊医嘱")
    }
  }
}
</script>

<style lang="scss" scoped>
.yz_wrap {
  * {
    padding: 0;
    margin: 0;
  }
  ul,
  li {
    list-style: none;
  }
  .header {
    width: 90%;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  .header_top {
    margin: 0 auto;
    overflow: hidden;
    width: 40%;
    text-align: center;
    margin-bottom: 20px;
  }
  .header_bot ul {
    overflow: hidden;
  }
  .header_bot ul li {
    margin-right: 4%;
    float: left;
  }
  .header_bot ul li:first-child {
    margin-left: 3%;
  }
  .content {
    width: 100%;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  table,
  td,
  tr {
    border: 1px solid black;
    text-align: center;
    font-size: 14px;
  }
  td {
    padding: 2px 5px;
  }
  .five {
    width: 50px;
  }
  .bottom {
    margin-top: 30px;
    overflow: hidden;
  }
  .bottom p {
    float: left;
  }
  .bottom p:first-child {
    margin-right: 5%;
  }
}
</style>
