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
- `meds/index.html`：长辈用药提醒
- `health/index.html`：血压血糖记录
- `calculator/index.html`：大字版计算器
- `nav/index.html`：杭州常用网址导航
- `assets/styles.css`：公共样式
- `assets/site.js`：首页与页面动效
- `assets/meds.js`：用药提醒逻辑
- `assets/health.js`：健康记录逻辑
- `assets/calculator.js`：计算器逻辑
- `assets/nav.js`：导航页数据
- `.github/workflows/pages.yml`：GitHub Pages 自动发布工作流
- `docs/`：项目方案文档

## 数据说明
- 用药提醒和健康记录使用浏览器 `localStorage`
- 数据只保存在当前浏览器
- 清除浏览器缓存或更换设备后，数据不会保留

## 发布资料
- `docs/发布文案.md`：小红书与 B 站文案
- `docs/上线发布清单.md`：GitHub Pages 上线与自测清单
- `docs/代码到部署完成流程.md`：从本地代码到 GitHub、GitHub Pages 的最短流程
- `docs/自定义域名方案.md`：更短域名的命名建议与接入方式
- `docs/国内手机访问免费替代方案.md`：中国手机网络打不开时的免费替代部署建议

## 当前地址
- GitHub 仓库：[https://github.com/xeave/bama-yijiantong](https://github.com/xeave/bama-yijiantong)
- GitHub Pages 目标地址：[https://xeave.github.io/bama-yijiantong/](https://xeave.github.io/bama-yijiantong/)

启用前补充确认：
- 如果你使用的是 `GitHub Free`，通常需要把仓库设为 `Public`

如果中国大陆手机网络打开不稳定，优先看：
- `docs/国内手机访问免费替代方案.md`

## 部署建议
### GitHub Pages
1. 将当前目录上传到 GitHub 仓库
2. 如使用 `GitHub Free`，确认仓库为 `Public`
3. 推送到 `main` 后，在仓库 `Settings -> Pages` 中确认 `Source` 为 `GitHub Actions`
4. 等待 `.github/workflows/pages.yml` 执行完成
5. 访问 `https://xeave.github.io/bama-yijiantong/`

## 上线前建议替换
- 如果后续扩展到其他城市，可替换导航页中的杭州本地链接
