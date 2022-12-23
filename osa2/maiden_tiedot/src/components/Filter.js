const Filter = ({handleFilterChange, newSearch}) => {

    return (
        <form>
            <div>
            Find countries: <input value={newSearch}
            onChange = {handleFilterChange}
            />
            </div>
        </form>
    )
}

export default Filter