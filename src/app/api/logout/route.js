export async function POST(req, res) {
    try {
      
  
      return new Response(JSON.stringify({ message: 'Logged Out' }), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ message: 'Internal error' }), { status: 500 });
    }
  }
  