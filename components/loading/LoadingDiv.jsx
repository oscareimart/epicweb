const LoadingDiv = () => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div
                    className="spinner-grow spinner-grow-sm text-danger mt-2 mx-1"
                    role="status"
                    style={{ animationDuration: "1.5s", animationDelay: "0.5s" }}
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div
                    className="spinner-grow text-danger mt-1 mx-1"
                    role="status"
                    style={{ width: "1.5rem", height: "1.5rem", animationDuration: "1.5s", animationDelay: "1.1s" }}
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div
                    className="spinner-grow spinner-grow-lg text-danger"
                    role="status"
                    style={{ animationDuration: "1.5s", animationDelay: "1.4s" }}
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    )
}

export default LoadingDiv