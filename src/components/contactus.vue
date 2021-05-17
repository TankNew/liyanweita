<template>
  <section class="main">
    <div class="banner" :style="{background: 'url(' + bannerImg + ')' }">
      <div class="section-tips">
        <span class="section-title">
          contact us
          <small>联系我们</small>
        </span>
      </div>
    </div>

    <!--地图-->
    <section class="map-container">
      <div id="allmap">
      </div>
      <div class="info">
        <!--联系我们-->
        <section class="contact-section">
          <div class="contact">
            <div class="contact-left">
              <ul>
                <li><i class="icon-ad icon-contact" />地址：{{contactInfo.address}}</li>
                <li><i class="icon-phone icon-contact" />电话：{{contactInfo.tel}}</li>
                <li><i class="icon-tex icon-contact" />传真：{{contactInfo.tex}}</li>
                <li><i class="icon-mail icon-contact" />邮箱：{{contactInfo.email}}</li>
                <li><i class="icon-code icon-contact" />邮编：{{contactInfo.code}}</li>
              </ul>
            </div>
            <hr />
            <div class="contact-right">
              <ul>
                <li>
                  <img :src="contactInfo.qr1" />
                  <span>微信公众号</span>
                </li>
                <li>
                  <img :src="contactInfo.qr2" />
                  <span>手机网站</span>
                </li>
              </ul>
            </div>
            <div class="clear"></div>
          </div>
        </section>
      </div>
    </section>

    <!--销售公司-->
    <section class="sale">
      <div class="sale-left">
        <h3>
          <img src="static/img/logo_border.png" />
          <span class="slfont">
            TianJin Rikevita Food CO.,LTD
            <span class="word">
              天津理研维他食品有限公司
            </span>
          </span>
        </h3>
      </div>
      <div class="sale-right">
        <a href="https://www.rikenvitamin.jp" target="_blank">
          <img src="static/img/contact_1.png" />
        </a>
        <a href="http://www.rikevita-sh.com" target="_blank">
          <img src="static/img/contact_2.png" />
        </a>
        <a href="http://www.rikevita-sh.com" target="_blank">
          <img src="static/img/contact_3.png" />
        </a>
      </div>
    </section>

  </section>
