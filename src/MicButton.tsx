import { useState } from "react";
import { AudioOutlined, AudioMutedOutlined} from '@ant-design/icons';

function MicButton() {
    const [ focus, setFocus ] = useState(true);

    const onClick = () => {
        setFocus(!focus);
    }
    return (
            focus ? <AudioOutlined onClick={onClick}/> : <AudioMutedOutlined onClick={onClick}/> 
    );
}

export default MicButton;