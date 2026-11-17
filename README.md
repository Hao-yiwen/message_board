# message_board

学习用的 React 留言板。页面可以发布和删除评论，评论保存在浏览器 `localStorage` 里，状态用 Redux 管理。仓库里还有一个名叫网易云播放器、但尚未写播放功能的 Create React App 脚手架。

[![React](https://img.shields.io/badge/React-17.0.1-149ECA)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/Redux-4.0.5-764ABC)](https://redux.js.org/)
[![react-scripts](https://img.shields.io/badge/react--scripts-4.0.1-333333)](https://create-react-app.dev/)

## 背景

这是个人练习记录，不是带后端的完整产品。提交从页面结构、基础交互，做到用 Redux 接管评论状态。根目录原来的说明只有两行 `yarn` / `yarn start`，没有标明要进入哪个目录。

仓库没有服务端、账号和部署配置。评论只存在当前浏览器里。

## 已有内容

### 留言板：`message_board/`

用 JavaScript 写的 Create React App。页面标题是 `Document`。

已经接上的交互：

- 输入用户名和评论，点击「发布」
- 用户名或内容为空时，用 `alert` 提示「请输入用户名」或「请输入评论内容」
- 列表展示用户名、正文和相对时间：不足 60 秒显示「N 秒前」，否则显示「N 分钟前」，大约每 5 秒更新一次
- 每条评论有「删除」按钮
- 评论列表写入 `localStorage` 的 `comments`，刷新后由列表容器读回并派发 `initComments`
- 用户名输入框失焦时，把用户名写入 `localStorage` 的 `username`
- Redux store 只有评论列表，action 为 `INIT_COMMENTS`、`ADD_COMMENT`、`DELETE_COMMENT`

源码按展示组件和容器拆开：

| 路径 | 作用 |
| --- | --- |
| `src/index.js` | `createStore`，用 `Provider` 挂上 `CommentApp` |
| `src/components/CommentInput.js` | 用户名、内容输入和发布按钮 |
| `src/components/CommentList.js` | 遍历评论 |
| `src/components/Comment.js` | 单条评论、时间与删除 |
| `src/containers/CommentApp.js` | 把输入区和列表拼在一起 |
| `src/containers/CommentInput.js` | 校验、写入本地存储、派发 `addComment` |
| `src/containers/CommentList.js` | 启动时读本地评论，删除时派发 `deleteComment` |
| `src/reducers/comments.js` | reducer 和 action creator |
| `src/index.css` | 页面样式 |

和代码对得上、但还没做完的地方：

- `CommentApp` 根节点的 class 是 `WRAPPER`，样式表选择器是 `.wrapper`，外层 500px 卡片样式目前不会套上。
- 容器把读到的用户名放在自己的 state 里，渲染时传给输入框的却是 `props.username`。store 没有这个字段，所以失焦会保存用户名，刷新后输入框不一定回填。
- 评论正文会先转义 HTML。被反引号包住的片段会被替换成字面量 `dsadas &0`，不是代码高亮。
- `public/index.html` 写了 `<link href="./gilobal.css">`。仓库里没有这个文件，标签也没有 `rel="stylesheet"`。
- `src/reducers/comments.js` 默认导出匿名函数。开发模式能编译，但会有 ESLint 警告 `import/no-anonymous-default-export`。
- 留言板没有测试文件。

### 播放器目录：`message_board/netease_music_player/`

TypeScript 的 Create React App 默认工程。`src/App.tsx` 仍是旋转 logo 和 “Learn React” 链接，`src/App.test.tsx` 只断言这句文案。没有播放、歌单或网易云接口。

`public/` 里的 `logo192.png`、`logo512.png`、`favicon.ico` 是脚手架自带图标，不是本项目截图。

两个子目录里的 `README.md` 仍是 Create React App 英文模板，不能当作本仓库说明。

## 技术栈

版本取自各自的 `package.json` 范围和 `yarn.lock` 实际解析结果。根目录没有 `package.json`，两个应用要分开安装。包管理器是 Yarn 1（仓库里是 `yarn.lock`，没有 `package-lock.json`）。

**留言板**

| 依赖 | `yarn.lock` 版本 |
| --- | --- |
| react / react-dom | 17.0.1 |
| redux | 4.0.5 |
| react-redux | 7.2.2 |
| prop-types | 15.7.2 |
| react-scripts | 4.0.1（带入 webpack 4.44.2、Jest 26.6.0） |
| @testing-library/react | 11.2.3（已安装，留言板没有对应用例） |
| @testing-library/jest-dom | 5.11.8 |
| @testing-library/user-event | 12.6.0 |
| web-vitals | 0.2.4 |

**播放器脚手架**

| 依赖 | `yarn.lock` 版本 |
| --- | --- |
| react / react-dom | 17.0.1 |
| react-scripts | 4.0.1 |
| typescript | 4.1.3 |
| @types/react | 16.14.2 |

## 目录

```text
.
├── README.md
└── message_board/                         # 留言板
    ├── package.json
    ├── yarn.lock
    ├── public/index.html
    ├── src/                               # 组件、容器、reducer、样式
    └── netease_music_player/              # CRA TypeScript 脚手架，未实现播放器
        ├── package.json
        ├── yarn.lock
        ├── public/                        # 默认图标与 manifest
        └── src/App.tsx
```

## 环境

- Node.js 16。本文的启动、测试和生产构建在 **Node.js 16.20.2**、**Yarn 1.22.22** 上跑通。
- 浏览器需支持 `localStorage`。没有接口要配。
- 当前环境自带的 Node.js 22.23.4 可以完成 `yarn install --frozen-lockfile`，但不能启动或构建。`react-scripts` 4.0.1 会报 `ERR_PACKAGE_PATH_NOT_EXPORTED`（`postcss` 的 `./lib/tokenize`）。留言板和播放器目录都会这样。请换 Node.js 16 再执行下面的脚本。

## 运行留言板

```bash
cd message_board
yarn install --frozen-lockfile
yarn start
```

浏览器打开 <http://localhost:3000>。

生产构建（不要设置 `CI=true`，否则上面的 ESLint 警告会被当成错误，构建失败）：

```bash
yarn build
```

静态文件在 `message_board/build/`。

测试脚本存在，但没有用例：

```bash
yarn test --watchAll=false
```

Create React App 会打印 `No tests found`，退出码为 0。

## 运行播放器目录

它和留言板是两个独立工程，都默认占用 3000 端口。一起看的话，后启动的那个换端口。

```bash
cd message_board/netease_music_player
yarn install --frozen-lockfile
yarn start
```

默认页是 Create React App 示例。测试和生产构建：

```bash
yarn test --watchAll=false
yarn build
```

## 本次核对

| 命令 | Node.js | 结果 |
| --- | --- | --- |
| `message_board`：`yarn install --frozen-lockfile` | 22.23.4 | 成功 |
| `message_board`：`yarn start` | 22.23.4 | 失败，`postcss` 子路径无法导出 |
| `message_board`：`BROWSER=none PORT=3000 yarn start` | 16.20.2 | 编译通过，仅有匿名默认导出警告；<http://127.0.0.1:3000> 返回 200，页面注入了开发脚本 |
| `message_board`：`yarn build` | 16.20.2 | 成功，产物在 `build/` |
| `message_board`：`CI=true yarn build` | 16.20.2 | 失败，ESLint 警告被当作错误 |
| `message_board`：`yarn test --watchAll=false` | 16.20.2 | 没有测试，退出码 0 |
| `netease_music_player`：安装、`yarn test --watchAll=false`、`yarn build` | 16.20.2 | 成功。默认测试 1 个通过；构建成功 |
| `netease_music_player`：`PORT=3001 yarn start` | 16.20.2 | 开发服务器编译通过，首页为 CRA 模板（标题 React App） |
| `netease_music_player`：`yarn start` | 22.23.4 | 失败，与留言板相同的 `postcss` 错误 |

仓库里没有界面截图，所以上表没有配图。

## 参考

- [Create React App](https://create-react-app.dev/)
- [React 17](https://17.reactjs.org/)
- [Redux](https://redux.js.org/)
- [React Redux](https://react-redux.js.org/)
