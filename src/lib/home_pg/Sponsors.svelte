<script>
        import selogo from '../../assets/sponsors/SchneiderElectric-logo.png'
        import dvlogo from '../../assets/sponsors/devfolio-logo.png'
        import bllogo from '../../assets/sponsors/Bluelearn.svg'
        import sglogo from '../../assets/sponsors/stockgro-logo.png'
        import cnlogo from '../../assets/sponsors/CodingNinjas-logo.png'
        import mplogo from '../../assets/sponsors/manipal-logo.png'
        import rplogo from '../../assets/sponsors/replit-logo.svg'
        import sologo from '../../assets/sponsors/solana-logo.svg'
        import pologo from '../../assets/sponsors/polygon-logo.svg'
        import fclogo from '../../assets/sponsors/Filecoin-logo.webp'
</script>

<div class="max-md:text-5xl pb-5 text-center text-6xl pointer-events-none mt-20 mb-10  max-md:text-center font-bold bg-gradient-to-tr  from-[#3BACC1] via-[#2D6DB1] to-[#3BACC1] text-transparent bg-clip-text">
    Organised by
</div>

<div class=" w-screen h-fit left-0 relative flex flex-row flex-wrap px-20 justify-center gap-11">
    
    <img src={mplogo} alt="MITB" class=" brightness-0 invert min-w-[350px]">
    
</div>

<div class="max-md:text-5xl text-center text-6xl pointer-events-none mt-20 mb-10  max-md:text-center font-bold bg-gradient-to-tr  from-[#3BACC1] via-[#2D6DB1] to-[#3BACC1] text-transparent bg-clip-text">
    Sponsored by
</div>

<div class=" w-screen h-fit left-0 relative flex flex-row flex-wrap px-20 justify-center gap-11">
    <img src={selogo} alt="Schneider Electric" class="mainsponsor">

    <img src={dvlogo} alt="Devfolio" class=" brightness-0 invert mainsponsor">

    <img src={bllogo} alt="Bluelearn" class="mainsponsor">
    <div class=" bg-[#f1f1f1a9] h-fit p-4 rounded-xl">
        <img src={sglogo} alt ="StockGro" class="mainsponsor">
    </div>
    <img src={cnlogo} alt="Coding Ninjas" class="mainsponsor">
    
</div>

<div class="px-5 max-md:text-5xl text-center text-5xl pointer-events-none mt-20 mb-10  max-md:text-center font-bold bg-gradient-to-tr  from-[#3BACC1] via-[#2D6DB1] to-[#3BACC1] text-transparent bg-clip-text">
    And supported by
</div>

<div class=" w-screen h-fit left-0 relative flex flex-row flex-wrap px-20 justify-center gap-11">

    <img src={rplogo} alt="Replit" class="supporter">
    <img src={sologo} alt="solana" class="supporter">
    <img src={pologo} alt="polygon" class="supporter">
    <img src={fclogo} alt="Filecoin" class="supporter">
    
</div>

<style>
    .mainsponsor{
        width: 350px;
    }
    .supporter{
        width: 300px;
    }
    img{
        height: auto;
        align-items: flex-start;
        object-fit: contain;
    }


</style>