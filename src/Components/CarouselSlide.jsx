function CarouselSlide({image, title, description, slideNumber, totalSlides,setSlide,slide}) {
    function fun( c){
        let num=slide+c;
        if(num<0)num=totalSlides-1;
        if(num==totalSlides)num=0;
      setSlide(num);
    }
    return (<>  
                <div className=" relative flex w-[60vw]   m-auto flex-col justify-center items-center gap-8">
                    <button onClick={()=>fun(-1)} className="absolute items-center h-10 sm:w-10 left-0 top-[200px] text-2xl  sm:bg-richblack-900 rounded-full ">❮</button>
                    <button onClick={()=>fun(1)} className="absolute items-center sm:w-10 h-10 right-0 top-[200px] text-2xl sm:bg-richblack-900 rounded-full">❯</button>
                  <div  className="w-[200px] h-[200px] border rounded-full overflow-hidden">
                    <img src={image} alt=""  className="border-0 w-[200px] h-[200px] rounded-full"/>
                  </div>
                  <div className="w-100 items-center m-auto text-xl text-gray-200">
                      {description}
                  </div>
                  <h3 className="text-2xl font-semibold items-center">{title}</h3>
                </div>
                </>
    );
}

export default CarouselSlide;