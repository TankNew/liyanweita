<template>
  <section class="main">
    <div class="banner" :style="{background: 'url(' + bannerImg + ')' }">
      <div class="banner-center-top"></div>
      <div class="banner-center">
        <div class="banner-center-title">
          <div class="banner-center-title-bg">
            <h2>产品展示 <span>products</span></h2>
          </div>
        </div>
      </div>
    </div>
    <section id="submenu">
      <dl class="about-submenu">
        <dd><a href="products-new.html" :class="[currentUrl=='products-new.html'?'active':'']">新品推荐</a></dd>
        <dd><a href="products.html" :class="[currentUrl=='products.html'?'active':'']">产品展示</a></dd>
      </dl>
    </section>
    <section class="product-section">
      <div class="section-tips bg41e19a">
        <span class="section-title">
          PRODUCTS
          <small>产品展示</small>
        </span>
      </div>
      <div class="product-category">
        <swiper :options="productMobile" class="productMobile" ref="swiperThumbs">
          <swiper-slide v-for="(item,index) in category" :key="index" class="prodcut-slide">
            <a :class="[index==cateCurrent?'active':'']" @click="cateClick(index)">
              {{cutString(item.pc_title,SubcutLenth)}}
            </a>
          </swiper-slide>
        </swiper>
        <div class="product-category-btn">
          <i class="left fas fa-angle-left prodcut-prev" @click="catePrev"></i>
          <i class="right fas fa-angle-right prodcut-next" @click="cateNext"></i>
        </div>
        <div class="clear"></div>
      </div>
      <swiper :options="produtctDetailOption" class="produtctDetail-slide" ref="swiperTop">
        <swiper-slide class="product-show  swiper-no-swiping" v-for="(item,index) in category" :key="index">
          <div class="product-category-list">
            <h3>{{item.pc_title}}</h3>
            <small>产品说明</small>
            <hr />
            <ul>
              <li v-for="(item1,index1) in item.button" :key="index1" @click="gofor(item1.po_id)">
                <img :src="item1.po_pic" class="w100" />
                <section>
                  <h3 class="font-46e098">{{cutString(item1.po_title,cutLenth)}}</h3>
                  <span>{{cutString(item1.po_class,cutLenth)}}</span>
                </section>
              </li>
            </ul>
            <section class="page">
              <pagination v-model="item.page" :total-page="countpage(item.totalsize)" align="center" size="lg" :boundary-links="true" @change="changePage(item)" />
            </section>
          </div>
          <div class="clear"></div>
        </swiper-slide>
      </swiper>
    </section>

  </section>
</template>
<script>
  import $ from 'jquery'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  import config from 'config'
  import swal from 'sweetalert'
  import axios from 'axios'

  export default {
    name: 'products',
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        SubcutLenth: 0,
        cutLenth: 0,
        cateCurrent: 0,
        productMobile: {
          slidesPerView: 3,
          spaceBetween: 10,
          touchRatio: 0.2,
          slideToClickedSlide: true,
          navigation: {
            nextEl: '.prodcut-next',
            prevEl: '.prodcut-prev'
          }
        },
        produtctDetailOption: {},
        category: [],
        pagesize: 8
      }
    },
    methods: {
      cutString(val, len) {
        return $.cutString(val, len)
      },
      countpage(totalsize) {
        return $.countpage(totalsize, this.pagesize)
      },
      changePage: function (item) {
        var that = this
        var url = config.HttpUrl + '/handlers/product.ashx?method=getall'
        var postdata = { po_class: item.pc_id, po_search: '', po_new: 0, page: item.page, pagesize: that.pagesize }
        axios.post(url, JSON.stringify(postdata)).then(function (response1) {
          var json1 = response1.data
          item.button = json1.button
          item.button.forEach((item1, i1) => {
            item1.po_class = item.pc_title
          })
        })
      },
      load() {
        var that = this
        var url = config.HttpUrl + '/handlers/product.ashx?method=getpcl'
        axios.post(url).then(function (response) {
          var json = response.data
          if (json.error === 0) {
            that.category = JSON.parse(json.content).button
            that.category.forEach((item, i) => {
              url = config.HttpUrl + '/handlers/product.ashx?method=getall'
              var postdata = { po_class: item.pc_id, po_search: '', po_new: 0, page: item.page, pagesize: that.pagesize }
              axios.post(url, JSON.stringify(postdata)).then(function (response1) {
                var json1 = response1.data
                item.button = json1.button
                item.button.forEach((item1, i1) => {
                  item1.po_class = item.pc_title
                })
              })
            })
          }
        })
      },
      gofor(index) {
        location.href = 'product-detail.html?id=' + index
      },
      cateClick(index) {
        var that = this
        const swiperTop = that.$refs.swiperTop.swiper
        that.cateCurrent = index
        swiperTop.slideTo(index)
      },
      catePrev() {
        var that = this
        if (that.cateCurrent > 0) {
          that.cateCurrent--
          const swiperTop = that.$refs.swiperTop.swiper
          swiperTop.slidePrev()
        }
      },
      cateNext() {
        var that = this
        if (that.cateCurrent < that.category.length - 1) {
          that.cateCurrent++
          const swiperTop = that.$refs.swiperTop.swiper
          swiperTop.slideNext()
        }
      }
    },
    props: ['bannerImg'],
    created() {
      var that = this
      var realurl = window.location.pathname.toLowerCase()
      var firstindex = realurl.lastIndexOf('/') + 1
      var currnetPath = realurl.substr(firstindex)
      var paramUrl = realurl.substr(firstindex) + window.location.search.toLowerCase()
      that.currentUrl = currnetPath
      that.load()

      that.docmentWith = document.documentElement.scrollWidth
      if (that.docmentWith > 768) {
        that.SubcutLenth = 40
        that.cutLenth = 50
      }
      else {
        that.SubcutLenth = Math.round(that.docmentWith / 35)
        that.cutLenth = Math.round(that.docmentWith / 35)
      }
    }
  }
