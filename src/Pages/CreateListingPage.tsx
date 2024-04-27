import Dragger from 'antd/es/upload/Dragger';
import AddHomeMarker from '../Components/AddHomeMarker';
import { InboxOutlined } from '@ant-design/icons';

function CreateListingPage()
{
    const keyFeatures =[{
        name: "Fiber Internet",
        isAvailable: false
    },
    {
        name: "Air Conditioner",
        isAvailable: false
    },
    {
        name: "Floor Heating",
        isAvailable: false
    },
    {
        name: "Fireplace",
        isAvailable: false
    },
    {
        name: "Terrace",
        isAvailable: false
    },
    {
        name: "Satellite",
        isAvailable: false
    },
    {
        name: "Parquet",
        isAvailable: false
    },
    {
        name: "Steel Door",
        isAvailable: false
    },
    {
        name: "Furnished",
        isAvailable: false
    },
    {
        name: "Insulation",
        isAvailable: false
    }
    ];

    return (
        <div className="min-w-screen min-h-screen place-items-center flex sm:flex-row flex-col p-4 bg-backColor space-y-4 gap-4">
            <div className="flex justify-center items-center flex-col sm:mx-auto sm:w-full sm:max-w-sm gap-4">
            <Dragger
                name="file"
                multiple={true}
                listType="picture"
                className="w-full bg-gray-300 text-white rounded-md"
            >
                <p className="ant-upload-drag-icon text-button-primary">
                <InboxOutlined className='text-white'/>
                </p>
                <p className="ant-upload-text">Click or drag photo(s) to this area to upload</p>
                <p className="ant-upload-hint">Upload a photo of the house.</p>
            </Dragger>
                <AddHomeMarker />
            </div>

            <div className="mx-auto w-full max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label className="block text-sm font-medium ">Title</label>
                        <input id="name" name="name" type="text" autoComplete="name" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Address</label>
                        <input id="address" name="address" type="text" autoComplete="address" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Price</label>
                        <input id="price" name="price" type="number" autoComplete="price" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Description</label>
                        <textarea id="description" name="description" required className="mt-2 block w-full rounded-md max-h-screen py-1.5 px-2 shadow-sm focus:outline-button-primary"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Key Features</label>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {
                                keyFeatures.map((feature, index) => {
                                    return (
                                        <div key={index} className="flex items-center">
                                            <input id={feature.name} name={feature.name} type="checkbox" className="w-4 h-4 text-button-primary rounded focus:ring-0 accent-button-primary" onChange={(e) => keyFeatures[index].isAvailable = e.target.checked}/>
                                            <label htmlFor={feature.name} className="ml-2 text-sm">{feature.name}</label>
                                        </div>
                                    );
                                })
                            }
                        </div>

                    </div>
                    <input type="submit" className="flex w-full justify-center rounded-md bg-button-primary py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover" value="Add House" onClick={()=>{}}/>
                </form>
                <div className="mt-3 flex flex-row items-center justify-between">
                    <label>Return to the main page?</label>
                    <button className="font-semibold text-button-primary hover:text-button-primaryHover" onClick={() => window.location.href = '/'}>Main page</button>
                </div>
            </div>
        </div>
    );
  
}

export default CreateListingPage;