<template>
  <!-- 过渡动画 -->
  <transition name="fade">
    <div class="img-view" v-show="ishow">
      <!-- 遮罩层 -->
      <div class="img-layer">
        <div class="img-container">
          <swiper :options="SwiperOption" ref="swiperThumbs" @slideChange="slideChanged">
            <swiper-slide v-for="(item,index) in imgJson" :key="index">
              <img :src="item.p_pic">
            </swiper-slide>
          </swiper>
          <div class="img-close-bar" @click="close"><i class="fa-times fas"></i></div>
          <div class="img-toolbar">
            <span class="img-info">{{currentTitle}}</span>
            <i class="fas fa-angle-left img-btn left"></i>
            <i class="fas fa-angle-right img-btn right"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    components: {
      swiper,
      swiperSlide
    },
    props: ['imgIndex', 'imgJson'],
    data() {
      return {
        ishow: true,
        currentTitle: '',
        SwiperOption: {
          slidesPerView: 1,
          spaceBetween: 10,
          touchRatio: 0.2,
          slideToClickedSlide: true,
          autoHeight: true,
          navigation: {
            nextEl: '.right',
            prevEl: '.left'
          }
        }
      }
    },
    methods: {
      close() {
        var that = this
        that.ishow = false
        setTimeout(function () {
          that.$emit('clickit')
        }, 0)
      },
      slideChanged() {
        var num = this.$refs.swiperThumbs.swiper.activeIndex
        this.$emit('updateImgIndex', num)
        this.currentTitle = this.imgJson[num].p_title
      }
    },
    created() {
      this.SwiperOption.initialSlide = this.imgIndex
    },
    mounted() {
      var that = this
      that.$nextTick(() => {
        that.currentTitle = that.imgJson[that.imgIndex].p_title
      })
    }
  }
</script>
<style scoped>
  .fade-enter-active, .fade-leave-active { transition: opacity .5s; }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ { opacity: 0; }

  .img-view { position: relative; width: 100%; height: 100%; z-index: 999; }

    .img-view .img-layer { position: fixed; top: 0; left: 0; background: rgba(0,0,0,0.3); width: 100%; height: 100%; overflow: hidden; }

    .img-view .img-container { display: block; position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%,-50%); -moz-transform: translate(-50%,-50%); -ms-transform: translate(-50%,-50%); -o-transform: translate(-50%,-50%); transform: translate(-50%,-50%); z-index: 1000; border: 2px solid rgba(51,204,153,0.8); width: 70%; }

      .img-view .img-container img { cursor: pointer; width: 100%; }
  .img-toolbar { background-color: rgba(51,204,153,0.8); height: 50px; width: 100%; color: #fff; position: relative; }
    .img-toolbar > span { position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%,-50%); -moz-transform: translate(-50%,-50%); -ms-transform: translate(-50%,-50%); -o-transform: translate(-50%,-50%); transform: translate(-50%,-50%); }

  .img-btn { position: absolute; top: 50%; -webkit-transform: translate(0,-50%); -moz-transform: translate(0,-50%); -ms-transform: translate(0,-50%); -o-transform: translate(0,-50%); transform: translate(0,-50%); font-size: 30px; outline: none; padding: 10px 20px; }

    .img-btn.left { left: 0; }
    .img-btn.right { right: 0; }

  .img-close-bar { position: absolute; font-size: 24px; background-color: rgba(51,204,153,0.8); color: #fff; right: 0; top: -30px; width: 30px; height: 30px; text-align: center; cursor: pointer; }

  @media (min-width: 768px) {

    .img-view .img-container { width: 480px; }
  }
</style>
