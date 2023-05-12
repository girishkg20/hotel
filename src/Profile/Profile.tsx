import { Link, Navigate, useNavigate } from "react-router-dom";
import KeepAlive from 'react-activation'

const Profile = () => {

    const navigate = useNavigate();
    return(<KeepAlive>
        <h1>Profile Page...</h1>
        <input type="text" />
        <button onClick={() => window.history.back()}>Back</button>
    </KeepAlive>)
}
export default Profile;