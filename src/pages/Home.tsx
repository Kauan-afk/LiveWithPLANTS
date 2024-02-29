import { usePlants } from "@/hooks/usePlants"
import { useEffect, useState } from "react"

import '../../app/globals.css'

import { CiSearch } from "react-icons/ci";
import { RiPlantFill } from "react-icons/ri";

import { PiUsersThree, PiPlant, PiCompass  } from "react-icons/pi";
import { IoWaterOutline } from "react-icons/io5";

import { Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { FaInstagram } from "react-icons/fa";
import { AiOutlineFacebook } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { SiTiktok } from "react-icons/si";

interface plantsProps{
  id: number,
  common_name: string,
  image_url: string,
  scientific_name: string,
  year: number,
  family_common_name: string,
  family: string
}

export function Home(){
  const [plants, setPlants] = useState<plantsProps[]>([])
  const [currentPlant, setCurrentPlant] = useState<plantsProps>()
  const [ediblePlants, setEdiblePlants] = useState<plantsProps[]>([])
  const [redFlowers, setRedFlowers] = useState<plantsProps[]>([])
  const [yellowFlowers, setYellowFlowers] = useState<plantsProps[]>([])


  const api = usePlants()

  useEffect(()=>{
    async function getPlants(){
      const data = await api.getplants()
      if(data){
        setPlants(data.plants)
      }
    }
    async function getEdiblePlants(){
      const data = await api.getEdiblePlants()
      if(data){
        setEdiblePlants(data.plants)
      }
    }
    async function getRedFlowes(){
      const data = await api.getRedFlowers()
      if(data){
        setRedFlowers(data.plants)
      }
    }
    async function getYellowFlowers(){
      const data = await api.getYellowFlowers()
      if(data){
        setYellowFlowers(data.plants)
      }
    }
    getYellowFlowers()
    getRedFlowes()
    getEdiblePlants()
    getPlants()
  }, [])

  
 

  return (
    <div className="m-0 p-0 font-poppins text-mainTextColor bg-mainBgColor min-h-screen text-mainTextColor">
      <div className="px-10 py-7 flex justify-between border-b border-slate-400 ">
        <h1 className="font-semibold text-3xl flex"><p className="text-mainContrastColor"><RiPlantFill/></p>LiveWith <p className="text-mainContrastColor">PLANTS</p></h1>
        <div className="flex items-center gap-10">
          <button className="border-solid border rounded-full w-9 h-9 justify-center items-center flex text-2xl border-slate-400 hover:border-mainContrastColor transition-all duration-300"><CiSearch/></button>
          <button className="border-solid border border-slate-400 rounded-md p-1 hover:border-mainContrastColor transition-all duration-300">Sign In</button>
        </div>
      </div>
      <div className="min-h-aside flex ">
        <div className="border-slate-400 sticky top-0  border-r h-screen min-w-20 text-4xl flex flex-col justify-center items-center gap-10">
          <p className="bg-mainTextColor text-mainBgColor rounded-md cursor-pointer hover:border-mainContrastColor transition-all duration-300 border"><PiCompass /></p>
          <p className="rounded-md cursor-pointer hover:border-mainContrastColor transition-all duration-300 border"><PiPlant/></p>
          <p className="rounded-md cursor-pointer hover:border-mainContrastColor transition-all duration-300 border"><IoWaterOutline/></p>
          <p className="rounded-md cursor-pointer hover:border-mainContrastColor transition-all duration-300 border"><PiUsersThree/></p>
        </div>
        <div className="p-16">
          <h1 className="font-semibold text-5xl">Discorver <b className="text-mainContrastColor">plants</b></h1>

          <div className="mt-10 flex gap-10">
            <Carousel className="w-caroussel" opts={{
              dragFree: true
            }}>
              <CarouselContent className="flex gap-5 shadow-sm">
                {Array.isArray(plants)?
                  plants.map(plant => {
                    return(
                      <Drawer key={plant.id}>
                        <DrawerTrigger onClick={()=>{
                          setCurrentPlant(plant)
                          }}>
                          <CarouselItem className="basis-1/6 flex items-center justify-center h-60">
                            <div className="bg-white h-36 w-36 rounded-md shadow-md border border-solid hover:border-mainContrastColor transition-all duration-300 cursor-pointer hover:brightness-75">
                              <img className="w-full h-full object-cover rounded-md" src={plant.image_url} alt="" />
                            </div>
                          </CarouselItem>
                        </DrawerTrigger>
                        <DrawerContent className="text-mainTextColor">
                          <DrawerHeader>
                            
                          </DrawerHeader>
                          <div className="flex justify-center gap-10">
                            <img className="w-72 h-72 object-cover rounded-md" src={currentPlant?.image_url} alt="" />
                            <div>
                              <h1 className="font-semibold text-6xl">{currentPlant?.common_name}</h1>
                              <p className="mt-5">Scientific name: {currentPlant?.scientific_name}</p>

                              <div>
                                <p>Family: {currentPlant?.family}</p>
                                <p>Family common name: {currentPlant?.family_common_name}</p>
                                <p>Year: {currentPlant?.year}</p>
                              </div>
                            </div>
                          </div>
                          <DrawerFooter>
                            <div className="flex justify-center mt-5">
                              <button className="border rounded-md py-1 px-10 w-56 hover:border-mainContrastColor transition-all duration-300">Add to My Plants</button>
                            </div>
                            <DrawerClose >
                              <button className="bg-gray-300 border rounded-md py-1 px-10 w-56 transition-all duration-300 hover:brightness-90">Cancel</button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    )
                  })
                :null}
              </CarouselContent>
            </Carousel>
            
          </div>
          <div className="mt-7">
            <h1 className="font-semibold text-4xl ">With red flowers</h1>
            <Carousel className="w-caroussel" opts={{
              dragFree: true
            }}>
              <CarouselContent className="flex gap-5 shadow-sm">
                {Array.isArray(redFlowers)?
                  redFlowers.map(plant => {
                    return(
                      <Drawer key={plant.id}>
                        <DrawerTrigger onClick={()=>{
                          setCurrentPlant(plant)
                          }}>
                          <CarouselItem className="basis-1/6 flex items-center justify-center h-60">
                            <div className="bg-white h-36 w-36 rounded-md shadow-md border border-solid hover:border-mainContrastColor transition-all duration-300 cursor-pointer hover:brightness-75">
                              <img className="w-full h-full object-cover rounded-md" src={plant.image_url} alt="" />
                            </div>
                          </CarouselItem>
                        </DrawerTrigger>
                        <DrawerContent className="text-mainTextColor">
                          <DrawerHeader>
                            
                          </DrawerHeader>
                          <div className="flex justify-center gap-10">
                            <img className="w-72 h-72 object-cover rounded-md" src={currentPlant?.image_url} alt="" />
                            <div>
                              <h1 className="font-semibold text-6xl">{currentPlant?.common_name}</h1>
                              <p className="mt-5">Scientific name: {currentPlant?.scientific_name}</p>

                              <div>
                                <p>Family: {currentPlant?.family}</p>
                                <p>Family common name: {currentPlant?.family_common_name}</p>
                                <p>Year: {currentPlant?.year}</p>
                              </div>
                            </div>
                          </div>
                          <DrawerFooter>
                            <div className="flex justify-center mt-5">
                              <button className="border rounded-md py-1 px-10 w-56 hover:border-mainContrastColor transition-all duration-300">Add to My Plants</button>
                            </div>
                            <DrawerClose >
                              <button className="bg-gray-300 border rounded-md py-1 px-10 w-56 transition-all duration-300 hover:brightness-90">Cancel</button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    )
                  })
                :null}
              </CarouselContent>
            </Carousel>
          </div>
          

          <div className="mt-7">
            <h1 className="font-semibold text-4xl ">Edible</h1>
            <Carousel className="w-caroussel" opts={{
              dragFree: true
            }}>
              <CarouselContent className="flex gap-5 shadow-sm">
                {Array.isArray(ediblePlants)?
                  ediblePlants.map(plant => {
                    return(
                      <Drawer key={plant.id}>
                        <DrawerTrigger onClick={()=>{
                          setCurrentPlant(plant)
                          }}>
                          <CarouselItem className="basis-1/6 flex items-center justify-center h-60">
                            <div className="bg-white h-36 w-36 rounded-md shadow-md border border-solid hover:border-mainContrastColor transition-all duration-300 cursor-pointer hover:brightness-75">
                              <img className="w-full h-full object-cover rounded-md" src={plant.image_url} alt="" />
                            </div>
                          </CarouselItem>
                        </DrawerTrigger>
                        <DrawerContent className="text-mainTextColor">
                          <DrawerHeader>
                            
                          </DrawerHeader>
                          <div className="flex justify-center gap-10">
                            <img className="w-72 h-72 object-cover rounded-md" src={currentPlant?.image_url} alt="" />
                            <div>
                              <h1 className="font-semibold text-6xl">{currentPlant?.common_name}</h1>
                              <p className="mt-5">Scientific name: {currentPlant?.scientific_name}</p>

                              <div>
                                <p>Family: {currentPlant?.family}</p>
                                <p>Family common name: {currentPlant?.family_common_name}</p>
                                <p>Year: {currentPlant?.year}</p>
                              </div>
                            </div>
                          </div>
                          <DrawerFooter>
                            <div className="flex justify-center mt-5">
                              <button className="border rounded-md py-1 px-10 w-56 hover:border-mainContrastColor transition-all duration-300">Add to My Plants</button>
                            </div>
                            <DrawerClose >
                              <button className="bg-gray-300 border rounded-md py-1 px-10 w-56 transition-all duration-300 hover:brightness-90">Cancel</button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    )
                  })
                :null}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="mt-7">
            <h1 className="font-semibold text-4xl ">With yellow flowers</h1>
            <Carousel className="w-caroussel" opts={{
              dragFree: true
            }}>
              <CarouselContent className="flex gap-5 shadow-sm">
                {Array.isArray(yellowFlowers)?
                  yellowFlowers.map(plant => {
                    return(
                      <Drawer key={plant.id}>
                        <DrawerTrigger onClick={()=>{
                          setCurrentPlant(plant)
                          }}>
                          <CarouselItem className="basis-1/6 flex items-center justify-center h-60">
                            <div className="bg-white h-36 w-36 rounded-md shadow-md border border-solid hover:border-mainContrastColor transition-all duration-300 cursor-pointer hover:brightness-75">
                              <img className="w-full h-full object-cover rounded-md" src={plant.image_url} alt="" />
                            </div>
                          </CarouselItem>
                        </DrawerTrigger>
                        <DrawerContent className="text-mainTextColor">
                          <DrawerHeader>
                            
                          </DrawerHeader>
                          <div className="flex justify-center gap-10">
                            <img className="w-72 h-72 object-cover rounded-md" src={currentPlant?.image_url} alt="" />
                            <div>
                              <h1 className="font-semibold text-6xl">{currentPlant?.common_name}</h1>
                              <p className="mt-5">Scientific name: {currentPlant?.scientific_name}</p>

                              <div>
                                <p>Family: {currentPlant?.family}</p>
                                <p>Family common name: {currentPlant?.family_common_name}</p>
                                <p>Year: {currentPlant?.year}</p>
                              </div>
                            </div>
                          </div>
                          <DrawerFooter>
                            <div className="flex justify-center mt-5">
                              <button className="border rounded-md py-1 px-10 w-56 hover:border-mainContrastColor transition-all duration-300">Add to My Plants</button>
                            </div>
                            <DrawerClose >
                              <button className="bg-gray-300 border rounded-md py-1 px-10 w-56 transition-all duration-300 hover:brightness-90">Cancel</button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    )
                  })
                :null}
              </CarouselContent>
            </Carousel>
          </div>
          

          <div className="flex items-center mt-36 flex-col">
            <h1 className="font-semibold text-3xl">Follow us on our social networks</h1>
            <div className="flex gap-5 text-3xl mt-4">
              <p className="hover:text-mainContrastColor transition-all ease-in-out duration-300 cursor-pointer"><FaInstagram/></p>
              <p className="hover:text-mainContrastColor transition-all ease-in-out duration-300 cursor-pointer"><AiOutlineFacebook/></p>
              <p className="hover:text-mainContrastColor transition-all ease-in-out duration-300 cursor-pointer"><FaXTwitter/></p>
              <p className="hover:text-mainContrastColor transition-all ease-in-out duration-300 cursor-pointer"><SiTiktok/></p>
            </div>

            <p className="text-gray-500 mt-14">LiveWithPlants © LiveWith - {new Date().getFullYear()}</p>
          </div>
          
        </div>
        
      </div>
    </div>
  )
}