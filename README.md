# Webpack 5 Module Federation with React/Typescript

[![s3-deploy](https://github.com/ogzhanolguncu/react-typescript-module-federation/actions/workflows/s3-deploy.yaml/badge.svg)](https://github.com/ogzhanolguncu/react-typescript-module-federation/actions/workflows/s3-deploy.yaml)

This project consist of three pieces, a host app `container` and two remotes `app1` `app2`.

Workflow:

- `app1` expose CounterAppOne component.
- `app2` expose CounterAppTwo header component.
- `container` import CounterAppOne and CounterAppTwo component.

## Running Demo

In order to run the demo I highly recommend installing lerna globally via

```bash
npm i -g lerna
```

<!-- Then,

```bash
## 根目录yarn，lerna会安装各项目依赖
## 该命令会做以下几件事：
## `npm install` 每个软件包的所有外部依赖项；
## 将所有 `packages` 相互依赖的Lerna `link` 在一起；
## 在所有已安装的包里执行 `npm run prepublish`；
## 在所有已安装的包里执行 `npm run prepare`；
lerna bootstrap
``` -->

Then, 使用yarn安装

```bash
## 配置好package.json文件的"workspaces": {}
## 根目录yarn，lerna会安装各项目依赖
## node版本要大于18
yarn
```

Run the command above at the root of your project. This command will make sure you have dependencies you need in order to run this project.

Finally,

```bash
# 根目录启动，lerna会启动各项目的npm run start，npm run build也一样
npm run start
```

Lerna will start all your projects parallelly and open your browser.

- http://localhost:3000/ (container)
- http://localhost:3001/ (app1)
- http://localhost:3002/ (app2)

## 坑
1、
```ts
babel-loader@8 requires Babel 7.x (the package ‘@babel/core’). If you’d like to use Babel 6.x (‘babel-core’), you should install ‘babel-loader@7’.

// 解决
container项目package加上"@babel/core": "^7.19.6"
```

2、 各项目依赖不同版本包问题，配置后可直接在根目录yarn install安装所有子应用的依赖包
```ts
lerna bootstrap
lerna 提供了可以将子项目的依赖包提升到最顶层的方式 ，我们可以执行 lerna clean先删除每个子项目的 node_modules , 然后执行命令  lerna bootstrop --hoist。

lerna bootstrop --hoist 会将 packages 目录下的公共模块包抽离到最顶层，但是这种方式会有一个问题，不同版本号只会保留使用最多的版本，这种配置不太好，当项目中有些功能需要依赖老版本时，就会出现问题。

yarn workspaces
有没有更优雅的方式？再介绍一个命令 yarn workspaces ，可以解决前面说的当不同的项目依赖不同的版本号问题， yarn workspaces会检查每个子项目里面依赖及其版本，如果版本不一致都会保留到自己的 node_modules 中，只有依赖版本号一致的时候才会提升到顶层。注意：这种需要在 lerna.json 中增加配置。

  "npmClient": "yarn",  // 指定 npmClent 为 yarn
  "useWorkspaces": true // 将 useWorkspaces 设置为 true
并且在顶层的 package.json 中增加配置

// 顶层的 package.json
{
    "workspaces":[
        "packages/*"
    ]
}
增加了这个配置后 不再需要 lerna bootstrap 来安装依赖了，可以直接使用 yarn install 进行依赖的安装。注意：yarn install 无论在顶层运行还是在任意一个子项目运行效果都是可以。
```

3、应用位置问题，放packages目录里或者根目录
```ts
// 生成.git、.gitignore、lerna.json、package.json文件和packages目录
// packages目录用于放子应用
lerna init

// package.json
{
  "name": "root",
  "private": true,
  // 配置子应用放到packages中
  "workspaces": [
    "packages/*"
  ],
  "devDependencies": {
    "lerna": "^6.5.1"
  }
}

// or
// 此配置时，子应用放在根目录，与package.json同级
"workspaces": {
		"packages": [
			"my-app",
			"my-app-child",
			"my-app-child2"
		]
	}
```

## 其他
lerna publish 永远不会发布标记为 private 的包（package.json中的”private“: true）
