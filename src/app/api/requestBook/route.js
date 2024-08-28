import Book from "@/models/bookModel";
import User from "@/models/userModel";
import dbConnect from "@/utils/dbConnect";

export async function POST(req) {
    await dbConnect();
    const { name, author } = await req.json();

    try {
        if (!name || !author) {
            return new Response(JSON.stringify({ message: 'Enter the book name and author' }), { status: 400 });
        }

        // Find the book by name and author
        const book = await Book.findOne({ name, author });
        if (!book) {
            return new Response(JSON.stringify({ message: 'Book not found' }), { status: 404 });
        }

        // Find the users who own this book
        const userBooks = await User.find({ ownedBooks: book._id });

        // Extract usernames from the users who own the book
        const usernames = userBooks.map(user => user.username);

        // Return the usernames to the frontend
        return new Response(JSON.stringify({ usernames }), { status: 200 });

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: 'Internal error' }), { status: 500 });
    }
}
