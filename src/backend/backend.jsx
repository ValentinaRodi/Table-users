import axios from 'axios';

const API_URL = 'http://23.111.202.224:8094';
let token = '';

axios.defaults.headers.common['Authorization'] = token;

const axiosConfig = {
    headers: { "Authorization": `Bearer ${token}`}
};

export async function enterLogin(data) {

    axios.post(`${API_URL}/auth/login`, data)
        .then(res => {
        token = res.data.token;
        })
        .catch(err => {
            const errors = err.data;
            console.log(errors);
        })
} 


export async function getUsers() {

    axios.get(`${API_URL}/account`, axiosConfig)
        .then(res => {
        return res.data;
    })    
}

export async function deleteUser(email) {

    axios.delete(`${API_URL}/account/${email}`, axiosConfig);
}

export async function changeUser(name, lastName, email, role) {

    const user = {
        "name": {name},
        "last_name": {lastName},
        "email": {email},
        "role": {role},
    }

    if(role === 'admin') {
        axios.post(`${API_URL}/auth/reg/admin`, axiosConfig, user)
        .then(res => {
        console.log(res.data); })
    } else {
        axios.post(`${API_URL}/auth/reg`, axiosConfig, user)
        .then(res => {
        console.log(res.data); })
    }      
}

export async function getOrganizations() {

    axios.get(`${API_URL}/organization`, axiosConfig)
        .then(res => {
        return res.data;
    })    
}

export async function createNewUser(newUser) {

    axios.post(`${API_URL}/account/edit`, axiosConfig, newUser)
    .then(res => {
    console.log(res.data); }) 
}
