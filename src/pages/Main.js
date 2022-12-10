import React, {useEffect, useMemo, useState} from 'react';
import '../style/main.scss';
import TablePagination from '../components/TablePagination/TablePagination.js';
import { users } from '../backend/users';
import { getUsers, deleteUser, changeUser } from '../backend/backend';
import deleteImg from '../img/delete.png';
import downloadImg from '../img/download.png';
import pencilImg from '../img/pencil.png';
import HoverBtn from '../components/popap/HoverBtn';
import DeleteUser from '../components/popap/PopapDeleteUser';
import UserEdit from '../components/popap/UserEdit';
import CreateUser from '../components/popap/PopupCreateUser';

const EditableTable = ({ actions }) => {
  const [usersAdd, setUsersAdd] = useState(users);
  const [rowsState, setRowsState] = useState(usersAdd);
  const [editedRow, setEditedRow] = useState();
  const [isHovering, setIsHovering] = useState([false, false, false, false, false]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupDeleteUser, setPopupDeleteUser] = useState(false);
  const [idDeleteUser, setDeleteUser] = useState('');

  const newPopupEdit = rowsState.map(item => item = false)
  const [popupEditUser, setPopupEditUser] = useState(newPopupEdit);  

  const [nameUserChange, setNameUserChange] = useState('');
  const [lastNameUserChange, setLastNameUserChange] = useState('');
  const [emailUserChange, setEmailUserChange] = useState('');
  const [roleUserChange, setRoleUserChange] = useState('');

  const [popupCreateUser, setPopupCreateUser] = useState(false);

  // const usersAddBackend = getUsers(); 
  // usersAddBackend()
  // setUsersAdd(usersAddBackend);

  useEffect(() => {
    setUsersAdd([...usersAdd])
    if (currentPage >= usersAdd.length / pageSize)
      setCurrentPage(1);
  }, [pageSize])
  
  
  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    const newData = users.slice(firstPageIndex, lastPageIndex);

    setRowsState(newData);
  }, [currentPage, pageSize])
  
  function handleMouseOver(e) {
    const idItem = +e.target.id   
    for (let index = 0; index < isHovering.length; index++) {
      (index === idItem) ? isHovering[index] = true : isHovering[index] = false;
    }
    setIsHovering([...isHovering]);     
  }
  
  const handleMouseOut = () => {
    for (let index = 0; index < isHovering.length; index++) {
      isHovering[index] = false;
    }
    setIsHovering([...isHovering]);
  }

  const nestedSortUp = (prop1, prop2 = null, direction = 'asc') => (e1, e2) => {
    const a = prop2 ? e1[prop1][prop2] : e1[prop1],
        b = prop2 ? e2[prop1][prop2] : e2[prop1],
        sortOrder = direction === "asc" ? 1 : -1
    return (a < b) ? -sortOrder : (a > b) ? sortOrder : 0;
  }

  const nestedSortDown = (prop1, prop2 = null, direction = 'asc') => (e1, e2) => {
    const a = prop2 ? e1[prop1][prop2] : e1[prop1],
        b = prop2 ? e2[prop1][prop2] : e2[prop1],
        sortOrder = direction === "asc" ? -1 : 1
    return (a < b) ? -sortOrder : (a > b) ? sortOrder : 0;
  }

  function handlerUserSortUpName() {
    const usersAddSort = usersAdd.sort(nestedSortUp("user", "name"))
    setRowsState([...usersAddSort])
  }

  function handlerUserSortDownName() {
    const usersAddSort = usersAdd.sort(nestedSortDown("user", "name"))
    setRowsState([...usersAddSort])
  }

  function handlerUserSortUpLastName() {
    const usersAddSort = usersAdd.sort(nestedSortUp("user", "lastName"))
    setRowsState([...usersAddSort])
  }

  function handlerUserSortDownLastName() {
    const usersAddSort = usersAdd.sort(nestedSortDown("user", "lastName"))
    setRowsState([...usersAddSort])
  }

  function handlerUserSortUpUserName() {
    const usersAddSort = usersAdd.sort(nestedSortUp("email"))
    setRowsState([...usersAddSort])
  }

  function handlerUserSortDownUserName() {
    const usersAddSort = usersAdd.sort(nestedSortDown("email"))
    setRowsState([...usersAddSort])
  }

  function handlerUserSortUpOrganization() {
    const usersAddSort = usersAdd.sort(nestedSortUp("organization", "companyTitle"))
    setRowsState([...usersAddSort])
  }

  function handlerUserSortDownOrganization() {
    const usersAddSort = usersAdd.sort(nestedSortDown("organization", "companyTitle"))
    setRowsState([...usersAddSort])
  }


  const nestedSortUp2 = (prop1, prop2 = null, direction = 'asc') => (e1, e2) => {
    const a = prop2 ? e1[prop1][0][prop2] : e1[prop1],
        b = prop2 ? e2[prop1][0][prop2] : e2[prop1],
        sortOrder = direction === "asc" ? 1 : -1
    return (a < b) ? -sortOrder : (a > b) ? sortOrder : 0;
  }
  
  const nestedSortDown2 = (prop1, prop2 = null, direction = 'asc') => (e1, e2) => {
    const a = prop2 ? e1[prop1][0][prop2] : e1[prop1],
        b = prop2 ? e2[prop1][0][prop2] : e2[prop1],
        sortOrder = direction === "asc" ? -1 : 1
    return (a < b) ? -sortOrder : (a > b) ? sortOrder : 0;
  }

  function handlerUserSortUpRole() {
    const usersAddSort = usersAdd.sort(nestedSortUp2("roles", "name"))
    setRowsState([...usersAddSort])
  }

  function handlerUserSortDownRole() {
    const usersAddSort = usersAdd.sort(nestedSortDown2("roles", "name"))
    setRowsState([...usersAddSort])
  }


  function handlerDeletePopup(e) {
    const deleteUserId = +e.target.id;
    setDeleteUser(deleteUserId);
    setPopupDeleteUser(true);
  }

  function handlerPopupClose() {
    setPopupDeleteUser(false);
  }

  function handlerUserDelete() {
    const userDeleteId = usersAdd.findIndex(item => +item.id === +idDeleteUser);

    usersAdd.splice(userDeleteId, 1);

    setUsersAdd([...usersAdd]);
    setRowsState([...usersAdd]);
    setPopupDeleteUser(false);

    handleRemoveRow();
   

    console.log(usersAdd.length)
    console.log(rowsState.length)

    //backend
    // const userDeleteEmail = usersAdd[userDeleteId].email;
    // deleteUser(userDeleteEmail);
    // getUsers()
  }

  const handleRemoveRow = (rowID) => {
    const newData = rowsState.filter(row => {
      return row.id !== rowID ? row : null
    });

    setRowsState(newData);
  }

  const handleOnChangeField = (e, rowID) => {
    const { name: fieldName, value } = e.target;

    setEditedRow({
      id: rowID,
      [fieldName]: value
    })
  }
  
  
  function handlerEditPopup(e) {
    const userEditId = +e.target.id;
    const newUserEditPopup = rowsState.map(item => (+item.id === +userEditId) ? true : false);

    setPopupEditUser(newUserEditPopup);
  }

  function handlerChangeName(e) {
    const newName = e.target.value;
    setNameUserChange(newName);
  }

  function handlerChangeLastName(e) {
    const newLastName = e.target.value;
    setLastNameUserChange(newLastName);
  }

  function handlerChangeEmail(e) {
    const newEmail = e.target.value;
    setEmailUserChange(newEmail);
  }

  function handlerChangeRole(e) {
    const newRole = e.target.value;
    setRoleUserChange(newRole);
  }

  function handlerChangeUser() {
    changeUser(nameUserChange, lastNameUserChange, emailUserChange, roleUserChange);
    getUsers();

    const newUserEditPopup = rowsState.map(() => (false));
    setPopupEditUser(newUserEditPopup);
  }

  function handlerClickCreateUser() {
    setPopupCreateUser(true)
  }

  function handlerClosePopupCreateUser() {
    setPopupCreateUser(false)
  }

  return (
    <div className='main'>
      {popupDeleteUser && 
        <div className="wrapper-popup">
          <DeleteUser handlerPopupClose={handlerPopupClose} handlerUserDelete={handlerUserDelete}/>
        </div>
      }
      {popupCreateUser && 
        <div className="wrapper-popup">
          <CreateUser handlerPopupClose={handlerPopupClose} handlerUserDelete={handlerUserDelete} handlerClosePopupCreateUser={handlerClosePopupCreateUser}/>
        </div>
      }
      <table>
        <thead>
        <tr className='table__title'>
          <th className='column__widht_number'></th>
          <th id="0" className="column__widht_small block-hover" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
            Имя
            {isHovering[0] && <HoverBtn handlerUserSortUp={handlerUserSortUpName} handlerUserSortDown={handlerUserSortDownName} />}
          </th>
          <th id="1" className="column__widht_small block-hover" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
            Фамилия
            {isHovering[1] && <HoverBtn handlerUserSortUp={handlerUserSortUpLastName} handlerUserSortDown={handlerUserSortDownLastName} />}  
          </th>
          <th id="2" className="column__widht_small block-hover" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
            Username
            {isHovering[2] && <HoverBtn handlerUserSortUp={handlerUserSortUpUserName} handlerUserSortDown={handlerUserSortDownUserName} />}
          </th>
          <th id="3" className="column__widht_big block-hover" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
            Роль
            {isHovering[3] && <HoverBtn handlerUserSortUp={handlerUserSortUpRole} handlerUserSortDown={handlerUserSortDownRole} />}
          </th>
          <th id="4" className="column__widht_big block-hover" onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut}>
            Организация
            {isHovering[4] && <HoverBtn handlerUserSortUp={handlerUserSortUpOrganization} handlerUserSortDown={handlerUserSortDownOrganization} />}
          </th>
          <th className="column__widht_small">Изображения</th>
        </tr>
        </thead>
        <tbody>
        {rowsState.map((row, index) => {
          let role 
          if (row.roles[0].name === "ROLE_ADMIN") {
            role = "Админ"
          } 
          if (row.roles[0].name === "ROLE_USER") {
            role = "Пользователь"
          } 
          if (row.roles[0].name === "ROLE_SUPERUSER") {
            role = "Суперпользователь"
          } 
          if (index < pageSize) {
            return (!popupEditUser[index]) ? 
            <tr key={row.id} className='item'>
              <td>{index+1}</td>
              <td>{row.user.name}</td>
              <td>{row.user.lastName}</td>
              <td>{row.email}</td>
              <td>{role}</td>
              <td>{row.organization.companyTitle}</td>
              <td>
                <a href={"http://23.111.202.224:8094/screenshot/arch/" + row.id} download={row.user.name + ".jpg"} className="item__btn btn_padding">
                  <img className="item__img" src={downloadImg} alt="download" />
                </a>
              </td>
              <td>
                <button className="item__btn btn_marging" onClick={handlerEditPopup}>
                  <img id={row.id} className="item__img" src={pencilImg} alt="pencil" />
                </button>
                <button className="item__btn btn_marging" onClick={handlerDeletePopup}>
                  <img id={row.id} className="item__img" src={deleteImg} alt="delete" />
                </button>
              </td>
            </tr>
            : <UserEdit 
                row={row} 
                index={index} 
                role={role} 
                handlerChangeUser={handlerChangeUser} 
                handlerChangeName={handlerChangeName} 
                handlerChangeLastName={handlerChangeLastName} 
                handlerChangeEmail={handlerChangeEmail} 
                handlerChangeRole={handlerChangeRole}
              />
          }
        })}
        </tbody>
      </table>
      <div className="main__active">
        <TablePagination
          totalCount={users.length}
          pageSize={pageSize}
          changeItemsPerPage={page => setPageSize(page)}
          onPageChange={page => setCurrentPage(page)}
          currentPage={currentPage}
        />
        <button className="addUser__btn" onClick={handlerClickCreateUser}>
          Создать пользователя
        </button>
      </div>
    </div>
  );
};

export default EditableTable;