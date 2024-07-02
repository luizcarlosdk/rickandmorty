import Characters from "./components/Characters"

const Homepage = () => {
    const title = "Rick and Morty Characters"

    return (
        <div className="content">
            <h1>{title}</h1>
            <Characters/>
        </div>
    )
}

export default Homepage