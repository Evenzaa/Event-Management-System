export default function ButtonDash({icon,content,ui,onClick}){
    return(
        <>
            <button 
                className={`${ui} py-2 px-5  rounded-md cursor-pointer w-full sm:w-auto flex items-center justify-center`}
                onClick={onClick}
            >
                        {icon}
                        {content}
            </button>
        </>
    )
}