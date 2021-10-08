<template>
    <header>
        <h1>sprume</h1>
        <nav>
            <transition name="button" mode="out-in">
                <g-link v-if="$route.path == `/`" to="/gallery/" class="far fa-images" key="gallery"/>
                <g-link v-else class="returner fas fa-arrow-left" to="/" key="return"/>
            </transition>
            <transition name="button" mode="out-in">
                <g-link v-if="$route.path == `/info/`" to="/gallery/" class="far fa-images" key="gallery" />
                <g-link v-else to="/info/" class="fas fa-info" key="info" />
            </transition>
        </nav>
    </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>

h1 {
    font-family: 'ninifont', sans-serif; 
    color: var(--sprurple);
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: black;
    font-size: 6em;
    margin-top: 0em;
    margin-bottom: 0.1em;
    text-shadow: 4px 4px 12px black;
    pointer-events: none;
}

nav {
    width: 120px;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
}

nav a {
    display: inline-block;
    width: 20px;
    padding: 0.4em;
    padding-left: 0.8em;
    padding-right: 0.8em;
    border-radius: 2em;
    background-color: white;

    transform: none;
    border: 4px solid black;
    outline: 0px solid white;
    transition: all 0.2s;
}

nav a:hover {
    transform: translate(-2px, -2px);
    border: 4px solid var(--spreen);
}

nav a:active {
    transform: translate(0px, 0px);
    outline: 4px solid var(--sprange);
    border: 2px solid white;
}

nav a i {
    font-size: 1.2em;
}

@media screen and (max-width: 960px) {
    h1 {
        font-size: 5em;
    }
}
</style>