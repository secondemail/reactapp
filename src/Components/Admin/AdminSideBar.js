import React from 'react'
import { NavLink } from 'react-router-dom'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';

const AdminSideBar = () => {
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <div className="sidebar">
            <ListItemButton onClick={handleClick}>
                <InboxIcon />
                <ListItemText primary="" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <NavLink to="/admin/allorders" style={{ textDecoration: 'none',color:"unset" }}>
                    <List component="div" disablePadding>
                        <ListItemButton>
                            <StarBorder />
                            <ListItemText primary="اداره الطلبات" />
                        </ListItemButton>
                    </List>
                </NavLink>
                <NavLink to="/admin/allproducts" style={{ textDecoration: 'none',color:"unset" }}>
                    <List component="div" disablePadding>
                        <ListItemButton>
                            <StarBorder />  
                            <ListItemText primary="اداره المنتجات" />
                        </ListItemButton>
                    </List>
                </NavLink>
                <NavLink to="/admin/addbrand" style={{ textDecoration: 'none',color:"unset" }}>
                    <List component="div" disablePadding>
                        <ListItemButton>
                            <StarBorder />  
                            <ListItemText primary="اضف ماركه" />
                        </ListItemButton>
                    </List>
                </NavLink>
                <NavLink to="/admin/addcategory" style={{ textDecoration: 'none',color:"unset" }}>
                    <List component="div" disablePadding>
                        <ListItemButton>
                            <StarBorder />  
                            <ListItemText primary="اضف تصنيف" />
                        </ListItemButton>
                    </List>
                </NavLink>
                <NavLink to="/admin/addsubcategory" style={{ textDecoration: 'none',color:"unset" }}>
                    <List component="div" disablePadding>
                        <ListItemButton>
                            <StarBorder />  
                            <ListItemText primary="اضف تصنيف فرعي" />
                        </ListItemButton>
                    </List>
                </NavLink>
                <NavLink to="/admin/addproduct" style={{ textDecoration: 'none',color:"unset" }}>
                    <List component="div" disablePadding>
                        <ListItemButton>
                            <StarBorder />  
                            <ListItemText primary="اضف منتج" />
                        </ListItemButton>
                    </List>
                </NavLink>
                <NavLink to="/admin/add-copon" style={{ textDecoration: 'none',color:"unset" }}>
                    <List component="div" disablePadding>
                        <ListItemButton>
                            <StarBorder />  
                            <ListItemText primary="اضف كوبون" />
                        </ListItemButton>
                    </List>
                </NavLink>
            </Collapse>
        </div>
    )
}

export default AdminSideBar
