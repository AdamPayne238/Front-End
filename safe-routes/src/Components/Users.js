import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import AddUser from "../Components/AddUser";
import styled from "styled-components";
import {fetchUserInfo, deleteUser, fetchAll} from "./actions";
import {
    Card, CardText, CardBody,
    CardTitle, Button
  } from 'reactstrap';
import { Btn } from "./Forms/formsStyle";

const Users = (props) => {

    const [ user, setUser ] = useState([])
    const [ editingUser, setEditingUser ] = useState()
    const [newArray, setNewArray] = ([])


    useEffect(() => {
        // props.fetchAll()

        //MOVED TO ACTIONS
        axiosWithAuth()
        .get("/users/users/all")
        .then(response => {
            // .data?
            console.log("User Get Res", response.data)
            setUser(response.data)
        })
        .catch(error => {
            console.log("User Get", error)
        })
        
    }, [props.userDelete,editingUser])

    const deleteUser = id => {
        props.deleteUser(id)
        //MOVED TO ACTIONS
        // axiosWithAuth()
        // .delete(`/users/user/${id}`)
        // .then(response => {
        //     // .data?
        //     console.log("Delete Response", response)
        //    setUserDelete(true)
        // })
        // .then(()=>{
        //     setUserDelete(false)
        // })
    }

    const editUser = userObj => {
        setEditingUser(userObj);
    }

    useEffect(()=>{
        props.fetchUserInfo();
        //MOVED TO ACTIONS
        // axiosWithAuth()
        // .get("/users/getuserinfo")
        // .then(response=>{
        //     setUserInfo(response.data)
        // })
        // .catch(error=>{
        //     console.log(error)
        // })
    },[])

    function fetchUsers(){
        if(props.routeData.username == "admin"){
            props.routeData.map(userObj => {
                return (
                <StyledCard style={{background:"#16416C"}} key={userObj.userid} >
                    <CardTitle style={{fontSize:"2rem",textTransform:"uppercase"}}>{userObj.username}</CardTitle>
                    <CardText style={{fontSize:"1.5rem",textTransform:"uppercase"}}>{userObj.userid}</CardText>
                    <CardText style={{fontSize:"1.5rem",textTransform:"uppercase"}}>{userObj.primaryemail}</CardText>
                
                    <Button style={{margin: "5px"}} onClick={() => editUser(userObj)}>Edit</Button>
                    <Button style={{margin: "5px"}} onClick={() => deleteUser(userObj.userid.toString())}>Delete</Button>
                </StyledCard>
            )})
        }
    }
    
    return (
        <UsersContainer>
            {(props.routeData.username === "admin" && editingUser) ? (<AddUser 
            setUser={setUser}
            editingUser={editingUser}
            setEditingUser={setEditingUser}
            />) : null}
            {/* <AddUser 
            setUser={setUser}
            editingUser={editingUser}
            /> */}

            <StyledUser>
                {/* <Btn onClick={(e)=>{
                    e.preventDefault();
                    fetchUsers();
                    console.log(props.routeData.username)
                }}>GET ALL USERS</Btn> */}
                {user.map(userObj => {
                return (
                <StyledCard style={{background:"#16416C"}} key={userObj.userid} >
                    <CardTitle style={{fontSize:"2rem",textTransform:"uppercase"}}>{userObj.username}</CardTitle>
                    <CardText style={{fontSize:"1.5rem",textTransform:"uppercase"}}>{userObj.userid}</CardText>
                    <CardText style={{fontSize:"1.5rem",textTransform:"uppercase"}}>{userObj.primaryemail}</CardText>
                
                    <Button style={{margin: "5px"}} onClick={() => editUser(userObj)}>Edit</Button>
                    <Button style={{margin: "5px"}} onClick={() => deleteUser(userObj.userid.toString())}>Delete</Button>
                </StyledCard>
            )})}
            </StyledUser>
        </UsersContainer>
    )
}

const mapStateToProps = state => {
	return {
        routeData: state.routeData,
        isFetching: state.isFetching,
        error: state.error,
        userDelete: state.userDelete,
        allUsers: state.allUsers,
	};
};

export default connect(
	mapStateToProps,
	{ fetchUserInfo, deleteUser, fetchAll }
)(Users);

const StyledUser = styled.div`
display: flex;
flex-wrap: wrap;
height: 100%;
width: 100%;
justify-content: space-between;
text-align: center;
padding: 0 1rem;
`;

const UsersContainer = styled.div`
    background: #5BD59B;
`;

const StyledCard = styled(Card) `
    width:30rem;
    margin-bottom:30px;
    color: white;
    box-shadow: 31px 41px rgba(0, 0, 0, 0.3);
    &:hover{
        transition: all .2s ease;
        height: 18rem;
        width: 32rem;
        background: #2A3E56 !important;
        color: black;
    }
`