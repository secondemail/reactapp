import React from 'react'
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import AddRateHook from '../../hook/review/add-rate-hook';
import { Flip, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';

const RatePost = () => {
  const {id} =useParams() ;
  const [OnChangeRateText, OnChangeRateValue, rateText, rateValue, user, onSubmit,isPressed] = AddRateHook(id)

  var name = ""
  if (user)
    name = user.name

  const setting = {
    size: 15,
    count: 5,
    color: "#979797",
    activeColor: "#ffc107",
    value: 7.5,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: newValue => {
      OnChangeRateValue(newValue);
    }
  };
  return (
    <div>
      <Row className="mt-3 ">
        <Col sm="12" className=" d-flex">
          <div className="rate-name  d-inline ms-3 mt-1 ">{name}</div>
          <ReactStars  {...setting} />
        </Col>
      </Row>
      <Row className="border-bottom mx-2">
        <Col className="d-felx me-4 pb-2">
          <textarea
            value={rateText}
            onChange={OnChangeRateText}
            className="input-form-area p-2 mt-3"
            rows="2"
            cols="20"
            placeholder="اكتب تعليقك...."
          />
          <div className=" d-flex justify-content-end al">
            {
                isPressed ?
                    (
                        <Button className='d-inline mt-2 btn-save' variant="primary" disabled>
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
                      <div onClick={onSubmit} className="product-cart-add px-3  py-2 text-center d-inline">اضف تعليق</div>
                    )
            }
          </div>
        </Col>
      </Row>
      <ToastContainer position="top-center" autoClose={1500} theme="colored" transition={Flip} />

    </div>
  )
}

export default RatePost
