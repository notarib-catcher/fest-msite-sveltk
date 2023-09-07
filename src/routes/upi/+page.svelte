<script>
    // just displays the amount for the pass with the pregenerated upi qrcode
    // i believe after the payment the payment is manually approved through the low code backend.
    // it also updates the payment database in mongo db
    import UPIQR from '../../assets/UPI_QR.png'
    export let data;
</script>
<div class="bg-gradient-to-t to-[#2b1a25] via-[#130926] from-zinc-900 h-screen w-screen flex items-center align-middle">
    <div class="mx-auto text-white bg-gradient-to-tr from-[#49243d] via-[#442b51] to-[#2c125c] flex flex-col px-10 pb-10 pt-4 rounded-lg">
            <div class="w-full text-center bg-clip-text text-transparent bg-gradient-to-r text-2xl font-semibold via-[#59e8f8] to-[#6088f9] from-[#6088f9]  mb-4">
                Payment QR (₹{data.amount/100})
            </div>
            <div class=" bg-[#ffffff] w-[282px] px-4 pt-4 rounded-lg shadow-2xl mx-auto">
                <img src={UPIQR} alt="7436090543@paytm">
                <div class="w-full text-center bg-clip-text bg-gradient-to-t text-transparent from-[#49243d] via-[#442b51] to-[#2c125c] text-xl font-extrabold  mt-2 mb-3 ">
                    7436090543@paytm  
                </div>
            </div>
            <div class=" w-full text-center pt-2 bg-clip-text text-transparent bg-gradient-to-r from-[#c7acac] via-[#d6bfe2] to-[#7e7b83]">
                <div class=" font-bold text-white">Send ₹{data.amount/100} to this QR.<br>Then fill <a class=" underline" href="https://forms.gle/5JXihNqmkzLRao688">this form</a></div><br>You will receive your pass on the same day.<br> <i>You can cancel your payment on the <a href="/book" class=" underline">Book page.</a></i>
            </div>
            
        </div>
</div>