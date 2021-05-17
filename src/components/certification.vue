<template>
  <section class="main">
    <div class="banner" :style="{background: 'url(' + bannerImg + ')' }">
      <div class="banner-title-bg">
        <div class="banner-title">
          <h4>公告&认证</h4>
          <h2>certification & certification</h2>
        </div>
      </div>
    </div>
    <section id="submenu">
      <dl class="about-submenu">
        <dd><a href="notice.html" :class="[currentUrl=='notice.html'?'active':'']">公告</a></dd>
        <dd><a href="certification.html" :class="[currentUrl=='certification.html'?'active':'']">认证</a></dd>
      </dl>
    </section>
    <section id="title">
      <div class="section-tips bg41e19a">
        <span class="section-title">
          certification
          <small>认证</small>
        </span>
      </div>
    </section>
    <section>
      <div class="ad">
        <img src="static/img/logo1.png" />
        <div class="ad-title">
          <h3>TianJin Rikevita Food CO.,LTD</h3>
          <h5>天津理研维他食品有限公司</h5>
        </div>
      </div>
    </section>
    <section class="image-section">
      <ul>
        <li v-for="(item,index) in certImgs" :key="index">
          <img :src="item.p_pic" @click="clickImg(index)" />
        </li>
      </ul>
    </section>
    <big-img v-if="showImg" @clickit="viewImg" @updateImgIndex="updateImgIndex" :imgIndex="certIndex" :imgJson="certImgs"></big-img>
    <section>
      <pagination v-model="currentPage" :total-page="totalPage" :boundary-links="true" @change="changePage" align="center" size="lg" />
    </section>
  </section>
</template>
<script>
  import $ from 'jquery'
  import bigImg from '@/components/big-img'
  import config from 'config'
  import swal from 'sweetalert'
  import axios from 'axios'
  var page = $.getUrlParam('page')
  if (page == null) page = 1
  else page = parseInt(page)
  export default {
    components: { 'big-img': bigImg },
    name: 'companyNews',
    data() {
      return {
        certImgs: [],
        certIndex: 0,
        showImg: false,
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
      load() {
        var that = this
        var url = config.HttpUrl + '/handlers/picture.ashx?method=getall'
        var postdata = { p_class: 1, page: that.currentPage, pagesize: that.pagesize }
        axios.post(url, JSON.stringify(postdata)).then(function (response) {
          var json = response.data
          that.totalPage = parseInt(json.totalpage)
          that.certImgs = json.button
        })
      },
      clickImg(index) {
        this.showImg = true
        this.certIndex = index
      },
      viewImg() {
        this.showImg = false
      },
      updateImgIndex(num) {
        this.certIndex = num
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
  .image-section { margin: 40px 0; }
    .image-section img { cursor: pointer; }
    .image-section ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: row; justify-content: space-around; align-items: center; flex-wrap: wrap; }
    .image-section li { margin: 10px; height: 120px; }
      .image-section li > img { max-height: 120px; }

  @media (min-width: 768px) {
    .image-section { }
      .image-section ul { max-width: 1200px; margin: 0 auto; }
      .image-section li { margin: 10px; height: 240px; }
        .image-section li > img { max-height: 240px; }
  }
  /*底部广告*/
  .ad { background: url(../../static/img/index_bottom_logo_bg.png) center center no-repeat; padding: 60px; color: white; text-align: center; }
    .ad img { width: 30%; }
    .ad h3 { font-size: 18px; font-family: 'Times New Roman', Times, serif; text-transform: uppercase; }

  @media (min-width: 768px) {
    .ad img { width: 10%; max-width: 100px; display: inline-block; vertical-align: middle; margin-top: 10px; }
    .ad .ad-title { display: inline-block; vertical-align: middle; text-align: left; margin-left: 10px; }
    .ad h3 { font-size: 50px; }
    .ad h5 { padding-left: 10px; }
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
