import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Pagination from '../../Components/Uitily/Pagination'
import UserSideBar from '../../Components/User/UserSideBar'
import UserAddAddress from '../../Components/User/UserAddAddress';
import UserProfile from '../../Components/User/UserProfile';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
const UserProfilePage = () => {


    return (
        <Container >
            <Row className='py-5'>
                <Col lg="3">
                    <UserSideBar />
                </Col>
                <Col lg="9">
                    <UserProfile />
                </Col>
            </Row>
        </Container>
    )
}
export default UserProfilePage
