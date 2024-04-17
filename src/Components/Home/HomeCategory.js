import React, { useEffect } from 'react'
import { Container, Row, Spinner } from 'react-bootstrap';
import SubTiltle from '../Uitily/SubTiltle'
import CategoryCard from './../Category/CategoryCard';
import HomeCategoryHook from '../../hook/category/home-category-hook'
import { CircularProgress } from '@mui/material';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

const HomeCategory = () => {
    const [category, loading, colors] = HomeCategoryHook();
    return (
        <Container>
            {
                loading === false && category.data.length > 0 ? (<SubTiltle title="التصنيفات"  />):(<SubTiltle title="التصنيفات"  />)
            }
            <div className='d-flex justify-content-end'>
                <ReplyAllIcon/>
            </div>
            <div style={{overflowX:"scroll",scrollbarWidth:"none",borderLeft:"2.5px solid black",borderRight:"2.5px solid black"}} className='my-1 d-flex flex-row pt-5'>
                {
                    loading === false ?
                    (
                        category.data.length > 0 ? (
                            category.data.map((item, index) => {
                                return (<CategoryCard key={index} title={item.name} img={item.image} id={item._id} background={colors[index]} />)
                            })
                        ) : <h4>لا يوجد تصنيفات</h4>
                    )
                    :
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

export default HomeCategory
