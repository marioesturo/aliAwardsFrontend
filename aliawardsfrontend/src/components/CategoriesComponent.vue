<template>
    <div>
      <h1>Categorías</h1>
      <ul>
        <li v-for="category in categories" :key="category.id" @click="selectCategory(category.id)">
          {{ category.name }}
        </li>
      </ul>
      <Nominations v-if="selectedCategory" :categoryId="selectedCategory" />
    </div>
  </template>
  
  <script>
    import axios from '../axios';
    import Nominations from './NominationsComponent.vue';
    
    export default {
        components: {
        Nominations
        },
        data() {
        return {
            categories: [],
            selectedCategory: null
        };
        },
        created() {
        this.fetchCategories();
        },
        methods: {
        async fetchCategories() {
            try {
            const response = await axios.get('/categories');
            this.categories = response.data;
            } catch (error) {
            console.error('Error fetching categories:', error);
            }
        },
        selectCategory(id) {
            this.selectedCategory = id;
        }
        }
    };
  </script>
  