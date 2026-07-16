export default function TableRecentEvent({children}){

    const thlist=[
        {id:1, content:"Event"},
        {id:2, content:"Category"},
        {id:3, content:"Date"},
        {id:4, content:"Location"},
        {id:5, content:"Status"},
        {id:6, content:"Actions"},
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
                                   
                                    p-4
                                    bg-[#F8F7FF]
                                    text-left
                                    text-sm font-medium                   
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