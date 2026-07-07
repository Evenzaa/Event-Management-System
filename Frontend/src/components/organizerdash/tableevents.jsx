export default function TableEvent({children}){

    const thlist=[
        {id:1, content:"event"},
        {id:2, content:"Category"},
        {id:3, content:"Date"},
        {id:4, content:"Price"},
        {id:5, content:"Available Seats"},
        {id:6, content:"Status"},
        {id:7, content:"Actions"},
        {id:7, content:"Actions"},
        {id:7, content:"Actions"},
        {id:7, content:"Actions"},

    ]

    return(
        <div className="w-full overflow-x-auto">
            <table
                className="
                    w-full
                    border-collapse
                    border
                    border-zinc-300"
            >
                <thead>
                    <tr>
                        {
                            thlist.map((th)=>(
                                <th
                                    key={th.id}
                                    className="
                                    border 
                                    border-zinc-300 
                                    p-3 
                                    bg-[#F8F7FF]
                                    text-left
                                    text-md font-semibold text-[#0F0A1E]                   
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