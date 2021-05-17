<template>
  <section class="main">
    <div class="banner" :style="{background: 'url(' + bannerImg + ')' }">
      <div class="banner-center-top"></div>
      <div class="banner-center">
        <div class="banner-center-title bg6600CC">
          <div class="banner-center-title-bg">
            <h2>企业文化 <span>company culture</span></h2>
          </div>
        </div>
      </div>
    </div>
    <section id="submenu">
      <dl class="about-submenu">
        <dd><a href="company-news.html" :class="[currentUrl=='company-news.html'?'active':'']">企业新闻</a></dd>
        <dd><a href="company-videos.html" :class="[currentUrl=='company-videos.html'?'active':'']">企业视频</a></dd>
      </dl>
    </section>
    <section id="title">
      <div class="section-tips bg41e19a">
        <span class="section-title">
          news
          <small>企业新闻</small>
        </span>
      </div>
    </section>
    <section class="news-list">
      <ul>
        <li v-for="(item,index) in newslist" :key="index" @click="gofor(item.ns_id)">
          <i class="news-date">
            <span class="ns-year">{{getYear(item.ns_date)}}</span>
            <span class="ns-line"></span>
            <span class="ns-day">{{getDay(item.ns_date)}}</span>
          </i>
          <dl>
            <dt>{{item.ns_title}}</dt>
            <dd>{{info(item.ns_content)}}</dd>
          </dl>
          <div class="clear"></div>
        </li>
      </ul>
    </section>
    <section>
      <pagination v-model="currentPage" :total-page="totalPage" :boundary-links="true" @change="changePage" align="center" size="lg" />
    </section>
  </section>
</template>
<script>
  import $ from 'jquery'
  import config from 'config'
  import swal from 'sweetalert'
  import axios from 'axios'
  var page = $.getUrlParam('page')
  if (page == null) page = 1
  else page = parseInt(page)
  export default {
    name: 'companyNews',
    data() {
      return {
        newslist: [],
        currentUrl: '',
        totalPage: 1,
        currentPage: page,
        pagesize: 8
      }
    },
    props: ['bannerImg'],
    methods: {
      changePage: function (index) {
        //console.log('Page is change', index)
        var pathname = window.location.pathname + '?page=' + index
        location.href = pathname
      },
      info(string) {
        var str = $._filter(string)
        return $.cutString(str, 140)
      },
      load() {
        var that = this
        var url = config.HttpUrl + '/handlers/news.ashx?method=getall'
        var postdata = { category: 1, page: that.currentPage, pagesize: that.pagesize }
        axios.post(url, JSON.stringify(postdata)).then(function (response) {
          var json = response.data
          that.totalPage = $.countpage(json.totalsize, that.pagesize)
          that.newslist = json.button
        })
      },
      gofor(index) {
        location.href = 'company-news-detail.html?id=' + index
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
      var that = this
      var realurl = window.location.pathname.toLowerCase()
      var firstindex = realurl.lastIndexOf('/') + 1
      var currnetPath = realurl.substr(firstindex)
      var paramUrl = realurl.substr(firstindex) + window.location.search.toLowerCase()
      that.currentUrl = currnetPath
      that.load()
    }
  }
</script>
<style scoped>
  .news-list { min-height: 250px; }
    .news-list ul { list-style: none; margin: 0; padding: 0; }
    .news-list li { padding: 10px 20px; cursor: pointer; box-sizing: border-box; }
      .news-list li:hover { background-color: rgba(51,204,153,0.1); border-radius: 10px; }
  .news-date { display: inline-block; font-style: normal; font-size: 16px; padding: 4px 10px; color: white; border-radius: 4px; background: -webkit-linear-gradient(15deg, #3bb677 35%, #41ac74); background: -moz-linear-gradient(15deg, #3bb677 35%, #41ac74); background: -o-linear-gradient(15deg, #3bb677 35%, #41ac74); background: -ms-linear-gradient(15deg, #3bb677 35%, #41ac74); background: linear-gradient(15deg, #3bb677 35%, #41ac74); box-sizing: border-box; }

  .news-list dl { margin-left: 2px; margin-top: 2px; }

  .news-list dt { margin: 8px 0; }
  .news-list dd { color: #999; font-size: 12px; }
  .ns-day:before { content: '/' }

  @media (min-width: 768px) {
    .news-list { max-width: 1000px; width: 100%; margin: 0 auto; min-height: 400px; }
      .news-list dl { float: left; margin-top: 10px; margin-left: 10px; }
      .news-list dt { font-size: 16px; }
    .news-date { float: left; margin-top: 10px; width: 80px; height: 80px; text-align: center; display: flex; flex-direction: column; align-content: center; justify-content: center; }
    .ns-day:before { content: '' }
    .ns-day { font-size: 30px; margin-top: -5px; }
    .ns-line { border-bottom: 1px solid #fff; }
  }

  /*版块菜单设置*/
  .about-submenu { width: 80%; margin: 20px auto; padding: 0; font-size: 0; }
    .about-submenu > dd { display: inline-block; width: 50%; margin: 0; text-align: center; border: 1px solid #fff; font-size: 14px; }
      .about-submenu > dd > a { color: #333; width: 100%; height: 100%; display: block; padding: 10px; box-sizing: border-box; background-color: #ccc; cursor: pointer; }
        .about-submenu > dd > a:hover, .about-submenu > dd > a.active { color: #000; text-decoration: none; background-color: #33CC99; color: #fff; }

  @media (min-width: 768px) {
    .about-submenu { max-width: 1200px; width: 100%; }
  }
</style>
