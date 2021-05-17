<template>
  <div id="app">
    <app-top />
    <router-view />
    <app-foot />
  </div>
</template>
<script>
  import Head from '@/components/Head'
  import foot from '@/components/foot'
  export default {
    name: 'App',
    components: {
      'app-top': Head,
      'app-foot': foot
    }
  }
</script>
