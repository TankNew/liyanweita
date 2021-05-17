<template>
  <section class="main">
    <div class="banner" :style="{background: 'url(' + bannerImg + ')' }">
      <div class="banner-title-bg">
        <div class="banner-title">
          <h4>组织结构</h4>
          <h2>company organization</h2>
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
          company organization
          <small>组织结构</small>
        </span>
      </div>
    </section>
    <section class="organization">
      <!--第一层-->
      <ul class="o1">
        <li v-for="(item,index) in organization" :key="index">
          <a @click="choose('o1'+index+item.name)">
            {{item.name}}
            <span v-show="currentIndex=='o1'+index+item.name"><img :src="item.img" /></span>
          </a>
          <div class="o-line-down" v-if="item.children.length>0"></div>
          <!--第二层-->
            <ul :class="['o2',item.children.length>1?'border-left':'']">
              <li v-for="(item1,index1) in item.children" :key="index1">
                <div class="o-line-up"></div>
                <a @click="choose('o2'+index+index1+item1.name)">
                  {{item1.name}}
                  <span v-show="currentIndex=='o2'+index+index1+item1.name"><img :src="item1.img" /></span>
                </a>
                <div class="o-line-down" v-if="item1.children.length>0"></div>
                <!--第三层-->
                <ul :class="['o3',item1.children.length>1?'border-left':'']">
                  <li v-for="(item2,index2) in item1.children" :key="index2">
                    <div class="o-line-up"></div>
                    <a @click="choose('o3'+index+index1+index2+item2.name)">
                      {{item2.name}}
                      <span v-show="currentIndex=='o3'+index+index1+index2+item2.name"><img :src="item2.img" /></span>
                    </a>
                    <div class="o-line-down" v-if="item2.children.length>0"></div>
                    <!--第四层-->
                    <ul :class="['o4',item2.children.length>1?'border-left':'']">
                      <li v-for="(item3,index3) in item2.children" :key="index3">
                        <div class="o-line-up"></div>
                        <a>
                          {{item3.name}}
                        </a>
                      </li>
                    </ul>
                    <!--第四层-->
                  </li>
                </ul>
                <!--第三层-->
              </li>
            </ul>
            <!--第二层-->
        </li>
      </ul>
      <!--第一层-->
    </section>
  </section>
