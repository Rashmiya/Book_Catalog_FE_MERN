/* eslint-disable @typescript-eslint/no-explicit-any */
import  React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import './AddBookModal.css';
import { MuiFileInput } from 'mui-file-input';
import { BookModel } from '../../utils/interface';
import { toast } from 'react-toastify';
import { insertBookService } from '../../services/BookServices';
import { error } from 'console';
const BoxStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddBookModal({ open, handleClose }:any) {
  const [bookNameError, setBookNameError] = React.useState('');
  const [bookAuthorError, setBookAuthorError] = React.useState('');
  const [bookQtyError, setBookQtyError] = React.useState('');
  const [bookPriceError, setBookPriceError] = React.useState('');
  const [bookTypeError, setBookTypeError] = React.useState('');
  
  const [bookName, setBookName] = React.useState('');
  const [bookAuthor, setBookAuthor] = React.useState('');
  const [bookQty, setBookQty] = React.useState('');
  const [bookPrice, setBookPrice] = React.useState('');
  const [bookType, setBookType] = React.useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedImagePreview, setSelectedImagePreview] = useState('');

  const handleFileSelect = (event:any) => {
    //setSelectedImage(URL.createObjectURL(event.target.files[0]));
    setSelectedImage(event.target.files[0]);
    setSelectedImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleImageClose = () => {
    setSelectedImage('');
    setSelectedImagePreview('');
  };

  async function saveBookFunction(event: any) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('book_name', bookName);
    formData.append('book_author', bookAuthor);
    formData.append('book_qty', bookQty);
    formData.append('book_price', bookPrice);
    formData.append('book_type', bookType);
    formData.append('book_image', selectedImage);

    const bookSample = { bookName , bookAuthor , bookQty , bookPrice , bookType ,selectedImage};


    if (checkInputValidation(bookSample)) {
      const response = await insertBookService(formData);
      console.log(response);
      if(response.data!=null){
        clearFields();
        toast.success('Book Added Successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      
    }
  }  
  function clearFields() {
    setBookName('');
    setBookAuthor('');
    setBookQty('');
    setBookPrice('');
    setBookType('');
    setSelectedImage('');
    setSelectedImagePreview('');
    handleClose();  
  }
  function checkInputValidation(dataItem:any) {
    const bookNameRegex = /^[A-z 0-9]{2,20}$/;
    const bookAuthorRegex = /^[A-z ]{2,20}$/;
    const bookQtyRegex = /^[0-9]{1,5}$/;
    const bookPriceRegex = /^[0-9.]{2,5}$/;
    const bookTypeRegex = /^[A-z]{2,20}$/;
    //const bookImgRegex = /^data:image\/(jpeg|jpg|png|gif);base64,([A-Za-z0-9+/=])+$/;
    let fieldStatus = false;

    if (dataItem.bookName !== undefined && bookNameRegex.test(dataItem.bookName)) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setBookNameError('Enter valid ook name');
      return;
    }

    if (dataItem.bookAuthor !== undefined && bookAuthorRegex.test(dataItem.bookAuthor)) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setBookAuthorError('Check valid book author');
      return;
    }

    if (dataItem.bookQty !== undefined && bookQtyRegex.test(dataItem.bookQty+'')) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setBookQtyError('Check valid Password');
      return;
    }

    if (dataItem.bookPrice+'' !== undefined && bookPriceRegex.test(dataItem.bookPrice+'')) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setBookPriceError('Check valid book price');
      return;
    }

    if (dataItem.bookType !== undefined && bookTypeRegex.test(dataItem.bookType)) {
      fieldStatus = true;
    } else {
      fieldStatus = false;
      setBookTypeError('Check valid book type');
      return;
    }

    return fieldStatus;
  }
  function checkValidation(field: string, value: string) {
    const bookNameRegex = /^[A-z 0-9]{2,20}$/;
    const bookAuthorRegex = /^[A-z ]{2,20}$/;
    const bookQtyRegex = /^[0-9]{1,5}$/;
    const bookPriceRegex = /^[0-9.]{2,5}$/;
    const bookTypeRegex = /^[A-z]{2,20}$/;
    //const bookImgRegex = /^data:image\/(jpeg|jpg|png|gif);base64,([A-Za-z0-9+/=])+$/;
    
    switch (field) {
    case 'bookName':
      if (bookNameRegex.test(value)) {
        setBookNameError('');
        setBookName(value);
      } else {
        setBookNameError('Enter valid name');
        setBookName(value);
      }
      break;

    case 'bookAuthor':
      if (bookAuthorRegex.test(value)) {
        setBookAuthorError('');
        setBookAuthor(value);
      } else {
        setBookAuthorError('Check valid author Name');
        setBookAuthor(value);
      }
      break;

    case 'bookQty':
      if (bookQtyRegex.test(value)) {
        setBookQtyError('');
        setBookQty(value);
      } else {
        setBookQtyError('Check valid Qu');
        setBookQty(value);
      }
      break;

    case 'bookPrice':
      if (bookPriceRegex.test(value)) {
        setBookPriceError('');
        setBookPrice(value);
      } else {
        setBookPriceError('Check valid price');
        setBookPrice(value);
      }
      break;

    case 'bookType':
      if (bookTypeRegex.test(value)) {
        setBookTypeError('');
        setBookType(value);
      } else {
        setBookTypeError('Check valid price');
        setBookType(value);
      }
      break;
    }
    
  }


  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={BoxStyle}>
        <Button
          onClick={handleClose} 
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          <CloseIcon /> 
        </Button>

        <Typography marginBottom={2} id="modal-modal-title" variant="h6" component="h2">
           Add a new book
        </Typography>

        {/* form area */}
        <div style={{top:'10%',color:'red'}}>
          <form onSubmit={saveBookFunction} encType='multipart/form-data'>
            <TextField
              style={{width:'100%'}}
              error={bookNameError !== ''}
              className="txtField bookNameField form-control"
              id="bookName"
              label="Book Name"
              type="Text"
              value={bookName}
              variant="filled"
              helperText={bookNameError}
              size="small"    
              onChange={(e) => {
                checkValidation('bookName', e.target.value);
              }}
            />
            <TextField
              style={{width:'100%'}}
              error={bookAuthorError !== ''}
              className="txtField bookAuthorField form-control"
              id="bookAuthor"
              label="Book Author"
              type="Text"
              value={bookAuthor}
              variant="filled"
              helperText={bookAuthorError}
              size="small"
              onChange={(e) => {
                checkValidation('bookAuthor', e.target.value);
              }}
            />
            <TextField
              style={{width:'100%'}}
              error={bookQtyError !== ''}
              className="txtField bookQtyField form-control"
              id="bookQty"
              label="Book Qty"
              type="Text"
              variant="filled"
              value={bookQty}
              autoComplete="current-password"
              helperText={bookQtyError}
              size="small"
              onChange={(e) => {
                checkValidation('bookQty', e.target.value);
              }}
            />
            <TextField
              style={{width:'100%'}}
              error={bookPriceError !== ''}
              className="txtField bookPriceField form-control"
              id="bookPrice"
              label="Book Price"
              type="Text"
              value={bookPrice}
              variant="filled"
              helperText={bookPriceError}
              size="small"
              onChange={(e) => {
                checkValidation('bookPrice', e.target.value);
              }}
            />
            <TextField
              style={{width:'100%'}}
              error={bookTypeError !== ''}
              className="txtField bookTypeField form-control"
              id="bookType"
              label="Book Type"
              type="Text"
              variant="filled"
              value={bookType}
              helperText={bookTypeError}
              size="small"
              onChange={(e) => {
                checkValidation('bookType', e.target.value);
              }}
            />

            <div className='form-group'>
              <input
                className="uploadField form-control-file"
                name="book_image"
                type="file"
                onChange={handleFileSelect}
                style={{backgroundColor:'#f0f0ee',color:'black',width:'100%'}}
              />
              {selectedImagePreview && (
                <div
                  className="previewContainer"
                  style={{ display: 'flex', flexDirection: 'row',marginTop:'5%' }}
                >
             
                  <img
                    src={selectedImagePreview}
                    alt="Preview"
                    style={{ width: '20%', height: '20%' }}
                  />
              
                  <button  style={{backgroundColor:'transparent',border:'none'}} 
                    className="closeButton" onClick={handleImageClose}>
              x
                  </button>

                </div>
              )}
            </div>

            <Button
              className="btn saveInBtn"
              sx={{backgroundColor:'#7bed9f',width:'100%',color:'black',marginTop:'5%',border:'2px solid #7bed9f'}}
              type="submit"
            >
                SAVE
            </Button>
          </form>
        </div>
      </Box>
    </Modal>
  );
}


