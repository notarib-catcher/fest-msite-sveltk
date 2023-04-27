<script>
	import { onMount } from 'svelte';
    import { browser } from '$app/environment'


    //team photos
    import ASphoto from '../../assets/teamphotos/Ayush.webp'
    import ADphoto from '../../assets/teamphotos/AaryanDPhoto.jpg'
    import DKphoto from '../../assets/teamphotos/DevK.jpg'
    import BBphoto from '../../assets/teamphotos/Biswa.webp'
    import AJphoto from '../../assets/teamphotos/Amartya.webp'
    import VAphoto from '../../assets/teamphotos/Vansh.webp'
    import SDphoto from '../../assets/teamphotos/shrin.webp'
    import VPphoto from '../../assets/teamphotos/vedant.webp'
    import KMphoto from '../../assets/teamphotos/keerthana.webp'
    import AIphoto from '../../assets/teamphotos/Advay.webp'
    import RSphoto from '../../assets/teamphotos/rochak.webp'
    import RRphoto from '../../assets/teamphotos/rituraj.webp'
    import PSphoto from '../../assets/teamphotos/priyanshu.webp'
    import DPphoto from '../../assets/teamphotos/deepthi.webp'

    //Webteam photos
    import KSphoto from '../../assets/teamphotos/kshitij.webp'
    import PKphoto from '../../assets/teamphotos/prakhar.webp'
    import KTphoto from '../../assets/teamphotos/kevin.webp'
    import CVphoto from '../../assets/teamphotos/chandan.webp'
    import AAphoto from '../../assets/teamphotos/astitva.webp'
    import HSphoto from '../../assets/teamphotos/harshit.webp'
    
    
    import Carousel from 'svelte-carousel';

    import CarouselElement from './CarouselElement.svelte'
	import BgAnim from '$lib/common/BGAnim.svelte';

    let carousel
    const handleClick = async () => {
        carousel.goToNext()
    }   

    export const ssr = false
    export const prerender = false
    let itemstoshow = 3



    if(browser){
       
    if(window.innerWidth > 768){
        // @ts-ignore
        if(window.innerWidth > 1000){
            itemstoshow = 3
        }
        else{
            itemstoshow = 2
        }
    }
    else{
        itemstoshow = 1
    }
        window.addEventListener('resize', async () => {
            if(window.innerWidth > 800){
        // @ts-ignore
        if(window.innerWidth > 1200){
            itemstoshow = 3
        }
        else{
            itemstoshow = 2
        }
    }
    else{
        itemstoshow = 1
    }
        })
    }
   

</script>

