import { customAPIError } from "../errors/CustomError.js";

const errorHandlerMiddleware = async(err, req, res, next)=>{
    if(err instanceof customAPIError){
        let st = err.statusCode || 500
        return res.status(st).json(err.message)
    }
    return res.status(500).json({message: err.message})
}

export default errorHandlerMiddleware