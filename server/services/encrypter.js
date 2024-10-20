//Imports
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
//Constants
dotenv.config();
const round = parseInt(process.env.ROUND) || 10;
//Functions
const encrypt = async (password) => {
  const salt = await bcryptjs.genSalt(round);
  const encryption = await bcryptjs.hash(password, salt);
  return encryption; //Encrypted Password String
};
const decrypt = async (pw, hashedPw) => {
  const check = await bcryptjs.compare(pw, hashedPw);
  return check; //Boolean Value
};
//Exports
export { encrypt, decrypt };