</template>
<script>
  import $ from 'jquery'
  import { MP } from '../../static/js/map.js'
  import config from 'config'
  import swal from 'sweetalert'
  import axios from 'axios'
  export default {
    name: 'contactus',
    data() {
      return {
        contactInfo: {}
      }
    },
    props: ['bannerImg'],
    methods: {
      load() {
        var that = this
        var url = config.HttpUrl + '/handlers/text.ashx?method=get'
        var postdata = '联系我们'
        axios.post(url, postdata).then(function (response) {
          var json = response.data
          if (json.error === 0) {
            that.contactInfo = JSON.parse(decodeURIComponent(json.content))
          }
        })
      }
    },
    created() {
      var that = this
      that.load()
    },
    mounted() {
      var that = this
      that.$nextTick(() => {
        MP(that.ak).then(BMap => {
          // 百度地图API功能
          var mp = new BMap.Map('allmap')//创建地图实例
          mp.centerAndZoom(new BMap.Point(117.229494, 39.025543), 17)//设定地图的中心点和坐标并将地图显示在地图容器中
          mp.enableDragging()//禁用地图拖拽事件
          mp.disableScrollWheelZoom()//禁用地图滚轮放大缩小
          mp.disableDoubleClickZoom()//禁用鼠标双击放大
          mp.disableKeyboard()//禁用键盘上下左右键移动地图，默认禁用(可不写)

          //1、定义构造函数并继承Overlay
          //定义自定义覆盖物的构造函数
          function ComplexCustomOverlay(point) {
            this._point = point
          }
          // 继承API的BMap.Overlay
          ComplexCustomOverlay.prototype = new BMap.Overlay()
          //2、初始化自定义覆盖物
          // 实现初始化方法
          ComplexCustomOverlay.prototype.initialize = function (map) {
            // 保存map对象实例
            this._map = map
            // 创建p元素，作为自定义覆盖物的容器
            var p = this._p = document.createElement('p')
            p.style.position = 'absolute'
            p.style.zIndex = BMap.Overlay.getZIndex(this._point.lat)//聚合功能?
            var arrow = this._arrow = document.createElement('img')
            arrow.src = 'static/img/map_tip.png'
            arrow.style.position = 'absolute'
            arrow.style.width = '340px'
            arrow.style.height = '240px'
            arrow.style.top = '-120px'
            arrow.style.left = '-170px'
            p.appendChild(arrow)
            // 将p添加到覆盖物容器中
            mp.getPanes().labelPane.appendChild(p)//getPanes(),返回值:MapPane,返回地图覆盖物容器列表  labelPane呢???
            // 需要将p元素作为方法的返回值，当调用该覆盖物的show、
            // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
            return p
          }
          //3、绘制覆盖物
          ComplexCustomOverlay.prototype.draw = function () {
            var map = this._map
            var pixel = map.pointToOverlayPixel(this._point)
            this._p.style.left = pixel.x + 'px'
            this._p.style.top = pixel.y + 'px'
          }
          //4、自定义覆盖物添加事件方法
          ComplexCustomOverlay.prototype.addEventListener = function (event, fun) {
            this._p['on' + event] = fun
          }
          var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(117.229494, 39.025543))
          mp.addOverlay(myCompOverlay)//将标注添加到地图中
          //5、为自定义覆盖物添加点击事件
          myCompOverlay.addEventListener('click', function () {
            console.log('你点击了标注')
          })
        })
      })
    }
  }
