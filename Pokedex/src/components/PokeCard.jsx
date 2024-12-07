import { useEffect, useState } from "react"
import { getFullPokedexNumber, getPokedexNumber } from "../utils/index";
import {TypeCard} from "./TypeCard"
import { Modal } from "./Modal";

export function PokeCard(props){
    const {selectedPokemon} = props
    const [pokemonData,setPokemonData] = useState(null);
    const [loading,setLoading] = useState(false);

    const [movesDescription, setMovesDescription] = useState(null);
    
    async function fetchMovesData(move,moveUrl) {
        if(loading || !localStorage || !moveUrl) {return}  // guard clause

        let movesCache = {};
        if(localStorage.getItem("pokemon-moves")){
            movesCache = JSON.parse(localStorage.getItem("pokemon-moves"))
        }

        if(move in movesCache){
            setMovesDescription(movesCache[move])
            console.log("move found in cache");
            return ;
        }

        try{
            setLoading(true); // to display loading block till data is fetched from api and also to avoid race conditions
            const res = await fetch(moveUrl);
            const movesData = await res.json();
            console.log("fetched moves from api");

            // 1. Check if `moveData` exists and access its `flavor_text_entries` property.
            // 2. Filter the `flavor_text_entries` array to find objects where `version_group.name` equals 'firered-leafgreen'.
            // 3. Access the first matching entry using `[0]`.
            // 4. Use optional chaining to safely access the `flavor_text` property of the first entry.
            // 5. If no match is found, return `undefined`.

            const description = movesData?.flavor_text_entries.filter(val => {
                return val.version_group.name == 'firered-leafgreen';   // Match the desired version group
            })[0]?.flavor_text || "No description available"; // Safely access the flavor_text property

            const resultData = {         // mapping description with move name (not strict as can also be done setMovesDesc(Movename:move,description) as can cause redundency as cache[move] = resultData then move:{move:"",moveName:""})
                moveName : move,
                description
            }

            setMovesDescription(resultData);
            movesCache[move] = resultData;
            // movesCache[move] = description
            localStorage.setItem("pokemon-moves",JSON.stringify(movesCache))  

        }catch(e){
            console.log(e.message);
        }finally{
            setLoading(false);
        }
    }


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

            {/* moves */}
            <h3>Moves</h3>
            <div className="pokemon-move-grid">
                {moves.map((movesObj,movesIndex)=>{
                    const movesName = (movesObj?.move?.name).replaceAll("-"," ");
                    return(
                        <button key={movesIndex} className=' pokemon-move'
                            onClick={()=>{
                                fetchMovesData(movesName,movesObj?.move?.url)
                            }} >
                            {/* <p>{movesObj?.move?.name}</p> */}
                            <p>{movesName}</p>
                        </button>
                    )
                })}
            </div>
            
            {/* popup/modal to list the description of the moves that gets clicked in PokeCard and modal/popup component gets displayed */} 
            {/* conditional rendering , if movesDescription is not null then display popup/Modal -> using ReactDom.createPortal (render the modal outside the main DOM hierarchy for better styling and positioning.)*/}
            {/* so, for closing this -> setMovesDescription(null) => then this will not get rendered as movesDescription will be null  */}

            {movesDescription && (
                <Modal handleCloseModal = {()=>{setMovesDescription(null)}}>   {/*function prop : allows the child to invoke behavior in the parent, making it dynamic */}
                    {/*children Prop: Anything passed between the opening and closing <Modal> tags is accessible in the Modal component as children.  */}
                    <div>
                        <h5>Name</h5>
                        <h2 className="skill-name">{movesDescription.moveName.replaceAll("-"," ")}</h2>
                    </div>
                    <div>
                        <h6>Description</h6>
                        <p>{movesDescription.description}</p>
                    </div>
                </Modal>
            )}
        </div>
    )
}