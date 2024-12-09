import { useState } from "react";
import { first151Pokemon, getFullPokedexNumber } from "../utils/index"

export function SideNav(props) {
    const{selectedPokemon , setSelectedPokemon ,handleCloseMenu, showSideMenu} = props ;

    const [searchedPokemon,setSearchedPokemonValue] = useState("");

    const searchFilteredPokemon = first151Pokemon.filter((pokemon,pokemonIndex)=>{
        // if the pokemon name includes the current search value, return true
        if(pokemon.toLowerCase().includes(searchedPokemon.toLowerCase())) {return true};    // .includes() Returns true if searchString appears as a substring of the result of converting this object to a String
        // otherwise, exclude value from the array
        return false;
    })

    return (
        <nav className={(!showSideMenu ? "open" : "")}>
            <div className={"header" + (!showSideMenu ? "open" : "")}> 
                <h1 className="text-gradient">Pokedex</h1>
                <button onClick={handleCloseMenu} className="open-nav-button">
                    <i className="fa-solid fa-arrow-left-long"></i>
                </button>
            </div>

            <input value={searchedPokemon} onChange={(e)=>{
                setSearchedPokemonValue(e.target.value)
            }} placeholder="Search pokemon..."/>

            {searchFilteredPokemon.map((pokemon, pokemonIndex) => {
                const truePokedexNumber = first151Pokemon.indexOf(pokemon)
                {/* filtered pokemon index differ as filtered pokemon index starts from 0 and searched pokemon for eg. index of 32 will get index 1 so, find trueIndex of pokemon first before displaying  */}
                return (
                    <button onClick={()=>{
                        setSelectedPokemon(truePokedexNumber);      // note to apply truePokedexNumber else will display bulbasor 001 or else wrong pokemon
                        handleCloseMenu();          // Close the side menu when in mobile device
                    }} key={pokemonIndex} className={"nav-card" + 
                            (pokemonIndex === selectedPokemon ? " nav-card-selected" : " ")}>

                        <p>{getFullPokedexNumber(truePokedexNumber)}</p>        
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}