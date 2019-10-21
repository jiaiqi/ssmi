<template>
  <div class="note_wrap">
    <h3>住院病案首页手术记录</h3>
    <div class="operation_note" v-for="(item,index) in detail" :key="index">
      <div class="tr">
        <div class="td td_cen">编码</div>
        <div class="td td_cen">日期</div>
        <div class="td td_cen">手术级别</div>
        <div class="td td_cen">名称</div>
        <div class="td" style="border-left:none;">
          <div class="td" style="border-right:none;border-left:none;">手术、操作医师</div>
          <div class="td" style="border-bottom:none;border-right:0;border-left:0;display:flex;">
            <div class="td td_little" style="border-left:0;">术者</div>
            <div class="td td_little">I助</div>
            <div class="td td_little" style="border-right:0;border-left:0;">Ⅱ助</div>
          </div>
        </div>
        <div class="td td_cen">切口愈合等级</div>
        <div class="td td_cen">麻醉方式</div>
        <div class="td td_cen">麻醉医师</div>
      </div>
      <div class="tr">
        <div class="td td_cen">{{item.AP01_00_004_00}}</div>
        <div class="td td_cen">{{item.AP06_00_189_00}}</div>
        <div class="td td_cen">{{item.AP06_00_367_00}}</div>
        <div class="td td_cen">{{item.DE06_00_094_00}}</div>
        <div class="td" style="display:flex;">
          <div class="td td_little td_cen" style="border-left:0;">{{item.AP02_01_039_37}}</div>
          <div class="td td_little td_cen">{{item.AP02_01_039_75}}</div>
          <div
            class="td td_little td_cen"
            style="border-right:0;border-left:0;"
          >{{item.AP02_01_039_78}}</div>
        </div>
        <div class="td td_cen">{{item.AP05_01_054_00}}</div>
        <div class="td td_cen">{{item.DE06_00_074_00}}</div>
        <div class="td td_cen">{{item.AP02_01_039_79}}</div>
      </div>
    </div>
    <div class="operation_note" v-if="!detail.length>0">
      <div class="tr">
        <div class="td">编码</div>
        <div class="td">日期</div>
        <div class="td">手术级别</div>
        <div class="td">名称</div>
        <div class="td">
          <div class="td" style="border-right:none;border-left:none;">手术、操作医师</div>
          <div class="td" style="border-bottom:none;display:flex;">
            <div class="td td_little">术者</div>
            <div class="td td_little">I助</div>
            <div class="td td_little">Ⅱ助</div>
          </div>
        </div>
        <div class="td">切口愈合等级</div>
        <div class="td">麻醉方式</div>
        <div class="td">麻醉医师</div>
      </div>
      <div class="tr">
        <div class="td">-</div>
        <div class="td">-</div>
        <div class="td">-</div>
        <div class="td">-</div>
        <div class="td" style="display:flex;">
          <div class="td td_little">-</div>
          <div class="td td_little">-</div>
          <div class="td td_little">-</div>
        </div>
        <div class="td">-</div>
        <div class="td">-</div>
        <div class="td">-</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InHospitalIndexOperation", // 住院病案首页手术记录
  data() {
    return {
      businessId: "",
      detail: {}
    };
  },
  methods: {
    getData() {
      let params = {
        serviceName: "DI_HAI_OPEREC_INFO_MR_select",
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
          console.log("住院病案首页手术记录", res);
          this.detail = res.data.data;
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
      console.error("未找到BUSINESS_ID.\n\n\n--住院病案首页手术记录");
    }
  }
};
</script>

<style lang="scss" scoped>
.note_wrap {
  width: 100%;
  background-color: white;
  border-top: 1px solid transparent;
  min-height: calc(100vh - 1px);
  max-width: 1000px;
  max-width: 1000px;
  margin: 0 auto;
  h3 {
    width: 20%;
    margin: 5rem auto 0;
    font-size: 20px;
    text-align: center;
  }
}
.operation_note {
  width: 95%;
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  .tr {
    display: flex;
    .td {
      flex: 1;
      border-bottom: none;
      border: 1px solid #333;
      min-height: 30px;
      line-height: 30px;
      border-top: none;
      border-left: none;
      text-align: center;
      &:first-child {
        border-left: 1px solid #333;
      }
    }
    .td_cen {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .td_little {
      border-bottom: none;
    }
    &:first-child {
      border-top: 1px solid #333;
    }
  }
}
.content_list_one > p {
  height: 30px;
  line-height: 30px;
  /* margin-top: 7px;
    margin-bottom: 10px; */
  border-bottom: 1px solid black;
}
.content_list_one > p > span {
  border: 1px solid black;
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  text-align: center;
}
.content_list_one > p > input {
  width: 100px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid black;
}
.content_page2_ul_three {
  width: 99.8%;
  height: 50px;
  // border-left: 1px solid black;
  // border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.content_list_one {
  border-top: none !important;
  margin-bottom: -10px;
  border-bottom: none !important;
}
.content_page2_ul_two {
  border-bottom: none;
  // margin-top: 100px;
}
.content_page2_ul_one {
  // margin-top: -3px!important;
  border-top: none !important;
  border-bottom: none !important;
}
.content_page2_ul_two {
  // margin-top: -3px!important;
  border-top: none !important;
}
#content_list_one_pp > input {
  width: 50px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid black;
}
.content_list_one_pp {
  border-bottom: none;
}
</style>
