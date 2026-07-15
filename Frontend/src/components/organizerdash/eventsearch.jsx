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
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-20 mb-8">
                <div className="flex-1">
                    <Search
                        placeholder="Seach Event By Title..."
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={runsearch}
                        className="event-search w-full"
                        onChange={(event)=>runsearch(event.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <FilterOutlined style={{fontSize:"25px" ,color:"gray"}} />
                    <Select
                        defaultValue=""
                        className="w-full lg:w-[150px]"
                        size="large"

                        // style={{ width: 150 }}
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