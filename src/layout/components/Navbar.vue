<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img v-if="staffPhoto" :src="staffPhoto" class="user-avatar">
          <span v-else class="defImg">{{ name.charAt(0) }}</span>
          <!-- 用户名 -->
          <span class="name"> {{ name }}</span>
          <i class="el-icon-setting" style="font-size: 16px;" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              主页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/1483628145/guigu">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a @click.prevent="dialogFormVisible = true">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>

          <el-dropdown-item>
            <span style="display:block;">更换头像</span>
          </el-dropdown-item>
          <!-- native：注册组件的根元素的原生事件 -->
          <!-- 当这个元素没有点击事件的时候 可以给他强加一个native就能实现绑定点击事件 -->
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 修改密码弹出框 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :modal="false" width="500px" @close="cacelUpdate">
      <el-form ref="formRef" label-width="120px" :model="updateForm" :rules="formRules">
        <el-form-item prop="oldPassword" label="旧密码"> <el-input v-model="updateForm.oldPassword" show-password /></el-form-item>
        <el-form-item prop="password" label="新密码"><el-input v-model="updateForm.password" show-password /></el-form-item>
        <el-form-item prop="newPassword" label="确认你的新密码"> <el-input v-model="updateForm.newPassword" show-password /></el-form-item>
        <!-- 提交数据 修改密码 -->
        <el-form-item>
          <el-button type="primary" @click="updatePassword">确认修改</el-button>
          <el-button @click="cacelUpdate">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      dialogFormVisible: false,
      // 修改密码表格
      updateForm: {
        oldPassword: '',
        password: '',
        newPassword: ''
      },
      // 表单验证
      formRules: {
        oldPassword: [
          // 离开焦点触发 必须输入内容
          {
            required: true,
            message: '旧密码不能为空',
            trigger: 'blur'
          },
          // 格式校验
          {
            pattern: /^.{6,16}$/,
            message: '密码长度在6-16之间',
            trigger: 'blur'
          }
        ],
        password: [
          // 离开焦点触发 必须输入内容
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
          },
          // 格式校验
          {
            pattern: /^.{6,16}$/,
            message: '密码长度在6-16之间',
            trigger: 'blur'
          }
        ],
        newPassword: [
          // 离开焦点触发 必须输入内容
          {
            required: true,
            message: '请重复你的密码',
            trigger: 'blur'
          },
          // 格式校验
          {
            pattern: /^.{6,16}$/,
            message: '密码长度在6-16之间',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (this.updateForm.password === value) {
                callback()
              } else {
                callback(new Error('密码俩次输入不一致！'))
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'staffPhoto',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 退出登录
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 修改密码
    updatePassword() {
      this.$refs.formRef.validate(async(isOk) => {
        if (isOk) {
          this.dialogFormVisible = true
          // 发请求修改数据
          await this.$store.dispatch('user/updatePassword', this.updateForm)
          // 清表单数据
          this.$refs.formRef.resetFields()
          // 跳转
          this.$router.push('/login')
        }
      })
    },
    // 取消修改
    cacelUpdate() {
      // 关闭窗口
      this.dialogFormVisible = false
      // 清表单数据
      this.$refs.formRef.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .name{
          margin-right: 10px;
          font-size: 16px;
        }

        .defImg{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: skyblue;
          line-height: 30px;
          text-align: center;
          margin-right: 12px;
          color: #fff;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
