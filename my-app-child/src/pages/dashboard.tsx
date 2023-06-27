import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Dashboard = () => {
    const [number, setNumber] = useState(0)
    const navigate = useNavigate();
    const handleGoback = () => {
        navigate('/app1');
    }
    return (
        <div>进入Dashboard组件, number: {number}
            <a className='btn' onClick={handleGoback}>返回</a>
        </div>
    )
}
export default Dashboard;