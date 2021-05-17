<template>
  <section class="main">
    <div class="banner" :style="{background: 'url(' + bannerImg + ')' }">
      <div class="banner-center-top"></div>
      <div class="banner-center">
        <div class="banner-center-title">
          <div class="banner-center-title-bg">
            <h2>新品推荐 <span>new products</span></h2>
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
          new products
          <small>新品推荐</small>
        </span>
      </div>
      <div class="new-product-list">
        <ul>
          <li v-for="(item1,index1) in newproducts" :key="index1" @click="gofor(item1.po_id)">
            <img :src="item1.po_pic" class="w100" />
            <section>
              <h3 class="font-46e098">{{cutString(item1.po_title,cutLenth)}}</h3>
              <span>{{cutString(item1.po_class,cutLenth)}}</span>
            </section>
          </li>
        </ul>
        <section class="page">
          <pagination v-model="currentPage" :total-page="totalPage" :boundary-links="true" @change="changePage" align="center" size="lg" />
        </section>
      </div>
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
    name: 'productsNew',
    data() {
      return {
        SubcutLenth: 0,
        cutLenth: 0,
        newproducts: [],
        currentUrl: '',
        totalPage: 1,
        currentPage: page,
        pagesize: 8
      }
    },
    methods: {
      cutString(val, len) {
        return $.cutString(val, len)
      },
      changePage: function (index) {
        var pathname = window.location.pathname + '?page=' + index
        location.href = pathname
      },
      load() {
        var that = this
        var url = config.HttpUrl + '/handlers/product.ashx?method=getall'
        var postdata = { po_class: 0, po_search: '', po_new: 1, page: that.currentPage, pagesize: that.pagesize }
        axios.post(url, JSON.stringify(postdata)).then(function (response) {
          var json = response.data
          that.totalPage = parseInt(json.totalpage)
          that.newproducts = json.button
          that.newproducts.forEach((item, i) => {
            var url = config.HttpUrl + '/handlers/product.ashx?method=getpclname'
            axios.post(url, String(item.po_class)).then(function (response) {
              var json = response.data
              item.po_class = json.content
            })
          })
        })
      },
      gofor(index) {
        location.href = 'product-detail.html?id=' + index
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
  .new-product-list { margin: 0 auto; width: 95%; background-color: #eee; padding: 10px; }
  .product-section ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: row; align-items: flex-start; justify-content: flex-start; white-space: nowrap; overflow: hidden; box-sizing: border-box; flex-wrap: wrap; }
  .product-section li { padding: 0; background-color: white; width: 31%; flex-shrink: 0; height: 0; padding-bottom: 40%; position: relative; margin: 0 1% 20px 1%; cursor: pointer; }
    .product-section li:before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 2px solid rgba(51,204,153,0.4); z-index: 3; box-shadow: 0 1px 1px #ccc; }
    .product-section li:hover:before { border: 4px solid rgba(51,204,153,0.8); }
    .product-section li > img { position: absolute; left: 0; top: 0; width: 100%; height: 60%; }

    .product-section li > section { position: absolute; left: 0; top: 60%; box-sizing: border-box; width: 100%; padding: 5px; box-sizing: border-box; }

      .product-section li > section > h3 { margin: 5px 0; padding: 0 5px; display: block; font-size: 14px; text-align: left; word-wrap: break-word; word-break: break-all; white-space: pre-wrap; }
      .product-section li > section > span { display: block; padding: 0 5px; color: #666; text-align: left; word-wrap: break-word; word-break: break-all; white-space: pre-wrap; }

  @media(min-width:768px) {
    .new-product-list { margin: 0 auto; width: 100%; max-width: 1200px; background-color: #eee; padding: 10px; }

    .product-section ul { margin-top: 60px; flex-direction: row; flex-wrap: wrap; justify-content: space-around; }
    .product-section li { padding: 0; background-color: white; width: 20%; display: inline-block; flex-shrink: 0; height: 0; padding-bottom: 25%; position: relative; margin: 0 10px 20px 10px; }

      .product-section li > img { position: absolute; left: 0; top: 0; width: 100%; height: 60%; }
      .product-section li > section { position: absolute; left: 0; top: 60%; box-sizing: border-box; width: 100%; padding: 5px; box-sizing: border-box; }
        .product-section li > section > h3 { margin-top: 20px; margin-bottom: 4px; display: block; font-size: 18px; }
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
