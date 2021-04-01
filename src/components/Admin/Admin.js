import './Admin.css';
import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from 'react';
import { Button, Card, Form, Tabs, Tab } from 'react-bootstrap';

import { useHistory } from 'react-router';

function Admin() {
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
    <div className="AddEvent">
      <div className="container">

        {/* Add New Product Tab */}

        <Tabs defaultActiveKey="add" id="uncontrolled-tab-example">
          <Tab eventKey="add" title="Add Product">
            <Card style={{ maxWidth: '600px', margin: '50px auto' }}>
              <Card.Body>
                <h4 className="text-center">Add New Product</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>

                  <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" name="productName" placeholder="Enter Product Name" ref={register({ required: true })} />
                    {/* {errors.productName ? <span className="text-danger">maximum character is 20</span> : <span className="text-info">maximum character is 20</span>} */}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control type="file" name="eventImageUrl" ref={register({ required: true })} onChange={handleImageUplaod} />
                    {errors.eventImageUrl ? <span className="text-danger">product need an image</span> : <span className="text-info">select an image</span>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" name="productPrice" placeholder="Price" ref={register({ required: true })} />
                    {/* {errors.productPrice ? <span className="text-danger">maximum character is 20</span> : <span className="text-info">maximum character is 20</span>} */}
                  </Form.Group>

                  {imgUrl === '' ?
                    <Button variant="primary" type="submit" disabled>Submit</Button> :
                    <Button variant="primary" type="submit">Submit</Button>
                  }
                </Form>
              </Card.Body>
            </Card>
          </Tab>

          {/* Product Manage(Delete action will be here) */}

          <Tab eventKey="manage" title="Manage Product">
            <h1>This is Manage Product Tab</h1>
          </Tab>

          {/* Edit Product will be here */}

          <Tab eventKey="edit" title="Edit Product">
            <h1>This is Edit Product Tab</h1>
          </Tab>
        </Tabs>
      </div>

    </div>
  )
}

export default Admin;
