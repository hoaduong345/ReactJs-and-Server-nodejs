// const { default: axios} = require("axios")

// const ChatController = {
//     authenticate: async(req,res ) =>{
//         const username = req.body;
//         console.log("1")
//         try {
//             const r = await axios.put(
//                 "https://api.chatengine.io/users/",
//                 {username: username, secrect:username, first_name: username},
//                 {headers:{"private-key":"816aaf95-3d4a-41df-b00b-fe518a2c6e8d"}}
//             )
//             console.log("2", r )
//             return res.status(r.status).json(r.data)
//         } catch (error) {
//             console.log("3" )
//            console.log(error)
//         }
//     }

// }
// module.exports = ChatController