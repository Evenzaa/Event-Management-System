export default function TableRecentEvent({children}){

    const thlist=[
        {id:1, content:"event"},
        {id:2, content:"Category"},
        {id:3, content:"Date"},
        {id:4, content:"Price"},
        {id:5, content:"Available Seats"},
        {id:6, content:"Status"},
        {id:7, content:"Actions"},
    ]

    return(
        <div className="w-full overflow-x-auto">
            <table
                className="
                    min-w-max w-full
                    border-collapse
                    border
                    border-[#E5E7EB]
                   
                    "
            >
                <thead>
                    <tr>
                        {
                            thlist.map((th)=>(
                                <th
                                    key={th.id}
                                    className="
                                   
                                    p-5 
                                    bg-[#F8F7FF]
                                    text-left
                                    text-sm font-medium text-[#0F0A1E]                   
                                     whitespace-nowrap
                                     text-[#1A1033]
                                    
                                    "
                                >
                                   {th.content}
                                </th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                    {children}
                    
                </tbody>

            </table>
        </div>
    )
}