import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../services/UserService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function ModalDeleteConfirm(props) {
  const { show, handleClose, dataUserDelete, DeleteUser } = props;

  const handleDeleteUser = async () => {
    let res = await deleteUser(dataUserDelete.id);
    if (res && +res === 204) {
      handleClose();
      toast.success("Xoa thanh cong user");
      DeleteUser(dataUserDelete.id)
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <b>Are you sure delete "{dataUserDelete.first_name}" user?</b>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalDeleteConfirm;
