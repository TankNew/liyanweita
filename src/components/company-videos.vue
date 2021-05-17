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
          videos
          <small>企业视频</small>
        </span>
      </div>
    </section>

    <section class="video_list">
      <ul>
        <li v-for="(item,index) in videolist" :key="index">
          <dl>
            <dt>
              {{item.v_title}}
            </dt>
            <dd>
              <video :src="item.v_src" controls="controls">
                您的浏览器不支持网页视频
              </video>
            </dd>
            <dd v-html="decodeURIComponent(item.v_content)">
            </dd>
          </dl>
          <hr />
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
    name: 'companyVideos',
    data() {
      return {
        videolist: [],
        currentUrl: '',
        totalPage: 1,
        currentPage: page,
        pagesize: 8
      }
    },
    props: ['bannerImg'],
    methods: {
      changePage: function (index) {
        var pathname = window.location.pathname + '?page=' + index
        location.href = pathname
      },
      load() {
        var that = this
        var url = config.HttpUrl + '/handlers/video.ashx?method=getall'
        var postdata = { v_class: 1, page: that.currentPage, pagesize: that.pagesize }
        axios.post(url, JSON.stringify(postdata)).then(function (response) {
          var json = response.data
          that.totalPage = $.countpage(json.totalsize, that.pagesize)
          that.videolist = json.button
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
  /*视频列表页设置*/
  .video_list { width: 90%; margin: 0 auto; max-width: 320px; }
    .video_list ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; flex-wrap: wrap; }
    .video_list li { box-sizing: border-box; }
    .video_list video { width: 320px; height: 240px; margin: 0 auto; display: block; }


    .video_list dl { }
    .video_list dt { margin: 8px 0; font-size: 16px; }
    .video_list dd { color: #999; font-size: 12px; margin: 8px 0; }

  @media (min-width: 768px) {
    .video_list { width: 100%; margin: 0 auto; max-width: 1200px; }
      .video_list ul { flex-direction: row; }
      .video_list li { box-sizing: border-box; width: 320px; margin: 0 36px; }
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
