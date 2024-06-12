/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-key */
import React, { useState,useEffect } from 'react';
import ResponsiveAppBar from '../../components/AppBar/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './AllProducts.css';
import BookCard from '../../components/BookCard/BookCard';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddBookModal from '../../components/AddBookModal/AddBookModal';
import { getAllBooksService } from '../../services/BookServices';
import { useDispatch ,useSelector} from 'react-redux';
import { saveBooksAction, setUpdates } from './AllProductsSlice';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import { Typography } from '@mui/material';
import Footer from '../../components/Footer/Footer';


const AllProducts = () => {
  const [open, setOpen] = useState(false);
  const books=useSelector((state:any)=>state.booksState.books);
  const updates=useSelector((state:any)=>state.booksState.updates);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user=localStorage.getItem('userDetails');
  const [userPermision, setUserPermision] = useState(false);
  const user2 = useSelector((state: any) => state.signIn.user);
  React.useEffect(() => {
    if (user2 === false) {
      navigate('/');
    }
  });

  React.useEffect(()=>{
    if (user) {
      const userDetails = JSON.parse(user);
      const status=userDetails.userRoll;
      status==='Admin'?setUserPermision(true):setUserPermision(false);
    }
  },[]);


  const handleOpen = () => setOpen(true);
  const handleClose = () =>{ 
    setOpen(false);
    fetchData();
  };
  
  useEffect(()=>{
    fetchData();
  },[updates]);

  const fetchData = async () => {
    try{
      const response = await getAllBooksService();
      console.log(response.data);
      dispatch(saveBooksAction(response.data));
      dispatch(setUpdates(false));
      console.log('check code...');
    }catch(e){
      console.log(e);
    }
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>

        {/* header */}
        <Grid item xs={12}>
          <ResponsiveAppBar/>
        </Grid>

        {/* body */}
        <Grid container item xs={12}>

          <Grid item xs={2}>
            <div className='sidebar'>
              <Typography sx={{textAlign:'start',margin:'10%'}}>Filter :</Typography>
              <SideBar/></div>
          </Grid>

          <Grid item xs={10}>
            <Box sx={{textAlign:'start',margin:'2.2%',color:'red'}}><Typography variant='h5' fontFamily={'initial'} fontWeight={'bold'} >All Books</Typography></Box>

            <div className='btnArea1' style={{display:userPermision?'':'none'}}>
              <Button onClick={handleOpen}variant="outlined" startIcon={<AddIcon />}>
               Add Book
              </Button>
              <AddBookModal open={open} handleClose={handleClose}/>
            </div>
            <div className='content'>
              { 
                books.map((book:any)=>(
                  <BookCard
                    key={book.bid}
                    data={book}
                  />
                )) 
              }
            </div>
          </Grid>

        </Grid>

        {/* footer */}
        <Grid item xs={12} height={'85vh'} sx={{backgroundColor:'#ff5013',color:'white'}} >
          <Footer/>
          <Typography ><small>All Right Reserved © 2023 READI</small></Typography>
        </Grid>

      </Grid>
    </Box>

  );
};

export default AllProducts;