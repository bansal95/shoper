
import React from 'react'
// import { CardDeck, Card, Row, Col, Container} from 'react-bootstrap';

import {Container ,Grid, Card, CardContent, CardMedia, Typography, CardActionArea, CardActions, Button} from '@material-ui/core';

import {Product} from '../components/product'

//import {Cart} from '../components/Cart'

export class Home extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: [],
	      cart: JSON.parse(localStorage.getItem('cartlist')) || [],
	      total : JSON.parse(localStorage.getItem('total')) || 0,
	    };
	    this.handler = this.handler.bind(this)
	    this.removehandler = this.removehandler.bind(this)
	 }

	handler(product, skuitem, quantity) {
		if(this.state.cart.length >= 5){
			return alert('Sorry you can\'t add more items. Your cart is overloaded');
		}

		let size = skuitem.label
		let id = skuitem.skuId

		const cart = [...this.state.cart]
		const index = cart.findIndex((e) => e.product.productId === product.productId && e.size === size);

		if (index === -1) {
	        cart.push({id, product, size, quantity});
	    } else {
	    	if (cart[index].size == size){
				cart[index].quantity += quantity
	    	}
	    	else{
		        cart.push({id, product, size, quantity});
	    	}
	    }

		
		this.setState({
		      cart: cart,
		      total: this.state.total + (product.price * quantity)
		    },
		 	() => {
	    		localStorage.setItem('cartlist', JSON.stringify(this.state.cart));
	    		localStorage.setItem('total', JSON.stringify(this.state.total))
	  		}
		) 
	}

	removehandler(cartItem){	
		const cart = [...this.state.cart]
		const index = cart.findIndex((e) => e.id === cartItem.id);

		if (index > -1) {
			cart.splice(index, 1);
		}

		this.setState({
			cart: cart,
	      	total: this.state.total - (cartItem.product.price * cartItem.quantity)
		},
		 	() => {
	    		localStorage.setItem('cartlist', JSON.stringify(this.state.cart));
	    		localStorage.setItem('total', JSON.stringify(this.state.total))
	  		})
	}

	 componentDidMount() {
	    fetch("http://images.stockal.com/api/products.json")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            items: result.data.products
	          });
	        },
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        }
	      )
	}


	render() {	

		const { error, isLoaded, items, cart, total} = this.state;

		if (error) {
		      return <div>Error: {error.message}</div>;
		    } else if (!isLoaded) {
		      return <div>Loading...</div>;
		    } else {
		      return (
		      	<div style={{marginTop: '20px'}}>
			      	<div>
			      		<Container>
			      			<p><font size="4"><strong>Cart-Items :</strong></font></p> 

			      			<p><font size="2">Total : Rs. {total}</font></p> 

			      			{cart.length ==0 ? <p><font size="4">Your cart is Empty</font></p> : null}
			      			
					        <Grid container spacing={2}>

				      			{cart.map(item => (	
				      				<Grid item xs={2} key={item.id} > 	          		
									    <Card  style={{maxWidth:'290px', height:'370px'}}>
										      <CardActionArea>
											        <CardMedia
											          style={{height:'155px'}}
											          image={item.product.searchImage}
											          title="Contemplative Reptile"
											        />
											        <CardContent>
											          <Typography gutterBottom  style={{height:'50px'}}>
											            {item.product.product}
											          </Typography>
											          <Typography gutterBottom>
											            Quantity:{item.quantity}
											          </Typography>
											          <Typography gutterBottom>
											           	 Size: {item.size}
											          </Typography>
											          <Typography gutterBottom  style={{fontSize: '14px'}}>
											            Rs. {item.product.price}
											          </Typography>
											        </CardContent>
										      	</CardActionArea>
										        <Button style={{display: 'table', marginLeft: 'auto', marginRight: 'auto'}} onClick={() => this.removehandler(item)} variant="contained" size="small" color="primary">
										        	Remove
										        </Button>
										   	</Card>
									   	</Grid>
							    	))
								}

					       	</Grid>

						</Container>
			      	</div>	
			      	

			      	<Container style={{marginTop:'10px'}}>
			      		<hr />
			      		<p><font size="4"><strong>Products :</strong></font></p> 
				        <Grid container  spacing={2}>
				          	{items.map(item => (				          		
				          		<Product key={item.productId} cart={cart} item={item} handler = {this.handler} />
				         	))}
				        </Grid>
					</Container>
				</div>
			);
		}
		
	}
}
