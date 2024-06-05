import * as BS from "react-icons/bs";
import axios from 'axios';
import { useState } from "react";
import jspdf from "jspdf";
import autoTable  from "jspdf-autotable";

function App() {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState(null)

  const getTodos = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(res => {
        setTodos(res.data)
        console.log(res.data)
      })
      .catch(() => {
        setError('There was an error connecting to the server')
      })
  }

  const downloadPdf = ()=>{
    const Pdf = new jspdf();
    Pdf.autoTable({html:'#todosTable'})
    Pdf.save('TodoList')
  }

  return (
    <div className="App vh-100 d-flex flex-column justify-content-between">
      <div className="container d-flex flex-column justify-content-start py-4">
        <h4 className="w-100 text-center">دانلود جدول بصورت Pdf</h4>
        {
          error &&
          <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
            <div className="d-flex align-items-center gap-2">
              <BS.BsExclamationTriangleFill size={18} />
              <p className="m-0 p-0 mt-1">There was an error connecting to the server</p>
            </div>
            <BS.BsXLg size={18} role="button" onClick={() => setError(null)} />
          </div>
        }
        <div className="py-4 d-flex gap-2 align-items-center">
          <button className="btn btn-sm btn-success" onClick={getTodos}>نمایش Todos</button>
          <button className="btn btn-sm btn-primary" disabled={todos.length > 0?false:true} onClick={downloadPdf}>دانلود فایل Pdf</button>
        </div>

        {
          todos.length > 0 &&
          <>

            <table id="todosTable">
              <thead>
                <tr>
                  <th>#</th>
                  <th>title</th>
                  <th>status</th>
                </tr>
              </thead>
              <tbody>
                {
                  todos.map((todo, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{todo.title}</td>
                      <td>{todo.completed? 'Done' : 'Undone'}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </>

        }

      </div>

      <div className="footer text-center py-3">
        <small> طراحی شده توسط <a href="https://hamidkamyab.ir/" target="_blank" className="text-muted">حمید کامیاب</a></small>
      </div>
    </div>
  );
}

export default App;
