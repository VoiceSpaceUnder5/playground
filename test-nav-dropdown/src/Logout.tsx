import { useState } from "react";
import { LogoutOutlined } from '@ant-design/icons';

function Logout() {
    const [ focus, setFocus ] = useState(true);

    const onClick = () => {
        console.log('logout clicked!');
    }
    return (
            <LogoutOutlined onClick={onClick}/>
    );
}

export default Logout;