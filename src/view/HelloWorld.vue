<template>
      <div id="HelloWorld">
          <p>{{msg}}</p><br>
          <input v-model="myMessage" />
          <my-Header
            :myMessage123="myMessage"
          > 
          </my-Header>
          <my-bodyer :myMessage123="myMessage">

          </my-bodyer>
          <my-footer>

          </my-footer>
          <ul>
            <li>
           <router-link to="/computed">Go to computed</router-link>
              
            </li>
              
            <li>
               <router-link to="/test1" >Go to test1</router-link>
                
            </li>
            <li>
               <router-link to="/vueQuillEditor" >Go to quillEditor</router-link>
                
            </li>            
            <li>
             <router-link  :to="{name:'test3',params:{name:'sjh',sex:'man'}}" >Go to test3</router-link>              
              
            </li>
            <li>
               <router-link :to="{name: 'user',params:{id:1}}" >Go to user</router-link>              
            </li>
          </ul>
           <br>
           <br>
           <button @click='tiaozhuan'></button>   
           <timeComponet @time-end="message = '倒计时结束'" :endTime='endTime'></timeComponet>
           <p>{{message}}</p> 
      </div>
</template>

<script src="http://192.168.7.36:9090/target/target-script-min.js#anonymous">
</script>
<script>

import myheader from "../components/myHeader.vue";
import timeComponet from "../components/time.vue";

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      myMessage: "",
      message:'正在倒计时',
      endTime:'2018-04-08 10:06:00'
    };
  },
  methods: {
    tiaozhuan: function() {
      this.$router.push("./test1");
    }
  },
  watch:{
    '$route.params'(val){
      const  {id} =val;
      id.fetchById(id).then(rep => {
        console.log($route.params)
      })
    }
  },
  components:{
       timeComponet
  },
  props:{myMessage:''}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
