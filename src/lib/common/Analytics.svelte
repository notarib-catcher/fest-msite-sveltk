<script>
// @ts-nocheck

    import { page } from '$app/stores'
  
    $: {
      if (typeof gtag !== 'undefined') {
        gtag('config', 'G-8KMYR18X52', {
          page_title: $page.url.pathname.replaceAll("/",""),
          page_path: $page.url.pathname,
        })
      }
    }
  </script>
  
  <svelte:head>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=MEASUREMENT_ID">
    </script>
    <script>
      window.dataLayer = window.dataLayer || []
  
      function gtag() {
        dataLayer.push(arguments)
      }
  
      gtag('js', new Date())
      gtag('config', 'MEASUREMENT_ID')
    </script>
  </svelte:head>