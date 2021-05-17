<template>
  <section class="main">
    <section class="news-nav-bg">
      <ol class="breadcrumb news-nav">
        <li><a href="index.html">天津理研维他食品</a></li>
        <li><a href="company-news.html">企业新闻</a></li>
      </ol>
    </section>

    <section class="news-detail">
      <h3>
        {{item.ns_title}}
      </h3>
      <hr />
      <i class="news-date">
        <span class="ns-year">{{getYear(item.ns_date)}}</span>
        <span class="ns-line"></span>
        <span class="ns-day">{{getDay(item.ns_date)}}</span>
      </i>
      <div class="ns_content" v-html="item.ns_content">
      </div>
      <div class="clear"></div>
    </section>

  </section>
</template>
<script>
  import $ from 'jquery'
  import config from 'config'
  import swal from 'sweetalert'
  import axios from 'axios'
  var id = $.getint($.getUrlParam('id'))
  if (id == null) id = 0
  export default {
    name: 'companyNews',
    data() {
      return {
        item: {}
      }
    },
    methods: {
      load() {
        var that = this
        var url = config.HttpUrl + '/handlers/news.ashx?method=get'
        axios.post(url, String(id)).then(function (response) {
          var json = response.data
          that.item = json
        })
      },
      getYear(dateObject) {
        if (dateObject != null) {
          if (dateObject.indexOf('T') === -1)
            dateObject = dateObject.replace(/-/g, '/')
          var d = new Date(dateObject)
          var day = d.getDate()
          var month = d.getMonth() + 1
          var year = d.getFullYear()
          if (day < 10) {
            day = '0' + day
          }
          if (month < 10) {
            month = '0' + month
          }
          var date = year + '/' + month
          return date
        }
      },
      getDay(dateObject) {
        if (dateObject != null) {
          if (dateObject.indexOf('T') === -1)
            dateObject = dateObject.replace(/-/g, '/')
          var d = new Date(dateObject)
          var day = d.getDate()
          var month = d.getMonth() + 1
          var year = d.getFullYear()
          if (day < 10) {
            day = '0' + day
          }
          if (month < 10) {
            month = '0' + month
          }
          var date = day
          return date
        }
      }
    },
    created() {
      this.load()
    }
  }
</script>
<style scoped>
  .news-nav-bg { padding: 10px 20px; background-color: #41ac74; }
  .news-nav { background: none !important; box-sizing: border-box; margin: 0 auto; }
    .news-nav li a, .news-nav .active { color: #fff !important; }
  .news-date { width: 80px; height: 80px; text-align: center; display: flex; flex-direction: column; align-content: center; justify-content: center; font-style: normal; font-size: 16px; padding: 4px 10px; color: white; border-radius: 4px; background: -webkit-linear-gradient(15deg, #3bb677 35%, #41ac74); background: -moz-linear-gradient(15deg, #3bb677 35%, #41ac74); background: -o-linear-gradient(15deg, #3bb677 35%, #41ac74); background: -ms-linear-gradient(15deg, #3bb677 35%, #41ac74); background: linear-gradient(15deg, #3bb677 35%, #41ac74); box-sizing: border-box; margin: 20px; float: left; }
  .ns-day:before { content: '' }
  .ns-day { font-size: 30px; margin-top: -5px; }
  .ns-line { border-bottom: 1px solid #fff; }

  .news-detail { width: 90%; margin: 0 auto; }
    .news-detail h3 { text-align: center; }

  @media (min-width: 768px) {
    .news-nav { max-width: 940px; }
    .news-detail { max-width: 940px; }
  }
</style>
