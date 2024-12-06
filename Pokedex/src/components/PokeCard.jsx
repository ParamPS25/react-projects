import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils/index";
import {TypeCard} from "./TypeCard"

export function PokeCard(props){
    const {selectedPokemon} = props
    const [pokemonData,setPokemonData] = useState(null);
    const [loading,setLoading] = useState(false);

    const { name, height, abilities, stats, types, moves, sprites } = pokemonData || {}

    // as some sprites have null value for img url so filtering out only sprites with valid img url
    // Object.keys(sprites || {}) to get the array of keys, then apply .filter() on that array to keep only keys with valid URLs.
    // sprites: { back_shiny : "https://raw.githubus..", back_female : null , ... , other : {} , versions :{}}
    // also filter out unused other and versions

    const spritesImgList = Object.keys(sprites || {}).filter((key) => {
        // Exclude null, undefined, or empty values
        if (!sprites[key]) return false;
    
        // Exclude the "other" and "versions" keys
        if (key === "other" || key === "versions") return false;
    
        return true;
    });
    
        
    
    useEffect(()=>{
            // 1. return if loading or no localStorage
            // 2. set up cache and check for localStorage key if it is then parse data to cache
            // 3. check if selected pokemon data is available in cache if it is then read data from local storage
            // 4. if not in cache then fetch it from api
            // 5. after fetching from api , save the info to localStorage to cache next time

            // Setting loading prevents race conditions or inconsistent behavior
            // If setLoading(true) is delayed until after a network call begins, any logic depending on loading might execute unexpectedly (e.g., multiple fetch requests overlapping)
            if(loading || !localStorage){
                return;
            }

            let cache = {};
            if(localStorage.getItem("pokedex-key")){
                cache = JSON.parse(localStorage.getItem("pokedex-key"));
            }

            if(selectedPokemon in cache){
                setPokemonData(cache[selectedPokemon])
                console.log("found pokemon in cache");
                return;         // returning as no further need to fetch as already was avail in cache
            }

            async function fetchPokemonData(){
                setLoading(true)                // This notifies the app that the fetching process has started
                try {
                    const baseUrl = "https://pokeapi.co/api/v2/";
                    const suffix  =  "pokemon/" + getPokedexNumber(selectedPokemon);
                    const finalUrl = baseUrl + suffix   // https://pokeapi.co/api/v2/pokemon/1
                    
                    const res = await fetch(finalUrl);
                    const fetchedPokemonData = await res.json();
                    setPokemonData(fetchedPokemonData);
                    console.log("fetched pokemon data");
                    //storing fetched pokemon to local storage
                    cache[selectedPokemon] = fetchedPokemonData                // {0 : {abilities:[],...}}
                    localStorage.setItem("pokedex-key",JSON.stringify(cache));
                } catch (err) {
                    console.log(err.message);   
                } finally{
                    setLoading(true);           // This signals the app that the fetch is complete and the UI can update accordingly
                }
            }

            fetchPokemonData();

    },[selectedPokemon])

    if(loading || !pokemonData){
        return(
            <div>
                <h4>Loading...</h4>
                {console.log("loading")}
            </div>
        )
    }

    return(
        // pokemon-number
        <div className="poke-card">
            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>

        {/* pokemon-type */}

            <div className="type-container">
                {types.map((typeObj,typeIndex)=>{       //types.type.name to access the pokemon type name
                    return(
                        <TypeCard key={typeIndex} 
                            type={typeObj?.type?.name}/>
                    )
                })}
            </div>

            {/* pokemon-img */}

            <img className="default-img" 
                src={`/pokemon/${getFullPokedexNumber(selectedPokemon)}`+".png"}
                alt={`large image of ${name}`}/>

            {/* sprites */}

                <div className="img-container">
                    {spritesImgList.map((spriteUrlKey,spriteIndex)=>{
                        const imgUrl = sprites[spriteUrlKey];
                        return(
                            <img key={spriteIndex} src={imgUrl} 
                                alt={`${spriteUrlKey}-img`}/>
                        )
                    })}
                </div>


            {/* stats */}
            {/* stats : [{base_stat: 45, effort: 0, stat: {name: "hp", url: "https://pokeapi.co/api/v2/stat/1/"}},…] */}
            <h3>Stats</h3>
            <div className="stats-card">
                {stats.map((statObj,statIndex)=>{
                    const {base_stat,stat} = statObj;
                    return(
                        <div key={statIndex} className="stat-item">
                            <p>{stat?.name}</p>
                            <h4>{base_stat}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}