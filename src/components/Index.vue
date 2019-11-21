<template>
  <div class="index-container">
    <div class="row">
      <div v-for="drink in drinks" :key="drink.id" class="card-item">
        <div class="index-card">
          <img @click="deleteDrink(drink.id)" class="delete-icon" src="@/assets/delete.png">
          <h2 class="index-card-title">{{ drink.title }}</h2>
          <ul class="ingredients">
            <li v-for="(ing, index) in drink.ingredients" :key="index">
              <span class="ingredients-span">{{ ing }}</span>
            </li>
          </ul>
          <router-link :to="{ name: 'EditCocktail', params: { drink_slug: drink.slug } }">
            <button class="edit">Edit</button>
          </router-link>
        </div>          
      </div>
    </div>    
  </div>
</template>

<script>
import database from '@/firebase/init'

export default {
  name: 'Index',
  data () {
    return {
      drinks: []
    }
  },
  methods: {
    deleteDrink(id) {
      database.collection('drinks').doc(id).delete()
      .then(()=> {
        this.drinks = this.drinks.filter(drink => {
          return drink.id !== id
        })
      })
    }
  },
  created() {
    database.collection('drinks').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let drink = doc.data()
        drink.id = doc.id
        this.drinks.push(drink)
      })
    })
  }
}
</script>

<style>
.index-container {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}
.row {
  display: flex;
  background: #ccc;
  flex-wrap: wrap;
}
.card-item {
  margin: 20px 15px;
}
.index-card {
  background: rgb(248, 248, 248);
  border: 1px solid rgba(61, 66, 110, 0.144);
  border-radius: 5px;
  height: 220px;
  width: 270px;
  position: relative;
  box-shadow: 3px 3px 3px rgb(165, 165, 165);  
}

.index-card-title {
  text-align: center;
  font-weight: 300;
  color: rgb(82, 82, 241);
  padding: 10px 0;
  margin-top: 20px;
}
.ingredients {
  align-content: center;
  text-align: center;
}
.ingredients li {
  background: rgba(128, 128, 128, 0.87);
  padding: 5px;
  margin: 5px;
  font-size: 18px;
  border-radius: 10px;
  color: #fff;
}
.delete-icon {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 5px;
  cursor: pointer;
}
.edit {
  background: rgba(106, 128, 228, 0.726);
  color: #fff;
  padding: 10px;
  position: absolute;
  right: 5px;
  bottom: -15px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
}
.edit:focus {
  outline: none;
}
</style>
