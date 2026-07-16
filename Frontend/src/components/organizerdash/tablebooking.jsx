export default function TableBooking({children}){

    const thlist=[
        {id:1, content:"Ticket Number"},
        {id:2, content:"Customer"},
        {id:3, content:"Total Price"},
        {id:4, content:"Payment Status"},
        {id:5, content:"Booking Status"},
        {id:6, content:"Booking Date"},
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