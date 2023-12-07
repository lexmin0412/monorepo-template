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


