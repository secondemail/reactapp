
import React, { useState, useEffect, useRef } from 'react'
import { getOneCategory } from '../../redux/actions/subcategoryAction';
import { createProduct } from '../../redux/actions/productsAction';
import notify from './../../hook/useNotifaction';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction'
import { getAllBrand } from './../../redux/actions/brandAction';
import { useNavigate } from 'react-router-dom';

const AdminAddProductsHook = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //values images products        
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [images, setImages] = useState([]);
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
        try {
            const getAddProductdata = async () => {
                await dispatch(getAllCategory());
                await dispatch(getAllBrand());
            }
            getAddProductdata();
        } catch (error) {}
    }, [])
    //get last catgeory state from redux
    const category = useSelector(state => state.allCategory.category)
    //get last brand state from redux
    const brand = useSelector(state => state.allBrand.brand)

    //get last sub cat state from redux
    const subCat = useSelector(state => state.subCategory.subcategory)

    const onSelect = (selectedList) => {
        setSeletedSubID(selectedList)
    }
    const onRemove = (selectedList) => {
        setSeletedSubID(selectedList)
    }

    const [options, setOptions] = useState([]);

    //values state
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState('السعر قبل الخصم');
    const [priceAftr, setPriceAftr] = useState('السعر بعد الخصم');
    const [qty, setQty] = useState('الكمية المتاحة');
    const [CatID, setCatID] = useState('');
    const [BrandID, SetBrandID] = useState('');
    const [seletedSubID, setSeletedSubID] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPressed, setIsPressed] = useState(false);


    //to change name state
    const onChangeProdName = (event) => {
        event.persist();
        setProdName(event.target.value)
    }
    //to change name state
    const onChangeDesName = (event) => {
        event.persist();
        setProdDescription(event.target.value)
    }
    //to change name state
    const onChangePriceBefor = (event) => {
        event.persist();
        setPriceBefore(event.target.value)
    }
    //to change name state
    const onChangePriceAfter = (event) => {
        event.persist();
        setPriceAftr(event.target.value)
    }  //to change name state
    const onChangeQty = (event) => {
        event.persist();
        setQty(event.target.value)
    }
    const onChangeColor = (event) => {
        event.persist();
        setShowColor(!showColor)
    }

    //to show hide color picker
    const [showColor, setShowColor] = useState(false);
    //to store all pick color
    const [colors, setColors] = useState([]);
    //when choose new color
    const handelChangeComplete = (color) => {
        setColors([...colors, color.hex])
        setShowColor(!showColor)
    }
    const removeColor = (color) => {
        const newColor = colors.filter((e) => e !== color)
        setColors(newColor)
    }



    //when selet category store id
    const onSeletCategory = async (e) => {
        if (e.target.value !== 0) {
            await dispatch(getOneCategory(e.target.value))
        }
        setCatID(e.target.value)
    }
    useEffect(() => {
        if (CatID !== 0) {
            if (subCat.data) {

                setOptions(subCat.data)
            }
        } else
            setOptions([])
    }, [CatID])

    //when selet brand store id
    const onSeletBrand = (e) => {
        SetBrandID(e.target.value)
    }

    //to save data 
    const handelSubmit = async (e) => {
        e.preventDefault();
        setIsPressed(true);
        if (CatID === 0 || prodName === "" || prodDescription === "" || images.length <= 0 || priceBefore <= 0) {
            notify("من فضلك اكمل البيانات", "warn");
            setIsPressed(false);
            return;
        } else {
            
            const formData = new FormData();
            formData.append("title", prodName);
            formData.append("description", prodDescription);
            formData.append("quantity", qty);
            formData.append("price", priceBefore);
            formData.append("category", CatID);
            formData.append("brand", BrandID);
            formData.append("imageCover", images[0].uploadInfo.secure_url);

            colors.map((color) => formData.append("availableColors", color))
            seletedSubID.map((item) => formData.append("subcategory", item._id))
            setIsPressed(true)
            setLoading(true)
            await dispatch(createProduct(formData))
            setLoading(false)
        }

    }

    //get create meesage
    const product = useSelector(state => state.allproducts.products)

    useEffect(() => {
        if (loading === false) {
            setColors([])
            setProdName('')
            setProdDescription('')
            setPriceBefore('السعر قبل الخصم')
            setPriceAftr('السعر بعد الخصم')
            setQty('الكمية المتاحة')
            SetBrandID(0)
            setSeletedSubID([])
            if (product) {
                console.log(product)
                if (product.status === 201) {
                    setIsPressed(false);
                    notify("تم الاضافة بنجاح", "success");
                    setTimeout(() => {
                        navigate("/admin/allproducts")
                    }, 1000);
                } else {
                    setIsPressed(false);
                    notify("هناك مشكله", "error")
                }
            }
        }
    }, [loading])


    return [onChangeDesName, onChangeQty, onChangeColor, onChangePriceAfter, onChangePriceBefor, onChangeProdName, showColor, category, brand, priceAftr, images, setImages, onSelect, onRemove, options, handelChangeComplete, removeColor, onSeletCategory, handelSubmit, onSeletBrand, colors, priceBefore, qty, prodDescription, prodName,widgetRef,isPressed]

}

export default AdminAddProductsHook