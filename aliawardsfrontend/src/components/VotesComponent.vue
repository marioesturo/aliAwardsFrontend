<template>
    <div>
        <h2>Candidato con más votos</h2>
        <p v-if="topNominee">
            {{ topNominee.name }} con {{ topNominee.votes }} votos
        </p>
    </div>
</template>
  
<script>
    import axios from '../axios';
    
    export default {
        props: ['categoryId'],
        data() {
        return {
            topNominee: null
        };
        },
        watch: {
        categoryId: 'fetchTopNominee'
        },
        methods: {
        async fetchTopNominee() {
            try {
            const response = await axios.get(`/votes/${this.categoryId}`);
            this.topNominee = response.data;
            } catch (error) {
            console.error('Error fetching top nominee:', error);
            }
        }
        },
        created() {
        if (this.categoryId) {
            this.fetchTopNominee();
        }
        }
    };
</script>
  