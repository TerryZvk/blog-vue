<!-- 首页 -->
<template>
  <div>
    <Header />
    <el-row>
      <el-col :span="16" style="padding: 0 1.2rem 0 6rem;"><router-view></router-view></el-col>
      <el-col :span="8" style="padding-right: 6rem;"><Right /></el-col>
    </el-row>
    <el-row></el-row>
    
    <Footer /> 
  </div>
</template>

<script>
import Header from '@/components/head'
import Footer from '@/components/foot'
import Right from '@/components/right'
export default {
  name: 'Layout',
  data () { //选项 / 数据
    return {
    }
  },
  components: { //定义组件
    Header, Footer, Right
  }
}
</script>

<style scoped>
</style>>

