<script>
    import sanitizeHtml from 'sanitize-html'
    import {marked} from "marked";

    /**
     * Markdown source to be parsed into raw HTML.
     * @type string
     */
    export let markdown;


    /**
     * Convert a markdown source into a raw HTML string.
     * @example ```{@html toHTML(markdown)}```
     *
     * @param {string} markdown
     * @return string
     */
    function toHTML(markdown) {
        return sanitizeHtml(marked(markdown),
            {
                allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'a' ])
            }
        );
        
    }
</script>

<div class="md-converter">
    {@html toHTML(markdown)}
</div>

<style>
    
</style>
