<template>
	<view class="container container28706">
		<view class="flex flex-wrap diygw-col-24 flex-direction-column flex-clz">
			<view class="flex flex-wrap diygw-col-24 flex-direction-column flex1-clz">


				<view class="flex flex-wrap diygw-col-24 justify-between items-center flex8-clz">
					<view class="diygw-col-0 text12-clz"> 订单金额 </view>
					<view class="diygw-col-0 text13-clz" style="color:red"> ￥{{tmoney}}</view>
				</view>
			</view>
		</view>
		<view class="diygw-title flex diygw-col-24 title-clz">
			<view class="title font-normal"> <text class="diy-icon-titles"></text> 配送信息 </view>
		</view>
		<form @submit="submitForm" class="flex diygw-form flex-direction-column diygw-col-24 form-clz">
			<view class="diygw-form-item diygw-col-24 uname-clz">
				<view class="title"> 姓名： </view>
				<view class="input">
					<input class="flex1"  name="uname" comfirm-type="done" type="text" v-model="form.uname" placeholder="请输入姓名" />
				</view>
			</view>
      <view class="diygw-form-item diygw-col-24 uphone -clz">
        <view class="title"> 手机号码： </view>
        <view class="input">
          <input class="flex1"  name="uphone" comfirm-type="done" type="text" v-model="form.uphone" placeholder="请输入手机号码" />
          <text class="diy-icon-mobilefill" style="color: #39c406; font-size: 16px"></text>
        </view>
      </view>
      <view class="diygw-form-item diygw-col-24 address-clz">
        <view class="title"> 收货地址： </view>
        <view class="input">
          <input class="flex1"  name="uaddress" comfirm-type="done" type="text" v-model="form.address" placeholder="请输入提示信息" />

        </view>
      </view>
      <view class="diygw-form-item diygw-col-24 oremark-clz">
        <view class="title"> 备注说明： </view>
        <view class="input">
          <textarea maxlength="200" class="flex1 oremark" name="oremark" v-model="oremark" placeholder="可以输入备注说明"></textarea>
        </view>
      </view>
      <view class="flex diygw-col-24 button-clz">
        <button class="diygw-btn green radius-xs flex-sub margin-xs button-button-clz" form-type="submit">提交订单</button>
      </view>
		</form>

		<view class="clearfix"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  total:0,
        tmoney:0,
				uphone: '',
				addressFocus: false,
				address: '',
				oremark: '',
				form: {
					uname: '',
          uphone: '',
          uaddress: '',
          oremark: ''
				},
				formData: {
					unameFocus: false
				},
        validateForm: {},

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
				await this.initResetform();
        await this.getCartData();
        await this.getUserInfo();
			},

      //获取购物车数据
      async getCartData(){
        let  buy=uni.getStorageSync('buy');

        let total=0;
        let tmoney=0;
        for(let i=0;i<buy.length;i++){
          total+=parseInt(buy[i].number)
          tmoney+=buy[i].number*buy[i].price;
        }

        this.total=total;

        //保留两位小数
        tmoney=tmoney.toFixed(2);

        this.tmoney=tmoney;

      },

      //得到用户信息
      async getUserInfo() {
        let params = {
          uid: uni.getStorageSync("mid"),
        };
        let res = await this.$http.get("members_List", params);
         var data = res.data;

        this.form.uname=data[0].uname;
        this.form.uphone=data[0].uphone;
        this.form.address=data[0].uaddress;
      },

			initResetform() {
				this.initform = JSON.stringify(this.form);
			},
			resetForm() {
				this.form = JSON.parse(this.initform);
			},

			async submitForm(e) {


        //保存数据
        let param = e.detail.value;

        //验证数据
        if (!param.uname) {
          this.showToast('请输入姓名', 'none');
          return false;
        }
        if (!param.uphone) {
          this.showToast('请输入手机号码', 'none');
          return false;
        }
        if (!param.uaddress) {
          this.showToast('请输入收货地址', 'none');
          return false;
        }

        let url = 'orders_Add';

        let  buy=uni.getStorageSync('buy');

        var by1=''; //存放菜品id
        var by2=''; //存放菜品数量

        for(let i=0;i<buy.length;i++){
          by1+=buy[i].pid+',';
          by2+=buy[i].number+',';
        }

        param.mid=uni.getStorageSync('mid');
        param.by1=by1;
        param.by2=by2;
        param.oamount=this.tmoney;

        let header = {};

        let res = await this.$http.post(url, param, header, 'json');

          if(res=="")
          {

            //删除购物车数据
            let cart=uni.getStorageSync('cart');
            let buy=uni.getStorageSync('buy');

            for(let i=0;i<buy.length;i++){
              for(let j=0;j<cart.length;j++){
                if(buy[i].pid==cart[j].pid){
                  cart.splice(j,1);
                }
              }
            }

            uni.setStorageSync('cart',cart);
            uni.setStorageSync('buy',[]);

            this.showToast('提交成功', 'success');

            //2秒后，跳转到个人中心
            setTimeout(function () {
              uni.switchTab({
                url: '/pages/my/index'
              });
            }, 2000);

          }
          else
          {
            this.showToast(res, 'none');
          }
			}
		}
	};
