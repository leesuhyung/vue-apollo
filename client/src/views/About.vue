<template>
    <div class="about">
        <h1>This is an about page</h1>
        {{ message }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                message: 'hello'
            }
        }
    }
</script>
