import React, {useState}from 'react'
import { Form, Button } from 'react-bootstrap';


function PrescriptionScreen() {
  const [image, setImage] = useState('');
  return (
    <div>
      <Form.Group controlId='image'>
              <Form.Label>Prescription Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                // onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                label='Choose File'
                // onChange={uploadFileHandler}
                type='file'
              ></Form.Control>
              {/* {loadingUpload && <Loader />} */}
            </Form.Group>
            <Button
              type='submit'
              variant='primary'
              style={{ marginTop: '1rem' }}
            >
              Save
            </Button>
    </div>
  )
}

export default PrescriptionScreen
