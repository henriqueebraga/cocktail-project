<template>
    <div class="navbar">
        <div>
            <router-link :to="{ name: 'Index' }">
                <h2 class="navbar-title">Cocktails</h2>
            </router-link>            
        </div>
        <div>
            <div class="navbar-add-cocktail">
                <router-link :to="{ name : 'AddCocktail' }">
                    <img src="@/assets/plus-icon.png">
                </router-link>                
            </div>
        </div>        
    </div>
</template>
<script>
export default {
    name: 'Index',
    data() {
        return {

        }
    }
}
</script>
<style>
.navbar {
    background: #2f54ce;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    position: relative;
    margin-bottom: 50px;
}
.navbar-title {
    color: #fff;
    font-size: 36px;
    font-weight: 600;
}
a {
    text-decoration: none;
}
.navbar-add-cocktail img {
    position: absolute;
    right: 50px;
    top: 70px;
    height: 70px;
    cursor: pointer;
}
</style>
