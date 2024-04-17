import React, { useState, useEffect, useRef } from 'react'
import { getOneCategory } from '../../redux/actions/subcategoryAction';
import { createProduct, getOneProduct } from '../../redux/actions/productsAction';
import notify from './../../hook/useNotifaction';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction'
import { getAllBrand } from './../../redux/actions/brandAction';
import { updateProducts } from './../../redux/actions/productsAction';
import baseUrl from './../../Api/baseURL';
import { useNavigate } from 'react-router-dom';

const AdminEditProductsHook = (id) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //values images products        
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const [images, setImages] = useState([]);
    const [loading2,setLoading2]=useState(true);
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
            const run = async () => {
                setLoading2(true)
                await dispatch(getOneProduct(id))
                await dispatch(getAllCategory());
                await dispatch(getAllBrand());
                setLoading2(false)
            }
            run();
        } catch (error) {}
    }, [])

    //get one product details
    const item = useSelector((state) => state.allproducts.oneProduct)
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
    const [CatID, setCatID] = useState('0');
    const [BrandID, SetBrandID] = useState('0');
    const [seletedSubID, setSeletedSubID] = useState([]);
    const [imageCover, setImageCover] = useState("");
    const [isPressed, setIsPressed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (item.data) {
            setImageCover(item.data.imageCover)
            setProdName(item.data.title)
            setProdDescription(item.data.description)
            setPriceBefore(item.data.price)
            setQty(item.data.quantity)
            setCatID(item.data.category)
            SetBrandID(item.data.brand)
            setColors(item.data.availableColors)
        }
    }, [item])


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
        setCatID(e.target.value)
    }
    useEffect(() => {
        if (CatID != 0) {
            const run = async () => {
                await dispatch(getOneCategory(CatID))
            }
            run();
        }
    }, [CatID])

    useEffect(() => {
        if (subCat) {
            setOptions(subCat.data)
        }
    }, [subCat])




    //when selet brand store id
    const onSeletBrand = (e) => {
        SetBrandID(e.target.value)
    }


    //to save data 
    const handelSubmit = async (e) => {
        e.preventDefault();
        setIsPressed(true);
        if (CatID === 0 || prodName === "" || prodDescription === "" || priceBefore <= 0) {
            notify("من فضلك اكمل البيانات", "warn");
            setIsPressed(false);
            return;
        }

        const formData = new FormData();
        formData.append("title", prodName);
        formData.append("description", prodDescription);
        formData.append("quantity", qty);
        formData.append("price", priceBefore);
        if (images.length <= 0) {
            formData.append("imageCover", imageCover)
        } else {
            formData.append("imageCover", images[0].uploadInfo.secure_url);
        }
        formData.append("category", CatID);
        formData.append("brand", BrandID);

        colors.map((color) => formData.append("availableColors", color))
        seletedSubID.map((item) => formData.append("subcategory", item._id))

            setIsPressed(true)
            setLoading(true)
            await dispatch(updateProducts(id, formData))
            setLoading(false)

    }

    //get create meesage
    const product = useSelector(state => state.allproducts.updateProducts)

    useEffect(() => {

        if (loading === false) {
            setColors([])
            setImages([])
            setProdName('')
            setProdDescription('')
            setPriceBefore('السعر قبل الخصم')
            setPriceAftr('السعر بعد الخصم')
            setQty('الكمية المتاحة')
            SetBrandID(0)
            setSeletedSubID([])
            setTimeout(() => setLoading(true), 1500)

            if (product) {
                if (product.status === 200) {
                    notify("تم التعديل بنجاح", "success")
                    setTimeout(() => {
                        navigate("/admin/allproducts")
                    }, 1000);
                } else {
                    notify("هناك مشكله", "error")
                }
            }
        }
    }, [loading])


    return [CatID, BrandID, onChangeDesName, onChangeQty, onChangeColor, onChangePriceAfter, onChangePriceBefor, onChangeProdName, showColor, category, brand, priceAftr, images, setImages, onSelect, onRemove, options, handelChangeComplete, removeColor, onSeletCategory, handelSubmit, onSeletBrand, colors, priceBefore, qty, prodDescription, prodName,isPressed,widgetRef,loading2]

}

export default AdminEditProductsHook