# vite-admin-template

> 这是一个极简的 vite vue admin 管理后台。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

> **该项目改编自`panjiachen`的vue-element-template，面向技术栈和UI框架为Vue2和Element UI，但是无法忍受`vue-cli`的开发速度的开发人员。**

> 项目仅对vue-cli相关devDependencies进行拆解重构，替换为vite相关的devDependencies，src内部逻辑无改动。

[原项目线上地址](http://panjiachen.github.io/vue-admin-template)

[原作者国内访问](https://panjiachen.gitee.io/vue-admin-template)

## 相关项目

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

## Build Setup

```bash
# 克隆项目
git clone https://gitee.com/mi-sa-ka10032/vite-element-template.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```