import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {postCreateUser} from "../services/UserService"
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalAddNew(props) {
    const { show, handleClose} = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job);
        if (res && res.id ){
            setName('');
            setJob('');
            props.handleClose()
            props.handleUpdateTable({first_name: name, id: res.id})
            toast.success("Them moi thanh cong")      
        }
    }
  return (
    <div>
      <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" 
              value={name} onChange={ e => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Job</Form.Label>
              <Form.Control type="text" placeholder="Enter Job" 
              value={job} onChange={ e => setJob(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>

      
      
    </div>
  );
}

export default ModalAddNew;
