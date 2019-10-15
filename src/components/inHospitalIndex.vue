<template>
  <div>
    <div class="tab_content">
      <div class="tab_content_title">住院病案首页</div>
      <div class="tab_content_main">
        <table v-if="tabsData&&tabsData.length>0">
          <tbody>
            <tr>
              <td>姓名</td>
              <td>就诊地点</td>
              <td>住院号</td>
              <td>住院途径</td>
              <td>入院科别</td>
              <td>入院日期</td>
              <td>出院日期</td>
              <td>操作</td>
            </tr>
            <tr v-for="(item, index) in tabsData" :key="index">
              <td>{{ item.DE02_01_039_00 }}</td>
              <td>{{ item.ORGANIZATION_NAME }}</td>
              <td>{{ item.DE01_00_014_00 }}</td>
              <td>{{ item.AP06_00_369_00 }}</td>
              <td>{{item.AP08_10_026_01}}</td>
              <td>{{format_date(item.DE06_00_092_00)}}</td>
              <td v-if="!item.DE06_00_092_00"></td>
              <td>{{format_date(item.DE06_00_016_00)}}</td>
              <td v-if="!item.DE06_00_016_00"></td>
              <td @click="changeDialogVisible(item)" class="handle">详情</td>
            </tr>
          </tbody>
        </table>
         <div class="nodata" v-else>暂无数据......</div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="1000px">
       <div class="zybasy_wrap" style="min-width:800px;">
        <div class="header">
            <div class="header_top">
                <p>医疗机构<span>{{detail.AP08_10_013_06}}</span></p>
                <p>（组织机构代码：<span>{{detail.AP08_10_052_03}}</span>）</p>
            </div>
            <div class="header_title">
                <p><span>医疗付款方式：</span><span>2</span></p>
                <p>住  院  病  案  首  页</p>
            </div>
        </div>
        <div class="content">
            <div class="content_top">
                <p>健康卡号：<span>{{detail.AP01_00_031_00}}</span></p>
                <p>第<span>{{detail.DE02_10_090_00}}</span>次住院</p>
                <p>病案号：<span>{{detail.DE01_00_004_00}}</span></p>
            </div>
            <div class="content_center">
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
                            <span class="text_line"> {{detail.DE04_10_019_00}}</span>
                            <div>克</div>
                        </li>
                        <li class="row_1">
                            <div class="label_text">新生儿入院体重</div>
                            <span class="text_line">{{detail.AP04_10_188_00}} </span>
                            <div>克</div>
                        </li>
                    </div>
                    <div class="first first_df_3">
                        <li class="row">
                           <div class="label_text">出生地</div>
                            <span class="text_line">{{detail.AP02_01_061_00}} </span>
                        </li>
                        <li class="row">
                           <div class="label_text">籍贯</div>
                            <span class="text_line"> {{detail.AP02_01_099_00}}</span>
                        </li>
                        <li class="row">
                           <div class="label_text">民族</div>
                            <span class="text_line">{{detail.AP02_01_025_03}} </span>
                        </li>
                    </div>
                    <div class="first first_3">
                        <li class="row_3">
                            <div class="label_text">身份证</div>
                            <span class="text_line"> {{detail.AP02_01_029_00}}</span>
                        </li>
                        <li class="row_1">
                            <div class="label_text">职业</div>
                            <span class="text_line">{{detail.AP02_01_125_02}} </span>
                        </li>
                        <li class="row_2">
                            <div class="label_text">婚姻</div>
                            <span class="text_line">{{detail.AP02_01_006_00}} </span>
                            <div class="append_text">1.未婚 2.已婚 3.丧偶 4.离婚 5.其他</div>
                        </li>
                    </div>
                    <div class="first first_3">
                        <li class="row_3 row_last_3">
                            <div class="label_text">现住址</div>
                            <span class="text_line"> {{detail.AP02_01_009_00}}</span>
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
                        <span class="text_line">{{detail.AP02_01_098_00}}</span></li>
                        <li class="row_2">
                            <div class="label_text">地址</div>    
                            <span class="text_line">{{detail.AP02_01_060_08}}</span>
                        </li>
                        <li class="row_1 phone">
                            <div class="label_text">电话</div>    
                            <span class="text_line">{{detail.AP02_01_011_01}}</span>
                        </li>
                    </div>

                    <div class="end">
                        <li>入院途径<span>{{detail.AP06_00_369_00}}</span>1.门诊 2.急诊 3.其他医疗机构转入 4.其他</li>
                        <li>治疗类别<span>{{detail.AP06_00_373_00}}</span>(1.中医 (1.1中医 1.2 民族医) 2.中西医 3.西医)</li>
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
                            <span class="text_line">   </span>
                        </li>
                        <li class="row_1">
                            <div class="label_text">疾病编码</div>
                            <span class="text_line">  </span>
                        </li>
                    </div>
                </ul>
                <!-- <div class="content_center_top">
                   <div class="contet_item_box">
                        <div class="content_list_item">
                            <div class="label">姓名</div>
                            <div class="content"></div>
                        </div>
                        <div class="content_list_item">
                            <div class="label">性别</div>
                            <div class="content"></div>
                        </div>
                        <div class="content_list_item"></div>
                        <div class="content_list_item"></div>
                        <div class="content_list_item"></div>
                   </div>
                </div> -->
                <div class="content_bot">
                    <div class="content_b_title">
                        <ul class="content_b_title_ul">
                            <li>
                                <p>出院诊断</p>
                                <p>疾病编码</p>
                                <p>入院病情</p>
                            </li>
                            <li class="zd" v-for="(item,index) in zdjl" :key="index">
                                <p>主要诊断：<span>{{item.DE05_01_025_00}}</span></p>
                                <p> {{item.DE05_01_024_00}}</p>
                                <p>{{item.AP05_01_185_00}}</p>
                            </li>
                            <li class="zd" >
                                <p>主要诊断：<span>-</span></p>
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
                                <p>     </p>
                                <p>疾病编码</p>
                                <p></p>
                            </li>
                            <li>
                                <p>病理诊断</p>
                                <p>{{item.DE05_01_025_00}}</p>
                                <p>疾病编码</p>
                                <p>{{item.DE05_01_024_00}}</p>
                            </li>
                            <li>
                                <p>病理号<span>{{item.DE01_00_005_00}}</span></p>
                            </li>
                            <li class="chose">
                                <p>药物过敏<span>  </span> 1.无 2.有</p>
                                <p>过敏药物：<span>  </span></p>
                                <p>死亡患者尸检<span>   </span>1.是 2.否</p>
                            </li>
                            <li class="blood">
                                <p>血 型<span>  </span>1.A 2.B 3.O 4.AB 5.不详 6.未查</p>
                                <p>Rh<span>  </span>1.阴 2.阳 3.不详 4.未查</p>
                            </li>
                            <li class="people">
                                <p>科主任<span>     </span></p>
                                <p>副主任医师<span>     </span></p>
                                <p>主治医师<span>     </span></p>
                                <p>住院医师<span>     </span></p>
                            </li>
                            <li class="people">
                                <p>责任护士<span>     </span></p>
                                <p>进修医师<span>     </span></p>
                                <p>实习医师<span>     </span></p>
                                <p>编码员<span>     </span></p>
                            </li>
                            <li class="people">
                                <p>病案质量<span>   </span>1.甲 2.乙 3.丙</p>
                                <p>质控医师<span>     </span></p>
                                <p>质控护士<span>     </span></p>
                                <p>质控日期<span>{{item.DE05_01_058_00}}</span></p>
                            </li>
                        </ul>
                         <ul class="content_b_title_bot_ul" v-if="!zdjl.length>0">
                            <li>
                                <p>入院病情：- 1.有 2.临床未确定 3.情况不明 4.无</p>
                            </li>
                            <li>
                                <p>损伤、中毒外部原因</p>
                                <p> - </p>
                                <p>疾病编码</p>
                                <p>-</p>
                            </li>
                            <li>
                                <p>病理诊断</p>
                                <p>-</p>
                                <p>疾病编码</p>
                                <p>-</p>
                            </li>
                            <li>
                                <p>病理号<span>-</span></p>
                            </li>
                            <li class="chose">
                                <p>药物过敏<span>-</span> 1.无 2.有</p>
                                <p>过敏药物：<span>-</span></p>
                                <p>死亡患者尸检<span> - </span>1.是 2.否</p>
                            </li>
                            <li class="blood">
                                <p>血 型<span> - </span>1.A 2.B 3.O 4.AB 5.不详 6.未查</p>
                                <p>Rh<span> - </span>1.阴 2.阳 3.不详 4.未查</p>
                            </li>
                            <li class="people">
                                <p>科主任<span>  -   </span></p>
                                <p>副主任医师<span>  -   </span></p>
                                <p>主治医师<span>  -   </span></p>
                                <p>住院医师<span>  -   </span></p>
                            </li>
                            <li class="people">
                                <p>责任护士<span> -    </span></p>
                                <p>进修医师<span> -    </span></p>
                                <p>实习医师<span> -    </span></p>
                                <p>编码员<span>  -   </span></p>
                            </li>
                            <li class="people">
                                <p>病案质量<span>-   </span>1.甲 2.乙 3.丙</p>
                                <p>质控医师<span> -    </span></p>
                                <p>质控护士<span> -    </span></p>
                                <p>质控日期<span> - </span></p>
                            </li>
                        </ul>
                        <ul class="content_page2_ul_one">
                            <li class="content_list_one">
                                <!-- 空 -->
                                <div class="operation_note" v-for="(item,index) in ssjl" :key="index">
                                  <div class="tr">
                                    <div class="td">编码</div>
                                    <div class="td">日期</div>
                                    <div class="td">手术级别</div>
                                    <div class="td">名称</div>
                                    <div class="td">
                                      <div class="td" style="border-right:none;">
                                        手术、操作医师
                                      </div>
                                      <div class="td" style="border-bottom:none;">
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
                                    <div class="td">{{item.AP01_00_004_00}}</div>
                                    <div class="td">{{item.AP06_00_189_00}}</div>
                                    <div class="td">{{item.AP06_00_367_00}}</div>
                                    <div class="td">{{item.DE06_00_094_00}}</div>
                                    <div  class="td" style="display:flex;">
                                      <div class="td td_little">{{item.AP02_01_039_37}}</div>
                                      <div class="td td_little">{{item.AP02_01_039_75}}</div>
                                      <div class="td td_little">{{item.AP02_01_039_78}}</div>
                                    </div>
                                    <div class="td">{{item.AP05_01_054_00}}</div>
                                    <div class="td">{{item.DE06_00_074_00}}</div>
                                    <div class="td">{{item.AP02_01_039_79}}</div>
                                  </div>
                                </div>
                                <div class="operation_note" v-if="!ssjl.length>0">
                                  <div class="tr">
                                    <div class="td">编码</div>
                                    <div class="td">日期</div>
                                    <div class="td">手术级别</div>
                                    <div class="td">名称</div>
                                    <div class="td">
                                      <div class="td" style="border-right:none;">
                                        手术、操作医师
                                      </div>
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
                                    <div class="td"> - </div>
                                    <div class="td"> - </div>
                                    <div class="td"> - </div>
                                    <div class="td"> - </div>
                                    <div  class="td" style="display:flex;">
                                      <div class="td td_little"> - </div>
                                      <div class="td td_little"> - </div>
                                      <div class="td td_little"> - </div>
                                    </div>
                                    <div class="td"> - </div>
                                    <div class="td"> - </div>
                                    <div class="td"> - </div>
                                  </div>
                                </div>
                                <P>离院方式<span>  -  </span>1.医嘱离院 2.医嘱转院，拟接收医疗机构名称：<input type="text" value="-"></P>  
                                <p>3.医嘱转社区卫生服务机构/乡镇卫生院，拟接收医疗机构名称：<input type="text" value="-">4.非医嘱离院 5.死亡 6.其他</p>
                                <p>是否有出院31天内在住院计划 <span> - </span>  1.无 2.有    目的<input type="text" value="-"></p>
                                <p id="content_list_one_pp">颅脑损伤患者昏迷时间：入院前<input type="text">天<input type="text">小时<input type="text">分钟  入院后<input type="text">天<input type="text">小时<input type="text">分钟</p>                            
                            </li>
                        </ul>
                        <ul class="content_page2_ul_two">
                             <li v-if="!fyjs.length>0">
                            <!-- <li> -->
                                <p>住院费用（元）总费用<input type="text"> （自付金额：<input type="text">）</p>
                                <p>1.综合医疗服务费：（1）一般医疗服务费<input type="text">（2）一般治疗操作费：<input type="text">(3) 护理费:<input type="text"></p>
                                <p> （4）其他费用：<input type="text"></p>
                                <p>2.诊断类：（5）病理诊断费:<input type="text"> （6）实验室诊断费:<input type="text">（7）影像学诊断费:<input type="text"></p>
                                <p> （5）临床诊断项目费:<input type="text"></p>
                                <p>3.治疗类：（9）非手术治疗项目费:<input type="text"></p>
                                <p> （10）手术治疗费:<input type="text">（麻醉费:<input type="text">手术费:<input type="text">）</p>
                                <p>4.康复类：（11）康复费:<input type="text"></p>
                                <p>5.中医类：（12）中医治疗费:<input type="text"></p>
                                <p>6.西药类：（13）西药费:<input type="text">（抗菌药物费用：<input type="text">）</p>
                                <p>7.中药类：（14）中成药费:<input type="text">（15）中草药费:<input type="text"></p>
                                <p>8.血液和血液制品类：（16）血费:<input type="text">（17）白蛋白类制品费:<input type="text">（18）球蛋白类制品费:<input type="text"></p>
                                <p> （19）凝血因子类制品费:<input type="text">（20）细胞因子类制品费:<input type="text"></p>
                                <p>9.耗材类：（21）检查用一次性医用材料费:<input type="text">（22）治疗用一次性医用材料费:<input type="text"></p>
                                <p> （23）手术用一次性医用材料费:<input type="text"></p>
                                <p>10.其他类：（24）其他费:<input type="text"></p>                       
                            </li>
                            <li v-for="(item,index) in fyjs" :key="index">
                            <!-- <li> -->
                                <p>住院费用（元）总费用<input type="text" v-model="item.DE07_00_010_00"> （自付金额：<input type="text" v-model="item.DE07_00_001_00">）</p>
                                <p>1.综合医疗服务费：（1）一般医疗服务费<input type="text">（2）一般治疗操作费：<input type="text">(3) 护理费:<input type="text"></p>
                                <p> （4）其他费用：<input type="text"></p>
                                <p>2.诊断类：（5）病理诊断费:<input type="text"> （6）实验室诊断费:<input type="text">（7）影像学诊断费:<input type="text"></p>
                                <p> （5）临床诊断项目费:<input type="text"></p>
                                <p>3.治疗类：（9）非手术治疗项目费:<input type="text"></p>
                                <p> （10）手术治疗费:<input type="text">（麻醉费:<input type="text">手术费:<input type="text">）</p>
                                <p>4.康复类：（11）康复费:<input type="text"></p>
                                <p>5.中医类：（12）中医治疗费:<input type="text"></p>
                                <p>6.西药类：（13）西药费:<input type="text">（抗菌药物费用：<input type="text">）</p>
                                <p>7.中药类：（14）中成药费:<input type="text">（15）中草药费:<input type="text"></p>
                                <p>8.血液和血液制品类：（16）血费:<input type="text">（17）白蛋白类制品费:<input type="text">（18）球蛋白类制品费:<input type="text"></p>
                                <p> （19）凝血因子类制品费:<input type="text">（20）细胞因子类制品费:<input type="text"></p>
                                <p>9.耗材类：（21）检查用一次性医用材料费:<input type="text">（22）治疗用一次性医用材料费:<input type="text"></p>
                                <p> （23）手术用一次性医用材料费:<input type="text"></p>
                                <p>10.其他类：（24）其他费:<input type="text"></p>                       
                            </li>
                        </ul>
                        <div class="content_page2_ul_three"></div>
                        <p>说明：（一）医疗付费方式 
                           1.城镇职工基本医疗保险 2.城镇居民基本医疗保险 3.新型农村合作医疗 4.贫困救助 5.商业医疗保险 6.全工费 7.全自费 8.其他社会保险 9.其他
                        </p>
                        <p>（二）凡可由医院信息系统提供住院费用清单的，住院病案首页中可不填写"住院费用"。</p>
   
                    </div>
                </div>
            </div>
        </div>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'inHospitalIndex',
  data() {
    return {
      dialogVisible: false,
      detail: {},
      tabsData: [],
      zdjl:[],
      ssjl:[],
      fyjl:[],
      fyjs:[] // 费用结算
    }
  },
  props: ["tabData","elTabsData"],
  created() {
    setTimeout(() => {
      this.tabsData = this.elTabsData.zybasy
    }, 300);
  },
  mounted() {
    const tabsData = this.tabsData
    this.tabsData = tabsData
  },
  methods: {
    changeDialogVisible(item) {
      this.dialogVisible = true;
      if(item){
          this.detail = item;
      }
    },
    getData(){
        let req = {
          serviceName: "DI_HAI_DIAREC_INFO_MR_select", //首页诊断记录
          condition: [
            {
              colName: "BUSINESS_ID",
              ruleType: "eq",
              value: data.BUSINESS_ID
            }
          ]
        };
        let url = this.getServiceUrl("select", req.serviceName, "emr");
         axios({
          method: "POST",
          url: url,
          data: req,
          headers: { bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket") }
        }).then(res=>{
            this.zdjl = res.data.data
        }).catch(err=>{

        })
        req.serviceName = "DI_HAI_OPEREC_INFO_MR_select" // 首页手术记录
        url = this.getServiceUrl("select", req.serviceName, "emr");
         axios({
          method: "POST",
          url: url,
          data: req,
          headers: { bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket") }
        }).then(res=>{
            this.ssjl = res.data.data
        }).catch(err=>{

        })
        req.serviceName = "DI_HAI_EXPSET_INFO_MR_select" // 首页费用结算
         url = this.getServiceUrl("select", req.serviceName, "emr");
         axios({
          method: "POST",
          url: url,
          data: req,
          headers: { bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket") }
        }).then(res=>{
            this.fyjs = res.data.data
        }).catch(err=>{

        })
    }
  },
}
</script>

<style lang="scss" scoped>
*{
  padding: 0;
  margin: 0;
}
.handle{
    cursor: pointer;
    color: blue;
}
ul, ol { list-style: none; }
.tab_content {
  width: 100%;
  height: 100%;
  .tab_content_title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .tab_content_main {
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
        &.handle{
            cursor: pointer;
            color: blue;
        }
      }
    }
  }
}
.zybasy_wrap{
  margin:0 auto;
//   border:1px solid #333;
.header{
    // width: 80%;
    border-bottom: none;
    margin:30px auto 0;
}
.operation_note{
  width: 100%;
  display: flex;
  flex-direction: column;
  .tr{
    display: flex;
    .td{
      flex:1;
      border-bottom: none;
      border: 1px solid #333;
      min-height: 30px;
      line-height: 30px;
      border-top: none;
      border-left: none;
      text-align: center;
      &:last-child{
        border-right: none;
      }
    }
    .td_little{
      border-bottom: none;
    }
  }
}
.header_top{
    width: 60%;
    overflow: hidden;
    margin:0 auto;
    line-height: 50px;
    display: flex;

}

.header_top span{
    display: inline-block;
    line-height: 20px;
    min-width: 100px;
    padding: 0 25px;
    border-bottom: 1px solid black;
}
.header_top p:nth-of-type(2){
    margin: 0 0 0 1%;
}
.code{
    float: right;
    text-align: center;
    margin-left: 5%;
}

.code span{
    width: 100px;
    height: 50px;
    line-height: 50px;
    border: 1px solid black;
}
.header_title{
    overflow: hidden;
}
.header_title p{
    float: left;
}
.header_title p:last-child{
    margin-left: 25%;
    font-size: 22px;
    font-weight: 700;
}
.header_title span:nth-last-of-type(1){
    display: inline-block;
    border: 1px solid black;
    padding: 0px 5px;
}

.content{
    // width: 80%;
    margin: 0 auto;
    padding-bottom: 20px;
}
.content_top{
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    margin: 15px 0 10px 0;
}
.content_top p{
    float: left;
    margin-left: 19%;
}
.content_top p:first-child{
    margin: 0;
}
.content_center{
    border: 1px solid black;
    width: 100%;
    font-size: 14px;
}
.content_center ul{
    overflow: hidden;
    list-style: none;
    // margin-top: 15px;
    border: 1px solid black;
}
.content_ul li{
    margin: 5px 0 5px 5px;
    float: left;
}
.content_ul li span{
    display: inline-block;
    padding: 0 15px;
    border-bottom: 1px solid black;
}
/* .content_ul li:nth-child(2) span:nth-of-type(1){
    padding: 0 5px;
    border: 1px solid black;
    margin: 0 10px;
} */
.first:nth-child(1) span:nth-of-type(2){
    padding: 0 5px;
    border: 1px solid black;
    margin: 0 10px;
}
.first{
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    &.first_line {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        li{
                width: 176px;
                display: flex;
                flex-direction: row;
            span{

            }
        }
    }
    &.first_3{
        .row_2{
            width:40%;
            display: flex;
            .label_text{
                
                min-width:64px; 
            }
            span.text_line{
                min-width: 48px;
                max-width: 256px;
            }
            .append_text{
                
            }
        }
        .row_3{
            width:40%;
            display: flex;
            .label_text{
                min-width:64px; 
                text-align: justify;
                text-justify:distribute-all-lines;
                text-align-last:justify;
            }
            span.text_line{
                min-width: 48px;
                max-width: 256px;
                width: calc(100% - 48px);
            }
        }
        .row_seven{
            .label_text{
                min-width: 112px;
            }
        }
        .row_last_3{
            width:40%;
            display: flex;
            .label_text{
                min-width:64px; 
                text-align: justify;
                text-justify:distribute-all-lines;
                text-align-last:justify;
            }
            span.text_line{
                min-width: 48px;
                max-width: 288px;
                width: calc(100% - 48px);
            }
        }
        .row_1{
            display: flex;
            width:20%;
            .label_text{
                text-align: justify;
                text-justify:distribute-all-lines;
                text-align-last:justify;
                min-width:48px; 
            }
            span.text_line{
                min-width: 64px;
                width: calc(100% - 64px);
                max-width: 96px
            }
        }
        span{
            min-width:48px;
        }
    }
    &.first_df_3{
        .row{
            width: 32%;
            display: flex;
            .label_text{
                text-align: justify;
                text-justify:distribute-all-lines;
                text-align-last:justify;
                min-width: 64px;
            }
            .text_line{
                min-width: 64px;
                width: calc(100% - 96px);
                max-width: 192px;
            }
        }
    }
    &.first_df_2{
        .row_3{
            width: 80%;
            display: flex;
        .label_text{
            text-align: justify;
                text-justify:distribute-all-lines;
                text-align-last:justify;
            min-width: 48px;
        }
        .text_line{
            min-width: 64px;
            width: calc(100% - 96px);
            max-width: 640px;
        }
    }
    .row_1{
        width: 20%;
        display: flex;
        .label_text{
            text-align: justify;
            text-justify:distribute-all-lines;
            text-align-last:justify;
            min-width: 48px;
        }
        .text_line{
            min-width: 64px;
            width: calc(100% - 96px);
            max-width: 96px;
        }
    }
    }
    &.first_end_2{
        .row_3{
            width: 75%;
            display: flex;
            .label_text{
            text-align: justify;
            text-justify:distribute-all-lines;
            text-align-last:justify;
            min-width: 90px;
        }
        .text_line{
            min-width: 64px;
            width: calc(100% - 96px);
            max-width:640px;
        }
        }
        .row_1{
            width: 25%;
            display: flex;
            .label_text{
            text-align: justify;
            text-justify:distribute-all-lines;
            text-align-last:justify;
            min-width: 48px;
        }
        .text_line{
            min-width: 64px;
            width: calc(100% - 96px);
            max-width: 160px;
        }
        }
        
    }
    &.first_5{
        .row_1{
            display: flex;
            width: 18%;
            .label_text{
                text-align: justify;
                text-justify:distribute-all-lines;
                text-align-last:justify;
                min-width:48px; 

            }
            span.text_line{
                min-width: 64px;
                max-width: 96px;
            }
        }
        .row_1_5{
            width: 28%;
            display: flex;
            .label_text{
                text-align: justify;
                text-justify:distribute-all-lines;
                text-align-last:justify;
                min-width:32px; 
                max-width:64px; 


            }
            span.text_line{
                min-width: 96px;
                max-width: 96px;
            }
        }
        
    }
    &.first_t_3{
        .row_1{
            width: 33%;
            display: flex;
            .label_text{
                text-align: justify;
                text-justify:distribute-all-lines;
                text-align-last:justify;
                min-width:32px; 
            }
            span.text_line{
                flex:2;
                min-width: 32px;
                width: calc(100% - 64px);
                max-width: 152px;
            }
        }
    }
    &.first_4{
        .row_1{
            width: 25%;
            display: flex;
            .label_text{
                text-align: justify;
                text-justify:distribute-all-lines;
                text-align-last:justify;
                min-width:90px; 
            }
            
            span.text_line{
                
                min-width: 32px;
                width: calc(100% -128px);
                max-width: 96px;
            }
        }
        .phone{
            width: 25%;
            display: flex;
                .label_text{
                text-align: justify;
                text-justify:distribute-all-lines;
                text-align-last:justify;
                min-width:48px; 
            }
            span.text_line{
                
                min-width: 96px;
                width: calc(100% - 128px);
                max-width: 96px;
            }
            }
        .row_2{
            width: 50%;
            display: flex;
            .label_text{
                text-align: justify;
                text-justify:distribute-all-lines;
                text-align-last:justify;
                min-width:64px; 
                text-align: center;

            }
            span.text_line{
                min-width: 32px;
                width: calc(100% - 64px);
                max-width: 272px;
            }
        }

    }
}
// .first:nth-child(4) li:nth-child(1){
//     width: 45%;
// } 
// .first:nth-child(4) li:nth-child(1) span{
//     width: 75%;
// } 
// .first:nth-child(5) li:nth-child(1){
//     width: 60%;
// } 
// .first:nth-child(5) li:nth-child(2){
//     margin-left: -10%;
// }
// .first:nth-child(5) li:nth-child(1) span{
//     width: 75%;
// } 
// .first:nth-child(6) li:nth-child(1){
//     width: 70%;
// } 
// .first:nth-child(6) li:nth-child(2){
//     margin-right: 10%;
// }
// .first:nth-child(6) li:nth-child(1) span{
//     width: 80%;
// } 
// .first:nth-child(7) li:nth-child(1){
//     width: 50%;
// } 
// .first:nth-child(7) li:nth-child(1) span{
//     width: 67%;
// } 
// .first:nth-child(8) li:nth-child(2){
//     margin-left: -12%;
// }
// .first:nth-child(8) li:nth-child(3){
//     width: 28%;
//     margin-left: -10%;
// }
// .first:nth-child(8) li:nth-child(3) span{
//     width: 74%;
// }

.end li{
    float: none;
}
.end li span{
    padding: 0 5px;
    border: 1px solid black;
    margin: 0 10px;
}

.content_bot{
    width: 100%;
}
.content_b_title_ul{
    overflow: hidden;
}
.content_b_title_ul li{
    
    overflow: hidden;
}
.content_b_title_ul li p{
    float: left;
}

.content_b_title_ul li:nth-child(1) p{
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    /* padding: 0 5px; */
    width: 10%;
    box-sizing: border-box;
    text-align: center;
}

.content_b_title_ul li:nth-child(1) p:nth-child(1){
    width: 80%;
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    box-sizing: border-box;
    /* border-left: none; */
}
.content_b_title_ul li:nth-child(1) p:last-child{
    border-right: none;
}
.zd p{
    border-bottom: 1px solid black;
    width: 10%;
    box-sizing: border-box;
    text-align: center;
    border-right: 1px solid black;
    min-height: 20px;
}
.zd p:nth-child(1){
    width: 80%;
    text-align: left;
    text-indent: 5px;
}
.zd p:nth-last-child(1){
    border-right: none;
}
.zd:last-child p{
    border-bottom: none;
}
.content_b_title_bot_ul,.content_b_title_ul{
    margin-top: 0!important;
    border-top: none!important;
}
.content_b_title_bot_ul li{
    display: flex;
    display: -webkit-flex;
    display: -moz-flex;
    border-bottom: 1px solid black;
}
.content_b_title_bot_ul li p{
    padding: 5px 0;
}
.content_b_title_bot_ul li:nth-child(2) p:nth-child(1){
    border-right: 1px solid black;
    padding: 5px 5px;
}
.content_b_title_bot_ul li:nth-child(2) p:nth-child(1){
    border-right: 1px solid black;
    padding: 5px 5px;
}
.content_b_title_bot_ul li:nth-child(2) p:nth-child(2){
    width: 50%;
    margin-left: 1%;
}
.content_b_title_bot_ul li:nth-child(3) p:nth-child(1){
    border-right: 1px solid black;
    padding: 5px 5px;
}
.content_b_title_bot_ul li:nth-child(3) p:nth-child(1){
    border-right: 1px solid black;
    padding: 5px 5px;
}
.content_b_title_bot_ul li:nth-child(3) p:nth-child(2){
    width: 58%;
    margin-left: 1%;
}
.content_b_title_bot_ul li:nth-child(4) p:nth-child(1){
    margin-left: 66%;
}
.chose p:nth-child(1) span{
    display: inline-block;
    padding: 0 5px;
    border: 1px solid black;
    margin: 0 5px;
}
.chose p{
    width: 33%;
    border-right: 1px solid black;
}
.chose p:last-child{
    
    border-right:none;
}
.chose p:nth-child(2){
    margin: 0 5%;
}
.blood p span{
    display: inline-block;
    padding: 0 5px;
    border: 1px solid black;
    margin: 0 5px;
}
.blood p:last-child{
    margin-left: 5%;
}
.people p{
    width: 25%;
    
}
.people p span{
    width: 20%;
    padding: 0 20px;
    border-bottom: 1px solid black;
}
.people:last-child p:nth-child(1) span{
    padding: 0 5px;
    margin:0 5%;
    border: 1px solid black;
}
.people:last-child{
    border-bottom: none;
}
.content_b_title_bot_ul li p:nth-child(1){
    margin-left: 5px;
}
/* page2 */
.content_page2_ul {
    margin-top: 0!important;
    border-top: none!important;
    border-bottom: 1px solid black;
}
.content_page2_ul p{
    display: inline-block;
}
.content_page2_list4 {
    width: 20%;
    display: inline-block;
    margin-top: 0!important;
    border: none!important;
}
.content_page2-ul_li {
    display: flex;
    align-items: center;
}
.content_page2-ul_li>p {
    width: 10%;
}
.content_page2_list4 {
    width: 20%;
}
.content_page2_ul_two{
    height: auto;
}
.content_page2_ul_two>li>p>input {
    outline: none;
    width: 95px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid black;
}
.content_page2_ul_two>li>p{
    margin-bottom: 5px;
    margin-top: 3px;
}
.content_list_one>p {
    height: 30px;
    line-height: 30px;
    /* margin-top: 7px;
    margin-bottom: 10px; */
    border-bottom: 1px solid black;
}
.content_list_one>p>span {
    border: 1px solid black;
    width: 20px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    text-align: center;
}
.content_list_one>p>input {
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
    border-top: none!important; 
    margin-bottom: -10px;
    border-bottom: none!important; 
}
.content_page2_ul_two {
    border-bottom: none;
    // margin-top: 100px;
}
.content_page2_ul_one {
    // margin-top: -3px!important;
    border-top: none!important; 
    border-bottom: none!important;
}
.content_page2_ul_two {
    // margin-top: -3px!important;
    border-top: none!important;
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
}
</style>