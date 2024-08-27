import Book from "@/models/bookModel";
import dbConnect from "@/utils/dbConnect";

export async function POST(req) {
    await dbConnect();
    const { name, userId } = await req.json();

    try {
        if (!name || !userId) {
            return new Response(JSON.stringify({ message: 'Enter the book name and user ID' }), { status: 400 });
        }

        // Find the book by its name
        const book = await Book.findOne({ name });
        if (!book) {
            return new Response(JSON.stringify({ message: 'Book not found' }), { status: 404 });
        }

        // Check if the current user owns the book or if there's another user who owns it for exchange
        const userBooks = await Book.find({ ownerId: userId });
        const exchangeableBooks = userBooks.filter(userBook => userBook.name !== name);

        if (exchangeableBooks.length === 0) {
            return new Response(JSON.stringify({ 
                message: 'No books available for exchange' 
            }), { status: 404 });
        }

        return new Response(JSON.stringify({ 
            message: 'Books available for exchange',
            availableBooks: exchangeableBooks.map(book => ({ name: book.name, author: book.author }))
        }), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Internal error' }), { status: 500 });
    }
}
