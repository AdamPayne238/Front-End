import { axiosWithAuth } from "../../Components/utils/axiosWithAuth";
import axios from "axios";

export const FETCH_USER_START = 'FETCH_USER_START';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAIL = 'FETCH_USER_FAIL';
export const AXIOS_POST = 'AXIOS_POST';
export const DELETE_USER_START = 'DELETE_USER_START';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const FETCH_ALL_SUCCESS = 'FETCH_ALL_SUCCESS';
export const FETCH_ALL_FAIL = 'FETCH_ALL_FAIL';
export const LOGIN_POST = "LOGIN_POST";

//FETCH_ALL_USERS
export const fetchAll = () => dispatch => {
    dispatch({ type: FETCH_ALL_USERS, payload: true});
        axiosWithAuth()
        .get("/users/users/all")
        .then(response => {
            console.log("FetchALL res", response)
            dispatch({ type: FETCH_ALL_SUCCESS, payload: response.data})
        })
        .catch(error => {
            dispatch({ type: FETCH_ALL_FAIL, payload: error})
        })
}

//DELETE USER
export const deleteUser = (id) => dispatch => {
    dispatch({ type: DELETE_USER_START});
        axiosWithAuth()
        .delete(`/users/user/${id}`)
        .then(response => {
            console.log("Delete Res", response)
            dispatch({ type: DELETE_USER_SUCCESS, payload: true});
        })
        .then(response => {
            dispatch({ type: DELETE_USER_SUCCESS, payload: false})
        })
        .catch(error => {
            dispatch({ type: DELETE_USER_FAIL, payload: false})
        })
    }

//FETCH_USER_INFO
export const fetchUserInfo = () => dispatch => {
    //FETCH_USER_START
    dispatch({ type: FETCH_USER_START });
    axiosWithAuth()
        .get("/users/getuserinfo")
        //FETCH_USER_SUCCESS
        .then(response => {
            console.log("Get Response", response);
            dispatch({ type: FETCH_USER_SUCCESS, payload: response.data});
        })
        //FETCH_USER_FAIL
        .catch(error => dispatch({ type: FETCH_USER_FAIL, payload: error.response}))
};

//AXIOS_POST
export const postUser = (obj, props) => dispatch => {
    // dispatch({ type: AXIOS_POST });
    let jsonobj = JSON.stringify(obj)
    axios
        .post("https://detman-saferoutes.herokuapp.com/users/user",jsonobj,{
            headers: {
              // btoa is converting our client id/client secret into base64
              Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
        .then(response => {
            console.log("postUser Res", response)
            dispatch({ type: AXIOS_POST, payload: response.data})
            props.history.push('/login')
        })
        .catch(error => {
            console.log(error)
        });
}

//LOGIN_POST
export const postLogin = (obj,props) => dispatch => {
    axios
        .post(`https://detman-saferoutes.herokuapp.com/login`, `grant_type=password&username=${obj.username}&password=${obj.password}`,{
            headers: {
              // btoa is converting our client id/client secret into base64
              Authorization: `Basic ${btoa('lambda-client:lambda-secret')}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
        .then(response => {
            console.log("Login Post Response", response)
            dispatch({ type: LOGIN_POST, payload: response.data.access_token},
            localStorage.setItem('token', response.data.access_token)
            );
            props.history.push('/map')
        })
        .catch(error => {
            dispatch({ type: LOGIN_POST, payload: "Wrong Email or Password"}
        )})
}