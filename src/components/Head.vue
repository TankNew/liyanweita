<template>
  <div>
    <div class="header">
      <img src="static/img/logo.png" class="head-logo">
      <dl class="head-links">
        <dt></dt>
        <dd><a>检索</a></dd>
        <dd>
          <div class="search-input" id="searchInput">
            <input type="text" @blur="closeSearch" v-model="keyWord" />
          </div>
          <input type="button" class="search-btn" @click="openSearch" />
        </dd>
      </dl>
      <div class="clear"></div>
    </div>
    <nav id="nav" class="navbar navbar-default">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header text-center">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">导航菜单</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav" id="navibar">
          <li v-for="(item,index) in menu" v-if="item.url" :key="index" :class="[item.active?'active':'']"><a :href="item.url">{{item.name}}</a></li>
          <li v-else :class="[item.active?'active':'']">
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              {{item.name}} <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li v-for="(item2,index2) in item.subpage" :key="index2">
                <a :href="item2.url" style="position:relative;">
                  {{item2.name}}
                </a>
                <div v-if="index2!=item.subpage.length-1" role="separator" class="divider"></div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- /.navbar-collapse -->
    </nav>
  </div>
</template>
<script>
  import $ from 'jquery'
  //import '../../static/js/JavaScript'
  import config from 'config'
  import swal from 'sweetalert'
  import axios from 'axios'
  var menu = [
    {
      active: false,
      banner: 'index',
      name: '首页',
      url: 'index.html'
    },
    {
      name: '公司简介',
      active: false,
      subpage: [
        {
          active: false,
          banner: 'static/img/banner/gsjs_banner_bj.jpg',
          url: 'aboutus-info.html',
          name: '公司概述'
        },
        {
          active: false,
          banner: 'none',
          url: 'https://www.rikenvitamin.jp/',
          name: '集团概况'
        }, {
          active: false,
          banner: 'static/img/banner/gsjs_banner_bj.jpg',
          url: 'aboutus-organization.html',
          name: '组织结构'
        },
        {
          active: false,
          banner: 'static/img/banner/gsjs_banner_bj.jpg',
          url: 'aboutus-network.html',
          name: '销售网络'
        }
      ]
    },
    {
      active: false,
      name: '公告&认证',
      subpage: [
        {
          active: false,
          banner: 'static/img/banner/ggrz_banner_bj.jpg',
          url: 'notice.html',
          name: '公告'
        },
        {
          active: false,
          banner: 'static/img/banner/ggrz_banner_bj.jpg',
          url: 'certification.html',
          name: '认证'
        }
      ]
    },
    {
      active: false,
      name: '产品大厅',
      subpage: [
        {
          active: false,
          banner: 'static/img/banner/cpdt_banner_bj.jpg',
          url: 'products-new.html',
          name: '新品推荐'
        },
        {
          active: false,
          banner: 'static/img/banner/cpdt_banner_bj.jpg',
          url: 'products.html',
          name: '产品展示'
        }
      ]
    },
    {
      active: false,
      name: '企业文化',
      subpage: [
        {
          active: false,
          banner: 'static/img/banner/qywh_banner_bj.jpg',
          url: 'company-news.html',
          name: '企业新闻'
        },
        {
          active: false,
          banner: 'static/img/banner/qywh_banner_bj.jpg',
          url: 'company-videos.html',
          name: '企业视频'
        }
      ]
    },
    {
      active: false,
      banner: 'static/img/banner/p_zp_banner.jpg',
      url: 'hr.html',
      name: '人才招聘'
    }, {
      active: false,
      banner: 'static/img/contactus/banner_bj.png',
      url: 'contactus.html',
      name: '联系我们'
    }
  ]
  export default {
    name: 'top',
    data() {
      return {
        menu: [],
        searchStatus: false,
        keyWord: ''
      }
    },
    methods: {
      load() {
        var that = this
        var url = config.HttpUrl + '/handlers/text.ashx?method=get'
        var postdata = '栏目设置'
        axios.post(url, postdata).then(function (response) {
          var json = response.data
          if (json.error === 0) {
            that.menu = JSON.parse(decodeURIComponent(json.content))
            that.setCurrentPage()
          }
        })
      },
      openSearch() {
        var that = this
        if (!that.searchStatus) {
          that.searchStatus = !that.searchStatus
          $('#searchInput').addClass('searchHover')
          $('#searchInput').children('input').focus()
        }
        else if (!that.keyWord)
          that.searchStatus = !that.searchStatus
        else
          location.href = 'search.html?keyword=' + that.keyWord
      },
      closeSearch() {
        var that = this
        if (!that.keyWord) {
          that.searchStatus = !that.searchStatus
          $('#searchInput').removeClass('searchHover')
        }
      },
      setCurrentPage() {
        var that = this
        var realurl = window.location.pathname.toLowerCase()
        var firstindex = realurl.lastIndexOf('/') + 1
        var currnetPath = realurl.substr(firstindex)
        var paramUrl = realurl.substr(firstindex) + window.location.search.toLowerCase()
        if (currnetPath)
          that.menu.forEach(e => {
            if (e.url === currnetPath) {
              e.active = true
              document.title += ' - ' + e.name
              that.$emit('setCurrentBanner', e.banner)
            }
            else if (e.subpage) {
              e.subpage.forEach(s => {
                if (s.url === currnetPath) {
                  document.title += ' - ' + e.name
                  document.title += ' - ' + s.name
                  e.active = true
                  that.$emit('setCurrentBanner', s.banner)
                }
              })
            }
          })
        else
          that.menu[0].active = true
      }
    },
    created() {
      document.title = '天津理研维他食品有限公司'
    },
    mounted() {
      var that = this
      that.load()
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header { background-color: #41ac74; width: 100%; z-index: 99; padding: 10px 30px; }
  .head-logo { width: 100%; max-width: 320px; }
  .head-logo-title { font-size: 16px; color: white; }
  .head-links { position: static; display: block; float: right; margin-bottom: 0; font-size: 9px; }
    .head-links > dd:not(:last-child) { display: inline-block; padding: 1px 10px; border-right: 1px solid white; vertical-align: middle; }
    .head-links > dd:last-child { display: inline-block; padding: 1px 10px; vertical-align: middle; }
    .head-links a { color: white; text-decoration: none; }
      .head-links a:hover { color: white; border-bottom: 1px solid white; }
  .navbar-toggle { display: inline-block; float: none; }
  .navbar { margin-bottom: 0; }

  @media (min-width: 768px) {
    .head-logo { height: 50px; width: auto; }
    .head-logo-title { font-size: 24px; color: white; }
    .head-links { position: absolute; right: 20px; top: 30px; font-size: 14px; }
    .nav { display: inline-block; float: none; font-size: 16px; margin-bottom: 0 !important; }
      .nav::before { display: inline-block; }
      .nav::after { display: inline-block; }
      .nav > li { margin: 0 20px; }
    .navbar-collapse { text-align: center; }
    .dropdown-menu { padding: 10px 0; }
    .navbar-toggle { display: none; }
  }

  .search-input { background: url(../../static/img/sy_serach_bj.png) 100% 100%; width: 0; height: 32px; vertical-align: middle; margin-right: 10px; display: inline-block; transition: width 0.2s; -moz-transition: width 0.2s; /* Firefox 4 */ -webkit-transition: width 0.2s; /* Safari and Chrome */ -o-transition: width 0.2s; /* Opera */ }
    .search-input.searchHover { width: 100px; }
    .search-input > input { border: none; background-color: transparent; outline: none; width: 100%; height: 100%; padding: 0 10px; color: white; }
  .search-btn { background: url('../../static/img/sy_serach_an.png') no-repeat 100% 100%; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; border: none; outline: none; width: 20px; height: 20px; vertical-align: middle; box-sizing: border-box; }

  @media (min-width: 768px) {
    .search-input.searchHover { width: 240px; }
  }
</style>
