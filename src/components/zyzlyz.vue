<template>
  <div class="tab_content">
    <div class="tab_content_title">住院诊疗医嘱信息</div>
    <div class="tab_content_main">
      <table>
        <tbody>
          <tr>
            <td>医嘱号</td>
            <td>医嘱分类</td>
            <td>医嘱下达时间</td>
            <!-- <td>医嘱内容</td> -->
            <td>机构名称</td>
            <td>操作</td>
          </tr>
          <tr>
            <td v-if="!tabData[0]"></td>
            <td v-if="!tabData[0].AP06_00_287_00"></td>
            <td v-if="tabData[0]">{{ tabData[0].AP01_00_024_00 }}</td>
            <td v-if="tabData[0].AP06_00_287_00">{{ tabData[0].AP06_00_287_00 }}</td>
            <td
              v-if="tabData[0].AP06_00_207_00"
            >{{ tabData[0].AP06_00_207_00.slice(0,4)+'-'+tabData[0].AP06_00_207_00.slice(4,6)+'-'+tabData[0].AP06_00_207_00.slice(6,8)+" "+tabData[0].AP06_00_207_00.slice(9,11)+':'+tabData[0].AP06_00_207_00.slice(11,13)+':'+tabData[0].AP06_00_207_00.slice(13,15) }}</td>
            <td v-if="!tabData[0].AP06_00_207_00"></td>
            <td>{{ tabData[0].ORGANIZATION_NAME }}</td>
            <td class="handle" @click="changeDialogVisible(tabData)">
              <span>详情</span>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <!-- <td class="handle" @click="changeDialogVisible()">
              <span></span>
            </td>-->
          </tr>
          <el-dialog :visible.sync="dialogVisible" width="1000px">
            <div class="wrap_yz">
              <div class="header">
                <div class="header_top">
                  <h3>住院诊疗医嘱信息</h3>
                </div>
                <div class="header_bot">
                  <p>
                    <span>姓名：</span>
                    <span>{{ tabData[0].DE02_01_039_00 }}</span>
                  </p>
                  <p>
                    <span>性别：</span>
                    <span>{{ tabData[0].AP02_01_102_01 }}</span>
                  </p>
                  <p>
                    <span>年龄：</span>
                    <span>{{ tabData[0].DE02_01_032_00 }}</span>岁
                  </p>
                  <p>
                    <span>住院号：</span>
                    <span>{{ tabData[0].DE01_00_014_00 }}</span>
                  </p>
                  <p>
                    <span>住院科室：</span>
                    <span>{{ tabData[0].AP08_10_026_11 }}</span>
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
                    <td
                      v-if="item.AP06_00_200_00"
                    >{{item.AP06_00_200_00.slice(0,4)+'-'+item.AP06_00_200_00.slice(4,6)+'-'+item.AP06_00_200_00.slice(6,8)}}</td>
                    <td v-else-if="!item.AP06_00_200_00"></td>
                    <td
                      v-if="item.AP06_00_200_00"
                    >{{item.AP06_00_200_00.slice(9,11)+':'+item.AP06_00_200_00.slice(11,13)+':'+item.AP06_00_200_00.slice(13,15)}}</td>
                    <td v-else-if="!item.AP06_00_200_00"></td>
                    <td
                      v-if="item.AP06_00_201_00"
                    >{{item.AP06_00_201_00.slice(0,4)+'-'+item.AP06_00_201_00.slice(4,6)+'-'+item.AP06_00_201_00.slice(6,8)+' '+item.AP06_00_201_00.slice(9,11)+':'+item.AP06_00_201_00.slice(11,13)+':'+item.AP06_00_201_00.slice(13,15)}}</td>
                    <td v-else-if="!item.AP06_00_201_00"></td>
                    <td>{{ item.AP06_00_283_00 }}</td>
                    <td></td>
                    <td>{{item.AP02_01_039_83}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td
                      v-if="item.DE06_00_148_00"
                    >{{item.DE06_00_148_00.slice(0,4)+'-'+item.DE06_00_148_00.slice(4,6)+'-'+item.DE06_00_148_00.slice(6,8)+' '+item.DE06_00_148_00.slice(9,11)+':'+item.DE06_00_148_00.slice(11,13)+':'+item.DE06_00_148_00.slice(13,15)}}</td>
                    <td v-else-if="!item.DE06_00_148_00"></td>
                  </tr>
                </table>
                <div class="content_bot"></div>
              </div>
            </div>
          </el-dialog>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "zyzlyz", props: ["tabData", "patientInfo"],
  data() {
    return {
      dialogVisible: false,
      detail: {},
      tabsData: []
    };
  },
  created() {
    setTimeout(() => {
      this.tabsData = this.elTabsData.zyyzxx
    }, 500);
  },
  methods: {
    changeDialogVisible(item) {
      this.dialogVisible = true;
      this.detail = {}
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
