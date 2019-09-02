<template>
  <div class="tab_content">
    <div class="tab_content_title">住院手术记录</div>
    <div class="tab_content_main">
      <table>
        <tbody>
          <tr>
            <td>手术编号</td>
            <td>手术操作时间</td>
            <td>手术级别</td>
            <td>愈合等级</td>
            <td>机构名称</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabData" :key="index">
            <td>{{ item.AP01_00_004_00}}</td>
            <td
              v-if="item.AP06_00_189_00"
            >{{ item.AP06_00_189_00.slice(0,4)+'-'+item.AP06_00_189_00.slice(4,6)+'-'+item.AP06_00_189_00.slice(6,8)}}</td>
            <td v-else-if="!item.AP06_00_189_00"></td>
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
                  <p>麻醉医师：{{ detail.AP02_01_039_79 }}</p>
                  <p>助手1：{{ detail.AP02_01_039_75 }}</p>
                  <p>助手2：{{ detail.AP02_01_039_78 }}</p>
                </div>
                <div class="detail_rig">
                  <p>手术/操作-名称：{{ detail.DE06_00_094_00 }}</p>
                  <p>麻醉-方法：{{ detail.DE06_00_074_00 }}</p>
                </div>
              </div>
            </div>
          </el-dialog>

          <!-- <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>-->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "zybasyjl",
  props: ["tabData"],
  data() {
    return {
      dialogVisible: false,
      detail: {}
    };
  },
  created() {
    console.log("住院手术记录:", this.tabData);
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
body {
  margin: 0;
  background-color: rgba(238, 238, 238, 1);
  background-image: none;
  position: relative;
  left: 0;
  // width: 1361px;
  width: 100%;
  min-width: 1361px;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

.el-timeline-item .el-timeline-item__wrapper {
  padding-left: 15px !important;
}

.el-timeline-item__timestamp {
  padding-left: 10px;
}

.el-date-editor.el-input__inner {
  width: 240px;
}

.el-date-editor--daterange.el-input__inner {
  width: 240px;
}

.el-select {
  display: block;
  width: 100%;
}

.el-select .el-input__inner {
  width: 100%;
  height: 32px;
  display: block;
  box-sizing: border-box;
}

.el-timeline-item {
  text-align: left;
}

.el-timeline-item__timestamp {
  padding-left: 10px;
}

.block .el-date-editor.el-input__inner {
  width: 325px;
  height: 37px;
}

.el-tabs--border-card {
  // height: 545px;
  height: 100%;
}

.el-tabs--border-card .el-tabs__content {
  height: 478px;
}

.el-timeline-item__wrapper .el-timeline-item__timestamp {
  color: #575858;
  line-height: 1;
  font-weight: 600;
  font-size: 14px;
}

.el-tree-node__content .el-tree-node__label {
  font-size: 13px;
}
.el-timeline-item__wrapper {
  position: relative;
  padding-left: 15px !important;
  top: -3px;
  .el-tree-node__content {
    padding-left: 0 !important;
  }
}
.home {
  width: 1500px;
  margin: 0 auto;
}
/* header */
.heade {
  width: 100%;
  margin: 0 auto;
  display: flex;
  // height: 80px;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  background-color: #fff;
  color: #333;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
}

.header_item {
  height: 100%;
  display: flex;
  width: auto;
  color: #333;
}

.header_img {
  width: 240px;
  display: block;
  box-sizing: border-box;
  border: 1px #666 solid;
}

.header_user_info {
  width: 500px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 14px;
  align-items: center;
  box-sizing: border-box;
  padding: 0 50px;
}

.header_user_info .header_user_info_item {
  font-weight: 600;
  font-size: 14px;
  min-width: 30%;
  height: 30px;
  line-height: 30px;
}

.header_user_info .user {
  font-weight: 100;
  font-size: 14px;
}

.header_btn {
  width: 116px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: inherit;
  background-color: rgba(238, 238, 238, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(41, 179, 231, 1);
  border-radius: 5px;
  box-shadow: none;
  cursor: pointer;
  margin-left: 10px;
  font-size: 14px;
}

.header_btn:nth-child(2) {
  border-color: rgba(228, 228, 228, 1);
}

/* content */

.content {
  /* height: 550px; */
  height: 700px;
  margin-top: 10px;
  box-sizing: border-box;
}

.content_left {
  box-sizing: border-box;
  width: 325px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
  float: left;
}

.content_left_top {
  margin: 0 auto;
  box-sizing: border-box;
}

select {
  border: none;
}

.content_left_top_item {
  width: 325px;
  margin-bottom: 10px;
}

.content_left_top_item:first-child {
  background-color: transparent;
  display: flex;
  box-sizing: border-box;
  border: none;
  align-items: center;
  font-size: 12px;
}

.content_left_top_item:first-child .text {
  padding: 5px;
  box-sizing: border-box;
}

.content_left_top_item:last-child {
  display: flex;
  background-color: transparent;
  justify-content: space-between;
}

.select-btn {
  width: 83px;
  height: 32px;
  line-height: 37px;
  box-sizing: border-box;
  border: 1px solid rgba(127, 127, 127, 1);
  border-radius: 5px;
  box-shadow: none;
  font-size: 12px;
  color: #7f7f7f;
  cursor: pointer;
  text-align: center;
}

.content_left_top_item_select {
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  color: #7f7f7f;
  font-size: 12px;
}

.content_left_top_item_date {
  display: inline-block;
  box-sizing: border-box;
  width: 109px;
  height: 37px;
  border-color: rgba(238, 238, 238, 1);
  background-color: #fff;
  border-color: transparent;
}

.content_left_bottom {
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #fff;
  width: 325px;
  border: 1px solid rgba(228, 228, 228, 1);
  height: 500px;
  overflow-y: auto;
}

.content_right {
  box-sizing: border-box;
  width: 1155px;
  float: left;
  height: 100%;
}

.content_right_tab {
  width: 100%;
  box-sizing: border-box;
  height: 32px;
  border: 1px solid rgba(228, 228, 228, 1);
  border-bottom: none;
}

.content_right_main {
  box-sizing: border-box;
  width: 100%;
  height: 518px;
  border: 1px solid rgba(228, 228, 228, 1);
  background-color: #fff;
}

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

.detail_title_block {
  width: 25%;
  line-height: 20px;
  display: flex;
  text-align: left;
  flex-direction: column;
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
    &.handle {
      cursor: pointer;
      color: blue;
    }
  }
}
</style>
