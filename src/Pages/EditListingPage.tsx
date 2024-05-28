import Dragger from 'antd/es/upload/Dragger';
import AddHomeMarker from '../Components/AddHomeMarker';
import { InboxOutlined } from '@ant-design/icons';
import homes from '../Components/TempHomes';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function EditListingPage()
{
    //get the home id from the url "/editListing/:id"
    const { id } = useParams<{id: string}>();
    //find the home with the given id
    const home = homes.filter((home) => home.id === parseInt(id!))[0];
    if (home === undefined) {
        window.location.href = '/notFound';
    }
    /*
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    console.log(id);
    const home = homes.filter((home) => home.id === parseInt(id))[0];
    */
    

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
                        <input id="name" name="name" type="text" autoComplete="name" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={home?.title} onChange={
                            (e) => {
                                home!.title = e.target.value;
                            }
                        }/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Address</label>
                        <input id="address" name="address" type="text" autoComplete="address" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={home?.coordinates.lat + ", " + home?.coordinates.lng} onChange={
                            (e) => {
                                home!.coordinates.lat = parseFloat(e.target.value.split(",")[0]);
                                home!.coordinates.lng = parseFloat(e.target.value.split(",")[1]);
                            }
                        }/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Price</label>
                        <input id="price" name="price" type="number" autoComplete="price" required className="mt-2 block w-full rounded-md py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={home?.price} onChange={
                            (e) => {
                                home!.price = e.target.value;
                            }
                        }/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Description</label>
                        <textarea id="description" name="description" required className="mt-2 block w-full rounded-md max-h-screen py-1.5 px-2 shadow-sm focus:outline-button-primary" defaultValue={home?.description} onChange={
                            (e) => {
                                home!.description = e.target.value;
                            }
                        }/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium ">Key Features</label>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {
                                home?.keyFeatures && Object.keys(home.keyFeatures).map((key, index) => {
                                    return (
                                        <div key={index} className="flex items-center gap-2">
                                            <input type="checkbox" id={key} name={"keyFeatures"} className="w-4 h-4 text-button-primary rounded focus:ring-0 accent-button-primary" value={index} defaultChecked={
                                                index === 0 ? home!.keyFeatures.fiberInternet :
                                                    index === 1 ? home!.keyFeatures.airConditioner :
                                                        index === 2 ? home!.keyFeatures.floorHeating :
                                                            index === 3 ? home!.keyFeatures.fireplace :
                                                                index === 4 ? home!.keyFeatures.terrace :
                                                                    index === 5 ? home!.keyFeatures.satellite :
                                                                        index === 6 ? home!.keyFeatures.parquet :
                                                                            index === 7 ? home!.keyFeatures.steelDoor :
                                                                                index === 8 ? home!.keyFeatures.furnished :
                                                                                    index === 9 ? home!.keyFeatures.insulation : false
                                            } />
                                            <label htmlFor={key}>
                                                {
                                                    index === 0 ? "Fiber Internet" :
                                                        index === 1 ? "Air Conditioner" :
                                                            index === 2 ? "Floor Heating" :
                                                                index === 3 ? "Fireplace" :
                                                                    index === 4 ? "Terrace" :
                                                                        index === 5 ? "Satellite" :
                                                                            index === 6 ? "Parquet" :
                                                                                index === 7 ? "Steel Door" :
                                                                                    index === 8 ? "Furnished" :
                                                                                        index === 9 ? "Insulation" : ""
                                                }
                                            </label>
                                        </div>
                                    );
                                }
                                )
                            }
                        </div>

                    </div>
                    <input type="submit" className="flex w-full justify-center rounded-md bg-button-primary py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-button-primaryHover" value="Save" onClick={()=>{}}/>
                </form>
                <div className="mt-3 flex flex-row items-center justify-between">
                    <label>Return to the main page?</label>
                    <button className="font-semibold text-button-primary hover:text-button-primaryHover" onClick={() => window.location.href = '/'}>Main page</button>
                </div>
            </div>
        </div>
    );
  
}

export default EditListingPage;