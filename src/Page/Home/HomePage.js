import React from 'react'
import HomeCategory from '../../Components/Home/HomeCategory';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import Silder from './../../Components/Home/Silder';
import DiscountSection from './../../Components/Home/DiscountSection';
import BrandFeatured from '../../Components/Brand/BrandFeatured';
import ViewHomeProductsHook from './../../hook/products/view-home-products-hook';
import { Fade } from 'react-awesome-reveal';
const HomePage = () => {
    const [items] = ViewHomeProductsHook();
    return (
        <div style={{ minHeight: '670px' }} className='font' >
            <Silder />
            <Fade>
                <HomeCategory />
                <CardProductsContainer products={items} title="الاكثر مبيعا" btntitle="المزيد" pathText="/products" />
                <DiscountSection />
                <BrandFeatured title="اشهر الماركات" btntitle="المزيد" />
            </Fade>
        </div>
    )
}

export default HomePage
