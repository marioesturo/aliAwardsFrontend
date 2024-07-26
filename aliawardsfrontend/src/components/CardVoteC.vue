<template>
    <div class="mt-6 max-w-sm h-50 bg-slate-50 rounded-lg shadow-xl overflow-hidden md:max-w-full">
        <div class="md:flex">
            <div class="md:flex-shrink-0 p-2">
                <img :src="fullImageUrl" alt="Award Image" class="h-48 w-full object-cover md:w-48">
            </div>
            <div class="p-4 flex justify-between flex-col">
                <div class="mt-1">
                    <div class=" uppercase tracking-wide text-md text-indigo-500 font-bold">{{ title }}</div>
                    <p class="mt-2 text-gray-500">{{ description }}</p>
                </div> 
                <div class="mt-4">
                    <button class="bg-indigo-500 w-24 rounded-lg text-white hover:bg-indigo-400 p-1 font-bold">Votar</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
    export default {
        name: 'CardVoteC',
        props: {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            imageUrl: {
                type: String,
                required: true
            }
        },
        computed: {
            fullImageUrl() {
                return require(`@/assets/img/${this.imageUrl}`);
            }
        }
    };
</script>
  