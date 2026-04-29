# 爸妈一键通

一个纯前端的适老化静态工具站 MVP，包含 4 个页面：

- 长辈用药提醒
- 血压血糖记录
- 大字版计算器
- 杭州常用网址导航

## 本地预览
- 直接在浏览器打开 `index.html`
- 或者使用任意静态服务器预览整个目录

## 目录结构
- `index.html`：首页入口
- `pages/meds.html`：长辈用药提醒
- `pages/health.html`：血压血糖记录
- `pages/calculator.html`：大字版计算器
- `pages/nav.html`：杭州常用网址导航
- `assets/styles.css`：公共样式
- `assets/site.js`：首页与页面动效
- `assets/meds.js`：用药提醒逻辑
- `assets/health.js`：健康记录逻辑
- `assets/calculator.js`：计算器逻辑
- `assets/nav.js`：导航页数据
- `docs/`：项目方案文档

## 数据说明
- 用药提醒和健康记录使用浏览器 `localStorage`
- 数据只保存在当前浏览器
- 清除浏览器缓存或更换设备后，数据不会保留

## 发布资料
- `docs/发布文案.md`：小红书与 B 站文案
- `docs/上线发布清单.md`：Vercel 上线与自测清单
- `docs/代码到部署完成流程.md`：从本地代码到 GitHub、Vercel 的最短流程
- `docs/自定义域名方案.md`：更短域名的命名建议与接入方式

## 当前地址
- GitHub 仓库：[https://github.com/xeave/bama-yijiantong](https://github.com/xeave/bama-yijiantong)
- 线上地址：[https://bama-yijiantong.vercel.app/](https://bama-yijiantong.vercel.app/)

## 部署建议
### Vercel
推荐两种方式：

方式一：Git 导入
1. 把当前项目上传到 GitHub 仓库
2. 登录 Vercel 并导入该仓库
3. 保持静态站点默认配置直接部署

方式二：Vercel CLI
1. 安装 Vercel CLI：`npm i -g vercel`
2. 在项目目录执行：`vercel --prod`
3. 根据提示完成首次项目绑定和部署

### GitHub Pages
1. 将当前目录上传到 GitHub 仓库
2. 在仓库设置中开启 GitHub Pages
3. 选择根目录作为发布目录

## 上线前建议替换
- 如果后续扩展到其他城市，可替换导航页中的杭州本地链接
