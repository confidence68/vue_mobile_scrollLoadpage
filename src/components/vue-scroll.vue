<template>
	<div class="my-scroll" :class="[scrollState?'prohibit':'allow']" ref="myScroll" @scroll.passive="onScroll($event)"  @touchmove="onScroll($event)"  >
		<!-- top -->
		<div class="scroll-list">
			<slot name='scrollList'></slot>
			<div class="scroll-bottom">
				<div v-if="state==1">
					<i><img :src="Load"/></i>
					<p>加载中</p>
					</div>
				<div v-if="state==2">加载完成</div>
				<div v-if="state==3">没有数据了</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import Load from '@/assets/Load.gif'
export default {
  name: 'myScroll',
  props: {
    'onPull': { // 加载回调
      type: Function,
      require: true
    },
    'scrollState': {// 是否可滑动
      type: Boolean,
      require: true
    },
    loaded: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      Load,
      timeoutId: null,
      state: 0,
      myScroll: null
    }
  },
  methods: {
    /*
			 * 加载中：1
			 * 加载完成：2
			 * 没有更多：3
			 */
    setState(index) { // 修改状态
      this.state = index
      // console.log(this.state)
    },
    onScroll(e) {
      const _this = this
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // console.log(window.innerHeight + scrollTop, this.myScroll.offsetHeight)
      if (!this.loaded && window.innerHeight + scrollTop - 50 >= this.myScroll.offsetHeight) {
        clearTimeout(this.timeoutId)
        _this.timeoutId = setTimeout(() => {
          _this.bottomCallback()
        }, 100)
      }
    },
    bottomCallback() { // 加载回调
      // console.log('回调', new Date().getTime())
      if (this.state != 3) {
        this.state = 1
        this.onPull()
      }
    }
  },
  mounted() {
    this.myScroll = this.$refs.myScroll // 获取滑条dom
  }
}
</script>
<style lang="scss" scoped>
	.allow{
		overflow:hidden;
		height: auto;
	}
	.prohibit{
		max-width: 100%;
		max-height: 100%;
	  height: 100%;
		overflow:hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
		will-change: transform;
	  transition: all 450ms;
	  backface-visibility: hidden;
	  perspective: 1000;
	}
	.my-scroll{
	  position: relative;
		 color: #999;
	    .scroll-top{
	    	text-align: center;
	    	display:flex;
	    	position:absolute;
	    	top:0;
	    	left:0;
			  width:100%;
			  overflow: hidden;
	    }
		.scroll-list{
			overflow:hidden;
			min-height: 100%;
		}
		.scroll-bottom{
			text-align: center;
			line-height: .8rem;
	    div{
	    		display:flex;
				  height:auto;
	    		width:100%;
	    		justify-content: center;
	    		align-items:center;
	    		flex-wrap: wrap;
	    		i{
	    			flex:1 0 100%;
					display:block;
					height: 0.4rem;
	    		}
	    		img{
	    			width:0.6rem;
	    		}
				p{
					flex:1 0 100%;
				}
	    	}
		}
	}
</style>