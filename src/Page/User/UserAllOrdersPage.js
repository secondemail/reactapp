import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import UserSideBar from '../../Components/User/UserSideBar'
import UserAllOrder from '../../Components/User/UserAllOrder'
const UserAllOrdersPage = () => {
    return (
        <Container >
            <Row className='py-5' >
                <Col lg="3">
                    <UserSideBar />
                </Col>

                <Col lg="9" >
                    <UserAllOrder />
                </Col>
            </Row>
        </Container>
    )
}


export default UserAllOrdersPage
