<template>
  <div class="wrap_yz">
    <div class="header">
      <div class="header_top">
        <h3>住院诊疗医嘱信息</h3>
      </div>
      <div class="header_bot" v-if="tabsData[0]">
        <p>
          <span>姓名:</span>
          <span>{{ tabsData[0].DE02_01_039_00 }}</span>
        </p>
        <p>
          <span>性别:</span>
          <span>{{ tabsData[0].AP02_01_102_01 }}</span>
        </p>
        <p>
          <span>年龄:</span>
          <span>{{ tabsData[0].DE02_01_032_00 }}</span>岁
        </p>
        <p>
          <span>住院号:</span>
          <span>{{ tabsData[0].DE01_00_014_00 }}</span>
        </p>
        <p>
          <span>住院科室:</span>
          <span>{{ tabsData[0].AP08_10_026_11 }}</span>
        </p>
      </div>
    </div>
    <div class="content">
      <table class="cont_t">
        <tr>
          <td colspan="2">开始</td>
          <td rowspan="2">执行时间</td>
          <td rowspan="2">医嘱</td>
          <td rowspan="2">执行频率</td>
          <td colspan="2">签名</td>
          <td colspan="2">停止时间</td>
          <td colspan="2">签名</td>
          <td rowspan="2">停止执行时间</td>
        </tr>
        <tr>
          <td>日期</td>
          <td>时间</td>
          <td>医师</td>
          <td>护士</td>
          <td>日期</td>
          <td>时间</td>
          <td>医师</td>
          <td>护士</td>
        </tr>
        <tr v-for="(item,index) in detail" :key="index">
          <td v-if="item.AP06_00_200_00">{{format_date(item.AP06_00_200_00)}}</td>
          <td v-else-if="!item.AP06_00_200_00"></td>
          <td v-if="item.AP06_00_200_00">{{format_date(item.AP06_00_200_00)}}</td>
          <td v-else-if="!item.AP06_00_200_00"></td>
          <td v-if="item.AP06_00_201_00">{{format_date(item.AP06_00_201_00,1)}}</td>
          <td v-else-if="!item.AP06_00_201_00"></td>
          <td>{{ item.AP06_00_283_00 }}</td>
          <td></td>
          <td>{{item.AP02_01_039_83}}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td v-if="item.DE06_00_148_00">{{format_date(item.DE06_00_148_00,1)}}</td>
          <td v-else-if="!item.DE06_00_148_00"></td>
        </tr>
      </table>
      <div class="content_bot"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InHospitalMedicalAdvice", // 住院诊疗医嘱信息
  data() {
    return {
      businessId: "",
      detail: {}
    };
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_HDI_DRUREC_INFO_select",
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
    } else {
      console.error("未找到BUSINESS_ID.\n\n\n--住院诊疗医嘱信息");
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap_yz {
  width: 1000px;
  margin: 0 auto;
  .header {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    box-shadow: none;
  }
  .header_top {
    text-align: center;
  }
  .header_top h1 {
    margin: 15px 0;
  }
  .header_bot {
    overflow: hidden;
    margin-top: 20px;
  }
  .header_bot p {
    float: left;
    width: 18%;
    margin-left: 1%;
  }
  .header_bot p:last-child {
    float: left;
    width: 22%;
    margin-left: 1%;
  }
  .content {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  table,
  th,
  td {
    border: 1px solid black;
    text-align: center;
    font-size: 14px;
  }
  td {
    padding: 5px 0px;
  }
  .cont_t {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
  }
  .content_bot {
    text-align: center;
    margin-top: 15px;
  }
}
</style>
