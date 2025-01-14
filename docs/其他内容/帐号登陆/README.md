<!-- @include: basic.md#statement -->

# 帐号登陆

<div class="login-container">
<el-card class="login-card">
  <h2 class="login-title">登录</h2>
  <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="80px">
    <el-form-item label="邮箱地址" prop="email">
      <el-input v-model="loginForm.email" placeholder="请输入邮箱地址"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="captcha">
      <el-input v-model="loginForm.captcha" placeholder="请输入验证码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </el-form-item>
  </el-form>
</el-card>
</div>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const loginForm = ref({
  email: '',
  password: '',
  captcha: ''
});

const rules = ref({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: ['blur', 'change'] }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' }
  ]
});

const loginFormRef = ref(null);

const handleLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      // 执行登录操作
      ElMessage.success('登录成功');
    } else {
      ElMessage.error('表单验证失败');
      return false;
    }
  });
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #85c790;
}

.login-title {
  text-align: center;
  color: #494d67;
  margin-bottom: 20px;
}

.el-input__inner {
  border-color: #85c790;
}

.el-button--primary {
  background-color: #85c790;
  border-color: #85c790;
}

.el-button--primary:hover {
  background-color: #6fa977;
  border-color: #6fa977;
}
</style>


<!-- @include: basic.md#comment -->

