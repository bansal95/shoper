import React from 'react'
import {Container ,Grid, Card, CardContent, CardMedia, Typography, CardActionArea, CardActions, Button} from '@material-ui/core';

import {ModalBox} from './ModalBox'


export const Cart = (props) => {
	debugger
    return (
	    	<Grid {props.item} xs={2}  key={props.item.productId}> 			          		
	      		<Card style={{maxWidth:'290px', height:'370px'}}>
			      <CardActionArea>
				        <CardMedia
				          style={{height:'200px'}}
				          image={props.item.searchImage}
				          title="Contemplative Reptile"
				        />
				        <CardContent>
				          <Typography gutterBottom  style={{height:'50px'}}>
				            {props.item.product}
				          </Typography>
				          <Typography gutterBottom  style={{fontSize: '14px'}}>
				            Rs. {props.item.price}
				          </Typography>
				        </CardContent>
			      	</CardActionArea>
			        <Button style={{display: 'table', marginLeft: 'auto', marginRight: 'auto'}} onClick={() => this.removehandler(props.item)} variant="contained" size="small" color="primary">
			        	Remove
			        </Button>
		    	</Card>
		    </Grid>
    )
}