<script>
    import Socials from './Socials.svelte';
    export let photo
    export let position = ""
    export let name = ""
    export let linkedinlink
    export let iglink = ""

</script>
<div class=" mb-10 w-fit">
    <div class=" movedownonhover flex h-[400px] mb-[50px]  justify-center">
        <div class="dli card-shadow">
    
            <div class="  absolute repeatinglg purple w-full h-full">
            </div>
            
            <div class="txonhovtop absolute top-0 h-[50px]  w-full flex flex-col items-center justify-center align-middle  bg-[#18181bc9]">
                <div class=" w-full text-center text-xl font-semibold bg-gradient-to-tr  from-[#3BACC1] via-[#2D6DB1] to-[#3BACC1] text-transparent bg-clip-text">
                    {position}
                </div>
               
            </div>
            <div class="absolute top-0 h-[400px] w-[300px] ">
                <div class=" absolute bottom-0 txonhov ">
                    <div class="opacity-0">a</div>
                    <Socials name linkedinlink={linkedinlink} iglink={iglink}/>
                </div>
            </div>
            <img src={photo}  class=" w-[296px] h-[395px]" alt={name + ' , ' + position}>
        
        </div>
        <div class=" backgroundpan nameclass absolute bottom-0 font-semibold text-xl text-center w-full pb-10 translate-y-16 from-[#D283B8] to-[#D283B8] via-[#6738BE] bg-gradient-to-r text-transparent bg-clip-text">
            {name}
        </div> 
    </div>   
</div>




<style>
.txonhovtop{
    transition: all;
    transition-duration: 200ms;
    transform: translateY(-500%);
}

.movedownonhover{
    transform: translateY(13px);
}

.card-shadow:hover{
    box-shadow: 0px 0px 12px #ffffff64;
}

.nameclass{
    transition: all;
    transition-duration: 200ms;
}


img{

object-fit:cover;
filter: grayscale(100%);
transition-duration: 200ms;
transition: all;
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

.dli:hover > img{
    filter: none;
}






.dli:hover{
border-radius: 20px;
height: 400px;
width: 300px;
transform: translateY(0);
}

.dli:hover + .nameclass{
    padding-bottom: 15px;
}

.dli:focus + .nameclass{
opacity: 0;
}

.dli:focus-within + .nameclass{
 padding-bottom: 10px;
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

.dli:hover >  .txonhovtop{
transform: translateY(-2%);
}

.dli:focus >  .txonhovtop{
transform: translateY(-2%);
}

.dli:focus-within >  .txonhovtop{
transform: translateY(-2%);
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