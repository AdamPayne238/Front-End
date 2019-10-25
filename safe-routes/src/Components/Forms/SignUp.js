import React,{useState} from "react";
import {Btn, FormContainer, Label, Input, LinkContainer, StyledLink, ParentContainer, Form, SubTitle} from "./formsStyle";
import * as yup from "yup";
import SideImage from "./SideImage";
import Logo from "../Logo/Logo";
import { connect } from "react-redux";
import { postUser } from "../actions";
import axios from "axios";
import {postLogin} from "../actions";
import logo from "../../assets/logo.png";

function SignUp(props){
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [formValues, setFormValues] = useState({
        primaryemail: "",
        username: "",
        password: "",
    })

    
    let schema = yup.object().shape({
        email: yup.string().email(),
        username: yup.string(),
        password: yup.string(),
      });

    const handleOnChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
        if(e.target.name === "password"){
            setPassword(e.target.value)     
        };
        if(e.target.name === "confirm"){
            setConfirm(e.target.value)
        }
    
    }

    

    const Submit = (e) => {
        e.preventDefault();
        if (password === confirm) {
        schema.validate(formValues)
            .then(valid=>{
                if(valid){
                    axios
                    .post("https://detman-saferoutes.herokuapp.com/createnewuser", formValues)
                    .then(()=>{
                        props.postLogin(formValues,props)
                    })
                    .catch(error => console.log("Post Error", error.response))
            }})

    } else {
        alert("Password doesn't match")
    }}
    
    return(
        <ParentContainer>
            <FormContainer>
                <Logo />
                <Form>
                    <SubTitle>SIGN UP</SubTitle> 
                    <Label> Email
                    <Input type="email" name="primaryemail"  placeholder="example@johndoe.com" id="email" onChange={handleOnChange} />
                    </Label>
                    <Label> Username
                    <Input type="text" name="username"  placeholder="johndoe" id="email" onChange={handleOnChange} />
                    </Label>
                    <Label> Create Password
                    <Input type="password"  name="password" placeholder="**********" onChange={handleOnChange} />
                    </Label>
                    <Label> Confirm Password
                    <Input type="password"  name="confirm" placeholder="**********" onChange={handleOnChange} />
                    </Label>
                    <Btn onClick={Submit}>Sign Up</Btn>
                </Form>
                <LinkContainer>
                <img className="logo" src={logo} alt="Safe Routes Logo" />
                    <div>
                        <span>Already Have An Account? </span><StyledLink to="/">Sign In</StyledLink>
                    </div>
                </LinkContainer>
            </FormContainer>
            <SideImage></SideImage>
        </ParentContainer>
    )
    }

const mapStateToProps = state => {
    return {
        error: state.error
    }
}

export default connect(
    mapStateToProps,
    {postUser,postLogin}
)(SignUp);