</script>
<style scoped>
  /*地图*/
  .map-container { position: relative; }
  #allmap { height: 300px; }
  .info { position: static; height: 400px; }

  @media (min-width: 768px) {
    #allmap { height: 500px; }
    .info { position: absolute; background-color: rgba(255,255,255,0.9); width: 20%; min-width: 300px; height: 500px; top: 0; right: 5%; z-index: 1000; }
  }
  /*联系方式*/
  .icon-contact { width: 24px; height: 24px; background-size: cover; background-position: center center; display: inline-block; vertical-align: middle; margin-right: 5px; }
  .icon-ad { background-image: url(../../static/img/contactus/icon-ad.png) }
  .icon-phone { background-image: url(../../static/img/contactus/icon-phone.png) }
  .icon-mail { background-image: url(../../static/img/contactus/icon-mail.png) }
  .icon-code { background-image: url(../../static/img/contactus/icon-code.png) }
  .icon-tex { background-image: url(../../static/img/contactus/icon-tex.png) }
  .contact { padding: 20px 0; }
    .contact > hr { width: 80%; margin-left: auto; margin-right: auto; }
  .contact-left { width: 80%; margin: 0 auto; }
    .contact-left ul { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; flex-direction: column; }
    .contact-left li { width: 100%; margin-right: 1%; text-align: left; padding: 10px 0; }
      .contact-left li:nth-child(1) { width: 100%; }
  .contact-right { width: 80%; margin: 0 auto; }
    .contact-right ul { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; }
    .contact-right li { width: 49%; margin-right: 1%; text-align: left; padding: 10px 0; }
      .contact-right li > img { width: 80px; }

  @media (min-width: 768px) {
    .contact-left, .contact-right { width: 90%; }
      .contact-right ul { flex-direction: column; }
      .contact-right li { width: 100%; }
  }
  /*区块标题*/
  .section-tips { width: 100%; padding: 40px; box-sizing: border-box; position: absolute; text-align: center; top: 50%; left: 50%; -webkit-transform: translate(-50%,-50%); -moz-transform: translate(-50%,-50%); -ms-transform: translate(-50%,-50%); -o-transform: translate(-50%,-50%); transform: translate(-50%,-50%); }
    .section-tips:before { content: ''; position: absolute; right: 5%; top: 40%; width: 15%; border-bottom: 1px solid #fff; }
    .section-tips:after { content: ''; position: absolute; left: 5%; top: 40%; width: 15%; border-bottom: 1px solid #fff; }
  .section-title { color: #fff; font-size: 30px; position: relative; display: inline-block; font-family: 'Times New Roman', Times, serif; text-transform: uppercase; z-index: 10; padding: 0 20px; box-sizing: border-box; max-width: 90%; background: none; }
    .section-title > small { color: #fff; display: block; font-size: 18px; font-family: Arial; }
  .section-tips.bg41e19a:after { border-color: #41e19a; }
  .section-tips.bg41e19a .section-title { color: #41e19a; background-color: #fff; }
    .section-tips.bg41e19a .section-title > small { color: #666; }

  @media (min-width: 768px) {
    .section-tips { max-width: 1200px; margin: 0 auto; }
    .section-title { font-size: 50px; padding: 0 50px; max-width: 60%; }
      .section-title > small { font-size: 20px; }
    .section-tips:before, .section-tips:after { width: 20%; }
    .section-tips.bgccc:after { border-color: #41e19a; }
    .section-tips.bgccc .section-title { color: #41e19a; background-color: #eee; }
      .section-tips.bgccc .section-title > small { color: #666; }
  }
  /*banner设置*/
  .banner { background-position: center center !important; background-repeat: no-repeat !important; background-size: 476% 100% !important; width: 100%; height: 0; padding-bottom: 60%; position: relative; overflow-x: hidden; }

  .banner-title { color: #fff; position: absolute; bottom: 30%; left: 5%; }
    .banner-title h4 { margin: -5px 0; text-shadow: 0 1px 1px #333; }
    .banner-title h2 { margin: 0; text-shadow: 0 1px 1px #333; font-family: Impact; }

  @media (min-width: 768px) {
    .banner { padding-bottom: 21%; background-size: unset !important; }
    .banner-title { width: 100%; max-width: 1200px; left: 50%; -webkit-transform: translateX(-50%); -moz-transform: translateX(-50%); -ms-transform: translateX(-50%); -o-transform: translateX(-50%); transform: translateX(-50%); }
      .banner-title h4 { font-size: 30px; }
      .banner-title h2 { font-size: 60px; }
  }
  /*销售网络*/
  .sale { width: 100%; height: 0; padding-bottom: 100%; position: relative; }
  .sale-left { background-color: #46e098; width: 100%; height: 50%; position: absolute; text-transform: uppercase; }

    .sale-left h3 { position: absolute; width: 100%; top: 50%; -webkit-transform: translateY(-50%); -moz-transform: translateY(-50%); -ms-transform: translateY(-50%); -o-transform: translateY(-50%); transform: translateY(-50%); margin: 0; font-size: 20px; color: #fff; text-align: center; }

      .sale-left h3 > img { display: inline-block; vertical-align: middle; height: 40px; }
      .sale-left h3 > .slfont { display: inline-block; position: relative; text-align: left; vertical-align: middle; }
        .sale-left h3 > .slfont > .word { letter-spacing: 7px; display: block; }
  .sale-right { background-color: #eee; width: 100%; height: 50%; position: absolute; bottom: 0; padding: 20px 10%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
    .sale-right > a { display: block; margin-bottom: 20px; max-width: 100%; }
      .sale-right > a > img { height: 28px; }

  @media (min-width: 768px) {
    .sale { width: 100%; padding-bottom: 300px; margin: 0 auto; }
    .sale-left h3 { font-size: 28px; }
      .sale-left h3 > .slfont > .word { letter-spacing: 10px; display: block; }
      .sale-left h3 > img { height: 60px; }
    .sale-left, .sale-right { width: 50%; height: 100%; top: 0; bottom: unset; }
    .sale-right { right: 0; }
  }
</style>