<div class=" w-screen overflow-hidden  flex flex-col justify-center items-center ">
    <BgAnim />
    <div class="max-md:text-5xl w-full text-center text-6xl pointer-events-none mt-20 max-md:mt-5 px-3 max-md:text-center font-bold bg-gradient-to-tr  from-[#3BACC1] via-[#2D6DB1] to-[#3BACC1] text-transparent bg-clip-text">
        Website Development
    </div>
    <div class="  w-screen pt-5  ">
        {#if browser}
            <Carousel
            autoplayDuration={1000}
            duration={1000}
            timingFunction="ease"
            autoplay
            particlesToShow={itemstoshow}
            particlesToScroll={1}
            arrows={false}
            swiping={false}
            pauseOnFocus>
                <CarouselElement position="Lead Developer" name="Aaryan Dwivedi" photo={ADphoto} linkedinlink="https://www.linkedin.com/in/aaryan-dwivedi-8a238a247/" iglink="https://www.instagram.com/ctoribs/" />
                <CarouselElement position="Backend Developer" name="Kshitij Srivastava" photo={KSphoto} linkedinlink="https://www.linkedin.com/in/kshitij-srivastava-954a00250/" iglink="" />
                <CarouselElement position="UI Designer" name="Prakhar Khurana" photo={PKphoto} linkedinlink="https://www.linkedin.com/in/prakhar-khurana" iglink="https://instagram.com/prakhar._.khurana?igshid=YjNmNGQ3MDY=" />
                <CarouselElement position="Web Developer" name="Chandan CV" photo={CVphoto} linkedinlink="https://www.linkedin.com/in/chandan-cv-3320441b4/" iglink="https://www.instagram.com/ch_and_a_n/" />
                <CarouselElement position="Web Developer" name="Astitva Agarwal" photo={AAphoto} linkedinlink="https://www.linkedin.com/in/astitva-agarwal-9554b8204" iglink="" />
                <CarouselElement position="DB Admin" name="Harshit Singh" photo={HSphoto} linkedinlink="https://www.linkedin.com/in/harshit-singh-1a3400245" iglink="https://instagram.com/accountofharshit?igshid=ZDdkNTZiNTM=" />
                <CarouselElement position="UI Designer" name="Kevin Thomas" photo={KTphoto} linkedinlink="http://linkedIn.com/in/kevvinthomas" iglink="https://instagram.com/kevvin.thomas?igshid=YmMyMTA2M2Y=" />
                
            </Carousel>

           {/if}
    </div>
    <div class="max-md:text-5xl w-full pb-2 text-center text-6xl pointer-events-none mt-20 px-3 max-md:text-center font-bold bg-gradient-to-tr  from-[#3BACC1] via-[#2D6DB1] to-[#3BACC1] text-transparent bg-clip-text">
       Organising Committee
    </div>
    <div class=" w-screen pt-5  ">
        {#if browser}
            <Carousel
            autoplayDuration={2000}
            duration={1000}
            timingFunction="ease"
            autoplay
            particlesToShow={itemstoshow}
            particlesToScroll={1}
            arrows={false}
            swiping={false}
            pauseOnFocus>
                <CarouselElement position="Fest Head" name="Ayush Sinha" photo={ASphoto} linkedinlink="https://www.linkedin.com/in/ayush-sinha-039140226/" iglink="https://www.instagram.com/ayusherein/" />
                <CarouselElement position="Fest Vice Head" name="Rochak Saini" photo={RSphoto} linkedinlink="https://www.linkedin.com/in/rochak-saini" iglink="https://www.instagram.com/_rochak._/" />
                <CarouselElement position="Fest Vice Head" name="Vedant Palekar" photo={VPphoto} linkedinlink="https://www.linkedin.com/in/vedant-palekar-583258166" iglink="https://www.instagram.com/vedaantpalekar/" />
                <CarouselElement position="Fest Vice Head" name="Shrinjayee Dutta" photo={SDphoto} linkedinlink="https://www.linkedin.com/in/shrinjayee-dutta-803567213" iglink="https://www.instagram.com/shrinjayeee/" />
                <CarouselElement position="Fest IT Lead" name="Aaryan Dwivedi" photo={ADphoto} linkedinlink="https://www.linkedin.com/in/aaryan-dwivedi-8a238a247/" iglink="https://www.instagram.com/ctoribs/" />
                <CarouselElement position="Finance Lead" name="Priyanshu Shukla" photo={PSphoto} linkedinlink="https://www.linkedin.com/in/priyanshu-shukla-400867241" iglink="https://www.instagram.com/priyanshushukla1503" />
                <CarouselElement position="Finance Lead" name="Deepthi Karanam" photo={DPphoto} linkedinlink="https://www.linkedin.com/in/deepthi-karanam-07975823a" iglink="https://www.instagram.com/deepthichowdarykaranam" />
                <CarouselElement position="Media Lead" name="Advay Inabathini" photo={AIphoto} linkedinlink="https://www.linkedin.com/in/advay-inabathini/" iglink="https://www.instagram.com/advay.nef/" />
                <CarouselElement position="Marketing Lead" name="Keerthana" photo={KMphoto} linkedinlink="" iglink="https://www.instagram.com/keerthanaaa.__/" />
                <CarouselElement position="Logistics Lead" name="Vansh Aggarwal" photo={VAphoto} linkedinlink="https://www.linkedin.com/in/vansh-aggarwal-a4a14a239" iglink="https://instagram.com/vanshaggarwal22" />
                <CarouselElement position="Operations Lead" name="Biswabarenya Tripathy" photo={BBphoto} linkedinlink="https://www.linkedin.com/in/biswabarenya-tripathy-b1b1b7159" iglink="https://instagram.com/ugh.trippyt?igshid=ZDdkNTZiNTM=" />
                <CarouselElement position="Operations Lead" name="Amartya Jha" photo={AJphoto} linkedinlink="http://linkedin.com/in/amartya-jha-b348b9136/" iglink="https://instagram.com/amarrtyaaa?igshid=MGNiNDI5ZTU=" />
                <CarouselElement position="Operations Lead" name="Ritu Raj" photo={RRphoto} linkedinlink="https://www.linkedin.com/in/ritu-raj-mit1038/" iglink="https://instagram.com/im.rituraj_?igshid=ZDdkNTZiNTM=" />
                <CarouselElement position="Fest Moderation" name="Dev Kothari" photo={DKphoto} linkedinlink="https://www.linkedin.com/in/dev-kothari-workgenda/" iglink="https://instagram.com/devkothaari?igshid=ZDdkNTZiNTM" />
            </Carousel>

           {/if}
    </div>
    
</div>

<style>

    .osdiv{
        -ms-overflow-style: none; /* for Internet Explorer, Edge */
        scrollbar-width: none; /* for Firefox */
        overflow-x: scroll; 
        overflow-y: hidden;
        font-family:  'Poppins', sans-serif;
    }

    .osdiv::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
    }

    
</style>