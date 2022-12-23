import Country from "./Country"

const Countries = ({countriesToShow, search}) => {
    if (search === '')
        return (
            <p>type something to find a country</p>
        )
    else if (countriesToShow.length === 0)
        return (
            <p>no countries found</p>
        )
    else if (countriesToShow.length > 10)
        return (
        <p>Too many matches, specify another filter</p>
        )
    else if (countriesToShow.length > 1)
        return (
            <ul>
                {countriesToShow.map((country) => 
                <li key={country.name.common}>
                {country.name.common} 
                <button>
                show
                </button>
                </li>
                )}
            </ul>
        )
    else
        return (
            <div>
                <Country country = {countriesToShow[0]}/>
            </div>
        )
}

export default Countries