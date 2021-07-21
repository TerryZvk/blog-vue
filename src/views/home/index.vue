<!-- 首页 -->
<template>
  <div>
    <Article />
  </div>
</template>

<script>
import Article from '@/components/article/index'
import { getArticles } from '@/api/article/index'
export default {
  name: 'Home',
  data () { //选项 / 数据
    return {

    }
  },
  methods: { //事件处理器

  },
  components: { //定义组件
    Article
  },
  created () { //生命周期函数
    getArticles().then(() => {

    })
  }
}
</script>

<style>
</style>