</script>

<style lang="scss" scoped>
	.flex-clz {
		margin-left: 20rpx;
		border: 2rpx solid #fab2b2;
		border-bottom-left-radius: 16rpx;
		box-shadow: 0rpx 0rpx 18rpx rgba(250, 178, 178, 0.27);
		overflow: hidden;
		width: calc(100% - 20rpx - 20rpx) !important;
		border-top-left-radius: 16rpx;
		margin-top: 20rpx;
		border-top-right-radius: 16rpx;
		border-bottom-right-radius: 12rpx;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
	}
	.flex1-clz {
		background-color: #ffffff;
		padding-top: 10rpx;
		padding-left: 10rpx;
		font-size: 28rpx !important;
		padding-bottom: 30rpx;
		padding-right: 10rpx;
	}
	.flex2-clz {
		margin-left: 16rpx;
		padding-top: 16rpx;
		padding-left: 16rpx;
		width: calc(100% - 16rpx - 16rpx) !important;
		padding-bottom: 16rpx;
		margin-top: 16rpx;
		margin-bottom: 0rpx;
		border-bottom: 2rpx solid #eee;
		margin-right: 16rpx;
		padding-right: 16rpx;
	}
	.text3-clz {
		font-weight: bold;
	}
	.flex5-clz {
		margin-left: 16rpx;
		padding-top: 16rpx;
		padding-left: 16rpx;
		width: calc(100% - 16rpx - 16rpx) !important;
		padding-bottom: 16rpx;
		margin-top: 16rpx;
		margin-bottom: 0rpx;
		border-bottom: 2rpx solid #eee;
		margin-right: 16rpx;
		padding-right: 16rpx;
	}
	.text9-clz {
		font-weight: bold;
	}
	.flex4-clz {
		margin-left: 16rpx;
		padding-top: 16rpx;
		padding-left: 16rpx;
		width: calc(100% - 16rpx - 16rpx) !important;
		padding-bottom: 16rpx;
		margin-top: 16rpx;
		margin-bottom: 0rpx;
		border-bottom: 2rpx solid #eee;
		margin-right: 16rpx;
		padding-right: 16rpx;
	}
	.text7-clz {
		font-weight: bold;
	}
	.flex3-clz {
		margin-left: 16rpx;
		padding-top: 16rpx;
		padding-left: 16rpx;
		width: calc(100% - 16rpx - 16rpx) !important;
		padding-bottom: 16rpx;
		margin-top: 16rpx;
		margin-bottom: 0rpx;
		border-bottom: 2rpx solid #eee;
		margin-right: 16rpx;
		padding-right: 16rpx;
	}
	.text5-clz {
		font-weight: bold;
	}
	.flex6-clz {
		margin-left: 16rpx;
		padding-top: 16rpx;
		padding-left: 16rpx;
		width: calc(100% - 16rpx - 16rpx) !important;
		padding-bottom: 16rpx;
		margin-top: 16rpx;
		margin-bottom: 0rpx;
		border-bottom: 2rpx solid #eee;
		margin-right: 16rpx;
		padding-right: 16rpx;
	}
	.text11-clz {
		font-weight: bold;
	}
	.flex8-clz {
		margin-left: 16rpx;
		padding-top: 16rpx;
		padding-left: 16rpx;
		width: calc(100% - 16rpx - 16rpx) !important;
		padding-bottom: 16rpx;
		margin-top: 16rpx;
		margin-bottom: 0rpx;
		border-bottom: 2rpx solid #eee;
		margin-right: 16rpx;
		padding-right: 16rpx;
	}
	.text12-clz {
		font-weight: bold;
	}
	.text13-clz {
		font-weight: bold;
		font-size: 32rpx !important;
	}
	.oremark {
		height: 60px !important;
	}
	.button-button-clz {
		margin: 6rpx !important;
	}
	.container28706 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container28706 {
	}
</style>
