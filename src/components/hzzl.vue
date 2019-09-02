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
  props: ["patientInfo"]
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
