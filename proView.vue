<template>
	<view class="container container28706"
  v-for="(item,index) in list"
  >

		<view class="flex flex-wrap diygw-col-24 flex-direction-column flex3-clz">
			<view class="flex flex-wrap diygw-col-24 flex-direction-column justify-end flex2-clz">
				<image class="diygw-col-24" :src="url+item.pimage" mode="aspectFill"></image>
			</view>
			<view class="diygw-col-24 text2-clz diygw-ellipsis"> {{item.pname}} </view>
			<view class="diygw-col-24 text1-clz diygw-ellipsis"> {{item.pspec}} </view>
		</view>
		<view class="flex flex-wrap diygw-col-24 flex12-clz">
			<view class="flex flex-wrap diygw-col-12 items-center flex1-clz">
				<view class="diygw-col-0"> 价格： </view>
				<view class="diygw-col-0" style="color:red;font-size:14px;font-weight:bold"> {{item.pprice}} </view>
			</view>
			<view class="flex flex-wrap diygw-col-12 items-center flex4-clz">
				<view class="diygw-col-0"> 库存数量： </view>
				<view class="diygw-col-0"> {{item.pstock}} </view>
			</view>
			<view class="flex flex-wrap diygw-col-12 flex5-clz">
				<view class="diygw-col-0"> 已售出： </view>
				<view class="diygw-col-0"> {{item.by1}} </view>
			</view>
      <view class="flex flex-wrap diygw-col-24 flex5-clz">
        <view class="diygw-col-0"> 菜品简介： </view>
        <view class="diygw-col-0">
        <div  v-html="item.pintro"></div>
        </view>
      </view>
		</view>

    <view class="flex flex-wrap diygw-col-24 flex-direction-column flex-clz">
      <view class="flex diygw-col-24 diygw-bottom">
        <view class="diygw-grid diygw-actions">

          <button class="diygw-action" @tap="gocart">
            <view class="diygw-grid-inner">
              <view class="diygw-grid-icon diygw-avatar radius diy-icon-cart" style="">
                <view class="diygw-tag badge bar-badge-1 gradual-red"> {{ total }} </view>
              </view>
              <view class="diygw-grid-title"> 购物车 </view>
            </view>
          </button>
          <button class="diygw-action" @tap="addfav" v-if="msg=='0'">
            <view class="diygw-grid-inner">
              <view class="diygw-grid-icon diygw-avatar radius diy-icon-starfill" style="color: #ed0808"> </view>
              <view class="diygw-grid-title"> 收藏 </view>
            </view>
          </button>
          <button class="diygw-action" v-if="msg=='1'">
            <view class="diygw-grid-inner">
              <view class="diygw-grid-icon diygw-avatar radius diy-icon-starfill" style="color: #04c06e"> </view>
              <view class="diygw-grid-title" style="color: #04c06e"> 已收藏 </view>
            </view>
          </button>
          <button class="diygw-action radius bg-gradual-orange" @tap="addcart">
            <view class="diygw-grid-inner">
              <view class="diygw-grid-title not-avatar"> 加入购物车 </view>
            </view>
          </button>

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
				list:[],
        total:0,
        msg:'',
        url:siteinfo.fileBasePath
			};
		},
		onShow() {
      this.getCartTotal();
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
        this.getData();
      },

      //得到数据
      async getData(param) {
        let thiz = this;

        let http_url = "product_List";
        let http_data = {
          f:1,
          pid: this.globalOption.id,
          mid:uni.getStorageSync("mid")
        };
        let http_header = {};

        let hot = await this.$http.get(http_url, http_data, http_header, "json");

        this.list = hot.data;
        this.msg=hot.msg;
      },

      //加入购物车
      addcart(){
        let thiz=this;

        //判断库存
        if(thiz.list[0].pstock<=0){
          uni.showToast({
            title:"库存不足",
            icon:"none"
          })
          return;
        }

        let cart=uni.getStorageSync("cart")||[];
        let index=cart.findIndex(item=>{
          return item.pid==thiz.globalOption.id;
        })
        if(index==-1){
          cart.push({
            pid:thiz.globalOption.id,
            number:1,
            title:thiz.list[0].pname,
            img:thiz.list[0].pimage,
            price:thiz.list[0].pprice,
            selected:1
          })
        }else{
          cart[index].number++;
        }
        uni.setStorageSync("cart",cart);
        this.getCartTotal();
        uni.showToast({
          title:"加入购物车成功",
          icon:"none"
        })
      },

      //购物车菜品数量
      getCartTotal() {
        let thiz = this;
        let cart=uni.getStorageSync("cart")||[];
        let total=0;
        cart.forEach(item=>{
          total+=item.number;
        })
        this.total=total;
      },

      //收藏
      addfav() {
        let thiz = this;


        let http_url = "collects_Add";
        let http_data = {
          pid: this.globalOption.id,
          mid:uni.getStorageSync("mid")
        };
        let http_header = {};

        let hot =  this.$http.get(http_url, http_data, http_header, "json");

        this.getData();

        uni.showToast({
          title:"收藏成功",
          icon:"none"
        })
      },

      //跳转购物车
      gocart(){
        uni.switchTab({
          url:"/pages/pro/cart"
        })
      }

		}
	};
