<template>
  <div class="home-container">
    <el-container>
      <el-header>
        <div class="header-content">
          <div class="header-left">
            <h2>欢迎</h2>
          </div>
          <div class="header-right">
            <el-dropdown @command="handleCommand">
              <span class="user-info">
                <el-avatar :size="32" :src="userStore.user?.avatar" />
                <span class="username">{{ userStore.user?.name }}</span>
                <el-icon><ArrowDown /></el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      
      <el-main>
        <div class="welcome-content">
          <el-avatar :size="100" :src="userStore.user?.avatar" />
          <h1>欢迎回来，{{ userStore.user?.name }}</h1>
          <p>您已成功登录系统</p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

const handleCommand = (command) => {
  if (command === 'logout') {
    handleLogout()
  }
}

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm(
      '确定要退出登录吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }
    )
    userStore.logout()
    router.push('/demo/login')
    ElMessage.success('已退出登录')
  } catch {
    // 用户取消退出
  }
}
</script>

<style scoped>
.home-container {
  height: 100vh;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.el-header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  padding: 0 20px;
}

.el-main {
  padding: 20px;
  background-color: #f5f7fa;
}

.welcome-content {
  text-align: center;
  padding: 100px 0;
}

.welcome-content h1 {
  font-size: 32px;
  color: #303133;
  margin: 20px 0;
}

.welcome-content p {
  font-size: 18px;
  color: #606266;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #606266;
}

.user-info:hover {
  color: #409EFF;
}

.username {
  font-size: 14px;
}
</style> 