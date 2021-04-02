/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './pokemon.style.css';
import styled from '@emotion/styled'

const CatchButton = styled.button`
    width: 200px;
    height: 35px;
    display: block;
    margin: 35px auto;
    background: rgb(197, 188, 102);
    border-radius: 10px;
    border: none;
    outline: none;
    color: #171717;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      color: white;
    }`


const ReleaseButton = styled.button`
position: absolute;
  top: 0;
  right: 0;
  border: none;
  outline: none;
  width: 35px;
  height: 35px;
  line-height: 35px;
  background: firebrick;
  color: #F3F3F3;
  font-size: 28px;
  cursor: pointer;
  &:hover {
    color: black;
  }

`
function PokemonDex() {
  const [pokeDex, setPokeDex] = useState([])
  const [wildPokemon, setWildPokemon] = useState([])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect (() => {
    encounterWildPokemon()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pokeID = () => {
    const min = Math.ceil(1)
    const max = Math.floor(151)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const encounterWildPokemon = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon/' + pokeID())
      .then(response => {
        console.log('Wild Pokemon', response.data);
        setWildPokemon(response.data)
      })

  }
  

  const catchPokemon = (pokemon) => {
    setPokeDex(state => {
      const pokemonExists =(state.filter(poke => pokemon.id === poke.id).length > 0);

      if (!pokemonExists) {
        state = [...state, pokemon]
        state.sort(function (a, b){
          return a.id - b.id
        })
      }
      return state
    })
    encounterWildPokemon()
  }

  const releasePokemon = id => {
    setPokeDex(state => state.filter(pokeRelease => pokeRelease.id !== id ))
  }

  return (
    <div className ="app-wrapper">
      <header>
        <h1 className = "pokeTitle">Pokemon Project</h1>
      </header>

      <section className="wild__Pokemon">
        <h2>Pokemon Character</h2>

        <img src = {"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + wildPokemon.id + ".png"} 
          className ="pokemonSprite"/>

        <h3>{wildPokemon.name}</h3>

        <CatchButton className ="catch-btn" onClick={() => catchPokemon(wildPokemon)}>Catch</CatchButton>

      </section>

      <section className="pokeDex">
        <h2>Pokedex List</h2>
        <div className="pokedexList"> 
          {pokeDex.map((pokemon) => (
            <div className="pokemon" key={pokemon.id}>
              <img src = {"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} 
                className ="pokemonSprite"/>
              <h3 className="pokemon-name">{pokemon.name}</h3>
              <ReleaseButton className="remove-btn" onClick={() => releasePokemon(pokemon.id)}>&times;</ReleaseButton>
            </div>
          ))}
        </div>

      </section>
    </div>
  )
}

export default PokemonDex