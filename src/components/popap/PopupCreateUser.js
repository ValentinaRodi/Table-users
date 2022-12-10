import {useState} from 'react';
import '../../style/popupCreateUser.scss';
import { organization } from '../../backend/organization';
import { getOrganizations, createNewUser } from '../../backend/backend';

const CreateUser = (props) => {
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userUsername, setUserUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userRole, setUserRole] = useState('Выберите роль');
    const [userOrganization, setUserOrganization] = useState('Выберите организацию');
   
    const company = organization[0].data;
    const [inputStyle, setInputStyle] = useState(['create__input', 'create__input', 'create__input', 'create__input', 'create__input', 'create__input']);

    // const organizations = () =>  getOrganizations()
    // organizations()

    function handleMouseOut(e) {
        e.preventDefault();
    }

    function handlerUserCreate() {
        
        (userName === '') ? inputStyle[0] = 'create__input field-error' : inputStyle[0] = 'create__input';
        (userLastName === '') ? inputStyle[1] = 'create__input field-error' : inputStyle[1] = 'create__input';
        (userUsername === '') ? inputStyle[2] = 'create__input field-error' : inputStyle[2] = 'create__input';
        (userPassword === '') ? inputStyle[3] = 'create__input field-error' : inputStyle[3] = 'create__input';
        (userRole === 'Выберите роль') ? inputStyle[4] = 'create__input field-error_select' : inputStyle[4] = 'create__input';
        (userOrganization === 'Выберите организацию') ? inputStyle[5] = 'create__input field-error_select' : inputStyle[5] = 'create__input';
    
        setInputStyle([...inputStyle])

        const newUser = {
            "id": 1, 
            "name": {userName},
            "last_name": {userLastName},
            "company_title": {userOrganization},
            "email": {userUsername},
            "password": {userPassword},
            "roles": [
                {"name": {userRole}}
            ]
        }

        if(userName !== '' &&
            userLastName !== '' &&
            userUsername !== '' &&
            userPassword !== '' &&
            userRole !== 'Выберите роль' &&
            userOrganization !== 'Выберите организацию') 
            {
                createNewUser(newUser)
                props.handlerClosePopupCreateUser()
        }
       
    }

    function handlerChangeUserName(e) {
        setUserName(e.target.value)
    }

    function handlerChangeUserLastName(e) {
        setUserLastName(e.target.value)
    }

    function handlerChangeUserUsername(e) {
        setUserUsername(e.target.value)
    }

    function handlerChangeUserPassword(e) {
        setUserPassword(e.target.value)
    }

    function handlerChangeUserRole(e) {
        setUserRole(e.target.value)
        inputStyle[4] = 'create__input'
        setInputStyle([...inputStyle])
    }

    function handlerChangeUserOrganization(e) {
        setUserOrganization(e.target.value) 
        inputStyle[5] = 'create__input'
        setInputStyle([...inputStyle])
    }
  
    
    return (
    <div className="create" onMouseLeave={handleMouseOut}>
        <p className="create__text">Cоздание пользователя</p>
        <span>Имя:</span>
        <input type='text' placeholder='Введите имя' className={inputStyle[0]} onChange={handlerChangeUserName} required/>
        <span>Фамилия:</span>
        <input type='text' placeholder='Введите фамилию' className={inputStyle[1]} onChange={handlerChangeUserLastName} required/>
        <span>Username:</span>
        <input type='text' placeholder='Введите логин' className={inputStyle[2]} onChange={handlerChangeUserUsername} required/>
        <span>Пароль:</span>
        <input type='password' placeholder='Введите пароль' className={inputStyle[3]} onChange={handlerChangeUserPassword} required/>
        <span>Роль:</span>
        <select className={inputStyle[4]} defaultValue="Выберите роль" onChange={handlerChangeUserRole} required>
            <option className='option-default' >Выберите роль</option>
            <option value="ROLE_ADMIN">Админ</option>
            <option value="ROLE_SUPER_USER">Суперпользователь</option>
            <option value="ROLE_USER">Пользователь</option>  
        </select>   
        <span>Организация:</span>
        <select  className={inputStyle[5]} defaultValue="Выберите организацию" onChange={handlerChangeUserOrganization} required>
            <option className='option-default'>Выберите организацию</option>
            {
            company.map(comp => {
               return <option key={comp.id} value={comp.companyTitle}>{comp.companyTitle}</option>
            })}
        </select> 
        <div className="create-btn">
            <button className="create__btn" onClick={props.handlerClosePopupCreateUser}>Закрыть</button>
            <button className="create__btn" onClick={handlerUserCreate}>Сохранить</button>
        </div>
    </div>
  );
};

export default CreateUser;