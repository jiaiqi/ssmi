<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>demo Datas</h2>
    <ul>
      <li v-for="(item,index) in lists" :key="index">
        <a>
          {{item.menu_name || item.role_name}}
        </a>
      </li>
      
    </ul>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Bxfront Unique Design App',
      lists:[]
    }
  },
  mounted(){
    this.getConfigPage()
  },
  methods:{
    getConfigPage(){
        let  urls = this.getServiceUrl('select','srvauth_user_role_select','auth')
        console.log('url',urls)
       let req = {"serviceName":"srvauth_user_role_select","colNames":["*"],"condition":[],"page":{"pageNo":1,"rownumber":10},"order":[]}
       this.$http.post(urls,req).then((res)=>{
         console.log(res)
         this.lists = res.data.data
       })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
