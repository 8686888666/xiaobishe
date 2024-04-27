<template>
	<view class="container container28706">
    <view class="flex diygw-col-24 flex-direction-row tabs-clz">
      <view class="diygw-tabs text-center solid-right justify-start scale-title small-border tabs-title">
				<view class="diygw-tab-item tabs-item-title" :class="index == tabsIndex ? '  cur text-green ' : ''"
              v-for="(item, index) in tabsDatas" :key="index" @click="changeTabs" :data-index="index">
          <text v-if="item.icon" :class="item.icon"></text> {{ item.cname }} </view>
			</view>
      <view class="flex1">
        <view class="flex flex-wrap diygw-col-24 flex13-clz">


          <view class="flex diygw-col-12 flex-direction-column items-center flex-wrap flex5-clz"
                v-for="(item, index) in list" :key="index" :index="index" @tap="navigateTo2(item)"
          >
            <image :src="url+item.pimage" class="image2-size diygw-image diygw-col-24 image2-clz" mode="aspectFill"></image>
            <view class="diygw-text-line1 diygw-col-24 text7-clz"> {{item.pname}}</view>
            <view class="flex flex-wrap diygw-col-24 items-center flex6-clz">
              <view class="diygw-col-0 text-clz " style="color:red;font-weight: bold;font-size:14px"> ￥{{item.pprice}} </view>
            </view>
          </view>


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
				tabsDatas: [
				],
				tabsLeft: 0,
				tabsWidth: 0,
				tabsItemWidth: 0,
				tabsIndex: 0,
        list: [],
        cid:0,
        k:'',
        url:siteinfo.fileBasePath
			};
		},
		onShow() {
      this.k=uni.getStorageSync('k')==null?'':uni.getStorageSync('k');
      uni.removeStorageSync('k');
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
        await this.getTypes();
        await this.getData();
      },

      //得到类别
      async getTypes() {
        var that=this;
        let http_url = "category_List";
        let http_data = {  };
        let http_header = {};

        let hot = await this.$http.get(http_url, http_data, http_header, "json");

        this.tabsDatas = hot.data;
      },

      //得到数据
      async getData(param) {
        let thiz = this;

        let http_url = "product_List";
        let http_data = {
          cid: this.cid,
          condition: " and pname like '%"+this.k+"%' and pstatus='上架' ",
        };
        let http_header = {};

        let hot = await this.$http.get(http_url, http_data, http_header, "json");

        this.list = hot.data;
        this.k='';
      },

			changeTabs(evt) {
				let { index } = evt.currentTarget.dataset;
				if (index == this.tabsIndex) return;
				this.setData({
					tabsIndex: index,
          cid: this.tabsDatas[index].cid
				});

        this.getData();
			},

        navigateTo2(item) {
          uni.navigateTo({
            url: '/pages/pro/proView?id='+item.pid
          })
        },
		}
	};
</script>

<style lang="scss" scoped>
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
		height: 270rpx !important;
		width: 100%;
	}
	.text7-clz {
		font-size: 30rpx !important;
	}
	.flex6-clz {
		flex: 1;
	}
	.text9-clz {
		padding-top: 10rpx;
		color: #ff644c;
		font-weight: bold;
		padding-left: 0rpx;
		font-size: 36rpx !important;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text13-clz {
		padding-top: 10rpx;
		text-decoration: line-through;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.flex-clz {
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
		height: 160rpx !important;
		width: 100%;
	}
	.text1-clz {
		font-size: 30rpx !important;
	}
	.flex8-clz {
		flex: 1;
	}
	.text12-clz {
		padding-top: 10rpx;
		color: #ff644c;
		padding-left: 10rpx;
		padding-bottom: 10rpx;
		padding-right: 0rpx;
	}
	.text10-clz {
		padding-top: 10rpx;
		color: #ff644c;
		font-weight: bold;
		padding-left: 0rpx;
		font-size: 36rpx !important;
		padding-bottom: 10rpx;
		padding-right: 10rpx;
	}
	.text11-clz {
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
	.image4-clz {
		border-bottom-left-radius: 12rpx;
		overflow: hidden;
		border-top-left-radius: 12rpx;
		border-top-right-radius: 12rpx;
		border-bottom-right-radius: 12rpx;
	}
	.image4-size {
		height: 160rpx !important;
		width: 100%;
	}
	.text6-clz {
		font-size: 30rpx !important;
	}
	.flex3-clz {
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
	.flex1-clz {
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
		height: 160rpx !important;
		width: 100%;
	}
	.text-clz {
		font-size: 30rpx !important;
	}
	.flex4-clz {
		flex: 1;
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
	.container28706 {
		padding-left: 0px;
		padding-right: 0px;
	}
	.container28706 {
	}
</style>
