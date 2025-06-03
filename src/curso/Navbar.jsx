import './App.css'
import imagen from './img/img.png'
function App() {

  return (

<div className='container mx-auto mt-5'>
  <button className='bg-blue-500 sm:bg-orange-400 md:bg-red-400 lg:bg-green-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded'>
    Gestionar citas
  </button>


<h1 className='mt-5 text-amber-200 text-5xl text-center'>Esto es un H1</h1>
<h2 className='text-right'>Esto es un H2</h2>
<h3>Esto es un H3</h3>
<h4 className='w-48 bg-purple-200 text-white text-center py-10 px-5 m-10 rounded-lg text-xl '>Esto es un H4</h4>
<h5 className='shadow-md'>Esto es un H5</h5>
<h6>Esto es un H6</h6>
<img src={imagen} alt= "Mi imagen" />


<div className='m-5 p-5 border'>
  <p className='text-xl sm:text-xs text-right'>
    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus distinctio laboriosam quo magnam nisi iure ab dolores, omnis voluptas quisquam aperiam aut recusandae dolore doloremque consequuntur quasi repellendus suscipit enim.
  </p>
</div>



{/*   <nav className='flex justify-between fixed w-full top-0 items-center  bg-amber-400 py-2 h-auto' >
    <a href="./">Inicio</a>
    <a href="">Lentes</a>
    <a href="">Lentes para el sol</a>
    <a href="">Accesorios</a>

  </nav> */}

</div>
  )
}

export default App
