const HeaderMedia = () => {
    return (
        <>
            <div className="content_media pt-5">
                <video
                    src="https://admin.epicbolivia.travel/uploads/video_epic_resumen_1_1_d1c53122b4.mp4"
                    autoPlay
                    loop
                    muted
                    className="style_video"
                // poster="" add png o jpg of video, most performance
                />
            </div>
        </>
    )
}

export default HeaderMedia