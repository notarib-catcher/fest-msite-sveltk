<script>
    import Card from "$lib/events_pg/Card.svelte";
    import Popup from "$lib/events_pg/Popup.svelte";
    let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel nunc luctus, aliquet elit et, rhoncus nisl. Fusce gravida mauris in quam mollis consectetur. In hac habitasse platea dictumst. Nulla facilisi. Nunc ut augue imperdiet, venenatis magna id, pulvinar tellus. Integer efficitur massa nec risus elementum accumsan. Vestibulum viverra placerat nulla eu condimentum. In id aliquet ante, auctor elementum ante. Sed luctus tortor ac ex tincidunt pellentesque. Vestibulum non pellentesque quam. Etiam nisi neque, bibendum a tellus ac, convallis volutpat erat."
</script>

<div class=" min-h-screen h-fit w-screen " >
    <div >

    </div>
    <div  class=" h-full w-full px-[10vw]">
        <div  class="eventitems grid  grid-cols-3 max-lg:grid-flow-row max-lg:grid-cols-1 mt-20 ">
            <div class=" h-full w-full eventitem">
                <Card title="treasure hunt" type="gold" briefdescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel nunc luctus," fulldescription = {lorem}/>
            </div>
            <div class=" h-full w-full eventitem">
                <Card title="treasure hunt" type="gold" briefdescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel nunc luctus," fulldescription = {lorem}/>
            </div>
            <div class=" h-full w-full eventitem">
                <Card title="treasure hunt" type="gold" briefdescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel nunc luctus," fulldescription = {lorem}/>
            </div>
            <div class=" h-full w-full eventitem">
                <Card title="treasure hunt" type="gold" briefdescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel nunc luctus," fulldescription = {lorem}/>
            </div>
            <div class=" h-full w-full eventitem">
                <Card title="treasure hunt" type="gold" briefdescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel nunc luctus," fulldescription = {lorem}/>
            </div>
            
        </div>
        

    </div>
    
</div>
<style>
    /* .eventitems:hover > .eventitem{
  opacity: 0.3;
}

.eventitems:hover > .eventitem:hover{
  opacity: 1;
  transform: translateY(-20px);

  
  animation: translateup;
  animation-duration: 500ms;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;

} */

@keyframes translateup{
  0%{
    transform: translateY(20px);
  }
  100%{
    transform: translateY(0);
  }
}
</style>