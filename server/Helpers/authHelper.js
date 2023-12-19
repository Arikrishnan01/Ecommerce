import bcrypt from "bcrypt";

/**HASHED THE PASSWORD FOR SAFETY PURPOSE */
export const hashPassword = async(password) => {
    try{
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    catch(error){
        console.log(error);
    }
}

/**AFTER HASHED PASSWORD HAVE COMPARE FOR ALLOW */
export const comparePassword = async(password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}