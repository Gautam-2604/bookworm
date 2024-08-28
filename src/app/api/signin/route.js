import User from "@/models/userModel";
import dbConnect from "@/utils/dbConnect";

export async function POST(req){
    await dbConnect();
    const {username, password} = await req.json();

    try {
        if(!username || !password){
            return new Response(JSON.stringify({ message: 'Enter the required fields' }), { status: 400 });
        }
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!isPasswordCorrect){
            return new Response(JSON.stringify({ message: 'Incorrect password/Username' }), { status: 400 });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return new Response(JSON.stringify({ message: 'logged in successfully' }, token), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Internal error' }), { status: 500 });
    }

}