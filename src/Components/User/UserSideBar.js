import React from 'react'
import { NavLink } from 'react-router-dom'
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
const UserSideBar = () => {
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
                <NavLink to="/user/allorders" style={{ textDecoration: 'none',color:"unset" }}>
                    <List component="div" disablePadding>
                        <ListItemButton>
                            <StarBorder />
                            <ListItemText primary="اداره الطلبات" />
                        </ListItemButton>
                    </List>
                </NavLink>
                <NavLink to="/user/favoriteproducts" style={{ textDecoration: 'none',color:"unset" }}>
                    <List component="div" disablePadding>
                        <ListItemButton>
                            <StarBorder />  
                            <ListItemText primary="المنتجات المفضلة" />
                        </ListItemButton>
                    </List>
                </NavLink>
                <NavLink to="/user/addresses" style={{ textDecoration: 'none',color:"unset" }}>
                    <List component="div" disablePadding>
                        <ListItemButton>
                            <StarBorder />  
                            <ListItemText primary="العنوانين الشخصية" />
                        </ListItemButton>
                    </List>
                </NavLink>
                <NavLink to="/user/profile" style={{ textDecoration: 'none',color:"unset" }}>
                    <List component="div" disablePadding>
                        <ListItemButton>
                            <StarBorder />  
                            <ListItemText primary="الملف الشخصي" />
                        </ListItemButton>
                    </List>
                </NavLink>
            </Collapse>
        </div>
    )
}
export default UserSideBar
