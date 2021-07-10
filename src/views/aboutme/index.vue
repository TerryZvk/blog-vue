<!-- 关于我 -->
<template>
  <div class="aboutmeBox">
    <div class="tcommonBox">
      <div class="aboutme-title">
            关于我
      </div>
      <section class="aboutme-content">
        <p class="">
          <img src="https://avatars.githubusercontent.com/u/14146921?s=400&u=9fe4713ef4c18d1e417728be6809d0936f3b3aad&v=4" alt="" class="aboutmeImg">
        </p>
        <p class="aboutme-description">
          欢迎来到terryzvk.top！我是Terry
        </p>
      </section>
    </div>
    <Message />
  </div>
</template>

<script>
import Message from './../../components/message/index'
export default {
  data () { //选项 / 数据
    return {

    }
  },
  methods: { //事件处理器

  },
  components: { //定义组件
    Message
  },
  created () { //生命周期函数

  }
}
</script>

<style scoped lang="less">
.aboutmeBox{
  .aboutme-title{
    font-size: 25px;
    font-weight: 700;
    text-align: center;
    padding: 30px 0;
  }
  .aboutmeImg {
    max-width: 100%;
    /*height:300px;*/
  }
  .aboutme-description{
    font-size: 15px;
    line-height: 25px;
    padding: 10px 30px;
  }
}


</style>
