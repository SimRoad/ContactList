import './App.css'
import './components/popUp.jsx'
import Table from './Table/Table.jsx'
import PopUp from './components/popUp.jsx'

function Body() {

  return (
    <>
    <div id='header'>
      <div id='title'>
        <h1>Contact List</h1>
        <PopUp />
      </div>
    </div>

    <Table />
    </>
  )
}

export default Body
