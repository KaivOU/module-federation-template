import React, { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useMount } from "app1/Bootstrap";
import logo from './logo.svg';
import './App.css';



declare global {
  interface Window {
      init: any;
      get: any;
  }
  const __webpack_init_sharing__: any;
  const __webpack_share_scopes__: any;
}

function loadComponent(scope: any, module: string) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

const urlCache = new Set();
const useDynamicScript = (url: string) => {
  const [ready, setReady] = React.useState(false);
  const [errorLoading, setErrorLoading] = React.useState(false);

  React.useEffect(() => {
    if (!url) return;

    if (urlCache.has(url)) {
      setReady(true);
      setErrorLoading(false);
      return;
    }

    setReady(false);
    setErrorLoading(false);

    const element = document.createElement('script');

    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => {
      urlCache.add(url);
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setErrorLoading(true);
    };

    document.head.appendChild(element);

    return () => {
      urlCache.delete(url);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    errorLoading,
    ready,
  };
};

const componentCache = new Map();
export const useFederatedComponent = (remoteUrl: string, scope: string, module: string) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = React.useState(null);

  const { ready, errorLoading } = useDynamicScript(remoteUrl);
  React.useEffect(() => {
    if (Component) setComponent(null);
    // Only recalculate when key changes
  }, [key]);

  React.useEffect(() => {
    if (ready && !Component) {
      const Comp = React.lazy(loadComponent(scope, module));
      componentCache.set(key, Comp);
      setComponent(Comp as any);
    }
    // key includes all dependencies (scope/module)
  }, [Component, ready, key]);

  return { errorLoading, Component };
};


function App(props: any) {
  // 子应用的自定义hook
  const { data, onParentNavigate } = useMount();
  const navigate = useNavigate();
  // const location = useLocation();

  const [{ module, scope, url }, setSystem] = React.useState<Record<'module' | 'scope' | 'url', string>>({
    url: '',
    scope: '',
    module: '',
  });

  function setApp1() {
    navigate('')
    setSystem({
      url: 'http://localhost:3009/remoteEntry.js',
      scope: 'myAppChild',
      module: './Bootstrap',
    });
  }

  function setApp2() {
    navigate('')
    setSystem({
      url: 'http://localhost:3010/remoteEntry.js',
      scope: 'myAppChild2',
      module: './Bootstrap',
    });
  }

  const { Component: FederatedComponent, errorLoading }: any = useFederatedComponent(url, scope, module);

  const handleChange = (val: React.ChangeEvent<HTMLInputElement>) => {
    // console.log('val:', val.target.value)
    onParentNavigate(Number(val.target.value))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          这里是主应用App，引入子应用APP1的count数据：{data.count}，跟着路由变化
        </p>
        <div className="nav">
          主应用赋值App1的count数据<input type='text' style={{width: 100}} onChange={handleChange}></input>
        </div>
        
        <div className="nav">
          <button onClick={setApp1}>go to App1</button>
          <button onClick={setApp2}>go to App2</button>
          {/* <NavLink className="list-group-item" to="/app1">go to App1</NavLink> */}
          {/* <NavLink className="list-group-item" to="/app2">go to app2</NavLink> */}
        </div>
      </header>
      {/* <ChildAPP1/> */}
      <Suspense fallback={<h3>加载中。。。。</h3>}>
      {errorLoading
            ? `Error loading module "${module}"`
            : FederatedComponent && <FederatedComponent />}
        {/* <Routes>
            <Route path='/app1' element={<ChildAPP1/>} />
            <Route path='/app1/dashboard' element={<ChildAPP1/>} />
            <Route path='/app2' element={<ChildAPP2/>} />
        </Routes> */}
      </Suspense>
    </div>
  );
}

export default App;
