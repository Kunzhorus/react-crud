import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteConfirm from "./ModalDeleteConfirm";
import _, { debounce } from "lodash";
import "./TableUsers.scss";
import "../App.scss";

function TableUsers() {
  const [listUsers, setListUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [sortField, setSortField] = useState("");

  const handleShowModalAdd = () => setShowModalAdd(true);

  const handleCloseModal = () => {
    setShowModalEdit(false);
    setShowModalAdd(false);
    setShowModalDelete(false);
  };

  const handleShowModalEdit = (user) => {
    setShowModalEdit(true);
    setDataUserEdit(user);
  };

  const handleShowModalDelete = (user) => {
    setShowModalDelete(true);
    setDataUserDelete(user);
  };

  const DeleteUser = (id) => {
    let userDelete = listUsers.filter((item) => item.id !== id);
    setListUsers(userDelete);
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUserFromModal = (user) => {
    let userEdit = listUsers.filter((item) => item.id === user.id);
    userEdit[0].first_name = user.first_name;
  };

  const handleSort = (sort_By, sort_Field) => {
    setSortBy(sort_By);
    setSortField(sort_Field);
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setListUsers(cloneListUsers);
  };

  const handleSearch = debounce((e) => {
    let term = e.target.value;
    let list = [];
    if (term) {
      listUsers.map((user) => {
        if (user.email.includes(term)) list = [...list, user];
        return list;
      });
      setListUsers(list);
    } else {
      getUsers(1);
    }
  }, 500);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUsers(res.data);
      setTotalPages(res.total_pages);
    }
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  return (
    <Container>
      <div className="my-3 add-new">
        <b>List Users:</b>
        <button className="btn btn-success" onClick={handleShowModalAdd}>
          Add new user
        </button>
      </div>

      <div className="col-md-4 my-3">
        <input
          className="form-control"
          placeholder="Enter email..."
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="sort-header">
              <span>ID</span>
              <span>
                <i
                  className="fa-solid fa-arrow-down"
                  onClick={() => handleSort("desc", "id")}
                ></i>
                <i
                  className="fa-solid fa-arrow-up"
                  onClick={() => handleSort("asc", "id")}
                ></i>
              </span>
            </th>
            <th>Email</th>
            <th className="sort-header">
              <span> First Name</span>
              <span>
                <i
                  className="fa-solid fa-arrow-down"
                  onClick={() => handleSort("desc", "first_name")}
                ></i>
                <i
                  className="fa-solid fa-arrow-up"
                  onClick={() => handleSort("asc", "first_name")}
                ></i>
              </span>
            </th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map((user, index) => (
            <tr key={`users-${index}`}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <button
                  className="btn btn-warning mx-3"
                  onClick={() => handleShowModalEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleShowModalDelete(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />

      <ModalAddNew
        show={showModalAdd}
        handleClose={handleCloseModal}
        handleUpdateTable={handleUpdateTable}
      />

      <ModalEditUser
        show={showModalEdit}
        handleClose={handleCloseModal}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalDeleteConfirm
        show={showModalDelete}
        handleClose={handleCloseModal}
        dataUserDelete={dataUserDelete}
        DeleteUser={DeleteUser}
      />
    </Container>
  );
}

export default TableUsers;
