export default function TableTicket({children}){

    const thlist=[
        {id:1, content:"Ticket Type"},
        {id:2, content:"Quantity"},
        {id:3, content:"Price"},
        {id:4, content:"Subtotal"},
    ]

    return(
        <div className="w-full overflow-x-auto rounded-xl">
            <table
                className="
                    min-w-max w-full
                    border-collapse
                   
              
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
                                      text-center
                                    text-sm font-medium                   
                                     whitespace-nowrap
                                     text-[#793EED]
                                    
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