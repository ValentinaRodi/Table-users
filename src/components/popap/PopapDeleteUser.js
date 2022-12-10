import '../../style/popapDeleteUser.scss';

const DeleteUser = (props) => {

  function handleMouseOut(e) {
    e.preventDefault();
  }

  return (
    <div className="delete" onMouseLeave={handleMouseOut}>
      <p className="delete__text">Вы действительно хотите удалить пользователя?</p>
      <div className="delete-btn">
          <button className="delete__btn" onClick={props.handlerPopupClose}>Нет</button>
          <button className="delete__btn" onClick={props.handlerUserDelete}>Да</button>
      </div>
    </div>
  );
};

export default DeleteUser;