
import React, { useRef, useEffect } from "react";
// import { useNavigate, useLocation } from 'react-router-dom';
import { mount } from "app1/Bootstrap";

export default function AppChild(props: any) {
    const ref = useRef<any>()
    // const navigate = useNavigate();
    // const location = useLocation()
    // console.log(111, mount)
    useEffect(() => {
      // mount(ref)
        // const { onParentNavigate } = mount(ref.current, {
        //     currentPathParent: location.pathname,
        //     onChildNavigate: ({ pathname: nextPathname }: any) => {
        //       console.log('appChild-next-pathname: ', nextPathname)
        //       const { pathname } = location;
      
        //       nextPathname && pathname !== nextPathname && navigate(nextPathname)
        //     },
        //   })
        //   console.log(location)
          // onParentNavigate()
    }, []);

    return <div ref={ref}></div>
}