import AdminPages from "../components/admin/AdminPages"
import Home from "../components/home/Home"
import { useSelector } from "react-redux";
import { userState } from "./store"


function ProtectRoute() {
    const user = useSelector(userState)

    return user.admin === 1 ? <AdminPages /> : <Home />
}

export default ProtectRoute