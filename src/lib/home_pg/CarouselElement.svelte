<script>
    import Socials from './Socials.svelte';
    import ADPhoto from '../../assets/AaryanDPhoto.jpg'

</script>
<div class=" movedownonhover flex h-[400px] mb-[50px]  justify-center">
    <div class="dli card-shadow">

        <div class="  absolute repeatinglg purple w-full h-full">
        </div>
        <div class="absolute top-0 h-[400px] w-[300px] ">
            <div class=" absolute bottom-0 txonhov ">
                <div class="opacity-0">a</div>
                <Socials mail= "dwivediaaryan5@gmail.com" linkedinlink="https://www.linkedin.com/in/aaryan-dwivedi-8a238a247/"/>
            </div>
        </div>
        <img src={ADPhoto} alt="Aaryan D, Technical Lead, Lead: Website Construction">
    
    </div>
</div>



<style>

    .movedownonhover{
        transform: translateY(13px);
    }

.card-shadow:hover{
    box-shadow: 0px 0px 12px #ffffff64;
}


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
.dli {
margin-left: auto;
margin-right: auto;
position: relative;
overflow: hidden;
height: 300px;
width: 300px;
border-radius: 100%;
transform: translateY(75px);
transition: all;
transition-duration: 200ms;




border-color: rgba(210, 210, 210, 0.477);
background-color: rgba(187, 32, 226, 0.096);;
border-width: 2px;

}







.dli:hover{
border-radius: 10%;
height: 400px;
width: 300px;
transform: translateY(0);
}

.dli:hover .repeatinglg{
opacity: 0;
}

.dli:focus .repeatinglg{
opacity: 0;
}

.dli:focus-within .repeatinglg{
opacity: 0;
}

.dli:hover > div > .txonhov{
transform: translateY(0);
}

.dli:focus > div > .txonhov{
transform: translateY(0);
}

.dli:focus-within > div > .txonhov{
transform: translateY(0);
}

.dli:focus{
border-radius: 10%;
height: 400px;
width: 300px;
transform: translateY(0);

}

.dli:focus-within{
border-radius: 10%;
height: 400px;
width: 300px;
transform: translateY(0);

}

@keyframes pan-overlay {
from {
    background-position: 0% 0%;
}
to{
    background-position: 0% -100%;
}
}


</style>