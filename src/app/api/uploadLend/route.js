import Book from "@/models/bookModel";
import dbConnect from "@/utils/dbConnect";

export async function POST(req){
    await dbConnect();
    const {name, author} = await req.json();
    console.log("Answer is, ",{name, author});
    console.log({name});

    try {

        if(!name || !author){
            return new Response(JSON.stringify({ message: 'Enter the required fields' }), { status: 400 });
        }
        

        const newBook = new Book({name, author});
        await newBook.save();
        return new Response(JSON.stringify({ message: 'New Book saved' }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Internal error' }), { status: 500 });
    }
}