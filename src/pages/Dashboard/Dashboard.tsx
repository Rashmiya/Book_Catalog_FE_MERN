import * as React from 'react';
import ResponsiveAppBar from '../../components/AppBar/AppBar';
import { Container, Typography, duration } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dashboard from '../../assets/images/dashboard.jpg';
import dashboard_2 from '../../assets/images/dashboard_2.jpg';
import BookCard from '../../components/BookCard/BookCard';
import { getAllBooksService } from '../../services/BookServices';
import { saveBooksAction } from '../AllProducts/AllProductsSlice';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer/Footer';
//import Slider from '../../components/Slider/Slider';

const Dashboard = () => {
  const dispatch = useDispatch();
  const books=useSelector((state:any)=>state.booksState.books);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.signIn.user);
  const [animation,setAnimation]=React.useState(0);
  React.useEffect(() => {
    if (user === false) {
      navigate('/');
    }
  });
  React.useEffect(()=>{
    fetchData();
  },[]);

  const fetchData = async () => {
    try{
      const response = await getAllBooksService();
      dispatch(saveBooksAction(response.data));
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

          {/* view one */}
          <Grid height={'100vh'} xs={12} >
            <img src={dashboard} style={{width:'100%',height:'100%'}} alt="" />
            <motion.div style={{
              position: 'absolute',
              top: '25%', 
              left: '25%', 
              transform: 'translate(-50%, -50%)', 
              fontSize: '24px', 
              fontWeight: 'bold',  
            }}
            initial={{
              x:-1000
            }}
            animate={{
              x:-300
            }}
            transition={{
              delay:0.5,
              duration:0.5,
              type:'spring',
              stiffness:105,
              damping:10,
              
              //repeat:2
              //repeatType:'mirror'
            }}
            >
              <Typography variant="h3" sx={{textAlign: 'left',color:'red',fontWeight:'bold',fontFamily:'initial'}}>Get 65% Off For All <br/>Design Books</Typography>
              <br/>
              <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br/>
        Quos blanditiis tenetur unde suscipit, quam beatae rerum<br/> 
        inventore consectetur,neque doloribus, cupiditate numquam<br/> 
        dignissimos laborum fugiat deleniti? 
                <br/>
                <br/>
                <button style={{
                  width:'20%',
                  height:'20%',
                  fontSize:'18px',
                  backgroundColor:'red',
                  border:'1px solid red',
                  color:'white',
                  cursor:'pointer'
                }}>Shop Now</button>
              </Typography>
             
            </motion.div>
          </Grid>

          {/* view two */}
          <Grid xs={12}>
            <Typography variant='h4' sx={{
              fontFamily:'initial',
              marginTop:10
            }}>Best Selling Books</Typography>

            <div className="books">{             
              books.slice(0, 8).map((book:any)=>(
                <BookCard
                  key={book.bid}
                  data={book}
                />
              ))
            }

            </div>
          </Grid>

          {/* view three */}
          <Grid height={'100vh'} xs={12} sx={{position:'relative'}}>
            <motion.div
              onMouseEnter={()=>{setAnimation(1);}}
              style={{width:'100%',height:'100%'}}
            >
              <motion.img src={dashboard_2} style={{width:'100%',height:'100%'}} alt="" />
            
              <motion.div style={{
                position: 'absolute',
                top: '55%', 
                left: '45%', 
                transform: 'translate(-50%, -50%)', 
                fontSize: '24px', 
                fontWeight: 'bold', 
                userSelect: 'none'
              }}
              initial={{
                opacity:animation
              }}
              animate={{
                opacity:animation
              }}
              transition={{
                //duration:0.1,
                type:'spring',
                stiffness:105,
                damping:10,
              }}
              >
                <Typography variant="h3" sx={{textAlign: 'left',color:'red',fontWeight:'bold',fontFamily:'initial'}}>Get 65% Off For All <br/>Design Books</Typography>
                <br/>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br/>
        Quos blanditiis tenetur unde suscipit, quam beatae rerum<br/> 
        inventore consectetur,neque doloribus, cupiditate numquam<br/> 
        dignissimos laborum fugiat deleniti? 
                  <br/>
                  <br/>
                  <button style={{
                    width:'20%',
                    height:'20%',
                    fontSize:'18px',
                    backgroundColor:'red',
                    border:'1px solid red',
                    color:'white',
                    cursor:'pointer'
                  }}>Shop Now</button>
                </Typography>
             
              </motion.div>
            </motion.div>
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

export default Dashboard;