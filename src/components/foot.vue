<template>
  <section>
    <span>COPYRIGHT 2018 <i class="fas fa-copyright"></i> 天津理研维他食品有限公司</span>
    <span><a>ICP备案 05000264号</a></span>

    <span>技术支持：德林瑞泰科技开发有限公司</span>

  </section>
</template>
<script>
  export default {
    name: 'foot',
    data() {
      return {

      }
    }
  }
</script>
<style scoped>
  section a { color: white; }
    section a:hover { color: white; }
  section { padding: 10px; background-color: #34a66a; text-align: center; color: white; }
  span { display: block; }

  @media (min-width: 768px) {
    section { padding: 30px; }
    span { display: inline; }
  }
</style>
