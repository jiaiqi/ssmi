<template>
  <div class="tab_content">
    <div class="tab_content_title">住院诊疗检验明细记录</div>
    <div class="tab_content_main">
      <table>
        <tbody>
          <tr>
            <td>检验项目</td>
            <td>申请单号</td>
            <td>报告单号</td>
            <td>机构名称</td>
            <td>操作</td>
          </tr>
          <tr v-for="(item, index) in tabsData" :key="index">
            <td>{{item.DE04_30_020_00}}</td>
            <td>{{item.AP01_00_024_00}}</td>
            <td>{{item.AP04_50_057_00}}</td>
            <td>{{item.ORGANIZATION_NAME}}</td>
            <td class="handle" @click="changeDialogVisible(item)">详情</td>
          </tr>
          <tr v-for="(item, index) in tabData" :key="index">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <!-- <td class="handle" @click="changeDialogVisible()">详情</td> -->
          </tr>
          <el-dialog title :visible.sync="dialogVisible" width="1000px">
            <div class="tab_detail">
              <div class="detail_title">
                <span>姓名:{{detail.DE02_01_039_00}}</span>
                <span>性别:{{detail.AP02_01_102_01}}</span>
                <span>年龄:{{detail.DE02_01_032_00}}</span>
              </div>
              <div class="detail_content">
                <div class="detail_content_title">
                  <div class="title_left">
                    <table>
                      <tr>
                        <td>病案号</td>
                        <td>住院床号</td>
                        <td>项目名称</td>
                        <td>检验方法</td>
                        <td>结果</td>
                      </tr>
                      <tr>
                        <td>{{detail.DE01_00_004_00}}</td>
                        <td>{{detail.AP08_10_001_00}}</td>
                        <td>{{detail.DE04_30_020_00}}</td>
                        <td>{{detail.AP04_50_067_00}}</td>
                        <td>{{detail.AP04_30_003_00}}</td>
                      </tr>
                    </table>
                  </div>
                </div>
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
  name: "zyzljymxjl",
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
      this.tabsData = this.elTabsData.zyjybg
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
