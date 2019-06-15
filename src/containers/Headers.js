import React from 'react'
import { Navbar, Nav, NavItem, Form, FormControl, Button } from 'react-bootstrap';
export class Headers extends React.Component{
  
  render() {
    return (
        <div>
          <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">Logo</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="#products">Products</Nav.Link>
              <Nav.Link href="#cart">Cart</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </Navbar>
      </div>
    )
  }
}