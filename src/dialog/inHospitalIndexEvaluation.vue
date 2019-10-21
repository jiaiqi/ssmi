<template>
  <div class="infor_wrap">
    <div class="content_center">
      <h3>住院病案首页评估报告</h3>
      <ul class="content_ul">
        <div class="first first_title first_5">
          <li class="row_1">
            <div class="label_text">姓名</div>
            <span class="text_line">{{detail.DE02_01_039_00}}</span>
          </li>
          <li class="row_1_5">
            <div class="label_text">性别</div>
            <span class="text_line">{{detail.DE02_01_040_00}}</span>
            <div class="append_text">1. 男 2.女</div>
          </li>
          <li class="row_1">
            <div class="label_text">出生日期</div>
            <span>{{detail.DE02_01_005_01}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">年龄</div>
            <span class="text_line">{{detail.DE02_01_032_00}}</span>
            <div class="append_text">岁</div>
          </li>
          <li class="row_1">
            <div class="label_text">国籍</div>
            <span class="text_line">{{detail.AP02_01_015_00}}</span>
          </li>
        </div>
        <div class="first first_line first_t_3">
          <li class="row_1">
            <div class="label_text">(年龄不足1周岁得) 年龄</div>
            <span class="text_line"></span>
            <div class="append_text">月</div>
          </li>
          <li class="row_1">
            <div class="label_text">新生儿出生体重</div>
            <span class="text_line">{{detail.DE04_10_019_00}}</span>
            <div>克</div>
          </li>
          <li class="row_1">
            <div class="label_text">新生儿入院体重</div>
            <span class="text_line">{{detail.AP04_10_188_00}}</span>
            <div>克</div>
          </li>
        </div>
        <div class="first first_df_3">
          <li class="row">
            <div class="label_text">出生地</div>
            <span class="text_line">{{detail.AP02_01_061_00}}</span>
          </li>
          <li class="row">
            <div class="label_text">籍贯</div>
            <span class="text_line">{{detail.AP02_01_099_00}}</span>
          </li>
          <li class="row">
            <div class="label_text">民族</div>
            <span class="text_line">{{detail.AP02_01_025_03}}</span>
          </li>
        </div>
        <div class="first first_3">
          <li class="row_3">
            <div class="label_text">身份证</div>
            <span class="text_line">{{detail.AP02_01_029_00}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">职业</div>
            <span class="text_line">{{detail.AP02_01_125_02}}</span>
          </li>
          <li class="row_2">
            <div class="label_text">婚姻</div>
            <span class="text_line">{{detail.AP02_01_006_00}}</span>
            <div class="append_text">1.未婚 2.已婚 3.丧偶 4.离婚 5.其他</div>
          </li>
        </div>
        <div class="first first_3">
          <li class="row_3 row_last_3">
            <div class="label_text">现住址</div>
            <span class="text_line">{{detail.AP02_01_009_00}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">电话</div>
            <span class="text_line">{{detail.DE02_01_010_00}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">邮编</div>
            <span class="text_line">{{detail.AP02_01_047_01}}</span>
          </li>
        </div>
        <div class="first first_df_2">
          <li class="row_3">
            <div class="label_text">户口地址</div>
            <span class="text_line">{{detail.AP02_01_008_00}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">邮编</div>
            <span class="text_line">{{detail.DE02_01_047_00}}</span>
          </li>
        </div>
        <div class="first first_3">
          <li class="row_3 row_seven">
            <div class="label_text">工作单位及地址</div>
            <span class="text_line">{{detail.AP08_10_007_01}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">单位电话</div>
            <span class="text_line">{{detail.AP02_01_011_10}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">邮编</div>
            <span class="text_line">{{detail.AP02_01_047_03}}</span>
          </li>
        </div>
        <div class="first first_4">
          <li class="row_1">
            <div class="label_text">联系人姓名</div>
            <span class="text_line">{{detail.AP02_01_039_15}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">关系</div>
            <span class="text_line">{{detail.AP02_01_098_00}}</span>
          </li>
          <li class="row_2">
            <div class="label_text">地址</div>
            <span class="text_line">{{detail.AP02_01_060_08}}</span>
          </li>
          <li class="row_1 phone">
            <div class="label_text">电话</div>
            <span class="text_line">{{detail.AP02_01_011_01}}</span>
          </li>
        </div>

        <div class="end" style="overflow:hidden">
          <li>
            入院途径
            <span>{{detail.AP06_00_369_00}}</span>1.门诊 2.急诊 3.其他医疗机构转入 4.其他
          </li>
          <li>
            治疗类别
            <span>{{detail.AP06_00_373_00}}</span>(1.中医 (1.1中医 1.2 民族医) 2.中西医 3.西医)
          </li>
        </div>
        <div class="first first_4">
          <li v-if="!detail.DE06_00_092_00"></li>
          <li class="row_1" v-if="detail.DE06_00_092_00">
            <div class="label_text">入院时间</div>
            <span class="text_line">{{format_date(detail.DE06_00_092_00)}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">入院科别</div>
            <span class="text_line">{{detail.AP08_10_026_01}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">病房</div>
            <span class="text_line">{{detail.AP08_10_026_02}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">转科科别</div>
            <span class="text_line">{{detail.AP08_10_026_06}}</span>
          </li>
        </div>
        <div class="first first_4">
          <li v-if="!detail.DE06_00_016_00"></li>
          <li class="row_1" v-if="detail.DE06_00_016_00">
            <div class="label_text">出院时间</div>
            <span class="text_line">{{format_date(detail.DE06_00_016_00)}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">出院科别</div>
            <span class="text_line">{{detail.AP08_10_026_07}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">病房</div>
            <span class="text_line">{{detail.AP08_10_025_00}}</span>
          </li>
          <li class="row_1">
            <div class="label_text">实际住院</div>
            <span class="text_line">{{detail.AP04_01_069_00}}</span>
            <div class="text_line">天</div>
          </li>
        </div>
        <div class="first first_end_2">
          <li class="row_3">
            <div class="label_text">门(急)诊诊断</div>
            <span class="text_line"></span>
          </li>
          <li class="row_1">
            <div class="label_text">疾病编码</div>
            <span class="text_line"></span>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "InHospitalIndexEvaluation", // 住院病案首页评估报告
  data() {
    return {
      businessId: "",
      detail: {}
    };
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_HAI_APRNOT_INFO_MR_select",
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
      console.error("未找到BUSINESS_ID.\n\n\n--住院病案首页评估报告");
    }
  }
};
</script>

<style lang="scss" scoped>
.infor_wrap {
  width: 100%;
  border-top: 1px solid transparent;
  background: white;
  min-height: calc(100vh - 1px);
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}
.content_center {
  width: 95%;
  font-size: 14px;
  h3 {
    width: 22%;
    margin: 0 auto;
    font-size: 20px;
    text-align: center;
  }
}
.content_center ul {
  overflow: hidden;
  list-style: none;
  // margin-top: 15px;
  border: 1px solid black;
  padding: 0;
}
.content_ul li {
  margin: 5px 0 5px 5px;
  float: left;
}
.content_ul li span {
  display: inline-block;
  padding: 0 15px;
  border-bottom: 1px solid black;
}
.first:nth-child(1) span:nth-of-type(2) {
  padding: 0 5px;
  border: 1px solid black;
  margin: 0 10px;
}
.first {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  &.first_line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    li {
      width: 176px;
      display: flex;
      flex-direction: row;
      span {
      }
    }
  }
  &.first_3 {
    .row_2 {
      width: 40%;
      display: flex;
      .label_text {
        min-width: 64px;
      }
      span.text_line {
        min-width: 48px;
        max-width: 256px;
      }
      .append_text {
      }
    }
    .row_3 {
      width: 40%;
      display: flex;
      .label_text {
        min-width: 64px;
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
      }
      span.text_line {
        min-width: 48px;
        max-width: 256px;
        width: calc(100% - 48px);
      }
    }
    .row_seven {
      .label_text {
        min-width: 112px;
      }
    }
    .row_last_3 {
      width: 40%;
      display: flex;
      .label_text {
        min-width: 64px;
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
      }
      span.text_line {
        min-width: 48px;
        max-width: 288px;
        width: calc(100% - 48px);
      }
    }
    .row_1 {
      display: flex;
      width: 20%;
      .label_text {
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        min-width: 48px;
      }
      span.text_line {
        min-width: 64px;
        width: calc(100% - 64px);
        max-width: 96px;
      }
    }
    span {
      min-width: 48px;
    }
  }
  &.first_df_3 {
    .row {
      width: 32%;
      display: flex;
      .label_text {
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        min-width: 64px;
      }
      .text_line {
        min-width: 64px;
        width: calc(100% - 96px);
        max-width: 192px;
      }
    }
  }
  &.first_df_2 {
    .row_3 {
      width: 80%;
      display: flex;
      .label_text {
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        min-width: 48px;
      }
      .text_line {
        min-width: 64px;
        width: calc(100% - 96px);
        max-width: 640px;
      }
    }
    .row_1 {
      width: 20%;
      display: flex;
      .label_text {
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        min-width: 48px;
      }
      .text_line {
        min-width: 64px;
        width: calc(100% - 96px);
        max-width: 96px;
      }
    }
  }
  &.first_end_2 {
    .row_3 {
      width: 75%;
      display: flex;
      .label_text {
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        min-width: 90px;
      }
      .text_line {
        min-width: 64px;
        width: calc(100% - 96px);
        max-width: 640px;
      }
    }
    .row_1 {
      width: 25%;
      display: flex;
      .label_text {
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        min-width: 48px;
      }
      .text_line {
        min-width: 64px;
        width: calc(100% - 96px);
        max-width: 160px;
      }
    }
  }
  &.first_5 {
    .row_1 {
      display: flex;
      width: 18%;
      .label_text {
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        min-width: 48px;
      }
      span.text_line {
        min-width: 64px;
        max-width: 96px;
      }
    }
    .row_1_5 {
      width: 28%;
      display: flex;
      .label_text {
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        min-width: 32px;
        max-width: 64px;
      }
      span.text_line {
        min-width: 96px;
        max-width: 96px;
      }
    }
  }
  &.first_t_3 {
    .row_1 {
      width: 33%;
      display: flex;
      .label_text {
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        min-width: 32px;
      }
      span.text_line {
        flex: 2;
        min-width: 32px;
        width: calc(100% - 64px);
        max-width: 152px;
      }
    }
  }
  &.first_4 {
    .row_1 {
      width: 25%;
      display: flex;
      .label_text {
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        min-width: 90px;
      }

      span.text_line {
        min-width: 32px;
        width: calc(100% -128px);
        max-width: 96px;
      }
    }
    .phone {
      width: 25%;
      display: flex;
      .label_text {
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        min-width: 48px;
      }
      span.text_line {
        min-width: 96px;
        width: calc(100% - 128px);
        max-width: 96px;
      }
    }
    .row_2 {
      width: 50%;
      display: flex;
      .label_text {
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        min-width: 64px;
        text-align: center;
      }
      span.text_line {
        min-width: 32px;
        width: calc(100% - 64px);
        max-width: 272px;
      }
    }
  }
}
</style>
