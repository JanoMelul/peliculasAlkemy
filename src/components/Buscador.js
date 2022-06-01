import swAlert from '@sweetalert/with-react'
import { useHistory } from 'react-router-dom'

function Buscador() {
  const history =  useHistory()

  const submitHandler = e=>{
    e.preventDefault()
    const keyword = e.currentTarget.keyword.value

    if(keyword.length === 0 ){
      swAlert(
        <h4>Debes escribir una palabra</h4>
      )
    } else if (keyword.length < 4) {
      swAlert(
        <h4>Debes escribir 4 al menos caracteres</h4>
      )
    } else {
      e.currentTarget.keyword.value = ''
      history.push(`/resultados?keyword=${keyword}`)
    }
  }
  return (
    <>
      <form onSubmit={submitHandler} className="d-flex align-items-center" >
          <label className='fomr-label d-block mb-0 mx-2'>
            <input className='form-control' type="text" name="keyword" placeholder="Buscar..."/>
            </label>
            <button className='btn btn-primary' type="submit">Buscar</button>
        </form>
    </>
  )
}

export default Buscador;