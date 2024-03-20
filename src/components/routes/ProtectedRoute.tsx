import { Navigate, Outlet } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { Userdata } from '../../interfaces/Userdata';

interface ProtectedRouteProps {
    children?: React.ReactNode;
    redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, redirectTo = "/" }) => {
    const authUser = useAuthUser<Userdata>();
    const role = authUser ? authUser.role : '';

    if (!role.includes('ADMIN')) {
        return <Navigate to={redirectTo} />;
    }

    return children ? <>{children}</> : <Outlet />;
}
export default ProtectedRoute;
