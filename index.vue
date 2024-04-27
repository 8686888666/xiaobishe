<template>
	<view class="container container28706">
		<view class="diygw-col-24 search-clz">
			<view class="diygw-search">
				<view class="flex1 align-center flex padding-xs solid radius">
					<text style="color: #555 !important" class="diy-icon-search"></text>
					<input class="flex1" name="search" type="" v-model="search" placeholder="请输入关键字" />
				</view>
				<view style="color: #f7f7f7 !important" class="diygw-tag margin-left-xs radius-xs green" @tap="searchtap"> 搜索 </view>
			</view>
		</view>
		<view class="flex diygw-col-24 swiper-clz">
			<swiper class="swiper" indicator-color="rgba(51, 51, 51, 0.39)" indicator-active-color="#fff" indicator-dots="true" autoplay interval="3000" circular="true" style="height: 300rpx">
				<swiper-item class="diygw-swiper-item">
					<view class="diygw-swiper-item-wrap">
						<image src="/static/pic1.jpg" class="diygw-swiper-image"></image>
					</view>
				</swiper-item>
				<swiper-item class="diygw-swiper-item">
					<view class="diygw-swiper-item-wrap">
						<image src="/static/pic2.jpg" class="diygw-swiper-image"></image>
					</view>
				</swiper-item>
				<swiper-item class="diygw-swiper-item">
					<view class="diygw-swiper-item-wrap">
						<image src="/static/pic3.jpg" class="diygw-swiper-image"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="diygw-title flex diygw-col-24 title-clz">
			<view class="title font-normal"> <text class="diy-icon-tixing"></text> 公告 </view>
			<view class="more"  @tap="gengduo()">
				更多
				<text class="diy-icon-right"></text>
			</view>
		</view>
		<view class="flex flex-wrap diygw-col-24 flex-direction-column">

			<view class="flex flex-wrap diygw-col-24 items-center flex15-clz"
      v-for="(item, index) in list" :key="index" :index="index" @tap="navigateTo(item)"
      >
				<view class="flex flex-wrap diygw-col-0 flex-direction-column flex16-clz">
					<view class="diygw-col-0 text9-clz">
          {{index+1}}
          </view>
				</view>
				<view class="diygw-col-0 text10-clz">{{item.ntitle}} </view>
			</view>



		</view>
		<view class="diygw-title flex diygw-col-24 title1-clz">
			<view class="title font-normal"> <text class="diy-icon-titles"></text> 最新菜品 </view>
			<view class="more" @tap="gengduo2">
				更多
				<text class="diy-icon-right"></text>
			</view>
		</view>
		<view class="flex flex-wrap diygw-col-24 flex13-clz">


			<view class="flex diygw-col-12 flex-direction-column items-center flex-wrap flex5-clz"
      v-for="(item, index) in list2" :key="index" :index="index" @tap="navigateTo2(item)"
      >
				<image :src="url+item.pimage" class="image2-size diygw-image diygw-col-24 image2-clz" mode="aspectFill"></image>
				<view class="diygw-text-line1 diygw-col-24 text7-clz"> {{item.pname}}</view>
				<view class="flex flex-wrap diygw-col-24 items-center flex6-clz">
					<view class="diygw-col-0 text-clz "> ￥{{item.pprice}} </view>
				</view>
			</view>


		</view>

    <view class="diygw-title flex diygw-col-24 title1-clz">
      <view class="title font-normal"> <text class="diy-icon-titles"></text> 热门菜品 </view>
      <view class="more" @tap="gengduo2">
        更多
        <text class="diy-icon-right"></text>
      </view>
    </view>
    <view class="flex flex-wrap diygw-col-24 flex13-clz">


      <view class="flex diygw-col-12 flex-direction-column items-center flex-wrap flex5-clz"
            v-for="(item, index) in list3" :key="index" :index="index" @tap="navigateTo2(item)"
      >
        <image :src="url+item.pimage" class="image2-size diygw-image diygw-col-24 image2-clz" mode="aspectFill"></image>
        <view class="diygw-text-line1 diygw-col-24 text7-clz"> {{item.pname}}</view>
        <view class="flex flex-wrap diygw-col-24 items-center flex6-clz">
          <view class="diygw-col-0 text-clz "> ￥{{item.pprice}} </view>
        </view>
      </view>


    </view>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	import siteinfo from "../../siteinfo";

  export default {
		data() {
			return {
        list: [],
        list2: [],
        list3: [],
				search: '',
        url:siteinfo.fileBasePath
			};
		},
		onShow() {
      this.init();
		},
		onLoad(option) {
			this.setCurrentPage(this);
			if (option) {
				this.setData({
					globalOption: this.getOption(option)
				});
			}


		},
		methods: {
			async init() {
        await this.getData();

        console.log(this.url)
      },
      async getData(param) {
        let thiz = this;

        let http_url = "Index_List";
        let http_data = {  };
        let http_header = {};

        let hot = await this.$http.get(http_url, http_data, http_header, "json");

        this.list = hot.data;
        this.list2 = hot.data2;
        this.list3 = hot.data3;
      },

      gengduo(){
        uni.navigateTo({
          url: '/pages/gg/list'
        })
      },
      gengduo2(){
        uni.switchTab({
          url: '/pages/pro/list'
        })
      },

      navigateTo(item) {
        uni.navigateTo({
          url: '/pages/gg/View?id='+item.nid
        })
      },

      navigateTo2(item) {
        uni.navigateTo({
          url: '/pages/pro/proView?id='+item.pid
        })
      },

      searchtap(){

        //判断是否为空
        if(this.search == ''){
          uni.showToast({
            title: '请输入要搜索的关键词',
            icon: 'none',
            duration: 2000
          })
          return;
        }

        uni.setStorageSync("k", this.search);


        uni.switchTab({
          url: '/pages/pro/list'
        })
      },
		}
	};
