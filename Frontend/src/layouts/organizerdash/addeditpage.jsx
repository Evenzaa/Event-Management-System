import { PlusOutlined } from "@ant-design/icons";
import { Modal, Form, Input, Steps, Button,Select, Upload,Image, message,DatePicker} from "antd";
import { useEffect, useState } from "react";
import { useCreateEventsMutation, useLazyGetEventsbyIdQuery, useUpdateEventsMutation } from "../../services/organizerEventApi";
import dayjs from "dayjs";
import { useUploadImgMutation } from "../../services/organizerImgApi";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default function AddEditPage({show,changeShow,mode,eventId}){

    const [form] = Form.useForm();
    const [getEventsbyId]=useLazyGetEventsbyIdQuery()
    const[createEvent]=useCreateEventsMutation()
    const[editEvent]=useUpdateEventsMutation()
    const [uploadImg] = useUploadImgMutation();
    const domainname=import.meta.env.VITE_API_BASE_URL
    console.log(domainname);
    useEffect(()=>{
        const eventinfo=async()=>{
            if(mode==='edit'){
                try{
                    const res=await getEventsbyId(eventId).unwrap()
                    console.log(res)
                    form.setFieldsValue({
                        title:res.data.title,
                        description:res.data.description,
                        date: dayjs(res.data.date),
                        location:res.data.location,
                        price:res.data.price,
                        capacity:res.data.capacity,
                        availableSeats:res.data.availableSeats,
                        images:res.data.images,
                        category:res.data.category,
                        tags:res.data.tags,
                    })
                    setFileList(
                        res.data.images.map((url, index) => ({
                            uid: `-${index}`,
                            name: `image-${index}.png`,
                            status: "done",
                            url,
                        }))
                    );
                }
                catch(error){
                    console.log(error)
                }
        }
        else {
                form.resetFields();
                setFileList([]);
                setCurrentStep(0);
            }
    }
        eventinfo()
    },[show, mode, eventId])

    const [currentStep, setCurrentStep] = useState(0);
    const steps = [
        { title: "Event Information" },
        { title: "Category & Tags" },
        { title: "Price & Capacity & Available Seats & date "},
        { title: "Location & Images" },
    ];
    const stepFields = [
        ["title", "description"],
        ["category", "tags"],
        ["price", "capacity", "availableSeats", "date"],
        ["location", "images"],
    ];
    const next = async () => {
        try {
            await form.validateFields(stepFields[currentStep]);

            if (currentStep === 3 && fileList.length === 0) {
                message.error("Please upload at least one image");
            return;
            }

            setCurrentStep(currentStep + 1);
        } catch (error) {
            console.log(error)
        }
     };

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([])

         const handlePreview = async file => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
   
       
           
             const onFinish = async (values) => {

                console.log("tags:", values.tags);
                console.log("form:", form.getFieldsValue());
           console.log("fileList",fileList);

                    console.log(values);

                    const data = {
                        ...values,
                        images: fileList.map(file => file.response?.url || file.url),
                    };

                    if (data.date) {
                        if (dayjs.isDayjs(data.date)) {
                            data.date = data.date.toISOString();
                        };
                    }

                    console.log(data);

                try {
                    if (mode === "create") {
                        console.log(data);
                        console.log(JSON.stringify(data));      
                        const res = await createEvent(data).unwrap();
                        console.log(res);
                        
                        // refetch()
                        form.resetFields();
                        setFileList([]);
                        setCurrentStep(0);
                        changeShow();
                    } else {
                        const res = await editEvent({
                            id: eventId,
                            payload: data,
                        }).unwrap();

                        console.log(res);
                        
                        // refetch()
                        form.resetFields();
                        setFileList([]);
                        setCurrentStep(0);
                        changeShow();

                    }
                } catch (e) {
                    console.log(e);
                }
            };


        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };


        const title= mode=== "create" ? "Create Event" : "Edit Event"

       

   
    return(
        <>
            <div>
             
            
                <Modal
                    // form={form}
                    open={show}
                    onCancel={changeShow}
                    onOk={()=>form.submit()}
                    footer={null}
                    width={580}
                    keyboard={false}
                    mask={{closable:false}}
                    // maskClosable={false}
                    

                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                         preserve
                        onFinishFailed={onFinishFailed}
                    >
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold">
                                {title}
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Step {currentStep + 1} of {steps.length}
                            </p>
                        </div>
                        <div className="flex justify-between mb-10">

                            {steps.map((step, index) => (

                                <div
                                    key={index}
                                    className="flex-1 mr-3"
                                >

                                    <div
                                        className={`h-1 rounded-full ${
                                            index <= currentStep
                                                ? "bg-blue-600"
                                                : "bg-gray-200"
                                        }`}
                                    />

                                    <p
                                        className={`mt-3 text-xs ${
                                            index === currentStep
                                                ? "text-blue-600 font-semibold"
                                                : "text-gray-400"
                                        }`}
                                    >
                                        {step.title}
                                    </p>

                                </div>

                            ))}

                        </div>
                        <div style={{ display: currentStep === 0 ? "block" : "none" }}>
                                <>
                                    <div>
                                        <span className="block mb-2 text-[15px] font-semibold">Event Title</span>
                                        <Form.Item
                                            name="title"
                                            rules={[{ required: true, message: "Please enter title" }]}
                                        >
                                            <Input
                                                placeholder="e.g., Tech Conference"
                                                className="!h-12 !rounded-xl placeholder:font-semibold"
                                            />
                                        </Form.Item>
                                    </div>

                                    <div>
                                        <span className="block mb-2 text-[15px] font-semibold">Description</span>
                                        <Form.Item
                                            name="description"
                                            rules={[{ required: true , message: "Please enter your description" }]}
                                        >
                                            <Input.TextArea
                                                placeholder="Describe Your Event..."
                                                rows={5}
                                                className="!rounded-xl placeholder:font-semibold pt-2"
                                            />
                                        </Form.Item>
                                    </div>
                                </>
                        </div>
                        <div style={{ display: currentStep === 1 ? "block" : "none" }}>
                            
                                <>
                                    <span className="block mb-2 text-[15px] font-semibold">Category</span>

                                    <Form.Item
                                        name="category"
                                        rules={[{ required: true, message: "Please enter a category" }]}
                                    >
                                        <Input
                                                placeholder="e.g., Technology"
                                                className="!h-11 !rounded-xl placeholder:font-semibold"
                                            />
                                    </Form.Item>

                                    <span className="block mb-2 font-medium">Tags</span>

                                    <Form.Item name="tags"
                                        rules={[
                                            {
                                            required: true,
                                            message: "Please enter at least one tag",
                                            },
                                    ]}>
                                        <Select
                                            mode="tags"
                                            size="large"
                                            placeholder="Add a tag and press Enter"
                                            open={false}
                                            tokenSeparators={[","]}
                                            className="w-full"
                                            rootClassName="event-tags"
                                        />
                                    </Form.Item>
                                </>
                            
                        </div>
                        <div style={{ display: currentStep === 2 ? "block" : "none" }}>
                            <>
                                <div>
                                    <span className="block mb-2 text-[15px] font-semibold">Price</span>
                                    <Form.Item name="price"  rules={[{ required: true , message: "Please enter price"}]}>
                                        <Input placeholder="e.g., 200 $"   className="!h-12 !rounded-xl placeholder:font-semibold"/>
                                    </Form.Item>
                                </div>
                                
                                <div className="flex justify-between ">
                                    <div>
                                        <span className="block mb-2 text-[15px] font-semibold">Capacity</span>
                                        <Form.Item name="capacity"  rules={[{ required: true , message: "Please enter your capacity"}]}>
                                            <Input placeholder="e.g., 200 "   className="!h-12 !w-[250px] !rounded-xl placeholder:font-semibold"/>
                                        </Form.Item>
                                    </div>

                                    <div>
                                        <span className="block mb-2 text-[15px] font-semibold">Available Seats</span>
                                        <Form.Item name="availableSeats"  rules={[{ required: true , message: "Please enter Available Seats"}]}>
                                            <Input placeholder="e.g., 100 "  className="!h-12 !w-[250px]  !rounded-xl placeholder:font-semibold" />
                                        </Form.Item>
                                    </div>

                                </div>

                                <div>
                                    <span className="block mb-2 text-[15px] font-semibold">Date</span>
                                    <Form.Item
                                        name="date"
                                        rules={[
                                            {
                                            required: true,
                                            message: "Please select date and time",
                                            },
                                        ]}
                                        >
                                        <DatePicker
                                            showTime={{
                                            use12Hours: true,
                                            format: "hh:mm A",
                                            }}
                                            format="YYYY-MM-DD hh:mm A"
                                            className="!h-12 !w-full !rounded-xl"
                                            placeholder="Select date & time"
                                        />
                                    </Form.Item>
                                </div>

                            </>
                        
                        </div>
                        <div style={{ display: currentStep === 3 ? "block" : "none" }}>

                            <>
                                        <div>
                                            <span className="block mb-2 text-[15px] font-semibold">Location</span>
                                            <Form.Item
                                                name="location"
                                                rules={[{ required: true , message: "Please enter your location"}]}
                                            >
                                                <Input placeholder="Cairo"   className="!h-12 !rounded-xl placeholder:font-semibold" />
                                            </Form.Item>
                                        </div>
                                    <Form.Item name="images"
                                        // rules={[{ required: true , message: "Please upload at least one img"}]}
                                        >
                                        <Upload
                                            listType="picture-card"
                                            fileList={fileList}
                                            onPreview={handlePreview}
                                            onChange={handleChange}
                                            customRequest={async ({ file, onSuccess, onError }) => {
                                                try {
                                                    const formData = new FormData();
                                                    formData.append("image", file);

                                                    const res = await uploadImg({ payload: formData }).unwrap();

                                                    onSuccess(res);
                                                } catch (err) {
                                                    console.error(err);
                                                    onError(err);
                                                }
                                            }}
                                            >
                                            {fileList.length >= 8 ? null : uploadButton}
                                        </Upload>
                                        {previewImage && (
                                            <Image
                                                styles={{ root: { display: 'none' } }}
                                                preview={{
                                                    open: previewOpen,
                                                    onOpenChange: visible => setPreviewOpen(visible),
                                                    afterOpenChange: visible => !visible && setPreviewImage(''),
                                                }}
                                                src={previewImage}
                                            />
                                        )}
                                    
                                </Form.Item>
                                
                            </>
                        </div>

                        <div className="flex justify-between mt-8">

                            <Button
                                disabled={currentStep === 0}
                                onClick={() => setCurrentStep(currentStep - 1)}
                                 className="!h-9 !px-7 !rounded-lg !text-lg"

                            >
                                Back
                            </Button>

                            {
                                currentStep === steps.length - 1 ?

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                 className="!h-9 !px-7 !rounded-lg !text-lg"

                                >
                                    Create Event
                                </Button>

                                :

                                <Button
                                    type="primary"
                                    onClick={next}
                                    className="!h-9 !px-7 !rounded-lg !text-lg"
                                >
                                    Next
                                </Button>

                            }

                        </div>
                    </Form>
                                    
                </Modal>

            </div>
           
        </>
    )

}