<template>
	<view class="container container28706">
		<view v-for="(item, index) in cart.rows" :key="index" class="flex flex-wrap diygw-col-24 items-start flex5-clz">
			<text v-if="item.selected == 1" @tap="navigateTo" data-type="selectOneFunction" :data-index="index" class="flex icon diygw-col-0 icon-clz diy-icon-roundcheck"></text>
			<text v-if="item.selected == 0" @tap="navigateTo" data-type="selectOneFunction" :data-index="index" class="flex icon1 diygw-col-0 icon1-clz diy-icon-round"></text>
			<view class="flex flex-wrap diygw-col-0 items-stretch flex4-clz">
				<image :src="url+item.img" class="image-size diygw-image diygw-col-0 image-clz" mode="scaleToFill"></image>
				<view class="flex flex-wrap diygw-col-0 flex-direction-column justify-between flex2-clz">
					<view class="diygw-text-line2 diygw-col-24 text-clz">
						{{ item.title }}

            <view class="diygw-tag tag-bg fr padding-left-lg" @tap="dele(item.pid)">删除</view>
					</view>
					<view class="flex flex-wrap diygw-col-24 justify-between items-center">
						<view class="diygw-text-line2 diygw-col-0 text2-clz"> {{ item.price }}元 </view>
						<view class="diygw-form-item diygw-form-item-small diygw-col-0 noborder">
							<view class="input flex1">
								<diy-stepper class="flex1" @change="changeItemNumber($event, index, item)" name="number" v-model="item.number" bgColor="#EBECEE" color="#323233" :min="1" :max="100" :step="1" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="flex flex-wrap diygw-col-24 justify-between items-center diygw-bottom flex-clz">
			<view class="flex flex-wrap diygw-col-0 items-center" @tap="navigateTo" data-type="selectAllFunction">
				<text v-if="globalData.totalSelected == '1'" class="flex icon2 diygw-col-0 icon2-clz diy-icon-roundcheck"></text>
				<text v-if="globalData.totalSelected != '1'" class="flex icon3 diygw-col-0 icon3-clz diy-icon-round"></text>
				<view class="diygw-col-0"> 合计： </view>
				<view class="diygw-col-0 text3-clz"> {{ globalData.totalPrice }}元 </view>
			</view>
			<view class="diygw-col-0 green text4-clz" @tap="gobuy"> 立即购买 </view>
		</view>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	import siteinfo from "../../siteinfo";

  export default {
		data() {
			return {
        url:siteinfo.fileBasePath,
        globalData: { totalPrice: 0, totalSelected: '0' },
				cart: {
					code: 0,
					msg: '',
					rows: [
						{
							title: '',
							selected: 0,
							number: 0,
							price: 0,
							img: ''
						}
					]
				},
				item: {
					number: 1
				},
			};
		},
		computed: {},
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
        this.getMsgs1();
			},

      //从缓存中猎取购物车数据
      async getMsgs1() {
        const msgs1 =uni.getStorageSync('cart');

        var total = 0;
        for (var i = 0; i < msgs1.length; i++) {
          //判断是否选中
          if (msgs1[i].selected) {
            total +=  msgs1[i].num;
          }

        }
        this.cart.rows = msgs1;
        //计算总价
        this.totalPriceFunction();
      },

			// 计算总价 自定义方法
			async totalPriceFunction(param) {
				let thiz = this;
				let total = 0;
				let checked = 1;
				this.cart.rows.forEach((item) => {
					if (item.selected == 1) {
						total = total + item.price * item.number;
					} else {
						checked = 0;
					}
				});
				this.globalData.totalPrice = Number(total.toFixed(2));
				this.globalData.totalSelected = checked;
			},

			// 选择全部或取消选择 自定义方法
			async selectAllFunction(param) {
				let thiz = this;
				this.globalData.totalSelected = this.globalData.totalSelected == '1' ? '0' : '1';
				//设置选中或取消
				this.cart.rows.forEach((item) => {
					item.selected = this.globalData.totalSelected;
				});
				//计算总价
				this.totalPriceFunction();
			},

			// 选择或取消选择 自定义方法
			async selectOneFunction(param) {
				let thiz = this;
				let index = param && (param.index || param.index == 0) ? param.index : thiz.index || '';
				//选中或者取消
				this.cart.rows[param.index].selected = this.cart.rows[param.index].selected == '1' ? '0' : '1';
				//计算总价
				this.totalPriceFunction();
			},
			changeItemNumber(evt, index, item) {
				let number = evt.detail.value;
				this.item.number = number;
				this.navigateTo({ foritem: item, forindex: index, type: 'totalPriceFunction' });
			},

      //删除
      dele(pid){
        let thiz = this;
        let cart = thiz.cart.rows;
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].pid == pid) {
            cart.splice(i, 1);
            break;
          }
        }
        thiz.cart.rows = cart;
        //计算总价
        this.totalPriceFunction();
        //保存到缓存
        uni.setStorageSync('cart', cart);
      },

      //立即购买
      gobuy(){
        let thiz = this;
        let cart = thiz.cart.rows;
        let buy = [];
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].selected == 1) {
            buy.push(cart[i]);
          }
        }

        //判断是否有选中的菜品
        if(buy.length == 0){
          uni.showToast({
            title: '请选择菜品',
            icon: 'none',
            duration: 2000
          });
          return;
        }

        //保存到缓存
        uni.setStorageSync('buy', buy);
        uni.navigateTo({
          url: '/pages/pro/pay'
        });
      }

		}
	};
