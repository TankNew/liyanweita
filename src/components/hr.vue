<template>
  <section class="main">
    <div class="banner" :style="{background: 'url(' + bannerImg + ')' }">
      <div class="banner-title-bg">
        <div class="banner-title">
          <h4>人才招聘</h4>
          <h2>join us</h2>
        </div>
      </div>
    </div>
    <section class="hr-bg">
      <div class="hr-top"></div>
      <swiper :options="hrSwiperOption" class="hr-swiper" ref="swiperThumbs">
        <swiper-slide v-for="(item,index) in hrList" :key="index" class="hr-slide">
          <h2>
            {{item.title}}
            <span>position</span>
          </h2>
          <dl>
            <dt>
              <span>截至时间：</span>{{date(item.end_date)}}
            </dt>
            <dd>
              <span>招聘人数：</span>{{item.num}} 人
            </dd>
            <dd>
              <span>工作经验：</span>{{item.experience}}
            </dd>
            <dd>
              <span>工作性质：</span>{{item.nature}}
            </dd>
            <dd>
              <span>工作底点：</span>{{item.address}}
            </dd>
          </dl>
          <dl>
            <dt>
              <span>任职资格：</span>
            </dt>
            <dd>
              <div v-html="item.qualifications"></div>
            </dd>
            <dt>
              <span>工作职责：</span>
            </dt>
            <dd>
              <div v-html="item.Function"></div>
            </dd>
          </dl>
        </swiper-slide>
      </swiper>
      <div class="hr-btn">
        <i class="fas fa-angle-left prev" @click="catePrev"></i>
        <i class="fas fa-angle-right next" @click="cateNext"></i>
      </div>
      <div class="hr-contact">
        <ul>
          <li><i class="icon-ad icon-contact" />地址：{{contactInfo.address}}</li>
          <li><i class="icon-phone icon-contact" />电话：{{contactInfo.tel}}</li>
          <li><i class="icon-tex icon-contact" />传真：{{contactInfo.tex}}</li>
          <li><i class="icon-mail icon-contact" />邮箱：{{contactInfo.email}}</li>
          <li><i class="icon-code icon-contact" />邮编：{{contactInfo.code}}</li>
        </ul>
      </div>
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
  const pc = {
    slidesPerView: 2,
    spaceBetween: 10,
    touchRatio: 0.2,
    slideToClickedSlide: true
  }
  const mobile = {
    slidesPerView: 1,
    spaceBetween: 10,
    touchRatio: 0.2,
    slideToClickedSlide: true
  }
  export default {
    components: {
      swiper,
      swiperSlide
    },
    data() {
      return {
        contactInfo: {},
        docmentWith: 0,
        totalPage: 18,
        currentPage: 1,
        cateCurrent: 0,
        hrList: [],
        hrSwiperOption: {}
      }
    },
    props: ['bannerImg'],
    methods: {
      date(i) {
        return $.date(i)
      },
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
        url = config.HttpUrl + '/handlers/hr.ashx?method=getall'
        axios.post(url).then(function (response) {
          var json = response.data
          if (json.error === 0) {
            that.hrList = JSON.parse(json.content).button
          }
        })
      },
      catePrev() {
        if (this.cateCurrent > 0) {
          this.cateCurrent--
          const swiperThumbs = this.$refs.swiperThumbs.swiper
          swiperThumbs.slidePrev()
        }
      },
      cateNext() {
        if (this.cateCurrent < this.hrList.length - 1) {
          this.cateCurrent++
          const swiperThumbs = this.$refs.swiperThumbs.swiper
          swiperThumbs.slideNext()
        }
      }
    },
    created() {
      var that = this
      that.docmentWith = document.documentElement.scrollWidth
      if (that.docmentWith > 768)
        that.hrSwiperOption = JSON.parse(JSON.stringify(pc))
      else
        that.hrSwiperOption = JSON.parse(JSON.stringify(mobile))
      that.load()
    },
    mounted() {
      var that = this
      that.$nextTick(() => {
      })
    }
  }
