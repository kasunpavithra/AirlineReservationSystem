const ROLES_LIST = require("../config/rolesList");
const loginHandler = require("../controllers/authController");
const logoutHandler = require("../controllers/logoutController");
const refreshTokenHandler = require("../controllers/refreshTokenController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");
const router = require("express").Router();

router.post("/login", loginHandler);
router.get("/refresh",refreshTokenHandler);
router.get("/logout",logoutHandler);

router.get("/checklogin",verifyJWT,verifyRoles(ROLES_LIST.Admin),(req,res)=>{
    res.send({auth:true});
});


module.exports = router;