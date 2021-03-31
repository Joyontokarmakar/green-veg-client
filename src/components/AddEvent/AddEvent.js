import './AddEvent.css';
import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';

function AddEvent() {
  const history = useHistory();
  const [imgUrl, setImgUrl] = useState('');
  const { register, handleSubmit, errors} = useForm();

  const onSubmit = (data)=> {
    const eventData = {
      title: data.prpductName, 
      imageUrl: imgUrl
    }

    fetch(`https://boiling-oasis-42648.herokuapp.com/addEvent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
      .then(res => history.push('/'))
  };

  const handleImageUplaod = event => {
    const imageData = new FormData();
    imageData.set('key', '0a7d33d5663a0b43fbbf6860944725de');
    imageData.append('image', event.target.files[0]);
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
      <Card style={{ maxWidth: '600px', margin: '50px auto' }}>
        <Card.Body>
          <h4 className="text-center">Create New Event</h4>
          <Form onSubmit={handleSubmit(onSubmit)}>

            <Form.Group>
              <Form.Label>Event Title</Form.Label>
              <Form.Control type="text" name="prpductName" placeholder="Enter Event Title" ref={register({ required: true, maxLength: 30 })} />
              {errors.prpductName ? <span className="text-danger">maximum character is 20</span> : <span className="text-info">maximum character is 20</span>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Event Thumbnail</Form.Label>
              <Form.Control type="file" name="eventImageUrl" ref={register({ required: true })} onChange={handleImageUplaod} />
              {errors.eventImageUrl ? <span className="text-danger">event need an image</span> : <span className="text-info">select an image</span>}
            </Form.Group>

            {imgUrl === '' ? 
              <Button variant="primary" type="submit" disabled>Submit</Button> :
              <Button variant="primary" type="submit">Submit</Button>
            }
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default AddEvent;
