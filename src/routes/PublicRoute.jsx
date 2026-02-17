import {Navigate, Outlet} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const PublicRoute = ({children}) => {
    const {user, token } = useAuth();

    // so ya esta logueado, No puede ver login/register
    if(token && user){
        const grupo = user.grupo?.toLowerCase();

        if(grupo === "campesino") return <Navigate to="/campesino" replace />;
        if(grupo === "comprador") return <Navigate to="/comprador" replace />;
    }

    // si no eta logueado, deja pasar
    return <Outlet/>;
}

export default PublicRoute;