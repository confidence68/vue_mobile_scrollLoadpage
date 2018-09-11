<template>
  <div id="app">
      <my-scroll class="scrolls" ref="myScroll" :on-pull="getList" :loaded="loaded" :scroll-state="scrollState">
          <div slot="scrollList">
            <div class="list" v-for="(item,index) in listData" :key="index">{{item.name}}</div>
          </div>
      </my-scroll>
  </div>
</template>
<script>
import myScroll from "./components/vue-scroll.vue";
import axios from 'axios'
export default {
  name: "app",
  data(){
    return{
      scrollState: true, // 是否可以滑动
      loaded: false,
      iPage: 1,
      listData:[],
      iPageSize: 10,
    }
  },
  methods: {
    getList(){
       this.$refs.myScroll.setState(1)
       let _this = this
       // ajax 请求
        axios.get('https://easy-mock.com/mock/5b90f971ce624c454133ee2d/scoll/datalist').then(function (response) {
            if (response.data.code == 200 && response.data.data.pagelist.length > 0 && !_this.loaded) {
              if (_this.iPage == 1) {
                _this.listData = response.data.data.pagelist
              } else {
                _this.listData.push(...response.data.data.pagelist)
              }
              _this.iPage++
              _this.$refs.myScroll.setState(2)
            } else {
              if (_this.iPage == 1) {
                _this.czListData = []
              }
              _this.loaded = true
              _this.$refs.myScroll.setState(3)
            }   
          })
          .catch(function (error) {
            console.log(error);
          });
        }
    
  },
  mounted () {
    this.getList()  
  },
  components: {
    myScroll
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.scrolls{
  font-size:.24rem;
}
.list{
  height:.9rem;
  line-height: .9rem;
  margin-bottom:.1rem;
  border-bottom:1px solid #dedede;
  color:#999;
  font-size:.28rem;
}
</style>
