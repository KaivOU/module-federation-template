# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


## 坑1
> 报错：
Uncaught SyntaxError: Unexpected token '<' (at src_App_tsx.chunk.js:1:1)
Uncaught ChunkLoadError: Loading chunk vendors-node_modules_react_jsx-dev-runtime_js failed.
(missing: http://localhost:3008/static/js/vendors-node_modules_react_jsx-dev-runtime_js.chunk.js)
while loading "./Bootstrap" from webpack/container/reference/app1
```ts
    // 模块联邦expose时需注意,子应用expose出去时要注意output>publicPath的输出路径, 开发环境下paths.publicUrlOrPath会失效
    // 子应用需加上isEnvProduction
    publicPath: isEnvProduction ? paths.publicUrlOrPath : `${protocol}://${HOST}:${DEFAULT_PORT}/`,
```
    

## 坑2
> 报错：react-dom.development.js:28439 Uncaught Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.

or 

Uncaught Error: createRoot(...): Target container is not a DOM element.
```ts
// 由于react18后使用createRoot
// 子应用expose出去时要注意,不是把root.render组件暴露出去，而是把内容组件export default出去，支持export class或者function
const exportModules = {
	'./Bootstrap': './src/App.tsx',
}
```

## 坑3
> 报错：Uncaught Error: useLocation() may be used only in the context of a <Router> component.
```ts
// 由于子应用expose出来的App.jsx只有<Routes>...</Routes>，主应my-app应该使用<BrowserRouter>包裹的组件才有响应的路由钩子useLocation
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

## 坑4
> 报错：A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator.
```tsx
// 由于App.tsx中使用了懒加载引入的子应用，如果使用路由加载他们，则需要加入Suspense包裹
const ChildAPP1 = React.lazy(() => import("app1/Bootstrap"));
const ChildAPP2 = React.lazy(() => import("app2/Bootstrap"));

function App() {
  return (
    <div className="App">
        ...
      <Suspense fallback={<h3>加载中。。。。</h3>}>
        <Routes>
            <Route path='/app1' element={<ChildAPP1/>} />
            <Route path='/app2' element={<ChildAPP2/>} />
        </Routes>
      </Suspense>
    </div>
  );
}
```


## 模块联邦的原理和劣势
Webpack 会把 ModuleFederationPlugin 选项配置了 expose的组件单独打包出一份chunk，如图一所示； 而如果把这份chunk的URL和filename配置在remote属性下，即表示webpack会帮你去请求这份代码，然后帮你挂载到全局变量，并解析放入你的组件中



## 路由同步问题
使用内存路由
微应用单独部署时，使用 web 路由，集成到 container 时，使用内存路由，web 路由由 container 接管，浏览器地址栏变化时，告 诉集成进来的微应用，然后微应用再跳转到相应的页面。

在微前端应用中有两种类型的路由：

容器应用路由：用于匹配微应用
微应用路由：用于匹配组件
容器应用使用 BrowserHistory 路由，微应用使用 MemoryHistory 路由，因为：

为防止容器应用和微应用同时操作 url 而产生冲突，在微前端架构中，只允许容器应用更新 url，微应用不允许更新 url。MemoryHistory 是基于内存的路由，不会改变浏览器地址栏中的 url，也不会把历史记录同步给浏览器。
如果不同的应用程序需要传达有关路由的相关信息，应尽可能的使用通用的方式，而 MemoryHistory 在 React 和 Vue 中都有提供。
但是在react18后，使用react-dom/client导出ReactDOM，无法直接把ReactDOM.render内容expose出去，此方法不通，得用官网的loadComponent方法解决路由不同步问题，但主子路由也要注意，主子路由不能有多个BrowserHistory存在
如果是react16-17，则可以参考micro-front-end-mfd-master项目，通过history.listen监听路由来解决主子应用路由不同步问题


最后解决react18&react-routerV6主子应用路由不同步问题，还是得用官网的loadComponent方法，官网页提供了demo
使用loadComponent加载子应用，不是通过路由加载
https://webpack.docschina.org/concepts/module-federation/
https://github.com/module-federation/module-federation-examples/tree/master/advanced-api/dynamic-remotes


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
