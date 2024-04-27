<template>
	<view class="container container28706">
		<view  class="flex flex-wrap diygw-col-24 flex-direction-column">


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
		<view class="clearfix"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 list: [],
			};
		},
		onShow() {
      this.init();
		},
		onLoad(option) {

			if (option) {
				this.setData({
					globalOption: this.getOption(option)
				});
			}


		},
		methods: {
			async init() {
        await this.getData();
      },

      async getData(param) {
        let thiz = this;

        let http_url = "notice_List";
        let http_data = {  };
        let http_header = {};

        let hot = await this.$http.get(http_url, http_data, http_header, "json");

        this.list = hot.data;
      },

      navigateTo(item) {
         uni.navigateTo({
           url: '/pages/gg/View?id='+item.nid
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
	.container28706 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container28706 {
	}
</style>
