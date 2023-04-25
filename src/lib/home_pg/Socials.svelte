<script>
    import mailicon from '../../assets/envelope-solid.svg'
    import linkedinicon from '../../assets/linkedin.svg'

    export let mail;
    export let linkedinlink;
    
    if(!mail.startsWith("mailto:")){
        mail = "mailto:" + mail
    }

</script>

<div class=" absolute bottom-0 h-[100px] w-[300px] bg-white bg-opacity-20">
    <div class=" w-full h-full flex flex-row items-center justify-center">
        <div class=" mx-auto">
            <a href={linkedinlink}>
                <img src={linkedinicon} class=" filtertogrey w-[40px] h-[40px]" alt = "linkedin">
            </a>
        </div>
        <div class=" mx-auto">
            <a href={mail}>
                <img src={mailicon} class=" filtertogrey w-[40px] h-[40px]" alt = "linkedin">
            </a>
        </div>
    </div>
</div>

<style>
    .filtertogrey{
        filter: invert(4%) sepia(7%) saturate(1335%) hue-rotate(201deg) brightness(99%) contrast(89%);
    }
</style>