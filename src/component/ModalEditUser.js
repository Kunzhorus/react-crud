import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { putUpdateUser } from "../services/UserService";
import "react-toastify/dist/ReactToastify.css";

function ModalEditUser(props) {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => { 
    let res = await putUpdateUser(name, job);
    if( res && res.updatedAt){
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id
      })
      setJob('')
      handleClose()
      toast.success("Sua thanh cong")
    }
  }

  useEffect( () => {
    if (show) {
      setName(dataUserEdit.first_name);
    } 
  },[dataUserEdit,show])

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> */}
    </div>
  );
}

export default ModalEditUser;
