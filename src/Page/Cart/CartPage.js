import React,{useEffect,useState} from 'react'
import { Container, Row, Col,Spinner } from 'react-bootstrap'
import CartCheckout from '../../Components/Cart/CartCheckout'
import CartItem from '../../Components/Cart/CartItem'
import { useSelector } from 'react-redux';
import { getCart } from '../../redux/actions/cartAction'
import { useDispatch } from 'react-redux';

const CartPage = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [cartData, setCartData] = useState([]);
    const [cartPrice, setCartPrice] = useState([]);
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            await dispatch(getCart());
            setLoading(false);
        }
        getData();

    }, []);
    useEffect(() => {
        if (loading === false) {
            if (res&&res.status==="success") {
                setCartData(res.data.products)
                setCartPrice(res.data)
            }
        }
    }, [loading]);
    const res = useSelector(state => state.cartReducer.allCart);
    return (
        <>
                        {
                !loading ?
                    (
                        <Container style={{ minHeight: '670px' }}>
                            <Row>
                                <div className='cart-title mt-4'>عربة التسوق</div>
                            </Row>
                            <Row className='d-flex justify-content-center'>
                                <Col xs="12" md="9">

                                    {
                                        cartData.map((item, index) => {
                                            return (
                                                <CartItem key={index} item={item} />
                                            )
                                        })
                                    }

                                </Col>

                                <Col xs="6" md="3">
                                    <CartCheckout cartPrice={cartPrice} />
                                </Col>
                            </Row>
                        </Container>
                    )
                    :
                    (
                        <div className='over'>
                            <Spinner animation="border" variant="info" />
                        </div>
                    )
            }
        </>
    )
}

export default CartPage
