import { TypeAnimation } from "react-type-animation";


const Banner = () => {
    return (
        <div>
            <div className="h-[200px] md:h-[500px] lg:h-[570px] bg-[#fff6ea] relative w-full">
                <div className="h-full lg:w-full opacity-35">

                    <img className="h-full w-full" src="/banner.jpg" alt="" />
                </div>
                <div className="absolute w-[395px] md:w-[725px] left-[4%] top-[20%] md:top-[32%]  lg:w-[1250px] md:left-[3%] lg:left-[10%] space-y-3">
                    <h2 className="text-[20px] md:text-[37px] lg:text-[55px] font-semibold text-center">Transform Your Space with HomeDecor</h2>


                    <p className="lg:text-lg md:text-base text-[10px] font-normal ">
                        <TypeAnimation
                            sequence={[
                                "Discover the perfect blend of style and functionality with HomeDecor. Our curated selection of furniture, decor, and accessories will inspire you to create beautiful, inviting spaces that reflect your unique taste. Whether you're updating a single room or redesigning your entire home, HomeDecor has everything you need to bring your vision to life. Explore our collections and start transforming your space today!"
                            ]}
                            wrapper="span"
                            speed={50}

                            repeat={Infinity}

                        />
                    </p>


                </div>
            </div>

        </div>
    );
};

export default Banner;