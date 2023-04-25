<script>
	import { onMount } from 'svelte';
    import ADPhoto from '../../assets/AaryanDPhoto.jpg'
    import Socials from './Socials.svelte';
    let divscroll = [];


</script>

<div class=" w-screen overflow-hidden  flex flex-col justify-center items-center ">
    <div class="max-md:text-5xl w-full text-center text-6xl pointer-events-none mt-20 px-3 max-md:text-center font-bold bg-gradient-to-tr  from-[#3BACC1] via-[#2D6DB1] to-[#3BACC1] text-transparent bg-clip-text">
        Meet the team
    </div>
    <div class=" mt-10 w-screen overflow-scroll osdiv flex ">
        <ul class=" h-[500px] pt-[100px]  childhov flex flex-row flex-nowrap w-max box-border px-16">
            <li>

                <div class=" absolute repeatinglg purple w-full h-full">
                </div>
                <div class="absolute top-0 h-[400px] w-[300px] ">
                    <div class=" absolute bottom-0 txonhov ">
                        <div class="opacity-0">a</div>
                        <Socials />
                    </div>
                </div>
                <img src={ADPhoto} alt="Aaryan D, Technical Lead, Lead: Website Construction">

            </li>
            <!--Middle element start-->
            <li>

                <div class=" absolute repeatinglg purple w-full h-full">
                </div>
                <div class="absolute top-0 h-[400px] w-[300px] ">
                    <div class=" absolute bottom-0 txonhov ">
                        <div class="opacity-0">a</div>
                        <Socials />
                    </div>
                </div>
                <img src={ADPhoto} alt="Aaryan D, Technical Lead, Lead: Website Construction">

            </li>
            <!--Middle element end-->

            <li>

                <div class=" absolute repeatinglg purple w-full h-full">
                </div>
                <div class="absolute top-0 h-[400px] w-[300px] ">
                    <div class=" absolute bottom-0 txonhov ">
                        <div class="opacity-0">a</div>
                        <Socials />
                    </div>
                </div>
                <img src={ADPhoto} alt="Aaryan D, Technical Lead, Lead: Website Construction">

            </li>
            <li>

                <div class=" absolute repeatinglg purple w-full h-full">
                </div>
                <div class="absolute top-0 h-[400px] w-[300px] ">
                    <div class=" absolute bottom-0 txonhov ">
                        <div class="opacity-0">a</div>
                        <Socials />
                    </div>
                </div>
                <img src={ADPhoto} alt="Aaryan D, Technical Lead, Lead: Website Construction">

            </li>
            <li>

                <div class=" absolute repeatinglg purple w-full h-full">
                </div>
                <div class="absolute top-0 h-[400px] w-[300px] ">
                    <div class=" absolute bottom-0 txonhov ">
                        <div class="opacity-0">a</div>
                        <Socials />
                    </div>
                </div>
                <img src={ADPhoto} alt="Aaryan D, Technical Lead, Lead: Website Construction">

            </li>
        </ul>
    </div>

    
</div>

<style>
    img{

        object-fit:contain;
    }

    .txonhov{
        transform: translateY(500%);
        transition: all;
        transition-duration: 300ms;
    }
    .repeatinglg{
        height: 100%;
        width: 100%;
        background-size: 100% 7px;
        background-repeat: repeat-y;
        
        animation: pan-overlay 11s linear infinite;

        transition: all;
        transition-duration: 200ms;
    }

    .purple{
        background-image: linear-gradient( rgba(52, 52, 52, 0.148), 
        rgba(197, 197, 197, 0.112), transparent 3px, transparent 9px);
    }
    li {
        position: relative;
        overflow: hidden;
        height: 300px;
        width: 300px;
        border-radius: 100%;
        
        transition: all;
        transition-duration: 200ms;
       
        box-sizing: border-box;
        margin-left: 300px;

        border-color: rgba(210, 210, 210, 0.477);
        background-color: rgba(187, 32, 226, 0.096);;
        border-width: 2px;
        
    }

    li:first-of-type{
        margin-left: 0;
    }

    



    li:hover{
        border-radius: 10%;
        height: 400px;
        width: 300px;
        transform: translateY(-50px);
    }

    li:hover .repeatinglg{
        opacity: 0;
    }

    li:focus .repeatinglg{
        opacity: 0;
    }

    li:focus-within .repeatinglg{
        opacity: 0;
    }

    li:hover > div > .txonhov{
        transform: translateY(0);
    }

    li:focus > div > .txonhov{
        transform: translateY(0);
    }

    li:focus-within > div > .txonhov{
        transform: translateY(0);
    }

    li:focus{
        border-radius: 10%;
        height: 400px;
        width: 300px;
        transform: translateY(-50px);
    }

    li:focus-within{
        border-radius: 10%;
        height: 400px;
        width: 300px;
        transform: translateY(-50px);
    }

    @keyframes pan-overlay {
        from {
            background-position: 0% 0%;
        }
        to{
            background-position: 0% -100%;
        }
    }

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