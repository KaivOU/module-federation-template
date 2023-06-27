import { useState } from 'react';

const Dashboard = () => {
    const [list, setList] = useState(['app222',333,4444])
    return (
        <div>进入APP2的list组件, list: {list.join(',')}</div>
    )
}
export default Dashboard;