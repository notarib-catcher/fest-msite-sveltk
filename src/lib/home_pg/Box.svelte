<script>
    export let clr1, clr2;
    export let link;
    export let heading;
    export let text;

    let priclass1 = ""
	if(clr1 == 1){
		priclass1 = "featuredhdg"
	}
	else if (clr1 == 2){
		priclass1 = "sportshdg"
	}
	else if (clr1 == 3){
		priclass1= "culturalhdg"
	}
	else{
		priclass1 = "esportshdg"
	}

    let priclass2 = ""
	if(clr2 == 1){
		priclass2 = "featuredhdg"
	}
	else if (clr1 == 2){
		priclass2 = "sportshdg"
	}
	else if (clr1 == 3){
		priclass2 = "culturalhdg"
	}
	else{
		priclass2 = "esportshdg"
	}
</script>

<div class=" flex flex-col absolute top-0 left-0 w-[90vw] h-fit max-h-[90lvh] max-w-[700px] bg-white bg-opacity-[15%] gblur rounded-md text-3xl">
    <div class=" w-full p-2 font-monster {priclass1}">
        {heading || "Heading"}
    </div>
    <div class=" font-thin text-xl p-2 {priclass2}">
        {text || "Lorem Ipsum"}
    </div>

    <div>

    </div>
</div>

<style>
    .gblur{
        backdrop-filter: blur(5px);
        filter: drop-shadow(0, 0, 5px, #333)
    }

</style>