</template>
<script>
  import $ from 'jquery'
  import config from 'config'
  import swal from 'sweetalert'
  import axios from 'axios'
  export default {
    name: 'aboutusOrganization',
    data() {
      return {
        organization: [],
        currentIndex: '',
        currentUrl: ''
      }
    },
    methods: {
      load() {
        var that = this
        var url = config.HttpUrl + '/handlers/text.ashx?method=get'
        var postdata = '组织结构'
        axios.post(url, postdata).then(function (response) {
          var json = response.data
          if (json.error === 0) {
            that.organization = JSON.parse(decodeURIComponent(json.content))
            console.log(JSON.stringify(that.organization))
          }
        })
      },
      choose(name) {
        if (this.currentIndex !== name)
          this.currentIndex = name
        else
          this.currentIndex = ''
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
    }
  }
</script>
<style scoped>
  /*组织结构图设定*/

  .organization { font-size: 9px; letter-spacing: 5px; overflow: hidden; width: 100%; padding:10px; }
    .organization ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; justify-content: center; align-content: center; float: left; }
    .organization li { text-align: center; flex-shrink: 0; }

    .organization a { display: block; text-align: center; background-color: #5acc98; padding: 10px 5px; margin: 5px; box-sizing: border-box; cursor: pointer; color: white; writing-mode: vertical-lr; float: left; height: 120px; }


      .organization a > span { position: fixed; z-index: 999; width: 320px; border-radius: 5px; border: 4px solid #3bb677; top: 50%; left: calc(50% - 160px); display: block; box-sizing: border-box; }
        .organization a > span > img { width: 312px; }
      .organization a:hover { background-color: #3bb677; text-decoration: none; }

  .o-line-up { float: left; }
  .o-line-down { float: left; }

  .o-line-up { position: relative; padding-left: 10px; height: 40px; }
    .o-line-up:after { content: ''; position: absolute; top: 20px; left: 0; border-top: 1px solid #5acc98; width: 15px; }


  .o-line-down { position: relative; padding-left: 10px; height: 40px; }
    .o-line-down:before { content: ''; position: absolute; left: -5px; top: 20px; border-top: 1px solid #5acc98; width: 15px; }

  .o3 a, .o4 a { padding: 10px; writing-mode: horizontal-tb; width: 100px; letter-spacing: 3px; height: auto; }

  .border-left { margin-bottom: 20px; }
    .border-left > li { border-left: 1px solid #5acc98; }



  @media (min-width: 768px) {
    .organization { width: 95%; max-width: 1200px; margin: 0 auto; padding-bottom: 200px; letter-spacing: 5px; overflow: hidden; font-size: 18px; }

      .organization ul { list-style: none; margin: 0; padding: 0; clear: both; display: flex; flex-direction: row; justify-content: center; align-content: center; float: none; }

      .organization li { text-align: center; flex-shrink: 0; border: none !important; }

      .organization a { display: inline-block; text-align: center; background-color: #5acc98; padding: 10px 20px; margin: 5px; clear: both; box-sizing: border-box; cursor: pointer; position: relative; color: white; float: none; writing-mode: horizontal-tb; width: auto; height: auto; }

        .organization a > span { position: absolute; z-index: 999; width: 320px; border-radius: 5px; border: 4px solid #3bb677; top: calc(100% + 20px); left: 50%; display: block; box-sizing: border-box; -webkit-transform: translateX(-50%); -moz-transform: translateX(-50%); -ms-transform: translateX(-50%); -o-transform: translateX(-50%); transform: translateX(-50%); }
          .organization a > span > img { width: 312px; }
          .organization a > span:before { position: absolute; z-index: 999; content: ''; border-left: 2px solid #3bb677; height: 22px; left: calc(50% - 1px); top: -25px; box-sizing: border-box; }
        .organization a:hover { background-color: #3bb677; text-decoration: none; }

    .o3 a, .o4 a { height: 180px; padding: 10px; writing-mode: vertical-lr; letter-spacing: 5px; width: auto; }

    .o-line-up { float: none; }
    .o-line-down { float: none; }
    .o3 .o-line-down, .o4 .o-line-down { padding-bottom: 8px; }

    .o-line-up { position: relative; padding-bottom: 15px; padding-left: 0; height: auto; }

      .o-line-up:before { content: ''; position: absolute; top: 0; left: 50%; border-left: 1px solid #5acc98; height: 20px; }

      .o-line-up:after { content: ''; position: absolute; top: 0; left: 50%; border-top: 1px solid #5acc98; width: 100%; -webkit-transform: translateX(-50%); -moz-transform: translateX(-50%); -ms-transform: translateX(-50%); -o-transform: translateX(-50%); transform: translateX(-50%); }

    .o-line-down { position: relative; padding-bottom: 15px; padding-left: 0; height: auto; }
      .o-line-down:before { content: ''; position: absolute; left: 50%; top: auto !important; bottom: 0; border-left: 1px solid #5acc98; height: 20px; width: auto; }

    .organization li:nth-child(1) > .o-line-up:after { width: 50%; -webkit-transform: translateX(0); -moz-transform: translateX(0); -ms-transform: translateX(0); -o-transform: translateX(0); transform: translateX(0); }

    .organization li:nth-last-child(1) > .o-line-up:after { width: 50%; -webkit-transform: translateX(0); -moz-transform: translateX(0); -ms-transform: translateX(0); -o-transform: translateX(0); transform: translateX(0); left: 0; }

    .organization li:only-child > .o-line-up:after { width: 50%; left: 50%; border-top: 1px solid #5acc98; -webkit-transform: translateX(-50%); -moz-transform: translateX(-50%); -ms-transform: translateX(-50%); -o-transform: translateX(-50%); transform: translateX(-50%); }
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
