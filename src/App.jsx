import React from 'react' 
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'

const App = () => {
  // vai pegar as coisas do Main e da side ar e mandar pro main que vai mandar pro index.html
// assim vai aparecer as coisas do site
  return (
    <>
      <Sidebar/>
      <Main/>
    </>
  )
}

export default App
