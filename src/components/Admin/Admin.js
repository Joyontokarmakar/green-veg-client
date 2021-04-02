import './Admin.css';
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from 'react';
import { Button, Card, Col, Row, Form, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router';

function Admin() {

  // manage product
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`https://desolate-harbor-02076.herokuapp.com/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.reverse());
      })
  })

  const history = useHistory();
  const [imgUrl, setImgUrl] = useState('');
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const eventData = {
      title: data.productName,
      price: data.productPrice,
      imageUrl: imgUrl
    }

    fetch(`https://desolate-harbor-02076.herokuapp.com/addEvent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
    .then(res => history.push('/'))
  };

  // Delete product
  const deleteProduct = (id) => {
    fetch(`https://desolate-harbor-02076.herokuapp.com/delete/${id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(result => {
        if(result){
          // product.target.parentNode.style.display = 'none';
        }
    })
  };

  const handleImageUplaod = product => {
    const imageData = new FormData();
    imageData.set('key', '0a7d33d5663a0b43fbbf6860944725de');
    imageData.append('image', product.target.files[0]);
    axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(res =>
        setImgUrl(res.data.data.display_url)
      )
      .catch(error =>
        console.log(error)
      );
  }

  return (
    <div className="addProduct">
      <div className="container">

        {/* Add New Product Tab */}

        <Tabs defaultActiveKey="add" id="uncontrolled-tab-example">

          <Tab eventKey="add" title="Add Product">
            <Card>
              <Card.Body>
                <h4 className="text-center">Add New Product</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>

                  <Form.Group as={Row}>
                    <Form.Label column sm="2">Product Name</Form.Label>
                    <Col sm="10">
                      <Form.Control type="text" name="productName" className="form_data" placeholder="Enter Product Name" ref={register({ required: true })} />
                      {/* {errors.productName ? <span className="text-danger">maximum character is 20</span> : <span className="text-info">maximum character is 20</span>} */}
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm="2">Product Image</Form.Label>
                    <Col sm="10">
                      <Form.Control type="file" name="eventImageUrl" className="form_data" ref={register({ required: true })} onChange={handleImageUplaod} />
                      {/* {errors.eventImageUrl ? <span className="text-danger">product need an image</span> : <span className="text-info">select an image</span>} */}
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column sm="2">Price</Form.Label>
                    <Col sm="10">
                      <Form.Control type="text" name="productPrice" className="form_data" placeholder="Price" ref={register({ required: true })} />
                      {/* {errors.productPrice ? <span className="text-danger">maximum character is 20</span> : <span className="text-info">maximum character is 20</span>} */}
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="float-right mx-1">
                    {imgUrl === '' ?
                      <Button className="menu_btn_disabled" type="submit" disabled>Submit</Button> :
                      <Button className="menu_btn" type="submit">Submit</Button>
                    }
                  </Form.Group>

                  
                </Form>
              </Card.Body>
            </Card>
          </Tab>

          {/* Product Manage(Delete action will be here) */}

          <Tab eventKey="manage" title="Manage Product">
            <div className="row">
              <div className="table-responsive">
                <table className="table-striped w-100">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Unit Price</th>
                      <th className="text-center">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products.map((product)=> {
                        return(
                          <tr>
                            <td>{product.title}</td>
                            <td className="text-center">1</td>
                            <td className="text-center">{product.price}</td>
                            <td className="text-center"><button className="delete" onClick={()=> deleteProduct(product._id)}>&#10006;</button></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </Tab>

          {/* Edit Product will be here */}

          <Tab eventKey="edit" title="Edit Product">
            <div className="row">
              <div className="table-responsive">
                <table className="table-striped w-100">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Unit Price</th>
                      <th className="text-center">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      products.map((product, idx,id)=> {
                        return(
                          <tr key={idx}>
                            <td>{product.title}</td>
                            <td className="text-center">1</td>
                            <td className="text-center">{product.price}</td>
                            <td className="text-center"><button className="edit">&#9998;</button></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>

    </div>
  )
}

export default Admin;
