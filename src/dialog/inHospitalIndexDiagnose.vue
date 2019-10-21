<template>
  <div class="zy_wrap">
    <h3>住院病案首页诊断记录</h3>
    <div class="content_b_title">
      <ul class="content_b_title_ul">
        <li>
          <p>出院诊断</p>
          <p>疾病编码</p>
          <p>入院病情</p>
        </li>
        <li class="zd" v-for="(item,index) in zdjl" :key="index">
          <p>
            主要诊断：
            <span>{{item.DE05_01_025_00}}</span>
          </p>
          <p style="height:54px;">{{item.DE05_01_024_00}}</p>
          <p>{{item.AP05_01_185_00}}</p>
        </li>
        <li class="zd">
          <p>
            主要诊断：
            <span>-</span>
          </p>
          <p>-</p>
          <p>-</p>
        </li>
      </ul>
      <ul class="content_b_title_bot_ul" v-for="(item,index) in zdjl" :key="index">
        <li>
          <p>入院病情：{{item.AP05_01_185_00}} 1.有 2.临床未确定 3.情况不明 4.无</p>
        </li>
        <li>
          <p>损伤、中毒外部原因</p>
          <p></p>
          <p>疾病编码</p>
          <p></p>
        </li>
        <li>
          <p>病理诊断</p>
          <p>{{item.DE05_01_025_00}}</p>
          <p>疾病编码</p>
          <p style="display:flex;align-items:center;">{{item.DE05_01_024_00}}</p>
        </li>
        <li>
          <p>
            病理号
            <span>{{item.DE01_00_005_00}}</span>
          </p>
        </li>
        <li class="chose">
          <p>
            药物过敏
            <span></span> 1.无 2.有
          </p>
          <p>
            过敏药物：
            <span></span>
          </p>
          <p>
            死亡患者尸检
            <span></span>1.是 2.否
          </p>
        </li>
        <li class="blood">
          <p>
            血 型
            <span></span>1.A 2.B 3.O 4.AB 5.不详 6.未查
          </p>
          <p>
            Rh
            <span></span>1.阴 2.阳 3.不详 4.未查
          </p>
        </li>
        <li class="people">
          <p>
            科主任
            <span></span>
          </p>
          <p>
            副主任医师
            <span></span>
          </p>
          <p>
            主治医师
            <span></span>
          </p>
          <p>
            住院医师
            <span></span>
          </p>
        </li>
        <li class="people">
          <p>
            责任护士
            <span></span>
          </p>
          <p>
            进修医师
            <span></span>
          </p>
          <p>
            实习医师
            <span></span>
          </p>
          <p>
            编码员
            <span></span>
          </p>
        </li>
        <li class="people">
          <p>
            病案质量
            <span></span>1.甲 2.乙 3.丙
          </p>
          <p>
            质控医师
            <span></span>
          </p>
          <p>
            质控护士
            <span></span>
          </p>
          <p>
            质控日期
            <span>{{format_date(item.DE05_01_058_00)}}</span>
          </p>
        </li>
      </ul>
      <!-- <ul class="content_b_title_bot_ul" v-if="!zdjl.length>0">
        <li>
          <p>入院病情：- 1.有 2.临床未确定 3.情况不明 4.无</p>
        </li>
        <li>
          <p>损伤、中毒外部原因</p>
          <p>-</p>
          <p>疾病编码</p>
          <p>-</p>
        </li>
        <li>
          <p>病理诊断</p>
          <p>-</p>
          <p>疾病编码</p>
          <p style="height:54px;">-</p>
        </li>
        <li>
          <p>
            病理号
            <span>-</span>
          </p>
        </li>
        <li class="chose">
          <p>
            药物过敏
            <span>-</span> 1.无 2.有
          </p>
          <p>
            过敏药物：
            <span>-</span>
          </p>
          <p>
            死亡患者尸检
            <span>-</span>1.是 2.否
          </p>
        </li>
        <li class="blood">
          <p>
            血 型
            <span>-</span>1.A 2.B 3.O 4.AB 5.不详 6.未查
          </p>
          <p>
            Rh
            <span>-</span>1.阴 2.阳 3.不详 4.未查
          </p>
        </li>
        <li class="people">
          <p>
            科主任
            <span>-</span>
          </p>
          <p>
            副主任医师
            <span>-</span>
          </p>
          <p>
            主治医师
            <span>-</span>
          </p>
          <p>
            住院医师
            <span>-</span>
          </p>
        </li>
        <li class="people">
          <p>
            责任护士
            <span>-</span>
          </p>
          <p>
            进修医师
            <span>-</span>
          </p>
          <p>
            实习医师
            <span>-</span>
          </p>
          <p>
            编码员
            <span>-</span>
          </p>
        </li>
        <li class="people">
          <p>
            病案质量
            <span>-</span>1.甲 2.乙 3.丙
          </p>
          <p>
            质控医师
            <span>-</span>
          </p>
          <p>
            质控护士
            <span>-</span>
          </p>
          <p>
            质控日期
            <span>-</span>
          </p>
        </li>
      </ul>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "InHospitalIndexDiagnose", // 住院病案首页诊断记录
  data() {
    return {
      businessId: "",
      zdjl: {}
    };
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_HAI_DIAREC_INFO_MR_select",
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
          this.zdjl = res.data.data;
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
      console.error("未找到BUSINESS_ID.\n\n\n--住院病案首页诊断记录");
    }
  }
};
</script>

