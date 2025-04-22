import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref('')

  // 从本地存储加载用户信息
  const loadUserFromStorage = () => {
    const storedUser = uni.getStorageSync('user')
    const storedToken = uni.getStorageSync('token')
    if (storedUser) {
      user.value = JSON.parse(storedUser)
    }
    if (storedToken) {
      token.value = storedToken
    }
  }

  // 注册新用户
  const register = async (userData) => {
    try {
      // 检查用户名是否已存在
      const users = uni.getStorageSync('users') || []
      const existingUser = users.find(u => u.username === userData.username)
      if (existingUser) {
        throw new Error('用户名已存在')
      }

      // 添加新用户
      users.push(userData)
      uni.setStorageSync('users', users)
      return true
    } catch (error) {
      throw error
    }
  }

  // 用户登录
  const login = async (username, password) => {
    try {
      const users = uni.getStorageSync('users') || []
      const foundUser = users.find(u => u.username === username && u.password === password)
      
      if (!foundUser) {
        throw new Error('用户名或密码错误')
      }

      // 更新用户状态
      user.value = foundUser
      token.value = Date.now().toString() // 简单生成一个token
      
      // 保存到本地存储
      uni.setStorageSync('user', JSON.stringify(foundUser))
      uni.setStorageSync('token', token.value)
      
      return true
    } catch (error) {
      throw error
    }
  }

  // 用户登出
  const logout = () => {
    user.value = null
    token.value = ''
    uni.removeStorageSync('user')
    uni.removeStorageSync('token')
  }

  // 初始化时加载用户信息
  loadUserFromStorage()

  return {
    user,
    token,
    register,
    login,
    logout
  }
}) 