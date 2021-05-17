<template>
  <section class="main">
    <div class="banner" :style="{background: 'url(' + bannerImg + ')' }">
      <div class="banner-title-bg">
        <div class="banner-title">
          <h4>销售网络</h4>
          <h2>sales network</h2>
        </div>
      </div>
    </div>
    <section id="submenu">
      <dl class="about-submenu">
        <dd><a href="aboutus-info.html" :class="[currentUrl=='aboutus-info.html'?'active':'']">公司概述</a></dd>
        <dd><a href="https://www.rikenvitamin.jp/">集团概况</a></dd>
        <dd><a href="aboutus-organization.html" :class="[currentUrl=='aboutus-organization.html'?'active':'']">组织结构</a></dd>
        <dd><a href="aboutus-network.html" :class="[currentUrl=='aboutus-network.html'?'active':'']">销售网络</a></dd>
      </dl>
    </section>
    <section id="title">
      <div class="section-tips bg41e19a">
        <span class="section-title">
          sales network
          <small>销售网络</small>
        </span>
      </div>
    </section>
    <section class="map">
      <div class="map-bg">
        <div class="map-info" v-html="currentInfo" v-show="isShow" @click="clearPoint"></div>
        <i v-for="(item,index) in mapinfo" :key="index" :class="['btn-map',item.id,item.id==currentPoint?'active':'']" @click="pointClick(item)">
          <span class="map-point">{{item.name}}</span>
        </i>
      </div>
    </section>
  </section>
</template>
<script>
  import $ from 'jquery'
  import config from 'config'
  import swal from 'sweetalert'
  import axios from 'axios'
  export default {
    name: 'aboutusNetwork',
    data() {
      return {
        mapinfo: [],
        isShow: false,
        currentInfo: '',
        currentPoint: '',
        currentUrl: ''
      }
    },
    props: ['bannerImg'],
    methods: {
      load() {
        var that = this
        var url = config.HttpUrl + '/handlers/text.ashx?method=network'
        axios.post(url).then(function (response) {
          var json = response.data
          if (json.error === 0) {
            that.mapinfo = JSON.parse(unescape(json.content)).button
          }
        })
      },
      pointClick(item) {
        if (item.info !== '') {
          this.currentInfo = item.info
          this.isShow = true
        }
        else
          this.isShow = false
        this.currentPoint = item.id
      },
      clearPoint() {
        this.isShow = false
        this.currentInfo = ''
        this.currentPoint = ''
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
  /*销售网络地图设定*/
  .map { width: 98%; margin: 0 auto; padding-bottom: 100px; position: relative; }
  .map-bg { width: 100%; padding-bottom: 47.8%; height: 0; background: url(../../static/img/aboutus/map.jpg) center center no-repeat; background-size: 100% 100%; position: relative; }
  .btn-map { display: block; width: 12px; height: 12px; background: url(../../static/img/aboutus/btn-map-default.png) center center no-repeat; background-size: 100% 100%; position: absolute; font-style: normal; font-size: 12px; color: #666; text-shadow: #fff 1px 0 0,#fff 0 1px 0,#fff -1px 0 0,#fff 0 -1px 0; *filter: Glow(Color=#fff, Strength=1); font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif; }
    .btn-map:hover, .btn-map.active { background: url(../../static/img/aboutus/btn-map-over.png) center center no-repeat; background-size: 100% 100%; }
  .map-point { display: block; position: absolute; left: 22px; top: 45%; -webkit-transform: translateY(-50%); -moz-transform: translateY(-50%); -ms-transform: translateY(-50%); -o-transform: translateY(-50%); transform: translateY(-50%); white-space: nowrap; }
  .btn-map:hover .map-point, .btn-map.active .map-point { color: #5acc98; font-size: 20px; }
  .mg { left: 12%; top: 24%; }
  .dg { left: 45%; top: 19%; }
  .sh { left: 78%; top: 32%; }
    .sh .map-point { left: unset; right: 22px; }
  .rb { left: 86%; top: 27%; }
  .tj { left: 79%; top: 25%; }
    .tj .map-point { left: unset; right: 22px; }
  .tw { left: 82%; top: 40%; }
  .xjp { left: 77%; top: 55%; }
  .map-info { position: absolute; width: 80%; z-index: 999; background: rgba(255,255,255,0.8); box-shadow: 0 1px 2px #ccc; border: 1px solid #ccc; border-radius: 5px; left: 10%; box-sizing: border-box; padding: 20px; }

  @media (min-width: 768px) {
    .map { max-width: 1200px; }
    .btn-map { width: 20px; height: 20px; }
    .map-info { width: 40%; left: 30%; top: 50%; -webkit-transform: translateY(-50%); -moz-transform: translateY(-50%); -ms-transform: translateY(-50%); -o-transform: translateY(-50%); transform: translateY(-50%); }
  }


  /*版块菜单设置*/
  .about-submenu { width: 80%; margin: 20px auto; padding: 0; font-size: 0; }
    .about-submenu > dd { display: inline-block; width: 50%; margin: 0; text-align: center; border: 1px solid #fff; font-size: 14px; }
      .about-submenu > dd > a { color: #333; width: 100%; height: 100%; display: block; padding: 10px; box-sizing: border-box; background-color: #ccc; cursor: pointer; }
        .about-submenu > dd > a:hover, .about-submenu > dd > a.active { color: #000; text-decoration: none; background-color: #33CC99; color: #fff; }

  @media (min-width: 768px) {
    .about-submenu { max-width: 1200px; width: 100%; }
      .about-submenu > dd { width: 25%; }
  }
</style>
