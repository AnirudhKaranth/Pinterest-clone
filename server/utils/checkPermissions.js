import { createCustomError } from "../errors/CustomError.js";

const checkPermissions = (requestUser, sourceUserId, next)=>{
    if(requestUser.userId === sourceUserId.toString()) return;
    else{
        return next(createCustomError('Not authorized to access this route', 401))
    }
}

export default checkPermissions