</script>

<style lang="scss" scoped>
	.flex15-clz {
		border-bottom-left-radius: 12rpx;
		font-weight: bold;
		font-size: 28rpx !important;
		border-top-right-radius: 0rpx;
		margin-right: 20rpx;
		background-color: #daffd2;
		margin-left: 20rpx;
		overflow: hidden;
		width: calc(100% - 20rpx - 20rpx) !important;
		border-top-left-radius: 12rpx;
		margin-top: 20rpx;
		border-bottom-right-radius: 0rpx;
		margin-bottom: 20rpx;
	}
	.flex16-clz {
		background-color: #07c160;
		transform: translate(0rpx, 0rpx) skew(-25deg, 0deg);
		color: #ffffff;
		font-weight: bold;
		font-size: 30rpx !important;
	}
	.text9-clz {
		background-color: #07c160;
		padding-top: 16rpx;
		transform: translate(-16rpx, 0rpx) skew(25deg, 0deg);
		color: #ffffff;
		font-weight: bold;
		padding-left: 40rpx;
		font-size: 30rpx !important;
		padding-bottom: 16rpx;
		padding-right: 20rpx;
	}
	.text10-clz {
		padding-top: 0rpx;
		flex: 1;
		padding-left: 20rpx;
		padding-bottom: 0rpx;
		padding-right: 20rpx;
	}
	.flex18-clz {
		border-bottom-left-radius: 12rpx;
		font-weight: bold;
		font-size: 28rpx !important;
		border-top-right-radius: 0rpx;
		margin-right: 20rpx;
		background-color: #daffd2;
		margin-left: 20rpx;
		overflow: hidden;
		width: calc(100% - 20rpx - 20rpx) !important;
		border-top-left-radius: 12rpx;
		margin-top: 20rpx;
		border-bottom-right-radius: 0rpx;
		margin-bottom: 20rpx;
	}
	.flex19-clz {
		background-color: #07c160;
		transform: translate(0rpx, 0rpx) skew(-25deg, 0deg);
		color: #ffffff;
		font-weight: bold;
		font-size: 30rpx !important;
	}
	.text13-clz {
		background-color: #07c160;
		padding-top: 16rpx;
		transform: translate(-16rpx, 0rpx) skew(25deg, 0deg);
		color: #ffffff;
		font-weight: bold;
		padding-left: 40rpx;
		font-size: 30rpx !important;
		padding-bottom: 16rpx;
		padding-right: 20rpx;
	}
	.text14-clz {
		padding-top: 0rpx;
		flex: 1;
		padding-left: 20rpx;
		padding-bottom: 0rpx;
		padding-right: 20rpx;
	}
	.flex1-clz {
		border-bottom-left-radius: 12rpx;
		font-weight: bold;
		font-size: 28rpx !important;
		border-top-right-radius: 0rpx;
		margin-right: 20rpx;
		background-color: #daffd2;
		margin-left: 20rpx;
		overflow: hidden;
		width: calc(100% - 20rpx - 20rpx) !important;
		border-top-left-radius: 12rpx;
		margin-top: 20rpx;
		border-bottom-right-radius: 0rpx;
		margin-bottom: 20rpx;
	}
	.flex17-clz {
		background-color: #07c160;
		transform: translate(0rpx, 0rpx) skew(-25deg, 0deg);
		color: #ffffff;
		font-weight: bold;
		font-size: 30rpx !important;
	}
	.text11-clz {
		background-color: #07c160;
		padding-top: 16rpx;
		transform: translate(-16rpx, 0rpx) skew(25deg, 0deg);
		color: #ffffff;
		font-weight: bold;
		padding-left: 40rpx;
		font-size: 30rpx !important;
		padding-bottom: 16rpx;
		padding-right: 20rpx;
	}
	.text12-clz {
		padding-top: 0rpx;
		flex: 1;
		padding-left: 20rpx;
		padding-bottom: 0rpx;
		padding-right: 20rpx;
	}
	.flex13-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.flex5-clz {
		margin-left: 10rpx;
		width: calc(50% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.image2-clz {
		border-bottom-left-radius: 12rpx;
		overflow: hidden;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
	}
	.image2-size {
		height: 300rpx !important;
		width: 100%;
	}
	.text7-clz {
		font-size: 30rpx !important;
	}
	.flex6-clz {
		flex: 1;
	}
	.text-clz {
		padding-top: 10rpx;
		color: #ff644c;
		font-weight: bold;
		padding-left: 0rpx;
		font-size: 36rpx !important;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text1-clz {
		padding-top: 10rpx;
		text-decoration: line-through;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.flex2-clz {
		margin-left: 10rpx;
		width: calc(50% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.image-clz {
		border-bottom-left-radius: 12rpx;
		overflow: hidden;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
	}
	.image-size {
		height: 200rpx !important;
		width: 100%;
	}
	.text2-clz {
		font-size: 30rpx !important;
	}
	.flex8-clz {
		flex: 1;
	}
	.text3-clz {
		padding-top: 10rpx;
		color: #ff644c;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 0rpx;
	}
	.text4-clz {
		padding-top: 10rpx;
		color: #ff644c;
		font-weight: bold;
		padding-left: 0rpx;
		font-size: 36rpx !important;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text5-clz {
		padding-top: 10rpx;
		text-decoration: line-through;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.flex3-clz {
		margin-left: 10rpx;
		width: calc(50% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.image4-clz {
		border-bottom-left-radius: 12rpx;
		overflow: hidden;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
	}
	.image4-size {
		height: 200rpx !important;
		width: 100%;
	}
	.text6-clz {
		font-size: 30rpx !important;
	}
	.flex4-clz {
		flex: 1;
	}
	.text17-clz {
		padding-top: 10rpx;
		color: #ff644c;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 0rpx;
	}
	.text18-clz {
		padding-top: 10rpx;
		color: #ff644c;
		font-weight: bold;
		padding-left: 0rpx;
		font-size: 36rpx !important;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text19-clz {
		padding-top: 10rpx;
		text-decoration: line-through;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.flex7-clz {
		margin-left: 10rpx;
		width: calc(50% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.image1-clz {
		border-bottom-left-radius: 12rpx;
		overflow: hidden;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
	}
	.image1-size {
		height: 200rpx !important;
		width: 100%;
	}
	.text8-clz {
		font-size: 30rpx !important;
	}
	.flex9-clz {
		flex: 1;
	}
	.text15-clz {
		padding-top: 10rpx;
		color: #ff644c;
		font-weight: bold;
		padding-left: 0rpx;
		font-size: 36rpx !important;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text16-clz {
		padding-top: 10rpx;
		text-decoration: line-through;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.flex10-clz {
		padding-top: 20rpx;
		border-bottom-left-radius: 12rpx;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		border-top-right-radius: 12rpx;
		margin-right: 20rpx;
		margin-left: 20rpx;
		box-shadow: 0rpx 2rpx 6rpx rgba(31, 31, 31, 0.16);
		overflow: hidden;
		width: calc(100% - 20rpx - 20rpx) !important;
		border-top-left-radius: 12rpx;
		margin-top: 20rpx;
		border-bottom-right-radius: 12rpx;
		margin-bottom: 20rpx;
		padding-right: 20rpx;
	}
	.flex11-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.image3-clz {
		border-bottom-left-radius: 12rpx;
		overflow: hidden;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
	}
	.image3-size {
		height: 160rpx !important;
		width: 280rpx !important;
	}
	.flex14-clz {
		padding-top: 0rpx;
		flex: 1;
		padding-left: 20rpx;
		padding-bottom: 0rpx;
		padding-right: 0rpx;
	}
	.text20-clz {
		font-size: 30rpx !important;
	}
	.text21-clz {
		color: #4b5b76;
	}
	.flex20-clz {
		flex: 1;
		border-bottom: 2rpx solid #eee;
	}
	.text22-clz {
		padding-top: 10rpx;
		color: #ff644c;
		font-weight: bold;
		padding-left: 0rpx;
		font-size: 36rpx !important;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text23-clz {
		padding-top: 10rpx;
		text-decoration: line-through;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.flex21-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.image5-clz {
		border-bottom-left-radius: 12rpx;
		overflow: hidden;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
	}
	.image5-size {
		height: 160rpx !important;
		width: 280rpx !important;
	}
	.flex23-clz {
		padding-top: 0rpx;
		flex: 1;
		padding-left: 20rpx;
		padding-bottom: 0rpx;
		padding-right: 0rpx;
	}
	.text24-clz {
		font-size: 30rpx !important;
	}
	.text25-clz {
		color: #4b5b76;
	}
	.flex24-clz {
		flex: 1;
		border-bottom: 2rpx solid #eee;
	}
	.text26-clz {
		padding-top: 10rpx;
		color: #ff644c;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 0rpx;
	}
	.text27-clz {
		padding-top: 10rpx;
		color: #ff644c;
		font-weight: bold;
		padding-left: 0rpx;
		font-size: 36rpx !important;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text28-clz {
		padding-top: 10rpx;
		text-decoration: line-through;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.flex25-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.image6-clz {
		border-bottom-left-radius: 12rpx;
		overflow: hidden;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
	}
	.image6-size {
		height: 160rpx !important;
		width: 280rpx !important;
	}
	.flex27-clz {
		padding-top: 0rpx;
		flex: 1;
		padding-left: 20rpx;
		padding-bottom: 0rpx;
		padding-right: 0rpx;
	}
	.text29-clz {
		font-size: 30rpx !important;
	}
	.text30-clz {
		color: #4b5b76;
	}
	.flex28-clz {
		flex: 1;
		border-bottom: 2rpx solid #eee;
	}
	.text31-clz {
		padding-top: 10rpx;
		color: #ff644c;
		font-weight: bold;
		padding-left: 0rpx;
		font-size: 36rpx !important;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text32-clz {
		padding-top: 10rpx;
		text-decoration: line-through;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.container28706 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container28706 {
	}
</style>
