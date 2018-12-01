/*
const validator =require('validator');
const isEmpty=require('./isEmpty');
module .exports=function validateRegisterInput(data){
    let errors={};
    data.fName =!isEmpty(data.name) ? data.name:"";
    data.email=!isEmpty(data.email)? data.email:"";
    data.password=!isEmpty(data.password)?data.password:"";
    data.password2=!isEmpty(data.password2)? data.password2:"";
    data.lName=!isEmpty(data.lName) ? data.lName:"";


  /!*  if (!validator.isLength(data.fName,{min:2, max:30})){
        errors.fName='first name must be between 2 and 30 characters';
    }*!/
    if (!validator.isEmpty(data.fName)){
        errors.fName="first name is required";
    }
    if(!validator.isLength(data.lName,{min:2,max:30})){
        errors.lName="last name must be between 2 and 30";
    }
    if (validator.isEmpty(data.lName)){
        errors.lName="last name is required";
    }


    if (validator.isEmpty(data.email)){
        errors.email="email is required";
    }
    if (!validator.isEmail(data.email)){
        errors.email="email is invalid";
    }
    if (validator.isEmpty(data.password)){
        errors.password="password field is required";
    }
    if (!validator.isLength(data.password,{min:6,max:10})){
        errors.password="password should be at least six characters";
    }
    if (validator.isEmpty(data.password2)){
        errors.password2="confirm password field is required";
    }
    if (!validator.equals(data.password,data.password2)){
        errors.password2="pasword must match";
    }




    return{
        errors,
        isValid:isEmpty(errors)
    }

}*/
