import React from 'react'

import {Modal, Typography, Button, FormControl, Select, InputLabel, Input, MenuItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },

	root: {
	    display: 'flex',
	    flexWrap: 'wrap',
	  },
	  formControl: {
	    margin: theme.spacing(1),
	    minWidth: 120,
	  },
	  selectEmpty: {
	    marginTop: theme.spacing(2),
	  },

}));

export const ModalBox = (props) => {
	const [open, setOpen] = React.useState(false);
	const [modalStyle] = React.useState(getModalStyle);

	const onbuttonClick = (value) => {
		debugger
		const listOfProduct = props.cart.filter((e) => e.product.productId === props.item.productId);
		const index = listOfProduct.findIndex((e) => e.id === value.skuitem.skuId);

		if (!value.skuitem.available){
			alert("Size " + value.skuitem.label + " is out of stock!")
		}
		else if(value.skuitem.inventory >= value.quantity){
			if(index == -1 || value.skuitem.inventory >= value.quantity + listOfProduct[index].quantity){
			    handleClose(); 
			    props.handler(props.item, values.skuitem, values.quantity)
			}
			else{
				let val = value.skuitem.inventory - listOfProduct[index].quantity;

				if(val == 0){
					alert( "Maximum quantity is already in your cart!")
				}
				else if(val == 1){
					alert(val + " more item is left!")
				}
				else{
					alert(val + " more items are left!")
				}
			}
		}
		else{
			alert("Quantity is not available!")	
		}
	};

	const handleOpen = () => {
	   setOpen(true);
	};

	const handleClose = () => {
	    setOpen(false);
	};

	const classes = useStyles();


	  const [values, setValues] = React.useState({
	    skuitem: 0,
	    quantity: 0,
	  });

	  function handleChange(event) {
	    setValues(oldValues => ({
	      ...oldValues,
	      [event.target.name]: event.target.value,
	    }));
	  }


	return(
		<div style={{display: 'table', marginLeft: 'auto', marginRight: 'auto'}}>
	      	<div>
		        <Button onClick={handleOpen} variant="contained" size="small" color="primary">
		        	Buy Now
		        </Button>
	        </div>
			<Modal
		        aria-labelledby="simple-modal-title"
		        aria-describedby="simple-modal-description"
		        open={open}
		        onClose={handleClose}
		      >
		        <div style={modalStyle} className={classes.paper}>
		        	<div style={{display:'flex', justifyContent:'center', flexDirection:'column', textAlign: 'center', alignItems: 'center'}}>
						<img src={props.item.searchImage} alt="Smiley face" style={{height:'200px', width:'200px'}} />
			          	<Typography gutterBottom variant="h6" component="h5">
			            	{props.item.product}
			          	</Typography>
			          	<Typography>
			            	Rs. {props.item.price}
			          	</Typography>

			          	<form className={classes.root} autoComplete="off">
			          	 	      <FormControl className={classes.formControl}>
								        <InputLabel htmlFor="skuitem-helper">Size*</InputLabel>
								        <Select
								          value={values.skuitem}
								          onChange={handleChange}
								          input={<Input name="skuitem" id="skuitem-helper" />}
								        >
									        {
									        	props.item.inventoryInfo.map(key => 
									        		<MenuItem key={key.skuId} value={key}>{key.label}</MenuItem>
									        	)
									        }
								        </Select>
							      </FormControl>
							      <FormControl className={classes.formControl}>
								        <InputLabel htmlFor="quantity-helper">Quantity*</InputLabel>
								        <Select
								          value={values.quantity}
								          onChange={handleChange}
								          input={<Input name="quantity" id="quantity-helper" />}
								        >	
								        {
								        		 [...Array(5)].map((key, value) => 
								        		 	<MenuItem key={value} value={value+1}>{value+1}</MenuItem>
								        		 )
								        }
								        </Select>
							      </FormControl>
					      </form>


			          	<Button onClick={() => onbuttonClick(values)} variant="contained" size="small" color="primary">
			        		Add to Cart
			        	</Button>
		          	</div>
		        </div>
		    </Modal>
	    </div>
    );
}

// disabled={!values.skuitem.available || !values.quantity} 