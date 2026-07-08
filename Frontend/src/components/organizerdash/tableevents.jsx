export default function TableEvent({children}){

    const thlist=[
        {id:1, content:"event"},
        {id:2, content:"Category"},
        {id:3, content:"Date"},
        {id:4, content:"Price"},
        {id:5, content:"Available Seats"},
        {id:6, content:"Location"},
        {id:7, content:"Capacity"},
        {id:8, content:"Available"},
        {id:9, content:"Featured"},
        {id:10, content:"Actions"},
        {id:11, content:"Status"},
    ]

    return(
        <div className="w-full overflow-x-auto">
            <table
                className="
                    w-full
                    border-collapse
                    border
                    border-[#E5E7EB]"
            >
                <thead>
                    <tr>
                        {
                            thlist.map((th)=>(
                                <th
                                    key={th.id}
                                    className="
                                    border 
                                    border-[#E5E7EB] 
                                    p-3 
                                    bg-[#F8F7FF]
                                    text-left
                                    text-xs font-semibold text-[#0F0A1E]                   
                                     whitespace-nowrap
                                    "
                                >
                                    {th.content}
                                </th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td className="p-3">
                            kkkkkkkkkkkkkkkkk
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
    )
}