<style lang="scss" scoped>
.zy_wrap {
  width: 100%;
  min-height: calc(100vh - 1px);
  background: white;
  border-top: 1px solid transparent;
  max-width: 1000px;
  margin: 0 auto;
  h3 {
    width: 20%;
    margin: 1rem auto 0;
    text-align: center;
    font-size: 20px;
  }
  .content_b_title {
    width: 95%;
    margin: 2rem auto;
    ul {
      width: 100%;
      margin: 0rem auto;
      border: 1px solid black;
      padding: 0;
    }
    &:first-child {
      border-top: 1px solid black;
      margin-bottom: 0;
    }
  }
}

.content_b_title_ul li {
  overflow: hidden;
}
.content_b_title_ul li p {
  float: left;
  margin: 0;
  padding: 1rem 0;
}

.content_b_title_ul li:nth-child(1) p {
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  /* padding: 0 5px; */
  width: 10%;
  box-sizing: border-box;
  text-align: center;
}

.content_b_title_ul li:nth-child(1) p:nth-child(1) {
  width: 80%;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  box-sizing: border-box;
  /* border-left: none; */
}
.content_b_title_ul li:nth-child(1) p:last-child {
  border-right: none;
}
.zd p {
  border-bottom: 1px solid black;
  width: 10%;
  box-sizing: border-box;
  text-align: center;
  border-right: 1px solid black;
  min-height: 20px;
}
.zd p:nth-child(1) {
  width: 80%;
  text-align: left;
  text-indent: 5px;
}
.zd p:nth-last-child(1) {
  border-right: none;
}
.zd:last-child p {
  border-bottom: none;
}
.content_b_title_bot_ul,
.content_b_title_ul {
  margin-top: 0 !important;
  border-top: none !important;
}
.content_b_title_bot_ul li {
  display: flex;
  display: -webkit-flex;
  display: -moz-flex;
  border-bottom: 1px solid black;
}
.content_b_title_bot_ul li p {
  padding: 1rem 5px !important;
  margin: 0;
}
.content_b_title_bot_ul li:nth-child(2) p:nth-child(1) {
  border-right: 1px solid black;
  padding: 5px 5px;
}
.content_b_title_bot_ul li:nth-child(2) p:nth-child(1) {
  border-right: 1px solid black;
  padding: 5px 5px;
}
.content_b_title_bot_ul li:nth-child(2) p:nth-child(2) {
  width: 50%;
  margin-left: 1%;
}
.content_b_title_bot_ul li:nth-child(3) p:nth-child(1) {
  border-right: 1px solid black;
  padding: 5px 5px;
}
.content_b_title_bot_ul li:nth-child(3) p:nth-child(1) {
  border-right: 1px solid black;
  padding: 5px 5px;
}
.content_b_title_bot_ul li:nth-child(3) p:nth-child(2) {
  width: 58%;
  margin-left: 1%;
}
.content_b_title_bot_ul li:nth-child(4) p:nth-child(1) {
  margin-left: 66%;
}
.chose p:nth-child(1) span {
  display: inline-block;
  padding: 0 5px;
  border: 1px solid black;
  margin: 0 5px;
}
.chose p {
  width: 33%;
  border-right: 1px solid black;
}
.chose p:last-child {
  border-right: none;
}
.chose p:nth-child(2) {
  margin: 0 5%;
}
.blood p span {
  display: inline-block;
  padding: 0 5px;
  border: 1px solid black;
  margin: 0 5px;
}
.blood p:last-child {
  margin-left: 5%;
}
.people p {
  width: 25%;
}
.people p span {
  width: 20%;
  padding: 0 20px;
  border-bottom: 1px solid black;
}
.people:last-child p:nth-child(1) span {
  padding: 0 5px;
  margin: 0 5%;
  border: 1px solid black;
}
.people:last-child {
  border-bottom: none;
}
.content_b_title_bot_ul li p:nth-child(1) {
  margin-left: 5px;
}
.content_b_title_ul {
  overflow: hidden;
  border-top: 1px solid black !important;
}
</style>
