<template>
  <section class="main">
    <div class="banner" :style="{background: 'url(' + bannerImg + ')' }">
      <div class="banner-title-bg">
        <div class="banner-title">
          <h4>公司介绍</h4>
          <h2>company introduction</h2>
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
          ABOUT US
          <small>公司概述</small>
        </span>
      </div>
    </section>
    <section id="content">
      <div class="about-info" v-html="info.content"></div>
      <div class="about-year">
        <img :src="info.yearImg" />
        <div class="section-tips">
          <span class="section-title">
            {{info.yearInfoTitle}}
            <small>{{info.yearInfoSub}}</small>
          </span>
        </div>
        <div class="yearinfo" v-html="info.yearInfo"></div>
      </div>
    </section>
    <section id="product">
      <div class="section-tips bg41e19a">
        <span class="section-title" style="font-size:20px;">
          product introduction
          <small>产品介绍</small>
        </span>
      </div>
      <ul class="category">
        <li v-for="(item,index) in category" :key="index" @click="gofor('products.html')">
          <div class="boxF boxBorder">
            <div class="boxS boxBorder">
              <div class="boxT boxBorder">
                <div class="boxF">
                  <div class="boxS">
                    <div class="boxT" :style="{background: 'url(' + item.pc_img + ')' }">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4>{{item.pc_title}}</h4>
        </li>
      </ul>
    </section>
  </section>

</template>
<script>
  import $ from 'jquery'
  import config from 'config'
  import swal from 'sweetalert'
  import axios from 'axios'
  export default {
    name: 'aboutusInfo',
    data() {
      return {
        info: {
          //bannerImg: '../../static/img/aboutus/aboutus_bg.png'
          content: '',
          yearImg: '',
          yearInfoTitle: '',
          yearInfoSub: '',
          yearInfo: ''
        },
        category: [

        ],
        currentUrl: ''
      }
    },
    props: ['bannerImg'],
    methods: {
      gofor(link) {
        location.href = link
      },
      load() {
        var that = this
        var postdata = '公司介绍'

        var url = config.HttpUrl + '/handlers/text.ashx?method=get'
        axios.post(url, postdata).then(function (response) {
          var json = response.data
          if (json.error === 0) {
            that.info = JSON.parse(unescape(json.content))
          }
        })

        url = config.HttpUrl + '/handlers/product.ashx?method=getpcl'
        axios.post(url).then(function (response) {
          var json = response.data
          if (json.error === 0) {
            that.category = JSON.parse(json.content).button
          }
        })
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


  /*版块菜单设置*/
  .about-submenu { width: 80%; margin: 20px auto; padding: 0; font-size: 0; }
    .about-submenu > dd { display: inline-block; width: 50%; margin: 0; text-align: center; border: 1px solid #fff; font-size: 14px; }
      .about-submenu > dd > a { color: #333; width: 100%; height: 100%; display: block; padding: 10px; box-sizing: border-box; background-color: #ccc; cursor: pointer; }
        .about-submenu > dd > a:hover, .about-submenu > dd > a.active { color: #000; text-decoration: none; background-color: #33CC99; color: #fff; }

  @media (min-width: 768px) {
    .about-submenu { max-width: 1200px; width: 100%; }
      .about-submenu > dd { width: 25%; }
  }
  /*文字介绍*/
  .about-info { width: 80%; margin: 0 auto; }

  @media (min-width: 768px) {
    .about-info { width: 100%; max-width: 1000px; margin: 0 auto; }
  }
  /*年份图设定*/
  .about-year { background: url(../../static/img/aboutus/info_bg.jpg) center center no-repeat; width: 100%; height: auto; padding-bottom: 40px; margin-top: 40px; text-align: center; }
    .about-year img { width: 100%; }
    .about-year .section-tips { padding-bottom: 20px; }
    .about-year .section-title { font-size: 18px; font-family: unset; }
      .about-year .section-title > small { font-size: 10px; margin-top: 10px; }
  .yearinfo { text-align: left; color: white; padding: 0 40px; }

  @media (min-width: 768px) {
    .about-year { padding-top: 80px; padding-bottom: 160px; }
      .about-year img { width: 768px; }
    .yearinfo { text-align: left; color: white; padding: 0 40px; max-width: 1200px; margin: 0 auto; }
  }

  /*产品六边形设置*/
  .boxF, .boxS, .boxT { width: 200px; height: 240px; overflow: hidden; }
  .boxF, .boxS { visibility: hidden; }
  .boxF { transform: rotate(120deg); -ms-transform: rotate(120deg); -moz-transform: rotate(120deg); -webkit-transform: rotate(120deg); margin: 0 auto; }
  .boxS { transform: rotate(-60deg); -ms-transform: rotate(-60deg); -moz-transform: rotate(-60deg); -webkit-transform: rotate(-60deg); }
  .boxT { transform: rotate(-60deg); background: no-repeat 50% center; background-size: 100% auto; -ms-transform: rotate(-60deg); -moz-transform: rotate(-60deg); -webkit-transform: rotate(-60deg); visibility: visible; }

    .boxF.boxBorder, .boxS.boxBorder, .boxT.boxBorder { width: 210px; height: 240px; overflow: hidden; }
    .boxT.boxBorder { background-color: #5acc98; }

  .category { margin: 0 auto; padding: 0; list-style: none; width: 60%; position: static; }
    .category li { margin-bottom: 40px; cursor: pointer; }
      .category li img { width: 100%; }
      .category li h4 { text-align: center; color: #5acc98; margin: 20px 0; }

  @media (min-width: 768px) {
    .category { position: static; display: flex; flex-direction: row; justify-content: center; align-items: center; flex-wrap: wrap; }
      .category li { width: 25%; flex-shrink: 0; }
  }
</style>
