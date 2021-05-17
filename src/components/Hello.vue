<template>
    <div class="main">
        <!--banner部分-->
        <section>
            <swiper :options="swiperOption">
                <swiper-slide
                    v-for="(slide, index) in slides"
                    :key="index"
                    :style="{background: 'url(' + slide.img + ')' }"
                    class="banner-slide"
                >
                    <div class="banner-top">
                        <div class="banner-top-left">
                            <img src="static/img/sy_banner_bj_a3.png" />
                        </div>
                        <div class="banner-top-center">
                            <img src="static/img/sy_banner_bj_a1.png" />
                            <div class="banner-top-center-title">
                                <img src="static/img/sy_banner_bj_wz.png" />
                            </div>
                        </div>
                        <div class="banner-top-right">
                            <img src="static/img/sy_banner_bj_a2.png" />
                        </div>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </section>
        <!--关于我们-->
        <section>
            <div class="section-tips">
                <span class="section-title">
                    ABOUT US
                    <small>公司概述</small>
                </span>
            </div>
            <div class="about">
                <div class="bg-about-top">
                    <div class="bg-about-top-right">
                        <img :src="about[0].img" />
                    </div>
                    <div class="bg-about-top-left">
                        <img src="static/img/sy_p_a1.png" />
                        <div class="about-font">
                            <h3>{{about[0].title}}</h3>
                            <h5>{{about[0].subtitle}}</h5>
                            <p>{{about[0].content}}</p>
                        </div>
                    </div>
                </div>
                <div class="bg-about-bottom">
                    <div class="bg-about-bottom-left">
                        <img :src="about[1].img" />
                    </div>
                    <div class="bg-about-bottom-right">
                        <div class="about-font">
                            <h3>{{about[1].title}}</h3>
                            <h5>{{about[1].subtitle}}</h5>
                            <p>{{about[1].content}}</p>
                        </div>
                        <img src="static/img/sy_p_a4.png" />
                    </div>
                </div>
                <div class="clear"></div>
                <div class="bg-about-border"></div>
            </div>
        </section>
        <!--企业文化-->
        <section>
            <div class="bg-craftsmanship">
                <div class="craftsmanship">
                    <img src="static/img/craftsmanship.png" />
                    <div class="craftsmanship-new-add">
                        <img src="static/img/sy_pic2.png" class="w100" />
                    </div>
                </div>
            </div>
            <div class="craftsmanship-ul">
                <ul>
                    <li>
                        <div class="craftsmanship-img-bg">
                            <img :src="craftsmanship[0].img" />
                        </div>
                        <div class="craftsmanship-font-bg">
                            <h3 class="font-46e098">{{craftsmanship[0].title}}</h3>
                            <p>{{craftsmanship[0].content}}</p>
                        </div>
                        <div class="craftsmanship-number">
                            <img src="static/img/1.png" />
                        </div>
                    </li>
                    <li>
                        <div class="craftsmanship-img-bg">
                            <img :src="craftsmanship[1].img" />
                        </div>
                        <div class="craftsmanship-font-bg">
                            <h3 class="font-46e098">{{craftsmanship[1].title}}</h3>
                            <p>{{craftsmanship[1].content}}</p>
                        </div>
                        <div class="craftsmanship-number">
                            <img src="static/img/2.png" />
                        </div>
                    </li>
                    <li>
                        <div class="craftsmanship-img-bg">
                            <img :src="craftsmanship[2].img" />
                        </div>
                        <div class="craftsmanship-font-bg bg-46e098">
                            <h3>{{craftsmanship[2].title}}</h3>
                            <p>{{craftsmanship[2].content}}</p>
                        </div>
                        <div class="craftsmanship-number">
                            <img src="static/img/3.png" />
                        </div>
                    </li>
                    <li>
                        <div class="craftsmanship-img-bg">
                            <img :src="craftsmanship[3].img" />
                        </div>
                        <div class="craftsmanship-font-bg bg-46e098">
                            <h3>{{craftsmanship[3].title}}</h3>
                            <p>{{craftsmanship[3].content}}</p>
                        </div>
                        <div class="craftsmanship-number">
                            <img src="static/img/4.png" />
                        </div>
                    </li>
                    <li>
                        <div class="craftsmanship-img-bg">
                            <img :src="craftsmanship[4].img" />
                        </div>
                        <div class="craftsmanship-font-bg bg-46e098">
                            <h3>{{craftsmanship[4].title}}</h3>
                            <p>{{craftsmanship[4].content}}</p>
                        </div>
                        <div class="craftsmanship-number">
                            <img src="static/img/5.png" />
                        </div>
                    </li>
                    <li>
                        <div class="craftsmanship-img-bg">
                            <img :src="craftsmanship[5].img" />
                        </div>
                        <div class="craftsmanship-font-bg">
                            <h3 class="font-46e098">{{craftsmanship[5].title}}</h3>
                            <p>{{craftsmanship[5].content}}</p>
                        </div>
                        <div class="craftsmanship-number">
                            <img src="static/img/6.png" />
                        </div>
                    </li>
                </ul>
            </div>
            <div class="clear"></div>
        </section>
        <!--质量认证-->
        <section class="quality-section">
            <div class="section-tips">
                <span class="section-title">
                    Quality Certification
                    <small>质量认证</small>
                </span>
            </div>
            <div class="quality">
                <div class="quality-info" v-html="quality.info"></div>
                <dl>
                    <dd v-for="(item,index) in quality.button" :key="index">
                        <img :src="item.img" />
                    </dd>
                </dl>
                <div class="clear"></div>
            </div>
        </section>
        <!--新品展示-->
        <section class="newproduct-section">
            <div class="section-tips bg41ac74">
                <span class="section-title">
                    NEW PRODUCTS
                    <small>新品展示</small>
                </span>
            </div>
            <div class="newproduct-container">
                <swiper :options="swiperNew" class="newproductPC">
                    <swiper-slide
                        v-for="(item,index) in newproducts"
                        :key="index"
                        class="newproduct"
                    >
                        <img
                            :src="item.po_pic"
                            class="w100"
                            @click="gofor(item.po_id)"
                        />
                        <section @click="gofor(item.po_id)">
                            <h4
                                class="font-46e098"
                            >{{cutString(item.po_title,cutLenth)}}</h4>
                            <span>{{cutString(item.po_class,cutLenth)}}</span>
                        </section>
                    </swiper-slide>
                </swiper>
                <swiper :options="swiperNewMobile" class="newproductMobile">
                    <swiper-slide
                        v-for="(item,index) in newproducts"
                        :key="index"
                        class="newproduct"
                    >
                        <img
                            :src="item.po_pic"
                            class="w100"
                            @click="gofor(item.po_id)"
                        />
                        <section @click="gofor(item.po_id)">
                            <h4
                                class="font-46e098"
                            >{{cutString(item.po_title,cutLenth)}}</h4>
                            <span>{{cutString(item.po_class,cutLenth)}}</span>
                        </section>
                    </swiper-slide>
                </swiper>
                <div
                    class="arrow left swiper-button-prev newproduct-prev"
                    slot="button-prev"
                ></div>
                <div
                    class="arrow right swiper-button-next newproduct-next"
                    slot="button-next"
                ></div>
            </div>
            <div class="newproduct-section-bottom"></div>
        </section>
        <!--产品展示-->
        <section class="product-section">
            <div class="section-tips bg41ac74">
                <span class="section-title">
                    PRODUCTS
                    <small>产品展示</small>
                </span>
            </div>
            <div class="product-category">
                <swiper
                    :options="productMobile"
                    class="productMobile"
                    ref="swiperThumbs"
                >
                    <swiper-slide
                        v-for="(item,index) in category"
                        :key="index"
                        class="prodcut-slide"
                    >
                        <a
                            :class="[index==cateCurrent?'active':'']"
                            @click="cateClick(index)"
                        >{{cutString(item.pc_title,SubcutLenth)}}</a>
                    </swiper-slide>
                </swiper>
                <div class="product-category-btn">
                    <i
                        class="left fas fa-angle-left prodcut-prev"
                        @click="catePrev"
                    ></i>
                    <i
                        class="right fas fa-angle-right prodcut-next"
                        @click="cateNext"
                    ></i>
                </div>
                <div class="clear"></div>
            </div>
            <swiper
                :options="produtctDetailOption"
                class="produtctDetail-slide"
                ref="swiperTop"
            >
                <swiper-slide
                    class="product-show swiper-no-swiping"
                    v-for="(item,index) in category"
                    :key="index"
                >
                    <div class="product-category-info">
                        <img :src="item.pc_img" />
                    </div>
                    <div class="product-category-list">
                        <h3>{{cutString(item.pc_title,SubcutLenth)}}</h3>
                        <small>产品说明</small>
                        <hr />
                        <ul>
                            <li
                                v-for="(item1,index1) in item.button"
                                :key="index1"
                                @click="gofor(item1.po_id)"
                            >
                                <img :src="item1.po_pic" class="w100" />
                                <section>
                                    <h3
                                        class="font-46e098"
                                    >{{cutString(item1.po_title,cutLenth)}}</h3>
                                    <span>{{cutString(item1.po_class,cutLenth)}}</span>
                                </section>
                            </li>
                        </ul>
                        <a class="product-category-more" href="products.html">
                            <i class="fa fa-angle-double-down mr_10"></i>更多产品
                        </a>
                    </div>
                    <div class="clear"></div>
                </swiper-slide>
            </swiper>
        </section>
        <!--底部LOGO-->
        <section>
            <div class="ad">
                <img src="static/img/logo1.png" />
                <div class="ad-title">
                    <h3>TianJin Rikevita Food CO.,LTD</h3>
                    <h5>天津理研维他食品有限公司</h5>
                </div>
            </div>
        </section>
        <!--联系我们-->
        <section class="contact-section">
            <div class="section-tips bgccc">
                <span class="section-title">
                    CONTACT US
                    <small>联系我们</small>
                </span>
            </div>
            <div class="contact">
                <div class="contact-left">
                    <ul>
                        <li>地址：{{contactInfo.address}}</li>
                        <li>电话：{{contactInfo.tel}}</li>
                        <li>传真：{{contactInfo.tex}}</li>
                        <li>邮箱：{{contactInfo.email}}</li>
                        <li>邮编：{{contactInfo.code}}</li>
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
        <!--销售公司-->
        <section class="sale">
            <div class="sale-left">
                <h3>
                    <img src="static/img/logo_border.png" />
                    <span class="slfont">
                        TianJin Rikevita Food CO.,LTD
                        <span
                            class="word"
                        >天津理研维他食品有限公司</span>
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
        <!--地图-->
        <section>
            <div id="allmap"></div>
        </section>
    </div>
