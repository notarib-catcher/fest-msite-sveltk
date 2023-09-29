<script>
	import { browser } from '$app/environment';
    import {page} from '$app/stores'

    let isLogin = false
    if(browser){
        const urlParams = new URLSearchParams(window.location.search);
        isLogin = urlParams.has('loginSuccess');
        console.log("IsL: " + isLogin)

        setTimeout(() => {
            window.history.pushState({}, document.title, window.location.pathname);
        }, 1000)
        
    }

</script>


<div class = "absolute top-0 w-screen h-fit z-[2000] pointer-events-none">
    {#if isLogin}
    <div class=" font-uni text-2xl font-semibold h-[50px] w-fit p-2 bg-[#FE786F] text-white border-[1px] border-white mx-auto ModalPopIn">
        Welcome, {$page.data.session?.user?.name?.split(" ")[0]}!
    </div>
    {/if}
</div>

<style>

    .ModalPopIn{
    transform: translateY(-200px);
    animation-name: login;
    animation-duration: 3000ms;
    animation-iteration-count: 1;
    animation-fill-mode: forward;
    animation-timing-function: ease-in-out;
    }
    @keyframes login{
        0%{
            transform: translateY(-55px);
        }
        25%{
            transform: translateY(20px);
        }
        50%{
            transform: translateY(20px);
        }
        100%{
            transform: translateY(-200px);
        }
    }
</style>