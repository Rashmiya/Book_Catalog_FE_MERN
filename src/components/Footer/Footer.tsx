import React from 'react';
import './Footer.css';
import footer from '../../assets/images/footer_1.jpg';
import {  Typography } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Footer = () => {
  const items1 = [
    'Search Terms',
    'Advanced Search',
    'Helps & Faqs',
    'Store Location',
    'Orders & Returns',
  ];
  const items2 = [
    'Contact',
    'About',
    'Carrers',
    'Refund & Returns',
    'Deliveries',
  ];
  const[hoverColor1,setHoverColor1]=React.useState<null | number>(null);
  const[hoverColor2,setHoverColor2]=React.useState<null | number>(null);
  return (
    <div style={{position:'relative'}}>
      <img src={footer} style={{width:'100%',height:'80vh'}} alt="" />

      {/* txt one */}
      <div style={{position:'absolute',top:'25%',left:'25%'}}>
        <Typography variant='h4'textAlign={'start'} sx={{fontWeight:'bold',fontFamily:'initial'}}>BOOK SHOP</Typography>
        <br/>
        <Typography textAlign={'start'}>
          1203 Town Center<br/>
          Drive FL 33458 SL<br/>
          +94 123 456 789<br/>
          Sri lnaka<br/>
          info@example.com  
        </Typography>
      </div>

      {/* txt two */}
      <div style={{position:'absolute',top:'25%',left:'45%'}}>
        <Typography variant='h5'textAlign={'start'} sx={{fontWeight:'bold',fontFamily:'initial'}}>SUPPORT</Typography>
        
        <List>
          {items1.map((item, index) => (
            <ListItem key={index}>
              <ListItemText  primary={item} 
                sx={{cursor:'pointer',color:hoverColor1===index?'red':'white',textAlign:'start'}} 
                onMouseEnter={()=>{setHoverColor1(index);}}
                onMouseLeave={()=>{setHoverColor1(null);}}
                
              />
            </ListItem>
          ))}
        </List>
      </div>

      {/* txt three */}
      <div style={{position:'absolute',top:'25%',left:'65%'}}>
        <Typography variant='h5'textAlign={'start'} sx={{fontWeight:'bold',fontFamily:'initial'}}>INFORMATION</Typography>
      
        <List >
          {items2.map((item, index) => (
            <ListItem  key={index} >
              <ListItemText  primary={item} 
                sx={{cursor:'pointer',color:hoverColor2===index?'red':'white',textAlign:'start'}} 
                onMouseEnter={()=>{setHoverColor2(index);}}
                onMouseLeave={()=>{setHoverColor2(null);}}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Footer;