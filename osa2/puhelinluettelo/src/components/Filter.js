const Filter = ({handleFilterChange, newSearch}) => {

    return (
        <form>
            <div>
            name: <input value={newSearch}
            onChange = {handleFilterChange}
            />
            </div>
        </form>
    )
}

export default Filter