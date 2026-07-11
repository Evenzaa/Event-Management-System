import { FilterFilled, FilterOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";


export default function SearchEvent({
    runsearch,
    runStatus,
}) {
    const handleChange = value => {
    console.log(`selected ${value}`);
 

};
    const { Search } = Input ;
    const onSearch = (value) => runsearch(value)
    
  
    return(
        <>
            <div className="flex  gap-20 mb-8">

                <Search
                    placeholder="Seach Event By Title..."
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={runsearch}
                    className="event-search"
                    onChange={(event)=>runsearch(event.target.value)}
                />

                <div className="flex gap-2">
                    <FilterOutlined style={{fontSize:"25px" ,color:"gray"}} />
                    {/* <Select
                        defaultValue="All status"
                        style={{ width: 150 ,textAlign:"center",fontSize:"17px" ,fontWeight:"480"}}
                        onChange={handleChange}
                        options={[
                            { value: 'pending', label: 'Pending' },
                            { value: 'approved', label: 'Approved' },
                            { value: 'ongoing', label: 'Ongoing'},
                            { value: 'completed', label: 'Completed' },
                        ]}
                    /> */}
                    <Select
                        defaultValue=""
                        style={{ width: 150 }}
                        onChange={runStatus}
                        options={[
                            { value: "", label: "All Status" },
                            { value: "pending", label: "Pending" },
                            { value: "approved", label: "Approved" },
                            { value: "ongoing", label: "Ongoing" },
                            { value: "completed", label: "Completed" },
                        ]}
                    />

                </div>
                

            </div>
        </>
    )
}