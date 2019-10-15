<template>
  <div class="wrap_jcbg">
    <div class="header">
      <div class="header_top">
        <h1>{{detail.AP04_50_076_02}}</h1>
        <h3>门急诊诊疗检查报告</h3>
      </div>
      <div class="header_cen">
        <p>
          <span>影像号:</span>
          <span></span>
        </p>
      </div>
      <div class="header_bot">
        <ul>
          <li>
            <p>
              <span>姓名:</span>
              <span>{{ detail.DE02_01_039_00 }}</span>
            </p>
          </li>
          <li>
            <p>
              <span>性别:</span>
              <span>{{ detail.AP02_01_102_01 }}</span>
            </p>
          </li>
          <li>
            <p>
              <span>年龄:</span>
              <span>{{ detail.DE02_01_032_00 }}岁</span>
            </p>
          </li>
          <li>
            <p>
              <span>检查号:</span>
              <span>{{ detail.AP04_50_057_00 }}</span>
            </p>
          </li>
          <li>
            <p>
              <span>科室:</span>
              <span>{{ detail.AP04_30_060_00 }}</span>
            </p>
          </li>

          <li>
            <p>
              <span v-if="detail.AP06_00_048_03">检查时间:{{format_date(detail.AP06_00_048_03)}}</span>
            </p>
          </li>
          <li>
            <p>
              <span v-if="detail.UPLOAD_TIME">报告时间:{{format_date(detail.UPLOAD_TIME)}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="content_top">
        <div class="inspect">
          <p>检查项目:</p>
          <p>{{ detail.DE04_30_020_00 }}</p>
        </div>
        <div class="inspect">
          <p>检查方法:</p>
          <p>{{ detail.AP04_30_061_00 }}</p>
        </div>
        <div class="inspect">
          <p>检查结论:</p>
          <p>{{ detail.AP04_30_046_00 }}</p>
          <p></p>
        </div>
        <!-- <div class="opinion"> -->
        <div class="inspect">
          <p>疾病诊断名称:</p>
          <p>{{detail.DE05_01_025_00}}</p>
        </div>
      </div>
    </div>

    <div class="foot">
      <div class="foot_top">
        <p>
          <span>诊断医师:</span>
          <span>{{ detail.AP02_01_039_19 }}</span>
        </p>
        <p>
          <span>审核医师:</span>
          <span>{{ detail.AP02_01_039_19 }}</span>
        </p>
        <p>
          <span>审核时间:</span>
          <span></span>
        </p>
      </div>
      <div class="foot_bot">
        <p>仅供参考</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OutpatientInspectionReport", // 门诊检查报告
  data() {
    return {
      businessId: "",
      detail: {}
    }
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_ADI_CLIEXA_INFO_select",
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
      console.error("未找到BUSINESS_ID.\n\n\n--门诊检查报告")
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap_jcbg {
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    box-shadow: none;
    display: flex;
    flex-direction: column;
  }
  .header_top {
    text-align: center;
  }
  .header_top h1 {
    margin: 15px 0;
  }
  .header_cen {
    text-align: right;
  }
  .header_cen p {
    margin-right: 5%;
    margin-top: 15px;
  }
  .header_bot {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    width: 95%;
    margin: 0 auto;
  }
  .header_bot ul {
    overflow: hidden;
    list-style: none;
    margin: 0 auto;
  }
  .header_bot ul li {
    float: left;
    width: 25%;
    line-height: 30px;
    height: 30px;
  }
  .header_bot p {
    float: left;
    width: 100%;
    display: flex;
    margin-left: 1%;
  }
  .content {
    width: 95%;
    margin: 0 auto;
  }

  .content_top {
    width: 100%;
    margin-top: 20px;
    margin-left: 15px;
  }
  .inspect {
    margin: 15px 0;
    overflow: hidden;
    text-align: left;
  }
  .inspect p {
    text-indent: 30px;
    margin-top: 10px;
  }
  .inspect p:first-child {
    font-weight: 700;
    text-indent: 0;
    margin-top: 0;
  }

  .inspect:nth-child(1) p {
    float: left;
    text-indent: 0;
    margin-top: 0;
  }
  .inspect:nth-child(3) {
    min-height: 100px;
  }
  .opinion {
    margin-top: 30px;
    min-height: 200px;
    text-align: left;
  }
  .opinion p {
    font-weight: 700;
  }
  .opinion ul {
    list-style-type: decimal;
    margin-left: 3%;
  }
  .foot {
    width: 95%;
    margin: 0 auto;
  }
  .foot_top {
    overflow: hidden;
    border-bottom: 1px solid black;
    padding-bottom: 10px;
  }
  .foot_top p {
    float: left;
    width: 30%;
    margin-left: 3%;
  }
  .foot_bot {
    text-align: center;
    margin-top: 10px;
  }
}
</style>
