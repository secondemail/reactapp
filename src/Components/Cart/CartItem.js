import React, { useEffect, useState } from 'react'
import { Button, Col,Modal,Row, Spinner } from 'react-bootstrap'
import mobile from '../../images/mobile.png'
import deleteicon from '../../images/delete.png'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOneCart, setCartQty } from '../../redux/actions/cartAction'
import { Avatar, CircularProgress } from '@mui/material'
import { getOneProduct } from './../../redux/actions/productsAction';
import notify from './../../hook/useNotifaction';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loadingD, setLoadingD] = useState(false);
  const [loading,setLoading] = useState(true);
  const [loading2,setLoading2] = useState(true);
  const [isPress,setIsPress] = useState(false);
  const [qty, setQty] = useState(item.count);
  const onChangeQty = (e) => {
    setQty(e.target.value)
  }
  const handelChange = async () => {
    setIsPress(true)
    setLoading2(true);
    await dispatch(getOneProduct(item.product._id));
    setLoading2(false);
  }
  useEffect(() => {
    if (loading === false) {
      if (res) {
        window.location.reload(false);
      }
    }
  }, [loading]);

  useEffect(() => {
    if (loading2 === false) {
      if (res2&&res2.data) {
        if (res2.data.quantity < qty) {
          notify("عدد المنتج المتاح لا يكفي", "error")
          setIsPress(false)
        } else {
          const submitCount = async () => {
            setLoading(true);
            await dispatch(setCartQty(item._id, { count: qty }));
            setLoading(false);
            setIsPress(false);
          }
          submitCount();
        }
      }
    }
  }, [loading2]);
  const res = useSelector(state => state.cartReducer.cartQty);
  const res2 = useSelector(state => state.allproducts.oneProduct);

    const handelDeleteOne = async () => {
        setLoadingD(true)
        await dispatch(deleteOneCart(item._id));
        setTimeout(() => {
            window.location.reload();
        }, 1000);
      
    }


    return (
      <Col xs="12" lg="6" className="cart-item-body my-2 d-flex p-3 pt-5">
        <Modal show={show} onHide={handleClose}>
        <Modal.Header >
            <Modal.Title> <div className='font'>تاكيد الحذف</div></Modal.Title>
        </Modal.Header>
        <Modal.Body><div className='font'>هل انت متاكد من عملية الحذف للمنتج من العربة</div></Modal.Body>
        <Modal.Footer>
            {
                loadingD === true ?
                    (
                        <Button variant="primary" disabled>
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
                        <>
                            <Button className='font' variant="success" onClick={handleClose}>
                                تراجع
                            </Button>
                            <Button className='font' variant="dark" onClick={handelDeleteOne}>
                                حذف
                            </Button>
                        </>
                    )
            }

        </Modal.Footer>
        </Modal>
        <Avatar
          alt="Sharp"
          src={item.product.imageCover}
          sx={{ width: 56, height: 56 }}
        />
        <div className="w-100">
          <Row className="justify-content-between">
            <Col>
              <div onClick={handleShow} className="d-flex pt-2 justify-content-end " style={{ cursor: "pointer" }}>
                <div className="cat-text d-inline me-2">ازاله</div>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center mt-2">
            <Col sm="12" className=" d-flex flex-row justify-content-start">
              <div className="d-inline pt-2 cat-title">
                اسم المنتج: {item.product.title}
              </div>
            </Col>
          </Row>
          {
            item.color ?
              (
                <Row>
                  <Col sm="12" className="mt-1 d-flex">
                    <div
                      className="color ms-2 border"
                      style={{ backgroundColor: item.color }}></div>
                  </Col>
                </Row>
              )
              :<h6>لم يتم اختيار لون</h6>
          }
  
          <Row className="justify-content-between">
            <Col sm="12" className=" d-flex flex-row justify-content-between">
              <div className="d-inline pt-2 d-flex">
                <div className="cat-text  d-inline">الكميه</div>
                <input
                  min={1}
                  onChange={onChangeQty}
                  value={qty}
                  className="mx-2"
                  type="number"
                  style={{ width: "40px", height: "25px" }}
                />
                {
                  isPress ?
                    (<CircularProgress />) :
                    (<button onClick={handelChange} style={{height:"30px"}} className="product-cart-add px-2">تطبيق</button>)
                }
              </div>
              <div className="d-inline pt-2 barnd-text">{item.price * qty} جنية</div>
            </Col>
          </Row>
        </div>
      </Col>
    )
}

export default CartItem
