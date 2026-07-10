export default function TableEvent({children}){

    const thlist=[
        {id:1, content:"event"},
        {id:2, content:"Category"},
        {id:3, content:"Date"},
        {id:4, content:"Location"},
        {id:5, content:"Capacity"},
        {id:6, content:"Available Seats"},
        {id:7, content:"Status"},
        {id:8, content:"Actions"},
    ]

    return(
        <div className="w-full overflow-x-auto rounded-lg border border-[#E5E7EB] overflow-hidden">
            <table
                className="
                   min-w-max w-full border-collapse"
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
                                    text-sm font-semibold text-[#0F0A1E]                   
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