<template>
	<view class="container container28706"
  v-for="(item, index) in list" :key="index" :index="index"
  >
		<view class="flex flex-wrap diygw-col-24 flex-direction-column items-end flex5-clz">
			<view class="flex flex-wrap diygw-col-24 justify-center items-end flex2-clz">
				<view class="flex flex-wrap diygw-col-0 flex-direction-column flex8-clz">
					<view class="diygw-col-0 text6-clz"> </view>
					<view class="diygw-col-0"> {{item.ntitle}} </view>
				</view>
			</view>
			<view class="flex flex-wrap diygw-col-24 flex-direction-column flex7-clz">
				<view class="diygw-col-24 text-clz"> 发布时间：{{item.npubtime}} </view>
				<view class="diygw-col-24 text4-clz">
           <div v-html="item.ncontent"></div>
        </view>

			</view>
		</view>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        list: []
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
      },

      async getData(param) {
        let thiz = this;

        let http_url = "notice_List";
        let http_data = {
           nid: this.globalOption.id

        };
        let http_header = {};

        let hot = await this.$http.get(http_url, http_data, http_header, "json");

        this.list = hot.data;
      },
		}
	};
</script>

<style lang="scss" scoped>
	.flex5-clz {
		padding-top: 10rpx;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.flex2-clz {
		padding-top: 10rpx;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.flex8-clz {
		background-color: #07c160;
		padding-top: 16rpx;
		color: #ffffff;
		font-weight: bold;
		padding-left: 60rpx;
		font-size: 28rpx !important;
		padding-bottom: 16rpx;
		padding-right: 60rpx;
	}
	.text6-clz {
		padding-top: 16rpx;
		border-right: 6rpx solid #ffffff;
		color: #ffffff;
		font-weight: bold;
		padding-left: 16rpx;
		font-size: 28rpx !important;
		padding-bottom: 16rpx;
		border-bottom: 6rpx solid #ffffff;
		background-color: #07c160;
		flex-shrink: 0;
		top: 0rpx;
		left: 0rpx;
		width: 12rpx !important;
		position: absolute;
		height: 12rpx !important;
		padding-right: 16rpx;
	}
	.flex7-clz {
		background-color: rgba(1, 167, 81, 0.16);
		padding-top: 10rpx;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text-clz {
		padding-top: 10rpx;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		text-align: right;
		padding-right: 10rpx;
	}
	.text4-clz {
		margin-left: 10rpx;
		width: calc(100% - 10rpx - 10rpx) !important;
		font-size: 28rpx !important;
		margin-top: 0rpx;
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
	.container28706 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container28706 {
	}
</style>
