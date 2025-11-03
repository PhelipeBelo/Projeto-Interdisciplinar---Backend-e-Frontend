import Footer from "@/components/blocks/footer";
import Navbar from "@/components/blocks/header";

export default function RootLayout({ children }) {
  return (
    <>
    


        <Navbar/>
        {children}
        <Footer/>


      
    </>
  );
}
