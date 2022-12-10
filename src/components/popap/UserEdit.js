import "../../style/userEdit.scss"

const UserEdit = (props) => {

  return (
    <tr key={props.row.id} className='item'>
        <td>{props.index+1}</td>
        <td className="column__widht_small">
            <input placeholder={props.row.user.name} className="input__widht_small" onChange={props.handlerChangeName}/>
        </td>
        <td className="column__widht_small">
            <input placeholder={props.row.user.lastName} className="input__widht_small" onChange={props.handlerChangeLastName}/>
        </td>
        <td className="column__widht_small">
            <input placeholder={props.row.email} className="input__widht_small" onChange={props.handlerChangeEmail} />
        </td>
        <td className="column__widht_big">
        <select className="input__widht_big" onChange={props.handlerChangeRole}>
            <option>{props.role}</option>
            <option>Суперпользователь</option>
            <option>Пользователь</option>    
        </select>
        </td>
        <td className="column__widht_big">{props.row.organization.companyTitle}</td>
        <td className="column__widht_small"></td>
        <td>
            <button className="addUser__btn widht-btn_small" onClick={props.handlerChangeUser}>Обновить</button>
        </td>
    </tr>
  );
};

export default UserEdit;