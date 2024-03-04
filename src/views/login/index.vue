<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>登录</h1>
      <el-card shadow="never" class="login-card">
        <!--登录表单-->
        <el-form ref="form" :rules="LoginRules" :model="LoginForm">
          <el-form-item prop="mobile">
            <el-input v-model="LoginForm.mobile" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="LoginForm.password" placeholder="请输入密码" show-password />
          </el-form-item>
          <el-form-item prop="isOk">
            <el-checkbox v-model="LoginForm.isOk">
              用户平台使用协议
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 350px;" @click="Login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Login',
  data() {
    return {
      // 表单数据
      LoginForm: {
        mobile: '',
        password: '',
        isOk: false
      },
      /* 表单校验规则 */
      LoginRules: {
        mobile: [
          // 离开焦点触发 必须输入内容
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          // 格式校验
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'

          }
        ],
        password: [
          // 离开焦点触发 必须输入内容
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          // 格式校验
          {
            pattern: /^.{6,16}$/,
            message: '密码长度在6-16之间',
            trigger: 'blur'
          }
        ],
        // 用户使用协议
        isOk: [
          // 自定义校验规则
          {
            validator: (rule, value, callback) => {
              // rule: 规则
              // value 校验的值
              // callback 成功的回调
              value ? callback() : callback(new Error('请勾选用户使用协议'))
            }
          }
        ]
      }
    }
  },
  methods: {
    // 登录按钮
    Login() {
      // 登录之前做表单校验
      this.$refs.form.validate((isOk) => {
        if (isOk) {
          alert('pass')
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
    p {
      color: #fff;
      font-size: 18px;
      margin-top: 20px;
      width: 300px;
      text-align: center;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color:#606266;
    }
  }
}
</style>
