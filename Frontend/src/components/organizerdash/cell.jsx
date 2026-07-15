export default function Cell({ui,children}){
    return(
        <>
            <td className={`${ui}  whitespace-nowrap  text-[#1A1033] `}>
                {children}

            </td>
        </>
    )
}