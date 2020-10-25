import React,{useState,useEffect} from 'react'
import axios from 'axios'


import Pagination from './Pagination'
import Pokelist from './PokeList'


const APP=()=>{
    const [pokemons,setPokemons]=useState([])
    const [currentURL,setCurrentURL]=useState("https://pokeapi.co/api/v2/pokemon")
    const [previousURL,setPreviousURL]=useState()
    const [nextURL,setNextURL]=useState()
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        let cancel
        axios.get(currentURL,{
            cancelToken: new axios.CancelToken(c=> cancel=c)
        }).then(res=>{
            setLoading(false)
            setNextURL(res.data.next)
            setPreviousURL(res.data.previous)
            setPokemons(res.data.results.map(p=>p.name))
        })

        return ()=> cancel()
    },[currentURL])


    const gotoNext=()=>{
        setCurrentURL(nextURL)
    }

    const gotoPrev=()=>{
        setCurrentURL(previousURL)
    }

    if(loading) return "LOADING..."
    
    
    return(
		<div>
            <Pokelist
            pokemons={pokemons}/>

            <Pagination
                nextBtn={nextURL? gotoNext:null}
                prevBtn={previousURL? gotoPrev:null}
            />
		</div>
	);	
}

export default APP;



// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
