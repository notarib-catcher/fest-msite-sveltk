<script>
    import Carousel from "../../lib/mypass_pg/Carousel.svelte";
    export let data;
    /**
	 * @type {any[]}
	 */
    let passstrArr = []
    /**
	 * @type {any[]}
	 */
    let passtypeArr = []

    if(data.passes){
        for(let i in data.passes){
            passstrArr.push(data.passes[i].token)
            passtypeArr.push(data.passes[i].type)
        }
    }
</script>

<div class="bg-gradient-to-t to-[#2b1a25] via-[#130926] from-zinc-900 h-screen w-screen">
    <Carousel codeDataArr = {passstrArr} typeArr={passtypeArr} />
</div>


