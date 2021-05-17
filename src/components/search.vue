<template>
  <section class="main">
    <section class="news-nav-bg">
      <ol class="breadcrumb news-nav">
        <li><a href="index.html">天津理研维他食品</a></li>
        <li><a href="search.html">搜索结果</a></li>
      </ol>
    </section>
    <section class="search-input">
      <div :class="['input-group',errors.has('关键字')?'form-control-error':'']">
        <input type="text" class="form-control" name="关键字" placeholder="请输入需要查询的关键字" v-model="keyword" v-validate="'required'">
        <span class="input-group-btn">
          <button :class="['btn',errors.has('关键字')?'btn-danger':'btn-default']" type="button" @click="search" :disabled="errors.any()">检索</button>
        </span>
      </div><!-- /input-group -->
    </section>
    <section id="submenu">
      <dl class="about-submenu">
        <dd><a :class="[currentSub=='公告'?'active':'']" @click="changeSub('公告')">公告</a></dd>
        <dd><a :class="[currentSub=='产品'?'active':'']" @click="changeSub('产品')">产品</a></dd>
        <dd><a :class="[currentSub=='新闻'?'active':'']" @click="changeSub('新闻')">新闻</a></dd>
      </dl>
    </section>
    <section class="result">
      <section class="news-left">
        <div class="list-group">
          <a class="list-group-item disabled">
            检索范围：{{currentSub}}
          </a>
          <a v-for="(item1,index1) in currentResult" :key="index1" @click="getDetail(item1)" class="list-group-item">{{index1+1}}.{{item1.po_title}}{{item1.ns_title}}</a>
        </div>
        <section>
          <pagination v-model="currentPage" :total-page="totalPage" :boundary-links="true" @change="changePage" :max-size="2" align="center" size="sm" />
        </section>
      </section>
      <section class="news-detail">
        <h3>
          {{currentItem.ns_title}} {{currentItem.po_title}}
        </h3>
        <hr />
        <i class="news-date">
          <span class="ns-year">{{getYear(currentItem.ns_date)}}{{getYear(currentItem.po_exeg)}}</span>
          <span class="ns-line"></span>
          <span class="ns-day">{{getDay(currentItem.ns_date)}}{{getDay(currentItem.po_exeg)}}</span>
        </i>
        <div v-if="currentItem.ns_content" class="ns_content" v-html="currentItem.ns_content">
        </div>
        <div v-if="currentItem.po_content" class="ns_content" v-html="currentItem.po_content">
        </div>
        <div class="clear"></div>
      </section>
      <div class="clear"></div>
    </section>
  </section>
