import React, { useState } from 'react'
import SidebarSearchHook from '../../hook/search/sidebar-search-hook';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StyledMenu from './BtnFilter';

import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { Col, Row } from 'react-bootstrap';

const SideFilter = () => {
  const [category, brand, clickCategory, clickBrand, priceFrom, priceTo] = SidebarSearchHook();
  var localFrom = localStorage.getItem("priceFrom")
  var localTo = localStorage.getItem("priceTo")
  if (localStorage.getItem("priceFrom") !==null && localStorage.getItem("priceTo") !==null) {
    localFrom = localStorage.getItem("priceFrom")
    localTo = localStorage.getItem("priceTo")
  } else {
    localFrom = 0;
    localTo=0
  }


    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
      setOpen(!open);
    };
  
    const [open2, setOpen2] = React.useState(false);
    const handleClick2 = () => {
      setOpen2(!open2);
    };

  return (
    <Row className="mt-3">
      <Col>
        <ListItemButton onClick={handleClick}>
            <CategoryOutlinedIcon />
            <ListItemText primary="التصنيفات" />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <div className="p-3">
            <div className="filter-title">الفئة</div>
            <div className="d-flex mt-3">
              <input onChange={clickCategory} type="checkbox" value="0" />
              <div className="filter-sub me-2 ">الكل</div>
            </div>
            {
              category ? (category.map((item, index) => {
                return (
                  <div key={index} className="d-flex mt-3">
                    <input name={item.name} onChange={clickCategory} type="checkbox" value={item._id} />
                    <label htmlFor={item.name}  className="filter-sub me-2 ">{item.name}</label>
                  </div>
                )
              })) : <h6>لا يوجد تصنيفات</h6>
            }
          </div>
        </Collapse>
      </Col>
      <Col>
        <ListItemButton onClick={handleClick2}>
            <CategoryOutlinedIcon />
            <ListItemText primary="الماركات" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open2} timeout="auto" unmountOnExit>
          <div className="p-3">
            <div className="filter-title mt-3">الماركة</div>
            <div className="d-flex mt-3">
              <input onChange={clickBrand} type="checkbox" value="0" />
              <div className="filter-sub me-2 ">الكل</div>
            </div>

            {
              brand ? (brand.map((item, index) => {
                return (
                  <div key={index} className="d-flex mt-3">
                    <input onChange={clickBrand} type="checkbox" value={item._id} />
                    <div className="filter-sub me-2 ">{item.name}</div>
                  </div>
                )
              })) : <h6>لا يوجد ماركات</h6>
            }
          </div>
        </Collapse>
      </Col>

      <Col>
        <div className="filter-title my-3">السعر</div>
        <div className="d-flex">
          <p className="filter-sub my-2">من:</p>
          <input
            value={localFrom}
            onChange={priceFrom}
            className="m-2 text-center"
            type="number"
            style={{ width: "50px", height: "25px" }}
          />
        </div>
        <div className="d-flex">
          <p className="filter-sub my-2">الي:</p>
          <input
            onChange={priceTo}
            value={localTo}
            className="m-2 text-center"
            type="number"
            style={{ width: "50px", height: "25px" }}
          />
        </div>
      </Col>
    </Row>
  )
}

export default SideFilter
