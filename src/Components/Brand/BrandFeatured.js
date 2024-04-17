import React from 'react'
import { Container, Spinner, Row } from 'react-bootstrap'
import SubTiltle from '../Uitily/SubTiltle'
import BrandCard from './BrandCard'
import brand1 from "../../images/brand1.png";
import HomeBrandHook from '../../hook/brand/home-brand-hook'
import { CircularProgress } from '@mui/material';
import  ReplyAllIcon  from '@mui/icons-material/ReplyAll';

const BrandFeatured = ({ title, btntitle }) => {
    const [brand, loading] = HomeBrandHook();
    return (
        <Container>
            {
                loading === false && brand.data.length > 0 ? (<SubTiltle title={title} />):(<SubTiltle title={title}  />)
            }
            <div className='d-flex justify-content-end'>
                <ReplyAllIcon/>
            </div>
            <div style={{overflowX:"scroll",scrollbarWidth:"none",borderLeft:"2.5px solid black",borderRight:"2.5px solid black"}} className='my-1 d-flex flex-row'>
                {
                    loading === false ? (
                        brand.data.length > 0 ? (
                            brand.data.map((item, index) => {
                                return (<BrandCard id={item._id} key={index} img={item.image} />)
                            })
                        ) : <h4>لا يوجد ماركات</h4>
                    ) :
                    (
                        <div style={{width:"100%"}} className='text-center p-3'>
                            <CircularProgress />
                        </div>
                    )
                }
            </div>



        </Container>
    )
}

export default BrandFeatured
