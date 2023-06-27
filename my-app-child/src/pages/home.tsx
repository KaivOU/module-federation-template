import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import './index.css';

const Dashboard = (props: any) => {
    // console.log('child1-home:', props)
    const navigate = useNavigate();
    const handleForward = () => {
        navigate('/app1/dashboard')
    }
    return (
        <div>
            欢迎来到App1111~子应用
            <div className="nav">
                {/* <a className="list-group-item" onClick={handleForward}>to dashboard</a> */}
                <NavLink className="list-group-item" to="/app1/dashboard">to dashboard</NavLink>
                <NavLink className="list-group-item" to="/app1/list">to list</NavLink>
            </div>
        </div>
    )
}
export default Dashboard;