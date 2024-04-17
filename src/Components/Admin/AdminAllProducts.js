import React from 'react'
import { Row } from 'react-bootstrap'
import AdminAllProductsCard from './AdminAllProductsCard'

const AdminAllProducts = ({ products }) => {
    return (
        <div style={{ minHeight: '670px' }}>
            <div className='admin-content-text'>ادارة جميع المنتجات</div>
            <Row className='justify-content-start'>
                {
                    products.length > 0 ? (
                        products.map((item, index) => <AdminAllProductsCard key={index} item={item} />)
                    ) : <h4>لا يوجد منتجات حتي الان</h4>
                }

            </Row>

        </div>
    )
}

export default AdminAllProducts
