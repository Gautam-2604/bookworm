export async function POST(req, res) {
    try {
      res.setHeader('Set-Cookie', [
        'token=; Max-Age=0; HttpOnly; Path=/',
      ]);
  
      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  