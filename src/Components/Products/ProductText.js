import React, { useEffect, useState } from 'react'
import { Row, Col, Spinner, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addCart } from '../../redux/actions/cartAction';
import { Flip, ToastContainer } from 'react-toastify';
import notify from '../../hook/useNotifaction';

const ProductText = ({item,cat,brand}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const [indexColor, setIndexColor] = useState("");
  const [prodColor, setProdColor] = useState("");
  const colorClick = (index,color) => {
    setIndexColor(index);
    setProdColor(color);
  }

  const handelSubmit = async () => {
    setIsPressed(true);
    setLoading(true);
    await dispatch(addCart({ productId: id, color: prodColor }));
    setLoading(false)
  }

  useEffect(() => {
    if (loading === false) {
      setIsPressed(false);
      if (res && res.status === 200) {
        notify("تم اضافة المنتج بنجاح", "success");
      } else {
        setIsPressed(false)
        notify("خطأ في عملية الاضافة", "error");
      }
    }
  }, [loading])
  const res = useSelector(state => state.cartReducer.cart);

  return (
      <div>
        <Row className="mt-2">
          <div style={{fontSize:"15px"}} className="cat-text">{cat.name} :</div>
        </Row>
        <Row>
          <Col md="8">
            <div className="cat-title d-inline">
              <h2>{item.title}</h2>
              <h6>الكمية المتاحة: {item.quantity > 0 ? item.quantity : "تم بيع المنتجات بالكامل" }</h6>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="8" className="mt-4">
            <div className="cat-text d-inline">الماركة :</div>
            <div className="barnd-text d-inline mx-1">{brand.name} </div>
          </Col>
        </Row>
        <Row>
          <Col md="8" className="mt-1 d-flex">
            {
              item.availableColors ? (item.availableColors.map((color, index) => {
                return (<div
                  key={index}
                  onClick={()=>colorClick(index,color)}
                  className="color ms-2 "
                  style={{ backgroundColor: color,border: indexColor===index ? "2px solid black":"none" }}></div>)
              })) : null
            }


          </Col>
        </Row>

        <Row className="mt-4">
          <div className="cat-text">المواصفات | <div className="cat-rate d-inline mx-3">{item.ratingsAverage} ({item.ratingsQuantity} تقييم)</div>:</div>
        </Row>
        <Row className="mt-2">
          <Col md="10">
            <div className="product-description d-inline">
              {item.description}
            </div>
          </Col>
        </Row>
        <Row className="mt-4 pb-3">
          <Col md="12">
          <div className="product-price d-inline px-3 py-3 border">{item.price} جنية</div>
          {
            item.quantity > 0 ? isPressed ?
              (
                <Button className='product-cart-add px-3 py-3 d-inline mx-3' variant="primary" disabled>
                    انتظر
                    <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />
                </Button>
              )
              :
              (
                <div onClick={handelSubmit} className="product-cart-add px-3 py-3 d-inline mx-3">اضف للعربة</div>
              )
              :null
          }
          </Col>
      </Row>
        <ToastContainer position="top-center" autoClose={500} theme="colored" transition={Flip} />
      </div>
  )
}

export default ProductText
