// const {
// 	commonDependencies
// } = require('./build/commonDependencies.json')
const moduleName = 'myAppChild2'
const fileName = "remoteEntry.js"
const exportModules = {
	'./Bootstrap': './src/App.tsx',
}
// 开发环境|生产环境
// const isProd = process.env.NODE_ENV === 'production';
const deps = require("./package.json").dependencies;

// const remotesModules = {
//     commonComponents: `commonComponents@${isProd ? "/external/common-components" : "http://192.168.7.136/external/common-components"}/remoteEntry.js`,
// }

module.exports = {
	// 模块名代表整个子应用
	name: moduleName,
	// 暴露出去的文件名称
	filename: fileName,
	// 暴露出去的模块
	exposes: exportModules,
	// 引入外部模块
	// remotes: remotesModules,
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