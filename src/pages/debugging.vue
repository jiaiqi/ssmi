<template>
    <div class="home">
        <div class="home_content">
            <div class="box_one">
                <span>一 . 选择服务应用: </span>
                <select v-model="data_change" @change="ad">
                    <option v-for="item in app_name" :key=item.id  :value='item.app_name'>{{item.app_name}}</option>
                </select>
            </div>
            <div class="box_two">
                <span>二 . 选择接口列表: </span>
                <el-select v-model="value8" filterable placeholder="请选择" style="width:500px;">
                    <el-option
                    v-for="item in app_no"
                    :key="item.id"
                    :label="item.service_view_name"
                    :value="item.service_view_name"
                    >
                    </el-option>
                </el-select>
                <span class="box_two_method">方法：GET</span>
            </div>
            <div class="box_three">
                <p>三. 参数列表</p>
                <p class="box_pone">接口参数：</p>
                <textarea cols="130" rows="25" v-model="data_one"></textarea>
                <p class="box_threep">调用接口的数据json包</p>
                <div class="box_three_foot1">
                    <span class="box_three_foot_span">*</span>
                    <span>appid:</span>
                    <input type="text">
                    <p class="box_three_foot_p">填写appid</p>
                    <p class="box_three_foot_p2">校验通过</p>
                </div>
                <div class="box_three_foot2">
                    <span class="box_three_foot_span">*</span>
                    <span>secret:</span>
                    <input type="text">
                    <p class="box_three_foot_p">填写appsecret</p>
                    <p class="box_three_foot_p2">校验通过</p>
                </div>
                <input @click="debuggs" type="submit" value="在线调试"/>
            </div>
            <div class="box_four" v-if="show">
                <div class="box_four_a">
                    <span>{{this.data_change}}</span>
                    <span>:</span>
                    <span>{{this.value8}}</span>
                </div>
                <div class="box_four_b">
                    <span>请求地址：</span>
                    <span>'http://192.168.0.192:8101/{{this.api}}/select/srvsys_service_select'</span>
                </div>
                <div class="box_four_c">
                    <p>返回结果：</p>
                    <textarea cols="100" rows="25"></textarea>                                    
                </div>
                <div class="box_four_d">
                    <span>提示 : </span>
                    <span class="box_four_d_color">111</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            //elementui组件
            value8: '应用分类查询',
            app_no:[],
            app_name:[],
            data_change:'配置中心',
            api:'',
            show:false,
            data_one:''
        };
    },  
    methods: {       
        getData_one() { 
            //选择服务应用  
            let req = {
                colNames: ["*"],             
                condition: [],
                order: [],
                page: {pageNo: 1, rownumber: 10},               
                serviceName: "srvconfig_app_list_select"
            }        
            axios.post(
                'http://192.168.0.192:8101/config/select/srvconfig_app_list_select',req, 
                { headers: { bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket") } }
            ).then(res => {
                this.app_name = res.data.data
                this.data_change = this.app_name[4].app_name
                this.api = this.app_name[4].app_no
                // console.log('qwe',this.api)
            }).catch(err => {
                // console.log(err)
            })
        },
        getData_sec(){
            let req2 = {
                "serviceName": "srvsys_service_select",
                "colNames": [
                    "*"
                ],
                "condition": [
                    {
                        "colName": "permission_type",
                        "ruleType": "ne",
                        "value": "内部访问"
                    },
                    {
                        "colName": "is_leaf",
                        "ruleType": "eq",
                        "value": "是"
                    }
                ],
                "page": {
                },
                "order": []
            }        
            axios.post(
                'http://192.168.0.192:8101/'+ this.api +'/select/srvsys_service_select',req2, 
                { headers: { bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket") } }
            ).then(res => {
                this.app_no = res.data.data
                this.value8 = res.data.data[0].service_view_name
                // console.log(res.data.data)
            }).catch(err => {
                // console.log(err)
            })
        },

        getData_three() { 
            let req3 = this.data_one   
            axios.post(
                'http://192.168.0.192:8101/zjr/operate/srvonline_interface_deubg',req3, 
                { headers: { bx_auth_ticket: sessionStorage.getItem("bx_auth_ticket") } }
            ).then(res => {
                console.log(res.data.data)
            }).catch(err => {
                console.log(err)
            })
        },
        ad(){
            // console.log(this.data_change)
            this.app_name.forEach(item=>{
                if(this.data_change === item.app_name){
                    this.api = item.app_no
                }
            })
            this.getData_sec()                     
        },
        debuggs(){
            this.show = !this.show;
            this.getData_three()
        }          
    },
    mounted(){
        this.getData_one()
        setTimeout(()=>{
        this.getData_sec()
        },1000)
        // console.log('asd',this.data_change)
    }   
}
</script>
<style scoped>

.box_four {
    width: 100%;
    margin-top: 50px;
}
.box_four>.box_four_a {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-weight: bolder;    
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
}
.box_four>.box_four_b {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
}
.box_four_c> textarea {
    margin-left: 155px;
    margin-top: -16px;
}
.box_four_c {
    border-bottom: 1px solid #ccc;
}
.box_four_d_color {
    color: red;
}
.box_four_d {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
}


* {
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;
}
.home {
    width: 100%;
}
.home_content {
    width: 96%;
    margin: 0 auto;
}
.box_one {
    margin-top: 20px;
}
.box_one,.box_two {
    width: 100%;
    height: 100px;
}
.box_one>select {
    width: 150px;
    height: 20px;
    margin-left: 50px;
}
.box_two>select {
    width: 300px;
    margin-left: 50px;
}
.box_two_method {
    margin-left: 20px;
    opacity: 0.5; 
}
.box_three > textarea {
    margin-left: 180px;
}
.box_pone {
    margin-top: 10px;
}
.box_threep {
    margin-left: 180px;
    opacity: 0.5;
}
.box_three_foot_span {
    color: red;
}
.box_three_foot2>input {
    margin-left: 108px;
}
.box_three_foot1>input {
    margin-left: 111px;
}
.box_three_foot1>p,.box_three_foot2>p {
    margin-left: 173px;
}
.box_three_foot_p {
    opacity: 0.5;
    margin-top: 5px;
}
.box_three_foot_p2 {
    color:darkgreen;
}
.box_three_foot1 {
    margin-top:20px;
}
.box_three>input {
    margin-left: 173px;
    margin-top: 30px;
    background-color: lightgreen;
    width: 120px;
    height: 30px;
    font-size: 16px;
} 
.box_three_foot2 {
    margin-top: 30px;
}
.el-select {
    width: 400px;
    margin-left: 50px;
}      
el-select>el-option {
    height: 20px;
} 

</style>