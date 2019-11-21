<template>
    <div v-if="drink" class="add-cocktail cocktail-container">
      <h2>Edit {{ drink.title}} Cocktail</h2>
      <form  @submit.prevent="editDrink" class="edit-form">
          <div class="field">
              <label for="title">Drink title:</label>
              <input type="text" name="title" v-model="drink.title">
          </div>
          <div class="field" v-for="(ing, index) in drink.ingredients" :key="index">
              <label for="ingredients">ingredient:</label>
              <input type="text" name="ingredient" v-model="drink.ingredients[index]">
              <a @click="deleteIng(ing)"><img src="@/assets/delete-ing.png" class="delete-ing"></a>
          </div>
          <div class="add-ingredient field">
              <label for="add-ingredient">Add an ingredient:</label>
              <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
              <a @click="addIng"><img src="@/assets/add-ing.png" class="add-ing"></a>
          </div>
          <div class="button">
              <p if="feedback">{{ feedback }}</p>
              <button @click="editDrink" class="button-add">Update Drink</button>
          </div>
      </form>
    </div>  
</template>

<script>
import database from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'EditCocktail',
  data () {
    return {
        drink: null,
        another: null,
        feedback: null
    }
  },
  methods: {
      editDrink() {
          if(this.drink.title){
              this.feedback = null
              this.drink.slug = slugify(this.drink.title, {
                  replacement: '-',
                  remove: /[$*_+.()'"!\-:@]/g,
                  lower: true
              })
              database.collection('drinks').doc(this.drink.id).update({
                  title: this.drink.title,
                  ingredients: this.drink.ingredients,
                  slug: this.drink.slug
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
              this.drink.ingredients.push(this.another)
              this.another = null
              this.feedback = null
          } else {
              this.feedback = 'You must enter an ingredient'
          }
      },
      deleteIng(ing){
          this.drink.ingredients = this.drink.ingredients.filter(ingredient => {
              return ingredient !== ing
          })
      }
  },
  created(){
      let ref = database.collection('drinks').where('slug', '==', this.$route.params.drink_slug)
      ref.get().then(snapshot => {
          snapshot.forEach(doc => {
              this.drink = doc.data(),
              this.drink.id = doc.id
          })
      })
  }
}
</script>

<style>
.cocktail-container {
    width: 500px;
    margin: 0 auto;
}
.edit-form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.add-cocktail {
    color:rgb(82, 82, 241);
}
.field {
    flex-direction: column;
    display: flex;
    margin: 40px 0 20px 0;
    position: relative;

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
.delete-ing {
    width: 15px;
    position: absolute;
    right: 0;
    top: 30px;
    cursor: pointer;
}
.add-ing {
    cursor: pointer;
    position: absolute;
    width: 30px;
    right: 0;
    top: 25px;
}

</style>
