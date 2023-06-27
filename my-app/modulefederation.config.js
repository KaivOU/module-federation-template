// const {
// 	commonDependencies
// } = require('./build/commonDependencies.json')

const moduleName = 'myApp'
const fileName = "remoteEntry.js"
// const exportModules = {
// 	// './KMSearch': './src/framework/bootstrap.tsx',
// }
const deps = require("./package.json").dependencies;
// 开发环境|生产环境
// const isProd = process.env.NODE_ENV === 'production';

const remotesModules = {
	// kmSearch: `kmSearch@${isProd ? "/external/km-search" : "http://localhost:9005"}/remoteEntry.js`,
	app1: "myAppChild@http://localhost:3009/remoteEntry.js",
	app2: "myAppChild2@http://localhost:3010/remoteEntry.js"
}

module.exports = {
	// 模块名代表整个子应用
	name: moduleName,
	// 暴露出去的文件名称
	filename: fileName,
	// 暴露出去的模块
	// exposes: exportModules,
	// 引入外部模块
	remotes: remotesModules,
	// shared: []
	shared: {
		...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-router-dom"],
        },
	}

}