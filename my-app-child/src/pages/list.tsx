import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Dashboard = () => {
    const [list, setList] = useState([1,2,3])
    const navigate = useNavigate();
    const handleGoback = () => {
        navigate('/app1');
    }
    return (
        <div>进入list组件, list: {list.join(',')}
            <a className='btn' onClick={handleGoback}>返回</a>
        </div>
    )
}
export default Dashboard;