//logic file
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { upsertStreamUser } from '../lib/stream.js';
export async function signup (req,res){
    const {email,password,fullName}=req.body;
    try{
        if(!email || !password || !fullName){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length < 6 ){
            return res.status(400).json({message:"Password must be at least 6 characters long"});
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User with this email already exists"});
        }
        const idx=Math.floor(Math.random()*100)+1;//gen no. bw 1-100
        const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser=await User.create({
            email,
            userName: fullName,
            password,
            profilePic:  randomAvatar,
        } )
        const token=jwt.sign({userId: newUser._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"        
        })
        //create user instream
        try{
            await upsertStreamUser({
            id:newUser._id.toString(),
            name:newUser.userName,
            image: newUser.profilePic || "",
        });
        console.log(`Stream user created for ${newUser.userName}`);
        }
        catch(error){
            console.log("Error creating stream user:",error);

        }
        


        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,//preventing xxs attacks
            sameSite: "strict",
            secure:process.env.NODE_ENV==="production",
        } );
        res.status(201).json({success:true,message:"User created successfully",user:newUser})
    }

    catch(error){
        console.log("error in signup controller",error);
        res.status(500).json({message:"Internal server error"});

    };
}

export async function login (req,res){
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user =await User.findOne({email});
        if(!user) return res.status(404).json({message:"User not found"});

        const isPasswordValid=await user.matchPassword(password);
        if(!isPasswordValid) return res.status(401).json({message:"Invalid credentials"});

        const token=jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY,{
            expiresIn:"7d"        
        })
          

        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,//preventing xss attacks
            sameSite: "strict",
            secure:process.env.NODE_ENV==="production",
        } );
        res.status(200).json({success:true,message:"Login successful",user});
        

    }
    catch(error){
        console.log("error in login controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
    
    }

export function logout (req,res){
       res.clearCookie("jwt")
       res.status(200).json({success:true,message:"Logout successful"}); 
}

export async function onboard(req,res){
    try{
        const userId=req.user._id;
        const {fullName, bio, nativeLanguage, learningLanguage, location}=req.body 
        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location",
                ].filter(Boolean),
            });
        } 
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                userName: fullName,
                bio,
                nativeLanguage,
                learningLanguage,
                location,
                isOnboarded: true,
            },
            {new: true });

           if (!updatedUser) return res.status(404).json({ message: "User not found" });
           try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.userName,
                image: updatedUser.profilePic || "",});
                console.log(`Stream user updated after onboarding for ${updatedUser.userName}`);
            } catch (streamError) {
                console.log("Error updating Stream user during onboarding:", streamError.message);}
                res.status(200).json({ success: true, user: updatedUser }); 


        }

    catch(error){
        console.error("Onboarding error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    
}


