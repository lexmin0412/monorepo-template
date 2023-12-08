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
