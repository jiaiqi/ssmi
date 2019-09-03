<template>
  <div class="tab_content">
    <div class="tab_content_title">住院诊疗手术记录</div>
    <div class="tab_content_main">
      <table>
        <tbody>
          <tr>
            <td>手术申请单号</td>
            <td>手术时间</td>
            <td>手术级别</td>
            <td>愈合等级</td>
            <td>机构名称</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{ item.AP01_00_024_00}}</td>
            <td
              v-if="item.DE06_00_095_00"
            >{{ item.DE06_00_095_00.slice(0,4)+'-'+item.DE06_00_095_00.slice(4,6)+'-'+item.DE06_00_095_00.slice(6,8)}}</td>
            <td v-else-if="!item.DE06_00_095_00"></td>
            <td>{{ item.AP06_00_367_00 }}</td>
            <td>{{ item.AP05_01_054_00 }}</td>
            <td>{{ item.ORGANIZATION_NAME }}</td>
            <td class="handle" @click="changeDialogVisible(item)">
              <span>详情</span>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <!-- <td class="handle" @click="changeDialogVisible()">
              <span>详情</span>
            </td>-->
          </tr>
          <el-dialog :visible.sync="dialogVisible" width="1000px">
            <div class="tab_detail">
              <div class="title">住院诊疗手术记录</div>
              <div class="detail_title_header">
                <div class="detail_title_headerone">
                  <span>科别：</span>
                  <span>姓名：{{detail.DE02_01_039_00}}</span>
                  <span>性别：{{detail.AP02_01_102_01}}</span>
                  <span>年龄：{{detail.DE02_01_032_00}}</span>
                </div>
                <div class="detail_title_headertwo">
                  <!-- <span class="span11">床号：</span> -->
                  <!-- <span class="span22">门诊号：</span> -->
                  <!-- <span class="span33">住院号：</span> -->
                </div>
              </div>
              <p>手术前诊断:</p>
              <p>手术后诊断:</p>
              <p>手术名称:{{detail.DE06_00_094_00}}</p>
              <div class="detail_title_dif1">
                <p>手术日期:{{detail.DE06_00_095_00}}</p>
                <p class="detail_title_dif1_two">手术历时:{{detail.AP06_00_394_00}}</p>
              </div>
              <div class="detail_title_dif2">
                <p>手术者:{{detail.AP02_01_039_37}}</p>
                <p class="detail_title_dif2_two">助手:</p>
                <p class="detail_title_dif2_three">护士:</p>
              </div>
              <p>麻醉者:</p>
              <p>体位:</p>
              <p>手术经过：{{detail.AP06_00_302_00}}</p>
            </div>
            <!-- <div class="tab_detail">
              <div class="detail_title">
                <span>住院病区：{{ detail.AP08_10_002_00 }}</span>
                <span>住院科室：{{ detail.AP08_10_026_11 }}</span>
                <span>住院床号：{{ detail.AP08_10_026_11 }}</span>
                <span
                  v-if="detail.AP06_00_189_00"
                >手术操作时间: {{ detail.AP06_00_189_00.slice(0,4)+'-'+detail.AP06_00_189_00.slice(4,6)+'-'+detail.AP06_00_189_00.slice(6,8) }}</span>
                <span>病案号：{{ detail.AP08_10_001_00 }}</span>
              </div>
              <div class="detail">
                <div class="detail_left">
                  <p
                    v-if="detail.AP06_00_393_00"
                  >手术开始时间：{{ detail.AP06_00_393_00.slice(0,4)+'-'+detail.AP06_00_393_00.slice(4,6)+'-'+detail.AP06_00_393_00.slice(6,8) }}</p>
                  <p
                    v-if="detail.AP06_00_394_00"
                  >手术结束时间：{{ detail.AP06_00_394_00.slice(0,4)+'-'+detail.AP06_00_394_00.slice(4,6)+'-'+detail.AP06_00_394_00.slice(6,8) }}</p>
                  <p>麻醉执行科室：{{ detail.AP08_10_054_02 }}</p>
                  <p>麻醉医师：{{ detail.AP02_01_039_76 }}</p>
                  <p>助手1：{{ detail.AP02_01_039_75 }}</p>
                  <p>助手2：{{ detail.AP02_01_039_78 }}</p>
                </div>
                <div class="detail_rig">
                  <p>手术/操作-名称：{{ detail.DE06_00_094_00 }}</p>
                  <p>手术操作部位：{{ detail.AP06_00_006_01 }}</p>
                  <p>麻醉-方法：{{ detail.DE06_00_074_00 }}</p>
                  <p>手术后情况：{{ detail.AP05_10_071_00 }}</p>
                  <p>手术经过：{{ detail.AP06_00_302_00 }}</p>
                </div>
              </div>
            </div>-->
          </el-dialog>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "zyzlssjl",
  props: ["tabData", "elTabsData"],
  data() {
    return {
      dialogVisible: false,
      detail: {},
      tabsData: []
    };
  },
  created() {
    setTimeout(() => {
      this.tabsData = this.elTabsData.zyssjl
    }, 500);
  },
  methods: {
    changeDialogVisible(item) {
      this.dialogVisible = true;
      if (item) {
        this.detail = item;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.tab_content {
  width: 100%;
  height: 100%;
  text-align: center;
}

.tab_content_title {
  font-family: "Arial Negreta", "Arial Normal", "Arial";
  font-weight: 700;
  height: 60px;
  line-height: 60px;
  font-style: normal;
  font-size: 16px;
  color: #7f7f7f;
}

/* 详情 */
.tab_detail {
  box-sizing: border-box;
  // width: 900px;
  margin: 0 auto;
  min-height: 500px;
  text-align: left;
  p {
    margin-left: 2%;
  }
}

.detail_title {
  display: flex;
  justify-content: space-around;
  padding-bottom: 5px;
  border-bottom: 1px solid #333;
}

.detail {
  display: flex;
  justify-content: space-between;
  .detail_left {
    width: 45%;
    min-height: 530px;
    text-align: left;
    border-right: 1px solid black;
    p {
      margin-left: 5%;
    }
  }
  .detail_rig {
    width: 45%;
    text-align: left;
    margin-right: 2%;
    p {
      margin-right: 5%;
    }
  }
}

.read_card {
  min-height: 100px;
  text-align: center;
  font-weight: 600;
  font-size: 20px;
}
/* 内容 */
.detail_content_title {
  display: flex;
  width: 100%;
}

.title_left {
  flex: 1;

  display: flex;
  justify-content: space-around;
  table,
  tr,
  td {
    border: 1px solid #333;
    margin-top: 15px;
  }
  table {
    width: 100%;
  }
}

.title_right {
  display: flex;
  justify-content: space-around;
  flex: 1;
}

.detail_content_content {
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: space-between;
}

.detail_content_left {
  border-right: 1px #333 solid;
  height: 300px;
  width: 50%;
}

.detail_content_right {
  height: 300px;
  width: 50%;
}

table {
  width: 80%;
  border-spacing: 0px;
  border-collapse: collapse;
  margin: 0 auto;
}

table td {
  min-width: 30px;
  height: 30px;
  text-align: center;
  padding: 0 10px;
  white-space: nowrap;
  font-size: 12px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  color: #7f7f7f;
}

td.handle {
  cursor: pointer;
  color: blue;
}

.text {
  margin: 0;
  padding: 0;
}

.title {
  text-align: center;
  font-size: 22px;
  margin-bottom: 15px;
}
.detail_title_header {
  width: 100%;
}
.detail_title_headerone {
  display: flex;
  justify-content: space-around;
  padding-bottom: 10px;
  border-bottom: 2px solid #333;
}
.detail_title_headertwo > .span11 {
  margin-left: 100px;
}
.detail_title_headertwo > .span22 {
  margin-left: 190px;
}
.detail_title_headertwo > .span33 {
  margin-left: 420px;
}
.detail_title_dif {
  width: 100%;
  display: block;
}
.detail_title_dif:nth-of-type(2) {
  margin-left: 200px;
}
</style>
