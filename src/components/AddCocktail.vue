<template>
  <div class="add-cocktail cocktail-container">
      <h2>Add new drink recipe</h2>
      <form @submit.prevent="addDrink">
          <div class="field">
              <label for="title">Drink title:</label>
              <input type="text" name="title" v-model="title">
          </div>
          <div class="field" v-for="(ing, index) in ingredients" :key="index">
              <label for="ingredients">ingredient:</label>
              <input type="text" name="ingredient" v-model="ingredients[index]">
          </div>
          <div class="add-ingredient field">
              <label for="add-ingredient">Add an ingredient:</label>
              <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
          </div>
          <div class="button">
              <p if="feedback">{{ feedback }}</p>
              <button @click="addDrink" class="button-add">Add Drink</button>
          </div>
      </form>
  </div>
</template>

<script>
import database from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'AddCocktail',
  data () {
    return {
        title: null,
        another: null,
        ingredients: [],
        feedback: null,
        slug: null
    }
  },
  methods: {
      addDrink() {
          if(this.title){
              this.feedback = null
              this.slug = slugify(this.title, {
                  replacement: '-',
                  remove: /[$*_+.()'"!\-:@]/g,
                  lower: true
              })
              database.collection('drinks').add({
                  title: this.title,
                  ingredients: this.ingredients,
                  slug: this.slug
              }).then(()=> {
                  this.$router.push({ name: 'Index' })
              }).catch(err => {
                  console.log(err)
              })
        }else {
            this.feedback = 'You must enter a title for your drink'
        }          
      },
      addIng() {
          if(this.another) {
              this.ingredients.push(this.another)
              this.another = null
              this.feedback = null
          } else {
              this.feedback = 'You must enter an ingredient'
          }
      }
  }
}
</script>

<style>
.cocktail-container {
    width: 500px;
    margin: 0 auto;
}
.add-cocktail {
    color:rgb(82, 82, 241);
}
.field {
    flex-direction: column;
    display: flex;
    margin: 40px 0 20px 0;

}
.field label {
    color: rgb(104, 104, 104);
}
.field input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #9e9e9e;
    height: 30px;
    margin-top: 10px;
    transition: .3s;
    font-size: 16px;
    outline: none;
}
.field input[type=text]:focus {
    border-bottom: 2px solid rgb(82, 82, 241);
}
.add-cocktail h2 {
    text-align: center;
    padding: 20px 0;
    font-weight: 300;
    font-size: 32px;
}
.button {
    text-align: center;
    margin-top: 40px;
}
.button-add {
    width: 180px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: rgb(20, 154, 187);
    color: #fff;    
    cursor: pointer;
    font-weight: 600;
}

</style>
