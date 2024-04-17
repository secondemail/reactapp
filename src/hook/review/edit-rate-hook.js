import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, forgetPassword, loginUser } from '../../redux/actions/authAction';
import { useNavigate } from 'react-router-dom'
import notify from '../useNotifaction';
import { createReview, deleteReviewOnProduct, updateReviewOnProduct } from './../../redux/actions/reviewAction';
const EditRateHook = (review) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)
    const [isPressEdit, setIsPressEdit] = useState(false)

    const [newRateText, setNewRateText] = useState(review.review);
    const [newRateValue, setNewRateValue] = useState(review.rating);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const onChangeRateText = (e) => {
        setNewRateText(e.target.value)
    }
    const OnChangeRateValue = (val) => {
        setNewRateValue(val)
    }

    const handelEdit = async () => {
        setIsPressEdit(true);
        setLoading(true)
        await dispatch(updateReviewOnProduct(review._id, {
            review: newRateText,
            rating: newRateValue
        }))
        setLoading(false)
    }
    const res = useSelector(state => state.reviewReducer.updateReview)

    useEffect(() => {
        if (loading === false) {
            if (res.status && res.status === 200) {
                notify("تم تعديل التقييم بنجاح", "success")
                setTimeout(() => {
                    window.location.reload(false)
                }, 1000);
            } else {
                setIsPressEdit(false)
                notify("هناك مشكله فى عملية التعديل", "error")
            }
        }
    }, [loading])

    return [showEdit, handleCloseEdit, handleShowEdit, handelEdit, onChangeRateText, newRateText, OnChangeRateValue, newRateValue,isPressEdit]

}


export default EditRateHook