var app = getApp()
Component({
  properties: {
    placeholder: {
      type: String,
      value: '',
    }
  },
  data: {
    inputValue: ''
  },
  methods: {
    // 用户输入触发
    handleInput: function(e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    // 点击清空输入框icon
    handleDeleteClick: function() {
      this.setData({
        inputValue: ''
      })
    },
    // 点击取消触发
    handleTextbtnClick() {
      // 触发父组件中的方法
      this.setData({
        inputValue: ''
      })
    },
    // 用户点击确定触发
    handleConfirm() {
      // console.log(this.data.inputValue);
      app.globalData.input=this.data.inputValue;
      app.globalData.currentLocation = 'input',
      app.globalData.title ="搜索结果" ,
      wx.navigateTo({ url: '../../pages/list/list' })
    }
  }
})