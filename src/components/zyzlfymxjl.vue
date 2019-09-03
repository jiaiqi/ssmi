<template>
  <div class="tab_content">
    <div class="tab_content_title">住院诊疗费用明细记录</div>
    <div class="tab_content_main">
      <table>
        <tbody>
          <tr>
            <td>姓名</td>
            <td>缴费科室</td>
            <td>缴费项目</td>
            <td>机构名称</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{ item.DE02_01_039_00}}</td>
            <td>{{ item.AP08_10_055_02 }}</td>
            <td>{{ item.AP07_00_018_00 }}</td>
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
            <!-- <td class="handle" @click="changeDialogVisible()">
              <span>详情</span>
            </td>-->
          </tr>
          <el-dialog :visible.sync="dialogVisible" width="1000px">
            <div class="fymx_wrap">
              <div class="header">
                <div class="header_top">
                  <h2>住院诊疗费用明细记录</h2>
                </div>
                <div class="header_cen">
                  <ul>
                    <li>
                      <p>
                        住院号：
                        <span>{{ detail.DE01_00_014_00 }}</span>
                      </p>
                      <p>
                        姓名：
                        <span>{{detail.DE02_01_039_00}}</span>
                      </p>
                      <p>
                        性别：
                        <span>{{detail.AP02_01_102_01}}</span>
                      </p>
                      <p>
                        年龄：
                        <span>{{detail.DE02_01_032_00}}</span>岁
                      </p>
                    </li>
                    <li>
                      <p>
                        家庭地址：
                        <span>延安市安塞区化子坪镇洞姚村</span>
                      </p>
                      <p>
                        家庭电话：
                        <span>123345689</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        联系人姓名：
                        <span>郭四毛</span>
                      </p>
                      <p>
                        联系人关系：
                        <span>父母</span>
                      </p>
                      <p>
                        联系人电话：
                        <span>1235464646</span>
                      </p>
                    </li>
                    <li>
                      <p>
                        入院日期：
                        <span>2019-07-12</span>
                      </p>
                      <p>
                        出院日期：
                        <span>2019-07-22</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="content">
                <div class="content_bot">
                  <div class="content_bot_top">
                    <p>结账费用明细</p>
                  </div>
                  <div class="content_bot_b">
                    <table>
                      <tr>
                        <td>日期</td>
                        <td>科室</td>
                        <td>项目名</td>
                        <td>数量</td>
                        <td>金额</td>
                      </tr>
                      <tr>
                        <td
                          v-if="detail.AP07_00_027_00"
                        >{{detail.AP07_00_027_00.slice(0,4)+'-'+detail.AP07_00_027_00.slice(4,6)+'-'+detail.AP07_00_027_00.slice(6,8)}}</td>
                        <td>{{detail.AP08_10_055_02}}</td>
                        <td>{{detail.AP07_00_018_00}}</td>
                        <td>{{detail.AP07_00_021_00}}</td>
                        <td>{{detail.AP07_00_022_00}}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </el-dialog>

          <tr>
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
  name: "zyzlfymxjl",
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
      this.tabsData = this.elTabsData.zyfyjl
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

<style>
</style>
