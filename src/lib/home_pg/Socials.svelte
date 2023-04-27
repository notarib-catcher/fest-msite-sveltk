<script>

    import linkedinicon from '../../assets/GroupLinkedin.svg'
    import igicon from '../../assets/Groupinstag.svg'

    export let name;
    export let linkedinlink;
    export let iglink  = "YOOO";
    
    

</script>


<div class=" absolute bottom-0 h-[100px] w-[300px]  ">
    <div class="h-full w-full flex justify-center">
        <div class=" w-[70%] flex  items-center gap-10 ">
            {#if linkedinlink}
            <div class=" mx-auto">
                <a href={linkedinlink} class=" relative">
                    
                    <div class=" rounded-lg">
                        <img src={linkedinicon} class=" w-[37px] h-[37px] box-content rounded-lg p-2 bg-[#18181bd6]" alt = "linkedin">
                    </div>
                </a>
            </div>
            {/if}
            {#if iglink}
            <div class=" mx-auto">
                <a href={iglink} class=" relative">
                    
                    <div class="   rounded-lg">
                        <img src={igicon} class=" w-[37x] h-[37px]  box-content rounded-lg p-2 bg-[#18181bd6]" alt = "linkedin">
                    </div>
                </a>
            </div>
            {/if}
        </div>
    </div>
   
    
</div>

<style>
    .filtertogrey{
        filter: invert(11%) sepia(35%) saturate(1077%) hue-rotate(232deg) brightness(92%) contrast(94%);
    }
</style>