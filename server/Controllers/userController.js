import { comparePassword, hashPassword } from '../Helpers/authHelper.js';
import UserModel from '../Models/userModel.js'
import JWT from 'jsonwebtoken';
import orderSchema from '../Models/orderModel.js';

export const register = async(req, res) => {
    try{
        const { name, email, password, phone, address, answer } = req.body;

        /**VALIDATION THE EXPECT INPUT */
        if(!name || !email || !password || !phone || !address || !answer){
            return res.status(400).json({
                // success: false,
                message: "Fill the input field"
            });
        }

        /**CHECH THE USER IS ALREADY EXIST */
        const existUser = await UserModel.findOne({ email });
        if(existUser){
            return res.status(200).json({
                success: false,
                message: "Already register please login"
            });
        }

        /**REGISTER THE NEW USER */
        const hashedPassword = await hashPassword(password)
        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            answer
        })
        await user.save()
        return res.status(200).json({
            success: true,
            message: "Atlas, User register successfully...",
            user: user
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in Register",
            error: error
        });
    }
}
/**EXISTING USER LOGIN */
export const login = async(req, res) => {
    try{
        const { email, password } = req.body;

        /**VALIDATE THE EMAIL AND PASSWORD */
        if(!email || !password){
            return res.status(404).json({
                success: true,
                message: "Invalid email or password"
            });
        }

        /**CHECK THE USER */
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User email is not register"
            });
        }

        /**MATCH THE HASHED PASSWORD */
        const match = await comparePassword(password, user.password);
        /**CHECK THE CONDITION FOR PASSWORD MATCH */
        if(!match){
            return res.status(200).json({
                success: false,
                message: "Invalid Password"
            });
        }

        /**GENERATE THE TOKEN */
        const token = await JWT.sign(
            { _id: user._id}, 
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )
        return res.status(200).json({
            success: true,
            message: "User login successfully...",
            user:{
                user: user.name,
                email: user.email,
                address: user.address,
                phone: user.phone,
                role: user.role,
            },
            token,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Error user login error",
            error: error
        });
    }
}

/** TEST AUTH */
export const test = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Protected Routes"
    });
}

/** forget password constorller  */
export const forgetPassword =async (req, res) => {
    try{
        const { email, answer, newPassword} = req.body;
        if(!email || !answer || !newPassword){
            return res.status(400).json({
                message: "Eemail & Answer & Password is required"
            });
        }
        /**check the user */
        const user = await UserModel.findOne({email, answer});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Wrong Email or Answer"
            });
        }
        /**new password */
        const hashed = await hashPassword(newPassword);
        await UserModel.findByIdAndUpdate(user._id, { password: hashed });
        return res.status(200).json({
            success: true,
            message: "Password Reset successfully.."
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

//update prfole
export const profileUpdate = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await UserModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      return res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error While Update profile",
        error,
      });
    }
  };


  //orders
export const getAllOrders = async (req, res) => {
    try {
      const orders = await orderSchema
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        // .sort({ createdAt: "-1" });
      return res.json(orders);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error: error.message,
      });
    }
  };

  //orders
export const getOrders = async (req, res) => {
    try {
      const orders = await orderSchema
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      return res.json(orders);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error While Geting Orders",
        error,
      });
    }
  };

  //order status
export const ordersStatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderSchema.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      return res.json(orders);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error While Updateing Order",
        error: error.message,
      });
    }
  };