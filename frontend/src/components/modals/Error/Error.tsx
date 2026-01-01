import cl from "./Error.module.css"

const Error = () => {
    return (
        <div className={cl.error_container}>
            <h1 className={cl.error_title}>Error</h1>
            <p className={cl.error_message}>Something went wrong,</p>
            <p className={cl.error_message}>please try again later or check your data.</p>
        </div>
    )
}

export default Error;