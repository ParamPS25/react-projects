// as export const pokemonTypeColors = {
        // poison: {
        //     color: "#6C6C6C",
        //     background: "#A8A77A"
        // },                           here in props we are getting type eg. poison , so adding style according to its type which we defined in utils

import { pokemonTypeColors } from "../utils"

export function TypeCard(props){
    const {type} = props
    return( 
        <div className="type-tile" 
            style={{
                color:pokemonTypeColors?.[type]?.color
                ,background:pokemonTypeColors?.[type].background
                }}>
            <p>{type}</p>
        </div>
    )
}