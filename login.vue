<template>
	<view class="container container28706">
		<view class="flex flex-wrap diygw-col-24 flex-direction-column justify-center items-center flex-clz">
			<image src="/static/tx-nxs4.png" class="image-size diygw-image diygw-col-0 image-clz" mode="widthFix"></image>
		</view>
		<form @submit="submitForm" class="flex diygw-form flex-direction-column diygw-col-24">
			<view class="diygw-col-24 text-clz"> 外卖点餐小程序 </view>
			<view class="flex diygw-col-24 button-clz">
        <button
            class="diygw-btn black radius flex-sub margin-xs button-button-clz"
            type="primary"
            @tap="getUserInfo2"
        >
          确认登录
        </button>
			</view>
		</form>
		<view class="clearfix"></view>
	</view>
</template>

<script>
export default {
  data() {
    return {};
  },

  onShow() {
    this.setCurrentPage(this);
  },

  methods: {
    async init() {
      await this.initResetform();
    },

    getUserInfo2() {
      
      console.log("getUserInfo");
      
      // 获取微信昵称和头像
      uni.getUserProfile({
        desc: "获取用户相关信息",
        success: async (res) => {


          // 保存数据
          let param = {
            unickname: res.userInfo.nickName,
            uavatar: res.userInfo.avatarUrl,
          };
          let url = "members_Add";
          let header = {};

          try {
            let res2 = await this.$http.post(url, param, header, "json");


            // 保存用户信息到本地
         
          uni.setStorageSync("mid", res2);

            this.showToast("登录成功", "success");

            uni.switchTab({
              url: "/pages/index/index",
            });
          } catch (error) {
            console.error(error);
            this.showToast("登录失败", "error");
          }
        },
        fail: (error) => {
          console.error(error);
          this.showToast("获取用户信息失败", "error");
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
	.flex-clz {
		z-index: 100;
		height: 360rpx;
	}
	.image-clz {
		border-bottom-left-radius: 50%;
		box-shadow: 0rpx 2rpx 6rpx rgba(31, 31, 31, 0.16);
		overflow: hidden;
		border-top-left-radius: 50%;
		border-top-right-radius: 50%;
		border-bottom-right-radius: 50%;
	}
	.image-size {
		height: 260rpx !important;
		width: 260rpx !important;
	}
	.text-clz {
		padding-top: 10rpx;
		font-weight: bold;
		padding-left: 10rpx;
		font-size: 48rpx !important;
		padding-bottom: 100rpx;
		font-family: 黑体;
		text-align: center;
		padding-right: 10rpx;
	}
	.button-clz {
		margin-left: 20rpx;
		width: calc(100% - 20rpx - 20rpx) !important;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
	}
	.button-button-clz {
		font-size: 40rpx !important;
		margin: 6rpx !important;
		padding: 46rpx !important;
	}
	.container28706 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container28706 {
	}
</style>