</script>

<style lang="scss" scoped>
	.flex-clz {
		z-index: 100;
	}
	.bar-badge-1 {
		padding-left: 0px;
		padding-right: 0px;
		right: -8px;
		top: -2px;
	}
	.flex3-clz {
		margin-left: 20rpx;
		border-bottom-left-radius: 12rpx;
		box-shadow: 0rpx 2rpx 10rpx 2px rgba(150, 148, 148, 0.09);
		overflow: hidden;
		width: calc(100% - 20rpx - 20rpx) !important;
		border-top-left-radius: 12rpx;
		margin-top: 20rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
	}

	.text-clz {
		padding-top: 20rpx;
		color: #fefefe;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		padding-right: 20rpx;
	}
	.text2-clz {
		padding-top: 20rpx;
		padding-left: 20rpx;
		font-size: 28rpx !important;
		padding-bottom: 4rpx;
		padding-right: 20rpx;
	}
	.text1-clz {
		padding-top: 4rpx;
		color: #919191;
		padding-left: 20rpx;
		padding-bottom: 20rpx;
		padding-right: 20rpx;
	}
	.flex12-clz {
		margin-left: 16rpx;
		border-bottom-left-radius: 12rpx;
		box-shadow: 0rpx 2rpx 6rpx rgba(31, 31, 31, 0.16);
		overflow: hidden;
		width: calc(100% - 16rpx - 16rpx) !important;
		font-size: 28rpx !important;
		border-top-left-radius: 12rpx;
		margin-top: 16rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
		margin-bottom: 16rpx;
		margin-right: 16rpx;
	}
	.flex1-clz {
		padding-top: 16rpx;
		padding-left: 16rpx;
		padding-bottom: 16rpx;
		padding-right: 16rpx;
	}
	.flex4-clz {
		padding-top: 16rpx;
		padding-left: 16rpx;
		padding-bottom: 16rpx;
		padding-right: 16rpx;
	}
	.flex5-clz {
		padding-top: 16rpx;
		padding-left: 16rpx;
		padding-bottom: 16rpx;
		padding-right: 16rpx;
	}
	.flex6-clz {
		padding-top: 16rpx;
		padding-left: 16rpx;
		padding-bottom: 16rpx;
		padding-right: 16rpx;
	}
	.flex7-clz {
		padding-top: 16rpx;
		padding-left: 16rpx;
		padding-bottom: 16rpx;
		padding-right: 16rpx;
	}
	.flex8-clz {
		padding-top: 16rpx;
		padding-left: 16rpx;
		padding-bottom: 16rpx;
		padding-right: 16rpx;
	}
	.flex9-clz {
		padding-top: 16rpx;
		padding-left: 16rpx;
		padding-bottom: 16rpx;
		padding-right: 16rpx;
	}
	.text19-clz {
		color: #ff0000;
	}
	.flex10-clz {
		padding-top: 16rpx;
		padding-left: 16rpx;
		padding-bottom: 16rpx;
		padding-right: 16rpx;
	}
	.flex11-clz {
		padding-top: 16rpx;
		padding-left: 16rpx;
		padding-bottom: 16rpx;
		padding-right: 16rpx;
	}
	.text25-clz {
		color: #ff0000;
	}
	.container28706 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container28706 {
		padding-bottom: 80px;
	}
</style>
