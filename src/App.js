import { useEffect, useState } from 'react/cjs/react.development';
import './App.css'
import axios from 'axios'
import {Container, Dimmer, Loader} from 'semantic-ui-react';
import Pokedex from './components/Pokedex';

function App() {

  const [nextPoke, setNextPoke] = useState('https://pokeapi.co/api/v2/pokemon?limit=15')
  const [pokedex, setPokedex] = useState([])
  const [loading, setLoading] = useState(true);

  const aux = [];
 
  const getPokedex = async () =>{
    setLoading(true)
    const response = await axios.get(nextPoke)
    setNextPoke(response.next)
    setPokedex(response.data.results.map( async (pokemon)=>{
      const res = await axios.get(pokemon.url)
      await aux.push(res);
      await setLoading(false)
      return aux
    }) ,)
  }

  useEffect(() => {
    setPokedex(getPokedex())
  }, [])



  return (
    <div className='app'>
      <h1>Pokedex</h1>
      <div className='pokedex'>
        <div className='pokemons'>
          {loading ? (
            <Dimmer active inverted>
              <Loader inverted >Cargando...</Loader>
            </Dimmer>
          ): (
            pokedex.map((pokemon, index) => {
              {console.log(pokemon.data.name);}
              <li>{index}</li>
            })
          )}
        </div>
        <button className='btn-plus' onClick={getPokedex}>+</button>
      </div>

    </div>
  );
}

export default App;
