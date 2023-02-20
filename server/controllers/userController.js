import bcrypt from 'bcryptjs'
import { createCustomError } from "../errors/CustomError.js";
import user from "../models/user.js"



// SIGN UP (CREATE USER)
export const signUp = async (req, res, next) => {
    try {
        //Extract required details from the body of the Request
        const { name, email, password } = req.body;

        //Check whether user has provided all the values and if all values are not provided throw an error
        if (!name || !email || !password) {
            return next(createCustomError("Please provide all values", 400))
        }

        //check whether user already exists and if email is already registered throw an error 
        const userExists = await user.findOne({ email });
        if (userExists) {
            return next(createCustomError("User already exists", 400))
        }

        //If everything is proper then hash the password before saving it in database
        const salt = await bcrypt.genSalt(10);
        const hashedPasword = await bcrypt.hash(password, salt);

        //Then store the user in database
        const User = await user.create({ name, email, password: hashedPasword });

        //Create an unique token for each user [It is required for frontEnd for authorization :)]. 
        const token = User.createJWT();//createJWT() is not an built-in function. I have written it in user.js file in models folder

        User.password = undefined; // this is done avoid sending password to frontend

        //send the required data [password is not required :)] to frontEnd
        res.status(201).json({
            User,
            token
        })

    } catch (error) {
        next(error)
    }
}

//LOGIN USER
export const login = async (req, res, next) => {
    try {

        //Extract required details from the body of the Request (user won't give name while logging in )
        const { email, password } = req.body;

        //Check whether user has provided all the values and if all values are not provided throw an error
        if (!email || !password) {
            return next(createCustomError("Please provide all values", 400))
        }

        //check whether user already exists and if not throw an error 
        const User = await user.findOne({ email }).select('+password') /*Find the user with provided email //.
         .select() is used bcoz In model we have set select false in password since we don't want it to be returned..... but irony is that while using create() we get password in req.body and while using findOne() we do not get it. but we need it while using findOne() as we use it comparePassword() function and dont need it while using Create()   */;

        if (!User) {
            return next(createCustomError("User has not registered", 400))
        }
        //Check whether the entered password is correct by using the function we created in user model
        const correctPassword = await User.comparePassword(password);

        //if the given password does not match with the existing password in the database throw an error
        if (correctPassword === false) {
            return next(createCustomError("Incorrect password", 400))
        }

        // After checking the user. Create a token using the user defined function
        const token = User.createJWT();

        User.password = undefined; // this is done avoid sending password to frontend

        res.status(200).json({
            User,
            token
        })

    } catch (error) {
        next(error)
    }
}

//UPDATE USER
export const updateUser = async (req, res, next) => {
    try {
        //Extract required details from the body of the Request
        const { name, profile, about, website } = req.body;
        const Id =  req.User.userId
        
        //find the particular user with the help of userId we passed in the auth middleware after aunthenticating the request
        
            const User = await user.findByIdAndUpdate({ _id:Id }, { $set: { 'name': name, 'profile': profile, 'about':about, 'website':website} }, { new: true });
            // After checking the user. Create a token using the user defined function

            User.password = undefined; // this is done avoid sending password to frontend

            res.status(200).json({
                User
            })
        
    } catch (error) {
        next(error)
    }
}

//DELETE USER
export const deleteUser = async (req, res, next) => {
    try {
        //Extract required details from the body of the Request
        const { password } = req.params;
        
        const { userId } = req.User;

        //Check whether user has provided all the values and if all values are not provided throw an error
        if (!password) {
            return next(createCustomError("Please enter the password", 400))
        }

        const User = await user.findById({ _id: userId }).select('+password')

        //Check whether the entered password is correct by using the function we created in user model
        const correctPassword = await User.comparePassword(password);

        //if the given password does not match with the existing password in the database throw an error
        if (correctPassword === false) {
            return next(createCustomError("Incorrect password", 400))
        }
        else {
            await user.findByIdAndDelete({ _id: userId }) // delete the user from database
            res.status(200).json({ message: "Account deleted successfully" })
        }

    } catch (error) {
        next(error)
    }
}

//GET CURRENT USER
export const getUser = async (req, res, next) => {
    try {
        const Id =  req.User.userId

        const User = await user.findById(Id)
        res.status(200).json({
            User
        })


    } catch (error) {
        next(error)
    }
}


export const getPinCreator = async(req, res, next)=>{
    try {
        const {id} = req.params
  
        const User =await user.findById(id)
        res.status(200).json({
            User
        })
    } catch (error) {
        next(error)
    }
}