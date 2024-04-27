<template>
	<view class="container container28706">
		<form @submit="submitForm" class="flex diygw-form flex-direction-column diygw-col-24 form-clz">
			<view class="diygw-form-item diygw-col-24 uname-clz">
				<view class="title"> 姓名： </view>
				<view class="input">
					<input class="flex1"  name="uname" comfirm-type="done" type="text" v-model="form.uname" placeholder="请输入提示信息" />
				</view>
			</view>
      <view class="diygw-form-item diygw-col-24 usex-clz">
        <view class="title title-mb5"> 性别： </view>
        <view class="input">
          <radio-group class="flex flex-wrap check-green diygw-col-24 justify-start" @change="changeUsex" name="usex">
            <label v-for="(radioitem, radioindex) in usexDatas" class="diygw-radio-label">
              <radio class="diygw-radio" :value="radioitem.value" :checked="radioitem.checked"> </radio>
              <view class="diygw-icon-radio" :class="radioitem.checked ? 'checked' : ''"></view>
              <view class="diygw-checkbox-text">
                {{ radioitem.label }}
              </view>
            </label>
          </radio-group>
          <input hidden type="hidden" name="usexLabel" :value="usexLabel" />
        </view>
      </view>
      <view class="diygw-form-item diygw-col-24 age-clz">
        <view class="title"> 年龄： </view>
        <view class="input">
          <input class="flex1" :focus="ageFocus" name="age" comfirm-type="done" type="text" v-model="form.age" placeholder="请输入提示信息" />
        </view>
      </view>
      <view class="diygw-form-item diygw-col-24 uphone-clz">
        <view class="title"> 手机号码： </view>
        <view class="input">
          <input class="flex1" :focus="uphoneFocus" name="uphone" comfirm-type="done" type="text" v-model="form.uphone" placeholder="请输入提示信息" />
          <text class="diy-icon-mobilefill" style="color: #52c208; font-size: 16px"></text>
        </view>
      </view>

      <view class="diygw-form-item diygw-col-24 uaddress-clz">
        <view class="title"> 收货地址： </view>
        <view class="input">
          <input class="flex1" :focus="uaddressFocus" name="uaddress" comfirm-type="done" type="text" v-model="form.uaddress" placeholder="请输入提示信息" />

        </view>
      </view>
      <view class="flex diygw-col-24 button-clz">
        <button form-type="submit" class="diygw-btn green radius-xs flex-sub margin-xs button-button-clz">提交</button>
      </view>
		</form>

		<view class="clearfix"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			  form: {
          uname: '',
          usex: '',
          age: '',
          uphone: '',
          uaddress: ''
        },
        initform: '',
        usex: '',
        usexLabel: '',
        usexDatas: [
          {
            label: '男',
            value: '男',
            checked: true
          },
          {
            label: '女',
            value: '女',
            checked: false
          }
        ]
			};
		},
		onShow() {
			this.setCurrentPage(this);
		},
		onLoad(option) {
			this.setCurrentPage(this);
			if (option) {
				this.setData({
					globalOption: this.getOption(option)
				});
			}

			this.init();
		},
		methods: {
			async init() {
				await this.initResetform();
        this.getUserInfo();
			},

      //得到用户信息
      async getUserInfo() {
        let params = {
          uid: uni.getStorageSync("mid"),
        };
        let res = await this.$http.get("members_List", params);
        this.form = res.data[0];

        this.usex = this.form.usex;
        this.usexLabel = this.form.usex;

        //设置选中的性别
        let usexDatas = this.usexDatas;
        let usexLabel = this.usexLabel;
        for (var i = 0, len = usexDatas.length; i < len; ++i) {
          usexDatas[i].checked = usexDatas[i].value == this.usex;
          if (usexDatas[i].checked) {
            usexLabel = usexDatas[i].label;
          }
        }
        this.usex = this.usex;
        this.usexLabel = usexLabel;
        this.usexDatas = usexDatas;


      },

			initResetform() {
				this.initform = JSON.stringify(this.form);
			},
			resetForm() {
				this.form = JSON.parse(this.initform);
			},

			async submitForm(e) {
				this.validateForm = this.Validate({
					uname: {
						required: {
							message: '请输入姓名'
						}
					},
          usex: {
            required: {
              message: '请选择性别'
            }
          },
          age: {
            required: {
              message: '请输入年龄'
            }
          },
          uphone: {
            required: {
              message: '请输入手机号码'
            }
          },

          uaddress: {
            required: {
              message: '请输入收货地址'
            }
          }
				});
				if (!this.validateForm.checkForm(e)) {
					let data = this.validateForm.errorList[0];
					this.showToast(data.msg, 'none');
					return false;
				} else {
					//保存数据
					let param = e.detail.value;
					let url = 'members_Edit';

          param.uid = uni.getStorageSync('mid');


					let header = {};

					let res = await this.$http.post(url, param, header, 'json');

          this.showToast("保存成功", "none", 1500);
          setTimeout(() => {
            uni.switchTab({
              url: "/pages/my/index",
            });
          }, 1500);

				}
			},
			changeUsex(evt) {
				let usex = evt.detail.value;
				let usexDatas = this.usexDatas;

				let usexLabel = this.usexLabel;
				for (var i = 0, len = usexDatas.length; i < len; ++i) {
					usexDatas[i].checked = usexDatas[i].value == usex;
					if (usexDatas[i].checked) {
						usexLabel = usexDatas[i].label;
					}
				}
				this.usex = usex;
				this.usexLabel = usexLabel;
				this.usexDatas = usexDatas;
			}
		}
	};
</script>

<style lang="scss" scoped>
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
