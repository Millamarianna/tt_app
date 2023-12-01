import Header from "./Header";
import Footer from "./Footer";

const Layout = ({content}) => {
  return (

    <div className="flex flex-col h-screen bg-orange-400">
        <Header />
        {content}
        
    </div>
  )
}
export default Layout