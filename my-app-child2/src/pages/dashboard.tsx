import { useState } from 'react';

const Dashboard = () => {
    const [number, setNumber] = useState(2222)
    return (
        <div>进入App2的Dashboard组件, number: {number}</div>
    )
}
export default Dashboard;