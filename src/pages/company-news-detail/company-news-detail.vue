<template>
  <div id="app">
    <app-top @setCurrentBanner="setCurrentBanner" />
    <aboutusInfo :banner-img="banner" />
    <app-foot />
  </div>
</template>
<script>
  import Head from '@/components/Head'
  import foot from '@/components/foot'
  import aboutusInfo from '@/components/company-news-detail'
  export default {
    name: 'app',
    components: {
      'app-top': Head,
      'app-foot': foot,
      'aboutusInfo': aboutusInfo
    },
    data() {
      return {
        banner: ''
      }
    },
    methods: {
      setCurrentBanner(img) {
        this.banner = img
      }
    }
  }
</script>

