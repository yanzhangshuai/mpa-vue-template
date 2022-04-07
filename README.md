vue3 + webpack + Typescript 多页面 template





命令
```
npm run dev                     开发环境，全部模块
npm run dev target|t=XXX,XXX    开发环境，指定模块

npm run build                   生产环境
npm run build:br                生产环境, 文件压缩.br格式
npm run build:gzip              生产环境, 文件压缩.gz格式

npm run deploy                  构建 Docker 部署镜像

npm run test                    单元测试
npm run lint                    eslint、stylelint

npm run report                  分析生产环境编译结果
npm run report:test             分析 单元测试 情况
npm run report:windi            分析 windicss 使用结果

```

项目结构
* **build**：项目编译模块
* **deploy**：构建 Docker 部署镜像模块
* **src**： 项目工作区模块
  * **asset**： 静态文件层
  * **component**：组件层
  * **directive**：指令层
  * **hook**： hooks 层
  * **page**：页面层
  * **plugin**：插件层
  * **router**：路由层
  * **service**：数据服务层
  * **store**：数据缓存层
  * **util**：工具层
* **standard**：代码规则模块
* **test**：单元测试模块
* **type**：通用类型模块