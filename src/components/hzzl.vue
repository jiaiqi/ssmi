<template>
  <div class="tab_content">
    <div class="tab_content_title">基本信息</div>
    <div class="tab_content_main">
      <table style="width:800px">
        <tr>
          <td>姓名</td>
          <td>{{ patientInfo.name }}</td>
          <td>性别</td>
          <td>{{ patientInfo.gender }}</td>
          <td>年龄</td>
          <td>{{ patientInfo.age }}</td>
        </tr>
        <tr>
          <td>职业</td>
          <td colspan="5">{{ patientInfo.profession }}</td>
        </tr>
        <tr>
          <td>家庭住址</td>
          <td colspan="5">{{ patientInfo.familyAddress }}</td>
        </tr>
        <tr>
          <td>联系方式</td>
          <td colspan="5">{{ patientInfo.contact }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script >
export default {
  name: "PatientOverView",
  props: ["patientInfo"],
  methods: {
    getData() {
      // 根据local_id 查找居住信息
      let req = {
        hisVer: true,
        "serviceName": "DI_MPI_ADDRESS_select",
        "condition": [
          {
            "colName": "LOCAL_ID",
            "ruleType": "eq",
            "value": this.patientInfo.LOCAL_ID
          }
        ],
      };
      let url = this.getServiceUrl("select", req.serviceName, "emr");
      this.axios({
        method: "POST",
        url: url,
        data: req
      }).then(res => {
        // console.log(res3)
        let data = res.data.data[0]
        this.patientInfo.detailAddress = data.DETAIL
      }).catch(err3 => {
        console.log(err3)
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.tab_content {
  width: 100%;
  height: 100%;
  .tab_content_title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .tab_content_main {
    table {
      width: 80%;
      border-spacing: 0px;
      border-collapse: collapse;
      margin: 0 auto;
      td {
        min-width: 30px;
        height: 30px;
        text-align: center;
        padding: 0 10px;
        white-space: nowrap;
        font-size: 12px;
        border: 1px solid rgba(0, 0, 0, 0.5);
        color: #7f7f7f;
      }
    }
  }
}
</style>
