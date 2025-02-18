# 投资进度追踪系统 | Investment Progress Tracker

一个现代化的投资进度追踪系统，帮助用户实时监控投资目标和进度。

A modern investment progress tracking system that helps users monitor their investment goals and progress in real-time.

## 功能特点 | Features

- 📊 总体投资目标追踪
  - 显示总投资目标和当前进度
  - 可视化进度条展示
  - 目标完成日期显示

- 📅 月度计划管理
  - 每月投资目标和实际进度对比
  - 目标收益率和实际收益率监控
  - 特殊目标提醒功能

- 📈 数据可视化
  - 资产增长趋势图表
  - 目标金额与实际金额对比
  - 响应式设计，支持各种设备

## 技术栈 | Tech Stack

### 前端 | Frontend
- React 18
- Ant Design 5.x
- Recharts (数据可视化)
- Vite (构建工具)
- Axios (HTTP 客户端)

### 后端 | Backend
- Go
- 标准库 `net/http`
- JSON Web API

### 部署 | Deployment
- GitHub Pages
- GitHub Actions (自动化部署)

## 快速开始 | Quick Start

### 前端开发 | Frontend Development

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 后端开发 | Backend Development

```bash
# 启动后端服务
go run main.go
```

服务器将在 http://localhost:8080 启动

## 项目结构 | Project Structure

```
├── frontend/          # 前端项目目录
│   ├── src/           # 源代码
│   ├── public/        # 静态资源
│   └── package.json   # 项目配置
├── main.go            # 后端入口
└── .github/           # GitHub Actions 配置
```

## API 文档 | API Documentation

### 获取计划数据 | Get Plan Data

```
GET /api/plans
```

响应示例 | Response Example:
```json
{
  "monthlyPlans": [
    {
      "month": "March",
      "targetReturn": 24.0,
      "targetAmount": 1000.0,
      "currentAmount": 30.0,
      "currentReturn": 0.0,
      "startDate": "2024-03-01",
      "endDate": "2024-03-31",
      "specialTargets": "需要连续17次操作不失误"
    }
  ],
  "overallGoal": 3000000.0,
  "startAmount": 30.0,
  "endDate": "2024-09-03"
}
```

## 贡献指南 | Contributing

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

Issues and Pull Requests are welcome to help improve the project.

## 许可证 | License

[MIT License](LICENSE)