</script>
<style scoped>
  /*产品展示*/
  .product-category { position: relative; margin-bottom: 10px; }
  .productMobile { width: 78%; margin-bottom: 0; display: block; }
  .prodcut-slide { width: 32%; flex-shrink: 0; margin-right: 2%; display: block; }
    .prodcut-slide a { background-color: #eee; color: #333; display: block; width: 100%; padding: 10px; box-sizing: border-box; }
      .prodcut-slide a:hover, .prodcut-slide a.active { background-color: #46e098; color: #fff; text-decoration: none; }
  .product-category-btn { position: absolute; width: 94%; left: 3%; top: 50%; -webkit-transform: translateY(-50%); -moz-transform: translateY(-50%); -ms-transform: translateY(-50%); -o-transform: translateY(-50%); transform: translateY(-50%); }
    .product-category-btn .left, .product-category-btn .right { display: block; padding: 10px; box-sizing: border-box; background-color: #46e098; color: #fff; font-size: 20px; outline: none; }
    .product-category-btn .left { float: left; }
    .product-category-btn .right { float: right; }
  .product-category-info { display: none; }
  .product-category-more { position: absolute; right: 10px; top: 40px; font-size: 16px; color: #46e098; }
    .product-category-more:hover, .product-category-more:active { text-decoration: none; color: #00CC66; }
  .product-category-list { margin: 0 auto 20px auto; padding: 10px; width: 90%; background-color: #eee; position: relative; }
    .product-category-list > hr { border-color: #ccc; }
    .product-category-list > h3 { text-align: left; font-weight: bold; }
    .product-category-list > small { text-align: left; display: block; padding-left: 4px; color: #999; }

    .product-category-list ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: row; align-items: flex-start; justify-content: flex-start; white-space: nowrap; overflow: hidden; box-sizing: border-box; flex-wrap: wrap; }
    .product-category-list li { padding: 0; background-color: white; width: 31%; flex-shrink: 0; height: 0; padding-bottom: 40%; position: relative; margin: 0 1% 20px 1%; box-sizing: border-box; cursor: pointer; }

      .product-category-list li:before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 2px solid rgba(51,204,153,0.4); z-index: 3; box-shadow: 0 1px 1px #ccc; }
      .product-category-list li:hover:before { border: 4px solid rgba(51,204,153,0.8); }

      .product-category-list li > img { position: absolute; left: 0; top: 0; width: 100%; height: 60%; }

      .product-category-list li > section { position: absolute; left: 0; top: 60%; box-sizing: border-box; width: 100%; padding: 5px; box-sizing: border-box; }


        .product-category-list li > section > h3 { margin: 5px 0; padding: 0 5px; display: block; font-size: 14px; text-align: left; word-wrap: break-word; word-break: break-all; white-space: pre-wrap; }
        .product-category-list li > section > span { display: block; padding: 0 5px; color: #666; text-align: left; word-wrap: break-word; word-break: break-all; white-space: pre-wrap; }

  @media (min-width: 768px) {
    .product-section { background-color: white; padding-bottom: 100px; }
    .product-category { width: 100%; max-width: 1200px; margin: 0 auto 10px auto; }
    .productMobile { float: left; vertical-align: middle; margin-bottom: 0; display: block; width: 80%; }
    .product-category-btn { position: static; width: 20%; float: right; -webkit-transform: translateY(0); -moz-transform: translateY(0); -ms-transform: translateY(0); -o-transform: translateY(0); transform: translateY(0); text-align: right; }
      .product-category-btn .left, .product-category-btn .right { padding: 10px 20px; float: none; display: inline-block; }
    .produtctDetail-slide { width: 100%; max-width: 1200px; margin: 0 auto; }
    .product-show { width: 100%; clear: both; height: 0; padding-bottom: 75%; position: relative; }
    .product-category-info { width: 40%; display: block; }
      .product-category-info > img { width: 100%; }
    .product-category-more { top: unset; bottom: 40px; right: 20px; }
    .product-category-list { width: 100%; height: 100%; position: absolute; top: 0; right: 0; padding: 20px; box-sizing: border-box; }

      .product-category-list ul { margin-top: 60px; flex-direction: row; flex-wrap: wrap; justify-content: space-around; min-height: 550px; }
      .product-category-list li { padding: 0; background-color: white; width: 20%; display: inline-block; flex-shrink: 0; height: 0; padding-bottom: 25%; position: relative; margin: 0 10px 20px 10px; }

        .product-category-list li > img { position: absolute; left: 0; top: 0; width: 100%; height: 60%; }

        .product-category-list li > section { position: absolute; left: 0; top: 60%; box-sizing: border-box; width: 100%; padding: 5px; box-sizing: border-box; }

          .product-category-list li > section > h3 { margin-top: 20px; margin-bottom: 4px; display: block; font-size: 18px; }
  }

  .about-submenu { width: 80%; margin: 20px auto; padding: 0; font-size: 0; }
    .about-submenu > dd { display: inline-block; width: 50%; margin: 0; text-align: center; border: 1px solid #fff; font-size: 14px; }
      .about-submenu > dd > a { color: #333; width: 100%; height: 100%; display: block; padding: 10px; box-sizing: border-box; background-color: #ccc; cursor: pointer; }
        .about-submenu > dd > a:hover, .about-submenu > dd > a.active { color: #000; text-decoration: none; background-color: #33CC99; color: #fff; }

  @media (min-width: 768px) {
    .about-submenu { max-width: 1200px; width: 100%; }
  }
</style>
