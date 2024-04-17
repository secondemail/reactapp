import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createBrand } from '../../redux/actions/brandAction'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from '../../hook/useNotifaction'
import avatar from '../../images/avatar.png'
import { useNavigate } from 'react-router-dom';

const AddBrandHook = () => {
    const navigate = useNavigate();
    //values images products        
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [images, setImages] = useState([]);
    const [isPressed, setIsPressed] = useState(false);
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dd47zs1qk",
            uploadPreset: "woqtczxy",
            multiple: false,
            clientAllowedFormats: ["jpg","jpeg","png"]
        }, function (error, result) {
            if (result && result.info && result.info.files) {
                setImages(result.info.files);
            }
        })
    }, [])

    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(true)
    const [isPress, setIsPress] = useState(false)

    //to change name state
    const onChangeName = (event) => {
        event.persist();
        setName(event.target.value)
    }


    const res = useSelector(state => state.allBrand.brand)

    //save data in database
    const handelSubmit = async (event) => {
        event.preventDefault();
        setIsPressed(true);
        if (name === "" || images.length <= 0) {
            notify('من فضلك اكمل البيانات', "warn");
            setIsPressed(false);
            return;
        }
        const formData = new FormData();
        formData.append("name", name)
        formData.append("image", images[0].uploadInfo.secure_url)
        setLoading(true)
        setIsPressed(true)
        setIsPress(true)
        await dispatch(createBrand(formData))
        setLoading(false)
    }

    useEffect(() => {
        if (loading === false) {
            setName("")
            setLoading(true)
            setImages([]);
            setIsPressed(false)
            if (res) {
                console.log(res)
            }
            if (res.status === 201) {
                notify('تمت عملية الاضافة بنجاح', "success");
            }
            else {
                notify('هناك مشكله فى عملية الاضافة', "error");
            }
        }
    }, [loading])

    return [, name, loading, isPress, handelSubmit, , onChangeName,widgetRef, isPressed,images]
};

export default AddBrandHook