</script>

<style lang="scss" scoped>
	.flex5-clz {
		border: 2rpx solid #f8f8f8;
		padding-top: 20rpx;
		border-bottom-left-radius: 12rpx;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		border-top-right-radius: 12rpx;
		margin-right: 16rpx;
		margin-left: 16rpx;
		box-shadow: 0rpx 2rpx 10rpx 1px rgba(133, 133, 133, 0.22);
		overflow: hidden;
		width: calc(100% - 16rpx - 16rpx) !important;
		border-top-left-radius: 12rpx;
		margin-top: 16rpx;
		border-bottom-right-radius: 12rpx;
		margin-bottom: 16rpx;
		padding-right: 20rpx;
	}
	.icon-clz {
		margin-left: 10rpx;
		color: #07c160;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		margin-right: 10rpx;
	}
	.icon {
		font-size: 48rpx;
	}
	.icon1-clz {
		margin-left: 10rpx;
		color: #07c160;
		margin-top: 0rpx;
		margin-bottom: 0rpx;
		margin-right: 10rpx;
	}
	.icon1 {
		font-size: 48rpx;
	}
	.flex4-clz {
		flex: 1;
	}
	.image-clz {
		border: 2rpx solid #eee;
		border-bottom-left-radius: 12rpx;
		text-shadow: 1px 1px 2px #333;
		overflow: hidden;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
	}
	.image-size {
		height: 160rpx !important;
		width: 160rpx !important;
	}
	.flex2-clz {
		padding-top: 0rpx;
		flex: 1;
		padding-left: 10rpx;
		padding-bottom: 0rpx;
		padding-right: 0rpx;
	}
	.text-clz {
		font-weight: bold;
		font-size: 28rpx !important;
	}
	.text2-clz {
		padding-top: 6rpx;
		color: #ff2a2a;
		font-weight: bold;
		padding-left: 0rpx;
		font-size: 28rpx !important;
		padding-bottom: 6rpx;
		padding-right: 0rpx;
	}
	.flex-clz {
		padding-top: 10rpx;
		left: 0rpx;
		bottom: 0rpx;
		padding-left: 20rpx;
		padding-bottom: 10rpx;
		padding-right: 20rpx;
	}
	.icon2-clz {
		color: #07c160;
	}
	.icon2 {
		font-size: 48rpx;
	}
	.icon3-clz {
		color: #07c160;
	}
	.icon3 {
		font-size: 48rpx;
	}
	.text3-clz {
		padding-top: 6rpx;
		font-weight: bold;
		padding-left: 0rpx;
		font-size: 28rpx !important;
		padding-bottom: 6rpx;
		padding-right: 0rpx;
	}
	.text4-clz {
		padding-top: 20rpx;
		border-bottom-left-radius: 12rpx;
		overflow: hidden;
		padding-left: 30rpx;
		padding-bottom: 20rpx;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
		padding-right: 30rpx;
	}
	.container28706 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.tag-bg {
		background: #07c160 !important;
		color: #fff !important;
	}
	.container28706 {
	}
</style>
