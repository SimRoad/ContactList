import './App.css'
import Table from './components/Table.jsx'
import PopUp from './components/popUp.jsx'

function Body() {

  return (
    <>
    <div id='header'>
      <div id='title'>
        <h1>Contact Clipboard</h1>
        <PopUp />
      </div>
    </div>

    <Table />
    </>
  )
}

export default Body
