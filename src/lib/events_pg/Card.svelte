<script>
// @ts-nocheck
    import Popup from "./Popup.svelte";


    export let briefdescription;
    export let fulldescription;
    export let title;
    export let type;

 
    let showChild = false

    const onClick = () => {
        showChild = true
    }



 

</script>

<div class=" bordergradient my-4 w-[300px] h-[400px] borderrounded gradient-border-mask mx-auto">
    <button class="absolute h-full w-full " on:click={onClick}><div class=" absolute h-full w-full top-0"></div></button>
    <div class=" w-full text-center mt-2 font-extrabold text-xl text-white border-b-2 pb-2 ">
        {title}
    </div>
    <div class=" w-full justify-between bg-gradient-to-tr from-[#D283B8] to-[#D283B8] via-[#6738BE] bg-clip-text text-transparent p-4">
        {briefdescription}
    </div>
    {#if showChild}
    <Popup innerText={fulldescription} title={title} show = {showChild} on:msg={() => {showChild = false}} />
    {/if}
</div>

<style>

    .gradient-border-mask {
  position: relative;
  padding: 15px 20px;
}

.gradient-border-mask::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50px; 
  border: 2px solid transparent;
  background: linear-gradient(45deg,rgb(146, 76, 122),rgb(69, 31, 141)) border-box;
  -webkit-mask:
    linear-gradient(#fff 0 0) padding-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: destination-out;
  mask-composite: exclude;
}


</style>