</template>
<script>
  import $ from 'jquery'
  import config from 'config'
  import swal from 'sweetalert'
  import axios from 'axios'
  var keyword = decodeURI($.getUrlParam('keyword'))
  export default {
    name: 'companyNews',
    data() {
      return {
        keyword: keyword,
        currentPage: 1,
        totalPage: 2,
        pagesize: 8,

        isMobile: false,
        currentItem: {},
        currentUrl: '',
        currentResult: [],
        currentSub: ''
      }
    },
    methods: {
      load() {
        var that = this
        var url = config.HttpUrl + '/handlers/news.ashx?method=search'
        console.log(that.keyword)
        var postdata = { keyword: that.keyword, category: 2, page: that.currentPage, pagesize: that.pagesize }
        axios.post(url, JSON.stringify(postdata)).then(function (response) {
          var json = response.data
          that.totalPage = $.countpage(json.totalsize, that.pagesize)
          that.currentResult = json.button
        })
      },
      subLoad() {
        var that = this
        var url
        var postdata
        that.currentItem = {}
        if (that.currentSub === '新闻') {
          url = config.HttpUrl + '/handlers/news.ashx?method=search'
          postdata = { keyword: that.keyword, category: 1, page: that.currentPage, pagesize: that.pagesize }
          axios.post(url, JSON.stringify(postdata)).then(function (response) {
            var json = response.data
            that.totalPage = $.countpage(json.totalsize, that.pagesize)
            that.currentResult = json.button
          })
        }
        else if (that.currentSub === '公告') {
          url = config.HttpUrl + '/handlers/news.ashx?method=search'
          postdata = { keyword: that.keyword, category: 2, page: that.currentPage, pagesize: that.pagesize }
          axios.post(url, JSON.stringify(postdata)).then(function (response) {
            var json = response.data
            that.totalPage = $.countpage(json.totalsize, that.pagesize)
            that.currentResult = json.button
          })
        }
        else if (that.currentSub === '产品') {
          url = config.HttpUrl + '/handlers/product.ashx?method=getall'
          postdata = { po_class: 0, po_search: that.keyword, po_new: 0, page: that.currentPage, pagesize: that.pagesize }
          axios.post(url, JSON.stringify(postdata)).then(function (response) {
            var json = response.data
            that.totalPage = parseInt(json.totalpage)
            that.currentResult = json.button
          })
        }
      },
      search() {
        var that = this
        that.$validator.validateAll().then(function (result) {
          if (result) {
            var pathname = window.location.pathname + '?keyword=' + that.keyword
            location.href = pathname
          }
        })
      },
      changePage(index) {
        this.currentPage = index
        this.subLoad()
      },
      changeSub(sub) {
        this.currentSub = sub
        this.currentPage = 1
        this.subLoad()
      },
      getDetail(item) {
        var that = this
        that.docmentWith = document.documentElement.scrollWidth
        if (that.docmentWith > 768) {
          that.isMobile = false
        }
        else
          that.isMobile = true

        if (that.isMobile) {
          if (that.currentSub === '公告')
            location.href = 'notice-detail.html?id=' + item.ns_id
          else if (that.currentSub === '新闻')
            location.href = 'company-news-detail.html?id=' + item.ns_id
          else if (that.currentSub === '产品')
            location.href = 'product-detail.html?id=' + item.po_id
        }
        else
          that.currentItem = item
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
      that.currentSub = '公告'

      that.docmentWith = document.documentElement.scrollWidth
      if (that.docmentWith > 768) {
        that.isMobile = false
      }
      else
        that.isMobile = true

      if (keyword != null)
        that.load()
    }
  }
</script>
<style scoped>
  .input-group-btn .btn { height: 34px; }
  .form-control-error { }
    .form-control-error > * { border-color: #FF6666; }
    .form-control-error > span { background-color: #FF6666; color: white; }
  /*版块菜单设置*/
  .about-submenu { width: 80%; margin: 20px auto; padding: 0; font-size: 0; }
    .about-submenu > dd { display: inline-block; width: 33%; margin: 0; text-align: center; border: 1px solid #fff; font-size: 14px; }
      .about-submenu > dd > a { color: #333; width: 100%; height: 100%; display: block; padding: 10px; box-sizing: border-box; background-color: #ccc; cursor: pointer; }
        .about-submenu > dd > a:hover, .about-submenu > dd > a.active { color: #000; text-decoration: none; background-color: #33CC99; color: #fff; }

  @media (min-width: 768px) {
    .about-submenu { max-width: 1200px; width: 100%; }
      .about-submenu > dd { width: 33%; }
  }

  .news-nav-bg { padding: 10px 20px; background-color: #41ac74; }
  .news-nav { background: none !important; box-sizing: border-box; margin: 0 auto; }
    .news-nav li a, .news-nav .active { color: #fff !important; }
  .news-date { width: 80px; height: 80px; text-align: center; display: flex; flex-direction: column; align-content: center; justify-content: center; font-style: normal; font-size: 16px; padding: 4px 10px; color: white; border-radius: 4px; background: -webkit-linear-gradient(15deg, #3bb677 35%, #41ac74); background: -moz-linear-gradient(15deg, #3bb677 35%, #41ac74); background: -o-linear-gradient(15deg, #3bb677 35%, #41ac74); background: -ms-linear-gradient(15deg, #3bb677 35%, #41ac74); background: linear-gradient(15deg, #3bb677 35%, #41ac74); box-sizing: border-box; margin: 20px; float: left; }
  .ns-day:before { content: '' }
  .ns-day { font-size: 30px; margin-top: -5px; }
  .ns-line { border-bottom: 1px solid #fff; }

  .result { margin: 0 auto; width: 90%; }

  .news-left { width: 100%; float: none; }
    .news-left > div { min-height: 400px; }
  .news-detail { width: 80%; float: right; border-left: 1px solid #eee; box-sizing: border-box; padding-left: 5px; display: none; min-height: 450px; }
    .news-detail h3 { text-align: center; }
    .news-detail hr { width: 99%; }

  .search-input { width: 90%; margin: 20px auto 0 auto; }

  @media (min-width: 768px) {
    .news-left { width: 19%; float: left; }
    .news-detail { display: block; }
    .news-nav { max-width: 1200px; }
    .search-input { max-width: 800px; }
    .result { max-width: 1200px; }
  }
</style>
