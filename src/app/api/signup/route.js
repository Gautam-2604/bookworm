import User from "@/models/userModel";
import dbConnect from "@/utils/dbConnect";
import bcrypt from "bcryptjs";


export async function POST(req){
    await dbConnect();
    const {username, password,email} = await req.json();
    try {
        if(!username || !password || !email){
            return new Response(JSON.stringify({ message: 'Enter the required fields' }), { status: 400 });
        }

        const isUsername = await User.findOne({username})
        if(isUsername){
            return new Response(JSON.stringify({ message: 'username already available' }), { status: 400 });
        }
        const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
       
        const newUser = new User({username, password: hashedPassword, email});
        const token = jwt.sign({ userId: newUser._id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        await newUser.save();
        return new Response(JSON.stringify({ message: 'New User saved' }, token), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Internal error' }), { status: 500 });
    }
}