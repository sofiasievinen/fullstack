const Languages = ({languages}) => {
    const list = Object.values(languages)
    return (
        <div>
            <h4>languages:</h4>
            <ul>
                {list.map((language) => 
                <li key={language}>
                {language}
                </li>
                )}
            </ul>
        </div>
    )
}

export default Languages