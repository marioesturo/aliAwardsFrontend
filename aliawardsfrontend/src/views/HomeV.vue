<template>
  <div>
    <HeaderC />
    <section v-if="!token" class="text-center p-10">
      <p class="text-red-600">No estás autenticado. Por favor, inicia sesión.</p>
    </section>
    <section v-else>
      <section class="bg-indigo-300 flex items-center justify-center">
        <article class="w-full border-r-2">
          <img class="w-full opacity-85" src="../assets/img/homeGroup.png" />
        </article>
        <article class="w-full border-r-2 flex justify-center items-center">
          <div class="flex justify-center items-center flex-col absolute text-5xl z-10 font-bold text-white">
            <p>Alicuetanos Awards</p>
            <p>2024</p>
          </div>
          <img class="w-full opacity-85" src="../assets/img/homeGroup1.png" />
        </article>
        <article class="w-full opacity-85">
          <img class="w-full" src="../assets/img/homeGroup2.png" />
        </article>
      </section>

      <section class="flex w-full justify-center mt-10">
        <div class="w-3/4">
          <p class="text-4xl text-indigo-700 font-bold">Categorías</p>
          <CardVoteC
            v-for="category in categories"
            :key="category.id"
            :title="category.name"
            :description="category.description"
            :imageUrl="category.imageUrl"
          />
        </div>
      </section>

      <FooterC />
    </section>
  </div>
</template>

<script>
import HeaderC from '../components/HeaderC.vue';
import FooterC from '../components/FooterC.vue';
import CardVoteC from '../components/CardVoteC.vue';
import axios from '../axios'; 
import { ref, onMounted } from 'vue';
import { tokenS } from '../stores/tokenS';

export default {
  name: 'HomeV',
  components: {
    HeaderC,
    CardVoteC,
    FooterC
  },
  setup() {
    const tokenStore = tokenS();
    const categories = ref([]);
    const token = tokenStore.token;
    console.log(token)

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        categories.value = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    onMounted(() => {
      if (token) {
        fetchCategories();
      }
    });

    return {
      categories,
      token
    };
  }
};
</script>
