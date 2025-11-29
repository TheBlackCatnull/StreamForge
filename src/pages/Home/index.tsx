import { AspectRatio } from 'radix-ui'
import { useEffect } from 'react'
import Layout from '@/components/Layout'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

function App() {
  useEffect(() => {
    // console.log(window.electronAPI)
  }, [])
  return (
    <>
      <Layout>
        <div
          className="p-4 text-center flex justify-center app-drag"
        >
          <Carousel className="w-[400px] rounded-md app-no-drag mt-10">
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>

                  <div className="w-[400px] overflow-hidden  shadow-[0_2px_10px] shadow-blackA4">
                    <AspectRatio.Root ratio={16 / 9}>
                      <img
                        className="size-full object-cover"
                        src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
                        alt="Landscape photograph by Tobias Tullius"
                      />
                    </AspectRatio.Root>
                  </div>

                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="app-no-drag" />
            <CarouselNext className="app-no-drag" />
          </Carousel>

        </div>
      </Layout>

    </>
  )
}

export default App
