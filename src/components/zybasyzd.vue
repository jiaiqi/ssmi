<template>
  <div class="tab_content">
    <div class="tab_content_title">住院病案诊断</div>
    <div class="tab_content_main">
      <table>
        <tbody>
          <tr>
            <td>序号</td>
            <td>住院科室</td>
            <td>诊断类型</td>
            <td>诊断名称</td>
            <td>诊断日期</td>
            <td>机构名称</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>1</td>
            <td>{{ item.AP08_10_026_11}}</td>
            <td>{{ item.AP05_01_007_00 }}</td>
            <td>{{ item.DE05_01_025_00 }}</td>
            <td
              v-if="item.DE05_01_058_00"
            >{{ item.DE05_01_058_00.slice(0,4)+'-'+item.DE05_01_058_00.slice(4,6)+'-'+item.DE05_01_058_00.slice(6,8)}}</td>
            <td v-else-if="!item.DE05_01_058_00"></td>
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
            <td></td>
            <!-- <td class="handle" @click="changeDialogVisible()">
              <span>详情</span>
            </td>-->
          </tr>
          <el-dialog :visible.sync="dialogVisible" width="1000px">
            <div class="dialog_hzjl">
              <div class="dialog_title">会诊记录</div>
              <div class="head">
                <div>科室：{{ detail.AP08_10_026_11 }}</div>
                <div>住院号:{{detail.DE01_00_014_00}}</div>
              </div>
              <div class="top">
                会诊类型：
                <div class="check_box">
                  <input disabled type="checkbox" value id="jhz" />
                  <label for="jhz">急会诊</label>
                </div>
                <div class="check_box">
                  <input disabled type="checkbox" value id="pthz" />
                  <label for="pthz">普通会诊</label>
                </div>
                <div class="check_box">
                  <input disabled type="checkbox" value id="dkhz" />
                  <label for="dkhz">多科会诊</label>
                </div>
                <div class="check_box">
                  <input disabled type="checkbox" value id="zmhz" />
                  <label for="zmhz">指名会诊</label>
                </div>
                <label class="check_box">
                  <input disabled type="checkbox" value id="wyhz" />
                  <label for="wyhz">请外院会诊</label>
                </label>
              </div>
              <div class="content">
                <div class="content_title">
                  <div>姓名:{{detail.DE02_01_039_00}}</div>
                  <div>病室:消化内科病区</div>
                  <div>床号：17</div>
                  <div>申请时间： 2019-08-01 08：55</div>
                </div>
                <div class="content_main">
                  <p>患者病情及诊疗经过、申请会诊的理由及目的：</p>
                  <p>患者因“反复胃胀胃痛30余年，加重10余天”入院。年前胃痛胃胀，当地医院诊断溃疡，给予药物治疗，症状好转。但易反复。</p>
                </div>
                <div class="content_title">
                  <div class="content_title_item">被邀会诊科室：{{ detail.AP08_10_026_11 }}</div>
                  <div
                    class="content_title_item content_title_item_one"
                  >被邀请医师：{{detail.AP02_01_039_29}}</div>
                </div>
                <div class="content_title">
                  <div class="content_title_item content_title_item_two">申请科室：消化内科</div>
                  <div class="content_title_item">申请医师： 刘澜</div>
                </div>
                <div class="content_title">
                  <div class="content_title_item">会诊意见：</div>
                  <div
                    v-if="detail.DE05_01_058_00"
                    class="content_title_item content_title_item_three"
                  >会诊时间：{{detail.DE05_01_058_00.slice(0,4)+'-'+detail.DE05_01_058_00.slice(4,6)+'-'+detail.DE05_01_058_00.slice(6,8)}}</div>
                </div>
                <div class="content_main">
                  <p>病史敬阅：</p>
                  <p>专科检查：</p>
                  <p>治疗意见：</p>
                  <p>治疗原发病，暂无特殊处理</p>
                </div>
                <div class="content_title">
                  <div class="content_title_item content_title_item_rom">会诊科室：</div>
                  <div class="content_title_item">会诊医师：</div>
                </div>
                <div class="content_title content_title_foot">外院会诊医师所在医疗机构名称：</div>
              </div>
            </div>
          </el-dialog>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "zybasyzd",
  props: ["tabData", "elTabsData"],
  data() {
    return {
      dialogVisible: false,
      detail: {}
    };
  },
  created() {
    setTimeout(() => {
      this.tabsData = this.elTabsData.zybazd
    }, 300);
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
.dialog_hzjl {
  display: flex;
  flex-direction: column;
  width: 800px;
  padding: 10px 20px;
  background-color: #fff;
  margin: 50px auto;
  .dialog_title {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    line-height: 50px;
    height: 50px;
  }
  .head {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #333;
  }
  .top {
    display: flex;
    justify-content: space-between;
  }
  .content {
    display: flex;
    flex-direction: column;
    .content_title {
      text-indent: 20px;
      border: 1px solid #333;
      border-bottom: none;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      .content_title_item {
        min-width: 200px;
        text-align: left;
      }
      &:last-child {
        border-bottom: 1px solid #333;
      }
    }
    .content_main {
      text-align: left;
      border: 1px solid #333;
      border-bottom: none;
      text-indent: 10px;
      min-height: 200px;
    }
  }
}
</style>
