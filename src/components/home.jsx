'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import axios from "axios";

export default function Landing() {
  const [name, setName] = useState("")
  const [author, setAuthor] = useState("");
  const [lendBooks, setLendBooks] = useState([]);
  const [borrowBooks, setBorrowBooks] = useState([]);

  const handleLend = async () => {
    try {
      console.log('hejgkjkhgf');
      const response = await axios.post('/api/uploadLend', { name, author });
      
      setLendBooks([...lendBooks, { user: 'Current User', bookName: name, author }]);
    } catch (error) {
      console.error("Error uploading:", error);
    }
  }

  const handleBorrow = async () => {
    try {
      const response = await axios.post('/api/requestBook', { name, author });
      console.log(response.data);
      setBorrowBooks([...borrowBooks, { user: 'Current User', bookName: name, author }]);
    } catch (error) {
      console.error("Error uploading:", error);
    }
  }

  return (
    <div className="px-10">
      <div className="pt-40 w-full flex items-start justify-center gap-20">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="h-16 w-40 text-2xl rounded-xl">Lend Book</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 border-none bg-secondary">
            <div className="rounded-xl p-8 flex flex-col items-center gap-5">
              <Input type="text" color="primary" label="Name" variant="bordered" value={name} onChange={(e) => setName(e.target.value)} />
              <Input type="text" color="primary" label="Author" variant="bordered" value={author} onChange={(e) => setAuthor(e.target.value)} />
              <Button className="active:scale-75 transform duration-500 bg-white hover:bg-white text-secondary" onClick={handleLend}>Lend</Button>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="h-16 w-40 text-2xl rounded-xl">Borrow Book</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 border-none bg-secondary">
            <div className="rounded-xl p-8 flex flex-col items-center gap-5">
              <Input type="text" color="primary" label="Book Name" variant="bordered" value={name} onChange={(e) => setName(e.target.value)} />
              <Input type="text" color="primary" label="Author" variant="bordered" value={author} onChange={(e) => setAuthor(e.target.value)} />
              <Button className="active:scale-75 transform duration-500 bg-white hover:bg-white text-secondary" onClick={handleBorrow}>Borrow</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <h1 className="text-4xl text-white w-full text-center py-10">Listed Books</h1>

      <Tabs defaultValue="lend" className="w-full">
        <TabsList className="flex justify-center w-full lg:w-1/2 lg:mx-80 mb-10">
          <TabsTrigger value="lend" className="w-96">To Lend</TabsTrigger>
          <TabsTrigger value="borrow" className="w-96">To Borrow</TabsTrigger>
        </TabsList>
        <TabsContent value="lend">
          <div className="flex justify-center">
            <table className="table-auto w-full text-white">
              <thead>
                <tr>
                  <th className="border-b-[0.01px] border-secondary/50 px-4 py-2 w-1/3">User</th>
                  <th className="border-b-[0.01px] border-secondary/50 px-4 py-2 w-1/3">Book Name</th>
                  <th className="border-b-[0.01px] border-secondary/50 px-4 py-2 w-1/3">Author Name</th>
                </tr>
              </thead>
              <tbody>
                {lendBooks.map((book, index) => (
                  <tr key={index} className="text-center">
                    <td className="border-b-[0.01px] border-secondary/50 px-4 py-2 w-1/3">{book.user}</td>
                    <td className="border-b-[0.01px] border-secondary/50 px-4 py-2 w-1/3">{book.bookName}</td>
                    <td className="border-b-[0.01px] border-secondary/50 px-4 py-2 w-1/3">{book.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="borrow">
          <div className="flex justify-center">
            <table className="table-auto w-full text-white">
              <thead>
                <tr>
                  <th className="border-b-[0.01px] border-secondary/50 px-4 py-2 w-1/3">User</th>
                  <th className="border-b-[0.01px] border-secondary/50 px-4 py-2 w-1/3">Book Name</th>
                  <th className="border-b-[0.01px] border-secondary/50 px-4 py-2 w-1/3">Author Name</th>
                </tr>
              </thead>
              <tbody>
                {borrowBooks.map((book, index) => (
                  <tr key={index} className="text-center">
                    <td className="border-b-[0.01px] border-secondary/50  px-4 py-2 w-1/3">{book.user}</td>
                    <td className="border-b-[0.01px] border-secondary/50  px-4 py-2 w-1/3">{book.bookName}</td>
                    <td className="border-b-[0.01px] border-secondary/50  px-4 py-2 w-1/3">{book.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
