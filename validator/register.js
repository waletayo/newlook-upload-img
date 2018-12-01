const validator =require('validator');
const isEmpty=require('./isEmpty');
module .exports=function validateRegisterInput(data){
    let errors={};
    data.name =!isEmpty(data.name) ? data.name:"";
    data.lName =!isEmpty(data.lName) ? data.lName:"";
    data.email=!isEmpty(data.email)? data.email:"";
    data.password=!isEmpty(data.password)?data.password:"";
    data.password2=!isEmpty(data.password2)? data.password2:"";

    if (validator.isLength(data.name,{min:2, max:30})){
        errors.name='name must be between 2 and 30 characters';
    }
    /*if (validator.isEmpty(data.name)){
        errors.name="firstname is required";
    }*/

    if (!validator.isLength(data.lName,{min:2, max:30})){
        errors.lName='name must be between 2 and 30 characters';;
    }
    if (validator.isEmpty(data.lName)){
        errors.lName="lastname is required";
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

}