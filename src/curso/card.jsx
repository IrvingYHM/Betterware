import './App.css'
import imagen from './img/img.png'



function App() {

  return (

<div className='max-w-sm rounded overflow-hidden shadow-lg mx-auto my-auto h-screen'>
    <img className='w-full' src={imagen} alt="Mi imagen" />
        <div className='px-6 py-4'>
            <div className='font-bold text-xl mb-2'>
                The coldesto sunset
            <p className='text-gray-700 text-base'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum neque fugiat impedit dicta corrupti, minus maiores, ut quas voluptate animi praesentium doloribus labore commodi quia velit placeat illum tempore asperiores!
            </p>
            </div>
            <div className='px-6 py-4'>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2'>#photography</span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2'>#travel</span>
                <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold mr-2'>#winter</span>
            </div>
        </div>
</div>
  )
}

export default App
