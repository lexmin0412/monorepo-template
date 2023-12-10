# Monorepo Template

## 搭建步骤

### 工作区准备

在 github 新建空仓库，然后 clone 到本地。

```shell
cd monorepo-template
```

### Lerna 初始化

全局安装 Lerna:

```shell
pnpm install lerna -g
```

初始化项目结构:

```shell
lerna init
```

### 新建子包

```shell
lerna create pkg1
lerna create pkg2
```

包名分别指定为 `@lexmin0412/monorepo-template-pkg1`、`@lexmin0412/monorepo-template-pkg1`。

### 内部依赖

进入 packages/pkg2，执行命令安装依赖：

```shell
cd packages/pkg2
pnpm add @lexmin0412/monorepo-template-pkg1
```

pkg2 包的 dependences 中会自动添加如下内容：

```json
{
  "dependencies": {
    "@lexmin0412/monorepo-template-pkg1": "workspace:^",
  }
}
```

### 第一次发布

在发布版本前，需要确认如下两点：

- 将本地代码提交，否则 lerna 无法找到版本基准
- packages 下的子包 package.json 中添加 publishConfig 配置, 声明 "access": "public"
- 每个子包添加 "prepublish": "pnpm build" 脚本，以确保在 npm 发布前已基于最新版本构建

执行以下命令：

```
lerna publish
```

按照提示选择版本号发布即可。

### CI 集成

在根目录的 scripts 中添加如下脚本：

```json
{
	"scripts": {
		"ci:publish": "lerna publish patch --yes"
	}
}
```

其中 patch 表示版本号递增级别，--yes 表示不开启 prompt。

新增 .github/workflows/publish.yml 文件，填入如下内容：

```yml
name: Publish npm packages
on:
  push:
    branches:
      - main

permissions:
  contents: write
  id-token: write

env:
  CI: true
  PNPM_CACHE_FOLDER: .pnpm-store
jobs:
  version:
    timeout-minutes: 15
    runs-on: ubuntu-latest
    steps:
      - name: checkout code repository
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: setup node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: install pnpm
        run: npm i pnpm@8 -g
      - name: Setup npmrc
        run: echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" > .npmrc
      - name: install dependencies
        run: pnpm install
      - name: Publish with Lerna
        run: |
          git config user.name lexmin0412
          git config user.email zhangle_dev@outlook.com
          pnpm ci:publish

```

如果在 CI 中遇到发布npm 404或者403 的错误，请检查 npm token 是否失效即可，重新申请一个即可。
