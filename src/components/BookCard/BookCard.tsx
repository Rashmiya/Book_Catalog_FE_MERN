
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import ConfirmDialog from '../DeleteDialog/ConfirmDialog';
import UpdateBookModal from '../UpdateBookModal/UpdateBookModal';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Rating from '@mui/material/Rating';


export default function BookCard(props:any) {
  const imageFileName = props.data.book_image;
  const imageUrl = `/uploads/${imageFileName}`;
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [imgOpacity, setImgOpacity] = React.useState('100%');
  const [imageDimensions, setImageDimensions] = React.useState({ width: 300, height: 300 });

  React.useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
  }, [imageUrl]);
  const aspectRatio = imageDimensions.width / imageDimensions.height;

  const handleDialogClickOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };


  const handleUpdateClickOpen = () => {
    setOpenUpdate(true);
  };
  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const user=localStorage.getItem('userDetails');
  const [userPermision, setUserPermision] = React.useState(false);


  React.useEffect(()=>{
    if (user) {
      const userDetails = JSON.parse(user);
      const status=userDetails.userRoll;
      status==='Admin'?setUserPermision(true):setUserPermision(false);
    }
  },[]);
  
  return (
  
    <><Card sx={{ maxWidth: 300 }}>
      <motion.div 
        whileHover={{ scale: 1.03 }}
        onMouseEnter={()=>{setImgOpacity('50%');}}
        onMouseLeave={()=>{setImgOpacity('100%');}}
        transition={{duration:0.2}}
      >
        
        <CardMedia
          onClick={()=>{navigate('/payment');localStorage.setItem('selectedBook', props.data.bid);window.scrollTo(0, 0);}}
          sx={{ height: 300/aspectRatio,width:300, cursor: 'pointer',opacity:imgOpacity}}
          image={imageUrl}
          title="book img"
          
        />
      
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.data.book_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.data.book_author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Rs.{props.data.book_price}
          </Typography>
        </CardContent>
        <Tooltip title="Update" placement="top" style={{display:userPermision?'':'none'}}>
          <IconButton aria-label="add to favorites" onClick={handleUpdateClickOpen}>
            <EditCalendarIcon sx={{ color: '#1e90ff' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="top" style={{display:userPermision?'':'none'}}>
          <IconButton aria-label="share" onClick={handleDialogClickOpen} >
            <DeleteIcon sx={{ color: '#ff4757' }} />
          </IconButton>
        </Tooltip>
        <UpdateBookModal open={openUpdate} handleClose={handleUpdateClose} data={props.data}/>
        <ConfirmDialog open={openDialog} handleClose={handleDialogClose} id={props.data._id}/>
      </motion.div>
    </Card>
    
    </>
  );
}
