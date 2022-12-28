import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { doSignOutAsync } from '../Slicers/logoutSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import {selectToken} from '../Slicers/loginSlice';
import { selectCategory } from '../Slicers/CategorySlice';
import { selectAllprodsByCategory,GetAllProdsByCategoryAsync, setEmpty } from '../Slicers/GetAllProdsByCategorySlice';

export default function SwipeableTemporaryDrawer() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken)
  const CategoryId = useSelector(selectCategory)
  const [CatID, setCatID] = useState(5)
  const prods = useSelector(selectAllprodsByCategory)
  
  // UseEffect to set back to select all of the producs
  useEffect(() => {
    if (CatID == 5){
      dispatch(setEmpty())
      console.log(prods)
    }
    else{
      dispatch(GetAllProdsByCategoryAsync(CatID))
    }
  }, [CatID])

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      style={{fontSize:"30px"}}
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' :180 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Home','Shirts', 'Pants'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              {/*Depends on what you choose it will show its items  */}
              {text === 'Pants' ? <button style={{border:"none",background:"none"}} onClick={()=>setCatID(CategoryId.pants)}>Pants</button> :null}
              {text === 'Home' ? <button style={{border:"none",background:"none"}} onClick={()=>setCatID(5)}>home</button>: null}
              {text === 'Shirts' ? <button style={{border:"none",background:"none"}} onClick={()=> setCatID(CategoryId.shirt)}>Shirts</button> :null}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Login', 'Register','Logout'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton style={{textAlign:"center"}}>
                {text === "Login" && token ==="" ? <Link to="/login" style={{color:"black", fontSize:"20px"}}>Login<LoginIcon style={{color:"black", fontSize:"20px"}}/> </Link>:null}
                {text === "Register" && token ==="" ? <Link to="/register" style={{color:"black", fontSize:"20px"}}>Register<HowToRegIcon style={{color:"black", fontSize:"20px"}}/></Link>:null}
                {text ==="Logout" && token != "" ? <button style={{fontSize:"20px",border:"none",backgroundColor:"white"}} onClick={()=> {dispatch(doSignOutAsync({"token":token}))}}>Logout <LogoutIcon/></button>:null}
            </ListItemButton>
          </ListItem>
        ))}
        </List>
    </Box>
  );

  return (
    <div >
      {['Menu'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button style={{color:"white", fontSize:"medium"}} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
