import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.global);
    return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
};
export default PrivateRoute;