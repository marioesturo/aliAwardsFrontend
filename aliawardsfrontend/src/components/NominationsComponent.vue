<template>
    <div>
      <h2>Nominados</h2>
      <ul>
        <li v-for="nomination in nominations" :key="nomination.id">
          {{ nomination.name }}
        </li>
      </ul>
      <Votes :categoryId="categoryId" />
    </div>
  </template>
  
  <script>
    import axios from '../axios';
    import Votes from './VotesComponent.vue';
    
    export default {
        components: {
        Votes
        },
        props: ['categoryId'],
        data() {
        return {
            nominations: []
        };
        },
        watch: {
        categoryId: 'fetchNominations'
        },
        methods: {
        async fetchNominations() {
            try {
            const response = await axios.get(`/nominations/${this.categoryId}`);
            this.nominations = response.data;
            } catch (error) {
            console.error('Error fetching nominations:', error);
            }
        }
        },
        created() {
        if (this.categoryId) {
            this.fetchNominations();
        }
        }
    };
  </script>
  