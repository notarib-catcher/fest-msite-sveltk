<script>
	import { browser } from '$app/environment';
    import {page} from '$app/stores'

    let isLogin = false
    if(browser){
        const urlParams = new URLSearchParams(window.location.search);
        isLogin = urlParams.has('loginSuccess');

        window.history.pushState({}, document.title, window.location.pathname);
    }

</script>


<div class = "absolute top-0 w-screen h-fit z-20 pointer-events-none">
    {#if isLogin}
    <div class="  backdrop-blur-xl bg-gradient-to-r from-[#f1d0e6] via-[#772f9e] to-[#623bac] bg-clip-text text-transparent text-2xl font-semibold h-[50px] w-fit p-2 rounded-lg mx-auto ModalPopIn">
        Welcome, {$page.data.session?.user?.name?.split(" ")[0]}!
    </div>
    {/if}
</div>

<style>

    .ModalPopIn{
    transform: translateY(-100px);
    animation-name: login;
    animation-duration: 4000ms;
    animation-iteration-count: 1;
    animation-fill-mode: forward;
    }
    @keyframes login{
        0%{
            transform: translateY(-55px);
        }
        25%{
            transform: translateY(0px);
        }
        50%{
            transform: translateY(0px);
        }
        100%{
            transform: translateY(-55px);
        }
    }
</style>