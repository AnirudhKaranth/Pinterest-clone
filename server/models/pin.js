import mongoose from "mongoose";

const pinSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim: true
    },
    about:{
        type: String,
        required: true
        
    },
    destination:{
        type: String,
        
    },
    altText:{
        type:String,
        default:""
    },
    profile:{
        type: String,
        default:""
    },
    image:{
        type: String,
        required:true
    },
    likes:{
        type:[String],
        default:[]
    },
    comments:[{
        commentBody:String,
        commentedBy: String,
        UserID: String,
        profileImage:String,
        commentedOn:{ type: Date, default: Date.now}
    }],
    savedBy:[{
        userId: String,
        
    }],
    userName:{
        type: String,
        
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, 'Please provide user'],
    }
},{ timestamps: true }
)


export default mongoose.model("pin", pinSchema)