const LoadingMain = () => {
    return (
        <>
            <div
                id="loader"
                className="justify-content-center"
                style={{
                    opacity: "0.5",
                    width: "100%",
                    height: "100%"
                }}
            >
                <div className="app-loader">
                    <span
                        className="spinner-border text-danger"
                        style={{ width: "3rem", height: "3rem" }}
                        role="status"
                    ></span>
                </div>
            </div>
        </>
    )
}

export default LoadingMain