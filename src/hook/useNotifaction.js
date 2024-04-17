
import { Flip, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//to make notifactio to any componentet
const notify = (msg, type) => {
    if (type === "warn")
        toast.warn(msg,{theme: "colored",transition: Flip})
    else if (type ==="success")
        toast.success(msg,{theme: "colored",transition: Flip})
    else if (type ==="error",{theme: "colored",transition: Flip})
        toast.error(msg)
};

export default notify;