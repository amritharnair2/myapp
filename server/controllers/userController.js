const userDb = require("../models/userModel");
const createToken = require("../utilities/generateToken");
const { hashPassword, comparePassword } = require("../utilities/passwordUtilities");
const uploadToCloudinary = require("../utilities/imageUpload");

//Register for new user
const register = async (req,res) => {
    try {
        const {name, email, password, confirmpassword} = req.body;
        console.log(req.body)
        if(!name || !email || !password || !confirmpassword ) {
            return res.status(400).json({error: "All fields are required"})
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format"});
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^_-])[A-Za-z\d@$!%*#?&^_-]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must be at least 6 characters, include letters, numbers and a special character"});
          }

        if(password !== confirmpassword)
        {
            return res.status(400).json({error: "Passwords doesnot match"})
        }

        const userExist = await userDb.findOne({email}) 
        if(userExist) {
            return res.status(400).json({error: "Email already exist"})
        }

        const hashedPassword = await hashPassword(password)

        const newUser = new userDb ({
            name, email, password: hashedPassword
        })

        const savedUser = await newUser.save()
        if(savedUser) {
            const userObject = savedUser.toObject()
            delete userObject.password

        const token = createToken(savedUser._id)
        //res.cookie("token", token)
        return res.status(200).json({message: "User Signup successfull", userObject, token})
        }

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

//login for existing user
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({error: "All fields are required"})
        }

        const userExist = await userDb.findOne({email}) 
        if(!userExist) {
            return res.status(400).json({error: "User not found"})
        }

        // if (isAdmin && userExist.role !== "admin") {
        //     return res.status(403).json({ error: "Not authorized as admin" });
        //   }

        const passwordMatch = await comparePassword(password, userExist.password)
        if(!passwordMatch) {
            return res.status(400).json({error: "Incorrect Password"})
        }

        const userObject = userExist.toObject()
        delete userObject.password

        const token = createToken(userExist._id)
        //res.cookie("token", token)
        return res.status(200).json({message: "Login successfull", userObject, token})

    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

//user profile
const userProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await userDb.findById(userId).select("-password")
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}

//update user
const updateUser = async (req, res) => {
    try {
        const userId = req.userId; 
        const { name, email, oldPassword, newPassword, confirmNewPassword } = req.body;
    
        const user = await userDb.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
    
        if (name) user.name = name;
        if (email) user.email = email;
    
        // Update password if provided
        if (oldPassword || newPassword || confirmNewPassword) {
          if (!oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({ message: "All password fields are required" });
          }
    
          const isMatch = await comparePassword(oldPassword, user.password);
          if (!isMatch) {
            return res.status(401).json({ message: "Old password is incorrect" });
          }
    
          if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: "New passwords do not match" });
          }
    
          const hashedPassword = await hashPassword(newPassword)
          user.password = hashedPassword;
        }
    
        if (req.file) {
            const cloudinaryResponse = await uploadToCloudinary(req.file.path); 
            user.profilepic = cloudinaryResponse; 
          }

    
        const updatedUser = await user.save();
        res.status(200).json({ message: "Profile updated successfully", updatedUser});
      } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ message: "Server Error" });
      }
}

//delete user
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid id" })
        }
        await userDb.findByIdAndDelete(userId)
        return res.status(200).json("user deleted")
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ error: error.message || "Internal server error" })
    }
}


//list users
const listUsers = async (req,res) => {
    try {
        const usersList = await userDb.find()
        return res.status(200).json(usersList)
        
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({error: error.message || "Internal server error"})
    }
}

module.exports = {
    register,
    login,
    updateUser,
    deleteUser,
    userProfile,
    listUsers
}
