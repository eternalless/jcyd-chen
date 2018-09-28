new Vue({
  el: '#app',
  data: {
    isLogin: false,
    isLost: false,
    isLostLogin: false,
    isCode: false,
    isCodeWrap: false,
    trademark: false,
    icon: false,
    isEdit: true,
    isSure: false,
    isSureButton: false,
    isDeleteSuccess: false,
    isCleartag: true,
    trademarkRadio: false,
    title: '',
    link: '',
    index: '',
    tags: [''],
    data: [
      {
        title: 'aaa',
        trademark: true,
        url: './imgs/1.jpeg',
        tags: ['#dog', '#animal'],
        link: 'ssssssssss'
      },
      {
        title: 'bbbb',
        trademark: false,
        url: './imgs/1.jpeg',
        tags: ['#dog', '#animal'],
        link: 'ssssssssss'
      },
      {
        title: 'cccc',
        trademark: true,
        url: './imgs/1.jpeg',
        tags: ['dog', 'animal'],
        link: 'ssssssssss'
      },
      {
        title: 'aaa',
        trademark: true,
        url: './imgs/1.jpeg',
        tags: ['#dog', '#animal'],
        link: 'ssssssssss'
      },
      {
        title: 'bbbb',
        trademark: false,
        url: './imgs/1.jpeg',
        tags: ['#dog', '#animal'],
        link: 'ssssssssss'
      },
      {
        title: 'cccc',
        trademark: true,
        url: './imgs/1.jpeg',
        tags: ['dog', 'animal'],
        link: 'ssssssssss'
      },
      {
        title: 'aaa',
        trademark: true,
        url: './imgs/1.jpeg',
        tags: ['#dog', '#animal'],
        link: 'ssssssssss'
      },
      {
        title: 'bbbb',
        trademark: false,
        url: './imgs/1.jpeg',
        tags: ['#dog', '#animal'],
        link: 'ssssssssss'
      },
      {
        title: 'cccc',
        trademark: true,
        url: './imgs/1.jpeg',
        tags: ['dog', 'animal'],
        link: 'ssssssssss'
      },
      {
        title: 'aaa',
        trademark: true,
        url: './imgs/1.jpeg',
        tags: ['#dog', '#animal'],
        link: 'ssssssssss'
      },
      {
        title: 'bbbb',
        trademark: false,
        url: './imgs/1.jpeg',
        tags: ['#dog', '#animal'],
        link: 'ssssssssss'
      },
      {
        title: 'cccc',
        trademark: true,
        url: './imgs/1.jpeg',
        tags: ['dog', 'animal'],
        link: 'ssssssssss'
      },
      {
        title: 'aaa',
        trademark: true,
        url: './imgs/1.jpeg',
        tags: ['#dog', '#animal'],
        link: 'ssssssssss'
      },
      {
        title: 'bbbb',
        trademark: false,
        url: './imgs/1.jpeg',
        tags: ['#dog', '#animal'],
        link: 'ssssssssss'
      },
      {
        title: 'cccc',
        trademark: true,
        url: './imgs/1.jpeg',
        tags: ['dog', 'animal'],
        link: 'ssssssssss'
      },
      {
        title: 'aaa',
        trademark: true,
        url: './imgs/1.jpeg',
        tags: ['#dog', '#animal'],
        link: 'ssssssssss'
      },
      {
        title: 'bbbb',
        trademark: false,
        url: './imgs/1.jpeg',
        tags: ['#dog', '#animal'],
        link: 'ssssssssss'
      },
      {
        title: 'cccc',
        trademark: true,
        url: './imgs/1.jpeg',
        tags: ['dog', 'animal'],
        link: 'ssssssssss'
      }
    ],
    localData: {
      title: '',
      trademark: false,
      url: './imgs/1.jpeg',
      tags: [''],
      link: ''
    },
    localDataWrap: {},
    imgBase64: '',
    img: false,
    isDelete: 'Re-upload',
    sure: '😳'
  },
  methods: {
    //登录时二维码隐藏
    hiddenCode() {
      let that = this
      this.isCode = !this.isCode
      setTimeout(function () {
        that.isCodeWrap = !that.isCodeWrap
      }, 500)
    },
    //登录时二维码点击
    showCode() {
      this.isCode = !this.isCode
      this.isCodeWrap = !this.isCodeWrap
    },
    //登录退出
    showLogin() {
      this.isLogin = false
      this.isLost = false
      this.isLostLogin = false
    },
    //是否展示找回密码
    showLost() {
      this.isLost = !this.isLost
      this.isLogin = !this.isLogin
    },
    //编辑信息按钮是否选中
    editRadio() {
      this.trademarkRadio = !this.trademarkRadio
    },
    //添加修改信息
    pushEdit() {
      this.isEdit = !this.isEdit
      if (this.index !== '') {
        this.editTag(this.data[this.index])
        this.tags = ['']
        return
      }
      // this.tags.push(this.$refs.tag[this.tags.length - 1].innerText)
      this.tags = this.tags.filter(function (data) {
        return data
      });
      let newData = {
        title: this.title,
        trademark: this.trademarkRadio,
        url: './imgs/1.jpeg',
        tags: this.tags,
        link: this.link
      }
      this.data.unshift(newData)
      this.localData = {
        title: '',
          trademark: false,
          url: '',
          tags: [''],
          link: ''
      }
      this.tags = []
    },
    // 添加tags信息
    addTag(index) {
      this.$refs.tag[index].innerText = this.tags[index]
      if (this.tags.length === (index + 1)) {
        let that = this
        if (!this.$refs.tag[index].innerText) return
        this.tags.push('')
        setTimeout(function () {
          that.$refs.tag[index + 1].innerText = ''
          that.showTab(index)
        })
        return
      }
      this.showTab(index)
    },
    //删除信息
    showDeleteSuccess() {
      var that = this
      this.isDeleteSuccess = !this.isDeleteSuccess
      this.isEdit = false
      this.isSure = false
      this.data.splice(this.index, 1)
      setTimeout(function () {
        that.isDeleteSuccess = !that.isDeleteSuccess
      }, 2000)
    },
    //幕布退出
    showWrap() {
      if (this.index === '') {
        this.editTag(this.localData)
        this.tags = []
        this.isEdit = !this.isEdit
        return
      }
      this.isEdit = !this.isEdit
      this.resetData()
    },
    //编辑信息
    showEdit(index) {
      this.isEdit = !this.isEdit
      if (index === undefined) {
        this.title = this.localData.title,
          console.log(this.localData.trademark)
          this.trademarkRadio = this.localData.trademark,
            console.log(this.trademark )
          this.url = './imgs/1.jpeg',
          this.tags = this.localData.tags,
          this.link = this.localData.link
        this.isCleartag = true
        this.img = false
        return
      }
      this.resetData()
      let data = this.data[index]
      this.title = data.title
      this.link = data.link
      this.trademarkRadio = data.trademark
      this.index = index
      this.tags = data.tags
      this.imgBase64 = data.url
      this.isDelete = 'Delete it'
      this.img = true
      if (!this.tags[this.tags.length - 1 ] && this.tags.length) return
      this.tags.push('')
    },
    //初始化数据
    resetData() {
      this.title = ''
      this.link = ''
      this.index = ''
      this.tags = []
      this.trademarkRadio = false
      this.isSure = false
      this.imgBase64 = ''
      this.isDelete = 'Re-upload'
      this.isCleartag = true
    },
    //获取图片base64实现预览
    getImgBase() {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function (e) {
        _this.imgBase64 = e.target.result;
      }
      console.log(file)
      this.img = !this.img
      reader.readAsDataURL(file);
    },
    //删除图片
    delImg() {
      if (this.index !== '') {
        this.showSure(0)
        return
      }
      this.imgBase64 = '';
      this.img = !this.img
    },
    //鼠标hover事件
    showNo() {
      this.sure = '🤗'
    },
    hiddenNo() {
      this.sure = '😳'
    },
    showYes() {
      this.sure = '😱'
    },
    //删除按钮动画效果
    showSure(index) {
      this.isSureButton = !this.isSureButton
      if (index) {
        var that = this
        setTimeout(function () {
          that.isSure = !that.isSure
        }, 200)
      } else {
        this.isSure = !this.isSure
      }

    },
    // tags处理
    editTag(datas) {
      let data = datas
      data.title = this.title
      data.link = this.link
      data.trademark = this.trademarkRadio
      data.tags = ['']
      for (let i in this.$refs.tag) {
        data.tags.push(this.$refs.tag[i].innerText)
      }
      data.tags = data.tags.filter(function (data) {
        return data
      });
      data.tags = data.tags.concat('')
    },
    //删除单个tag
    deleteTag(e, index) {
      if (!this.tags[index].length) {
        if (this.tags.length === 1) return
        this.tags.splice(index, 1);
        if ((index - 1) >= 0) {
          this.setFocus(this.$refs.tag[index - 1])
        }
        for (let i in this.tags) {
          this.$refs.tag[i].innerText = this.tags[i]
        }
        // if (this.tags.length) {
        //   this.$refs.tag[index].innerText = this.tags[index]
        // }
        if (index === 0 && this.tags.length) {
          this.setFocus(this.$refs.tag[index])
        }
        return
      }
      this.tags[index] = this.$refs.tag[index].innerText
    },
    //光标tab事件
    showTab(index) {
      this.setFocus(this.$refs.tag[index + 1])
    },
    //按下事件
    keyTag(e, index) {
      if (e.keyCode === 8) return
      this.tags[index] = this.$refs.tag[index].innerText
      this.$refs.tag[index].innerText = this.tags[index]
      this.setFocus(this.$refs.tag[index])
    },
    //光标移动
    setFocus(el) {
      el.focus();
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      //判断光标位置，如不需要可删除
      if (sel.anchorOffset != 0) {
        return;
      }
      ;
      sel.removeAllRanges();
      sel.addRange(range);
    },
    //去除空格
    trim(str) {
      return str.replace(/(^\s*)|(\s*$)/g, "");
    }
  },
  mounted() {
  }
})