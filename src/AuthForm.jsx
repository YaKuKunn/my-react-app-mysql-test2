import { useState } from 'react'
import './AuthForm.css'

function AuthForm() {
  const [activeForm, setActiveForm] = useState('login')
  const [loginMessage, setLoginMessage] = useState({ text: '', type: '' })
  const [registerMessage, setRegisterMessage] = useState({ text: '', type: '' })
  
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })
  
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const showMessage = (setMessage, text, type) => {
    setMessage({ text, type })
    setTimeout(() => {
      setMessage({ text: '', type: '' })
    }, 3000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      })
      const data = await response.json()
      
      if (data.success) {
        showMessage(setLoginMessage, '登录成功！', 'success')
      } else {
        showMessage(setLoginMessage, data.message || '登录失败', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      showMessage(setLoginMessage, '网络错误，请稍后重试', 'error')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (registerData.password !== registerData.confirmPassword) {
      showMessage(setRegisterMessage, '两次输入的密码不一致', 'error')
      return
    }
    
    if (registerData.password.length < 6) {
      showMessage(setRegisterMessage, '密码长度不能少于 6 位', 'error')
      return
    }
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerData.username,
          email: registerData.email,
          password: registerData.password
        })
      })
      const data = await response.json()
      
      if (data.success) {
        showMessage(setRegisterMessage, '注册成功！即将跳转到登录页面...', 'success')
        setTimeout(() => {
          setActiveForm('login')
        }, 1500)
      } else {
        showMessage(setRegisterMessage, data.message || '注册失败', 'error')
      }
    } catch (error) {
      console.error('Error:', error)
      showMessage(setRegisterMessage, '网络错误，请稍后重试', 'error')
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="form-container">
          <div className="form-toggle">
            <button 
              className={activeForm === 'login' ? 'active' : ''} 
              onClick={() => setActiveForm('login')}
            >
              登录
            </button>
            <button 
              className={activeForm === 'register' ? 'active' : ''} 
              onClick={() => setActiveForm('register')}
            >
              注册
            </button>
          </div>

          <div className={`form-section ${activeForm === 'login' ? 'active' : ''}`}>
            <h2>欢迎回来</h2>
            <p className="subtitle">请输入您的账号信息</p>
            
            {loginMessage.text && (
              <div className={`message ${loginMessage.type}`}>
                {loginMessage.text}
              </div>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="loginUsername">用户名</label>
                <input 
                  type="text" 
                  id="loginUsername" 
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  required 
                  placeholder="请输入用户名"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="loginPassword">密码</label>
                <input 
                  type="password" 
                  id="loginPassword" 
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required 
                  placeholder="请输入密码"
                />
              </div>
              
              <button type="submit" className="btn">登录</button>
            </form>
          </div>

          <div className={`form-section ${activeForm === 'register' ? 'active' : ''}`}>
            <h2>创建账号</h2>
            <p className="subtitle">填写以下信息完成注册</p>
            
            {registerMessage.text && (
              <div className={`message ${registerMessage.type}`}>
                {registerMessage.text}
              </div>
            )}
            
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="registerUsername">用户名</label>
                <input 
                  type="text" 
                  id="registerUsername" 
                  value={registerData.username}
                  onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                  required 
                  placeholder="请输入用户名"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="registerEmail">邮箱</label>
                <input 
                  type="email" 
                  id="registerEmail" 
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                  required 
                  placeholder="请输入邮箱"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="registerPassword">密码</label>
                <input 
                  type="password" 
                  id="registerPassword" 
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                  required 
                  placeholder="请输入密码"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">确认密码</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                  required 
                  placeholder="请再次输入密码"
                />
              </div>
              
              <button type="submit" className="btn">注册</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
