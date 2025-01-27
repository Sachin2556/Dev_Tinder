
const AdminAuth= (req,res,next) =>{
    console.log("checking authorized access");
     const token="xyzkdmd";
    const IsAuthorized = token === "xyz";
     if(!IsAuthorized){
        res.status(401).send("Unauthorized user");
     }
     else next();
};

const UserAuth= (req,res,next) =>{
    console.log("checking authorized access");
     const token="xyzsqz";
    const IsAuthorized = token === "xyz";
     if(!IsAuthorized){
        res.status(401).send("Unauthorized user");
     }
     else next();
}

module.exports = {
   AdminAuth, UserAuth,
};