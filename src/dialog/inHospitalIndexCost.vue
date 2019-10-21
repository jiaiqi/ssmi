<template>
  <div class="index-cost">
    <h3>住院病案首页费用结算</h3>
    <table>
      <tr>
        <td>住院科室</td>
        <td>费用分类</td>
        <td>金额（元）</td>
      </tr>
      <tr v-for="(item,index) in fyjs" :key="index">
        <td>{{ item.AP08_10_026_11 }}</td>
        <td>{{ item.AP07_00_029_00 }}</td>
        <td>{{ item.DE07_00_010_00 }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "InHospitalIndexCost", // 住院病案首页费用结算
  data() {
    return {
      businessId: "",
      fyjs: {}
    };
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_HAI_EXPSET_INFO_MR_select",
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
          console.log("住院病案首页费用结算", res);
          this.fyjs = res.data.data;
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
      console.error("未找到BUSINESS_ID.\n\n\n--住院病案首页费用结算");
    }
  }
};
</script>

<style lang="scss" scoped>
.index-cost {
  background: white;
  min-height: calc(100vh - 1px);
  width: 100%;
  border-top: 1px solid transparent;
  // overflow: hidden;
  max-width: 1000px;
  margin: 0 auto;
  h3 {
    width: 20%;
    margin: 5rem auto 0px;
    text-align: center;
  }
  table,
  td,
  tr {
    border: 1px solid black;
    text-align: center;
    font-size: 14px;
  }
  table {
    border-collapse: collapse;
    width: 80%;
    // display: block;
    margin: 1rem auto 0;
  }
  td {
    padding: 2px 5px;
  }
}
</style>