</template>
<script>
import $ from 'jquery'
import { MP } from '../../static/js/map.js'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import config from 'config'
import swal from 'sweetalert'
import axios from 'axios'
export default {
    name: 'hello',
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            SubcutLenth: 0,
            cutLenth: 0,
            ak: 'yaDRGoon5YoRzAAwH781yUgn',
            cateCurrent: 0,
            swiperOption: {
                autoplay: true,
                pagination: {
                    el: '.swiper-pagination'
                }
            },
            swiperNew: {
                slidesPerView: 4,
                spaceBetween: 30,
                navigation: {
                    nextEl: '.newproduct-next',
                    prevEl: '.newproduct-prev'
                }
            },
            swiperNewMobile: {
                slidesPerView: 2,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.newproduct-next',
                    prevEl: '.newproduct-prev'
                }
            },
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
            quality: {},
            contactInfo: {},
            slides: [],
            about: [{ title: '', subtitle: '', content: '' }, { title: '', subtitle: '', content: '' }],
            craftsmanship: [
                { title: '', content: '', img: '' },
                { title: '', content: '', img: '' },
                { title: '', content: '', img: '' },
                { title: '', content: '', img: '' },
                { title: '', content: '', img: '' },
                { title: '', content: '', img: '' }
            ],
            newproducts: [],
            category: []
        }
    },
    methods: {
        cutString(val, len) {
            return $.cutString(val, len)
        },
        load() {
            var that = this
            var postdata = '公司概述'

            var url = config.HttpUrl + '/handlers/text.ashx?method=get'
            axios.post(url, postdata).then(function(response) {
                var json = response.data
                if (json.error === 0) {
                    that.about = JSON.parse(unescape(decodeURI(json.content)))
                }
            })

            postdata = '企业文化'
            axios.post(url, postdata).then(function(response) {
                var json = response.data
                if (json.error === 0) {
                    that.craftsmanship = JSON.parse(unescape(decodeURI(json.content)))
                }
            })
            postdata = '质量认证'
            axios.post(url, postdata).then(function(response) {
                var json = response.data
                if (json.error === 0) {
                    that.quality = JSON.parse(unescape(decodeURI(json.content)))
                }
            })
            postdata = '联系我们'
            axios.post(url, postdata).then(function(response) {
                var json = response.data
                if (json.error === 0) {
                    that.contactInfo = JSON.parse(unescape(decodeURI(json.content)))
                }
            })

            url = config.HttpUrl + '/handlers/text.ashx?method=banner'
            axios.post(url).then(function(response) {
                var json = response.data
                if (json.error === 0) {
                    that.slides = JSON.parse(decodeURI(json.content)).button
                }
            })

            url = config.HttpUrl + '/handlers/product.ashx?method=getall'
            postdata = { po_class: 0, po_search: '', po_new: 1, page: 1, pagesize: 8 }
            axios.post(url, JSON.stringify(postdata)).then(function(response) {
                var json = response.data
                that.newproducts = json.button
                that.newproducts.forEach((item, i) => {
                    var url = config.HttpUrl + '/handlers/product.ashx?method=getpclname'
                    axios.post(url, String(item.po_class)).then(function(response) {
                        var json = response.data
                        item.po_class = json.content
                    })
                })
            })

            url = config.HttpUrl + '/handlers/product.ashx?method=getpcl'
            axios.post(url).then(function(response) {
                var json = response.data
                if (json.error === 0) {
                    that.category = JSON.parse(json.content).button
                    that.category.forEach((item, i) => {
                        url = config.HttpUrl + '/handlers/product.ashx?method=getall'
                        postdata = { po_class: item.pc_id, po_search: '', po_new: 0, page: 1, pagesize: 3 }
                        axios.post(url, JSON.stringify(postdata)).then(function(response1) {
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
            if (this.cateCurrent > 0) {
                this.cateCurrent--
                const swiperTop = this.$refs.swiperTop.swiper
                swiperTop.slidePrev()
            }
        },
        cateNext() {
            if (this.cateCurrent < this.category.length - 1) {
                this.cateCurrent++
                const swiperTop = this.$refs.swiperTop.swiper
                swiperTop.slideNext()
            }
        }
    },
    created() {
        var that = this
        that.load()
        that.docmentWith = document.documentElement.scrollWidth
        if (that.docmentWith > 768) {
            that.SubcutLenth = 40
            that.cutLenth = 50
        } else {
            that.SubcutLenth = Math.round(that.docmentWith / 35)
            that.cutLenth = Math.round(that.docmentWith / 35)
        }
    },
    mounted() {
        var that = this
        that.$nextTick(() => {
            MP(that.ak).then(BMap => {
                // 百度地图API功能
                var mp = new BMap.Map('allmap') //创建地图实例
                mp.centerAndZoom(new BMap.Point(117.229494, 39.025543), 17) //设定地图的中心点和坐标并将地图显示在地图容器中
                mp.enableDragging() //禁用地图拖拽事件
                mp.disableScrollWheelZoom() //禁用地图滚轮放大缩小
                mp.disableDoubleClickZoom() //禁用鼠标双击放大
                mp.disableKeyboard() //禁用键盘上下左右键移动地图，默认禁用(可不写)

                //1、定义构造函数并继承Overlay
                //定义自定义覆盖物的构造函数
                function ComplexCustomOverlay(point) {
                    this._point = point
                }
                // 继承API的BMap.Overlay
                ComplexCustomOverlay.prototype = new BMap.Overlay()
                //2、初始化自定义覆盖物
                // 实现初始化方法
                ComplexCustomOverlay.prototype.initialize = function(map) {
                    // 保存map对象实例
                    this._map = map
                    // 创建p元素，作为自定义覆盖物的容器
                    var p = (this._p = document.createElement('p'))
                    p.style.position = 'absolute'
                    p.style.zIndex = BMap.Overlay.getZIndex(this._point.lat) //聚合功能?
                    var arrow = (this._arrow = document.createElement('img'))
                    arrow.src = 'static/img/map_tip.png'
                    arrow.style.position = 'absolute'
                    arrow.style.width = '340px'
                    arrow.style.height = '240px'
                    arrow.style.top = '-120px'
                    arrow.style.left = '-170px'
                    p.appendChild(arrow)
                    // 将p添加到覆盖物容器中
                    mp.getPanes().labelPane.appendChild(p) //getPanes(),返回值:MapPane,返回地图覆盖物容器列表  labelPane呢???
                    // 需要将p元素作为方法的返回值，当调用该覆盖物的show、
                    // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
                    return p
                }
                //3、绘制覆盖物
                ComplexCustomOverlay.prototype.draw = function() {
                    var map = this._map
                    var pixel = map.pointToOverlayPixel(this._point)
                    this._p.style.left = pixel.x + 'px'
                    this._p.style.top = pixel.y + 'px'
                }
                //4、自定义覆盖物添加事件方法
                ComplexCustomOverlay.prototype.addEventListener = function(event, fun) {
                    this._p['on' + event] = fun
                }
                var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(117.229494, 39.025543))
                mp.addOverlay(myCompOverlay) //将标注添加到地图中
                //5、为自定义覆盖物添加点击事件
                myCompOverlay.addEventListener('click', function() {})
            })
        })
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