</script>
<style scoped>
  .hr-contact { position: absolute; bottom: 1%; left: 2%;  border: 5px solid rgba(255,255,255,0.3); background-color: rgba(255,255,255,0.1); width: 96%; color: white; }
    .hr-contact ul { list-style: none; padding: 10px; margin: 0; display: flex; flex-wrap: wrap; align-items: flex-start; justify-content: space-between; flex-direction: row; }
    .hr-contact li { width: 48%; margin-right: 1%; text-align: left; padding: 2px 0; flex-shrink: 0; }
      .hr-contact li:nth-child(1) { width: 100%; }
      .hr-contact li:nth-child(4) { width: 100%; }

  .icon-contact { width: 24px; height: 24px; background-size: cover; background-position: center center; display: inline-block; vertical-align: middle; margin-right: 5px; }
  .icon-ad { background-image: url(../../static/img/contactus/icon-ad.png) }
  .icon-phone { background-image: url(../../static/img/contactus/icon-phone.png) }
  .icon-mail { background-image: url(../../static/img/contactus/icon-mail.png) }
  .icon-code { background-image: url(../../static/img/contactus/icon-code.png) }
  .icon-tex { background-image: url(../../static/img/contactus/icon-tex.png) }

  @media (min-width: 768px) {
    .hr-contact { max-width: 800px; margin: 0 auto; position: static; }
      .hr-contact li:nth-child(1) { width: 48%; }
      .hr-contact li:nth-child(4) { width: 48%; }
  }

  .page { position: absolute; bottom: 0; width: 100%; }
  .pagination { margin-top: 0 !important; }
  .hr-bg { width: 100%; height: 0; padding-bottom: 145%; background-image: url(../../static/img/hr/bg.jpg); background-size: 100% 145%; position: relative; }
  .hr-top { display: none; }
  .hr-swiper { width: 100%; padding: 20px 0; position: absolute; top: 2%; left: 0; box-sizing: border-box; height: 80%; }

  .hr-btn { width: 100%; position: absolute; top: 50%; color: #fff; webkit-transform: translateY(-50%); -moz-transform: translateY(-50%); -ms-transform: translateY(-50%); -o-transform: translateY(-50%); transform: translateY(-50%); box-sizing: border-box; padding: 0 10px; z-index: 1000; }
    .hr-btn > i { opacity: 0.75; border-radius: 50%; padding: 10px 16px; border: 2px solid #fff; box-sizing: border-box; font-size: 24px; cursor: pointer; outline: none; }
      .hr-btn > i:hover { opacity: 1; }
      .hr-btn > i.prev { float: left; }
      .hr-btn > i.next { float: right; }

  .hr-slide { color: #fff; height: 100%; }

    .hr-slide dl { width: 70%; padding: 10px 0; height: 40%; margin: 0 auto; }

    .hr-slide h2 { margin: 0; text-shadow: 0 1px 1px #333; border-left: 1px solid #fff; border-right: 1px solid #fff; border-bottom: 1px solid #fff; padding: 20px; text-align: center; white-space: nowrap; font-size: 30px; width: 70%; margin: 20px auto; position: relative; }

      .hr-slide h2 > span { text-shadow: 0 1px 1px #333; position: absolute; top: -12px; text-align: center; text-transform: uppercase; font-size: 24px; font-family: Impact; left: 50%; -webkit-transform: translateX(-50%); -moz-transform: translateX(-50%); -ms-transform: translateX(-50%); -o-transform: translateX(-50%); transform: translateX(-50%); padding: 0 5px; width: 50%; }
      .hr-slide h2:before { content: ''; position: absolute; left: 0; top: 0; border-top: 1px solid #fff; width: 20%; }
      .hr-slide h2:after { content: ''; position: absolute; right: 0; top: 0; border-top: 1px solid #fff; width: 20%; }

  @media (min-width: 768px) {

    .hr-bg { padding: 40px 0; height: auto; min-height: 768px; }

    .hr-top { width: 100%; max-width: 1200px; height: 440px; display: block; background: url(../../static/img/hr/bg-top.png) center center no-repeat; background-size: 100% auto; position: static; margin: 0 auto; }

    .hr-btn { max-width: 1200px; left: 50%; -webkit-transform: translateX(-50%); -moz-transform: translateX(-50%); -ms-transform: translateX(-50%); -o-transform: translateX(-50%); transform: translateX(-50%); }


    .hr-swiper { max-width: 1000px; height: auto; position: static; margin: 0 auto; }

    .hr-slide { }
    .banner { padding-bottom: 25.8%; }
  }
</style>
