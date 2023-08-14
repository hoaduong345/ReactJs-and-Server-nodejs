import Header from "../pages/header/Header"

function mainLayout({children}) {
  return (
    <div className='inline-flex flex-col h-screen w-full'>
        <Header />
        {children}
    </div>
  )
}

export default mainLayout