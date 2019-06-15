import React from 'react'
import {Container ,Grid, Card, CardContent, CardMedia, Typography, CardActionArea, CardActions, Button} from '@material-ui/core';

import {ModalBox} from './ModalBox'


export const Product = (props) => {
    return (
        <Grid item xs={3}> 
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
		      	<CardActions>
		      		<ModalBox {...props} />
		      	</CardActions>
		    </Card>
		</Grid>
    )
}