<template>
    <div  v-if="loading">
        <h1>Loading...</h1>
    </div>
    <div v-else>
        <h1 v-if="sortedImages.length == 0">
        There are no
        <span v-show="filters.style !== ''"> {{ filters.style }}-style</span>
        sprumes
        <span v-show="filters.character !== ''"> about {{ filters.character }}</span>
        <span v-show="filters.year !== ''"> in the year {{ filters.year }}</span>.<span v-if="filters.naughty == true">.. not even naughty ones.</span><span v-else>.. unless?</span>
        </h1>

        <transition-group name="fade" tag="div">
        <div class="galleryBlock" v-for="node in sortedImages" :key="node.year" :id="'block_' + node.year">
            <h1 :id="'header_' + node.year">{{ node.year }}</h1>
            <div class="galleryGrid" :id="'gallery_' + node.year">

                <figure 
                v-for="image in node.images"
                :key="image.id"
                :class="image.tags.join(' ')"
                :id="'container_' + image.id"
                v-on:click="show(image)"
                >
                    <LazyImg :src="image.url + '?tr=n-thumbnail'" :id="'image_' + image.id" />
                </figure>

            </div>
        </div>
        </transition-group>

        <viewer :images="images"
        @inited="inited"
        class="viewer" ref="viewer"
        >
            <template #default="scope">
            <img v-for="src in scope.images" :src="src" :key="src" style="display: none">
            </template>
        </viewer>

    </div>
</template>

<static-query>
query {

    years: allYears {
        edges {
        node {
            year
        }
        }
    }

    artworks: allArtworks {
    edges {
        node {
        id
        url
        path
        tags
        year
        month
        height
        width
        group
        pathArray
        characters
        styles
        naughty
        display
        }
    }
    }

    artworksDisplay: allArtworks(filter: {
        display: { eq: true }
    }) {
    edges {
        node {
        id
        url
        tags
        year
        month
        height
        width
        group
        naughty
        characters
        styles
        display
        }
    }
    }

}
</static-query>

<script>
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from "v-viewer"
import LazyImg from "~/components/Gallery/Img.vue"

export default {
    components: {
        LazyImg,
        Viewer
    }, 
    created() {
        var unsortedYears = []
        this.$static.years.edges.forEach(edge => unsortedYears.push(edge.node.year))
        this.years = unsortedYears.sort((a,b) => b-a)

        var imageNodes = []
        this.$static.artworksDisplay.edges.forEach(edge => imageNodes.push(edge.node))
        this.allImages = imageNodes

        this.sortedImages = []
        for (var year of this.years) {
            this.sortedImages.push( {year: year, images: this.allImages.filter(image => image.year == year)} )
        }
    },
    mounted() {
        this.loading = false
    },
    data () {
        return {
            images: [],
            allImages: [],
            sortedImages: [],
            years: [],
            loading: true
        }
    },
    props: {
        filters: Object
    },
    watch: {
        filters(newVal, oldVal) {
            var filteredImages = this.allImages.filter(image => ((newVal.year == '' || image.year == newVal.year) && (newVal.character == '' || image.characters.includes(newVal.character)) && (newVal.style == '' || image.styles.includes(newVal.style)) && (newVal.naughty == true || image.naughty == false )))

            if (filteredImages.length == 0) {
                this.sortedImages = []
            } else {
                this.sortedImages = []
                var renderYears = []
                filteredImages.forEach( (image) => { if(!renderYears.includes(image.year)) {renderYears.push(image.year)} })

                for (var year of renderYears.sort( (a,b) => b-a) ) {
                    this.sortedImages.push( {year: year, images: filteredImages.filter(image => image.year == year)} )
                } 
            }
        }
    },
    methods: {
        inited (viewer) {
            this.$viewer = viewer
        },
        show (node) {
            if (node.group == "") {
                this.images = [node.url]
                this.$viewer.show()
            } else {
                this.images = []
                for (var image of this.$static.artworks.edges.filter(edge => edge.node.group == node.group)) {
                    this.images.push(image.node.url)
                }
                    this.images.reverse()
                    this.$viewer.show()
            }
        }
    }
}
</script>

<style scoped>
@import url('http://fonts.cdnfonts.com/css/ninifont-2');

h1 {
  font-family: 'ninifont', sans-serif; 
}

.galleryBlock {
  width: 100%;
}

.galleryGrid {
  /*--display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px,1fr));
  grid-auto-rows: 200px;
  gap: 0em;--*/
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: flex-start;
  gap: 2.4em;
}

h1 {
  text-align: center;
  font-family: 'ninifont', sans-serif; 
  color: var(--sprange);
  /*--
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  --*/
  font-size: 4em;
  margin-top: 0.2em;
  font-weight: 200;
  margin-bottom:0.4em;
  animation: 1s ease-in infinite alternate floaty;
}

@keyframes floaty {
  from {
    transform: translate(0px, 0px);
    text-shadow: 6px 6px 8px rgba(0, 0, 0, 0.4);
  }
  to {
    transform: translate(4px, 4px);
    text-shadow: 2px 2px 16px rgba(0, 0, 0, 0.4);
  }
}

figure {
  outline: black solid 1px;
  height: 130px;
  width: 130px;
  border-radius: 0.2em;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2), 4px 12px 24px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

figure:hover {
  transform: translate(-2px, -2px);
  cursor: pointer;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
  filter: saturate(0.8);
  opacity: 0.8;
}

figure.Naughty {
  outline: 4px var(--sprange) solid;
}

figure.Naughty::after {
  content: "!";
  display: block;
  position: relative;
  color: var(--sprange);
  font-size: 2.8em;
  font-weight: bold;
  z-index: 3;
  transform: translate(10px, -130px);
  text-shadow: -2px 2px 12px rgba(0,0,0,0.2);
  transition: all 0.2s;
}

figure.Naughty:hover::after {
  text-shadow: -4px 4px 4px rgba(0,0,0,0.2);
  transform: translate(12px, -132px);
  font-size: 3.4em;
}

figure.Naughty img {
  filter: blur(4px);
  transition: 0.4s all;
}

figure.Naughty:hover img {
  filter: blur(0px);
}

figure.Main {
  outline: 4px var(--spreen) solid;
}

figure.Main::after {
  content: "+";
  display: block;
  position: relative;
  color: var(--spreen);
  font-size: 4em;
  font-weight: bold;
  z-index: 3;
  transform: translate(10px, -140px);
  text-shadow: -2px 2px 12px rgba(0,0,0,0.2);
  transition: all 0.2s;
}

figure.Main:hover::after {
  text-shadow: -4px 4px 4px rgba(0,0,0,0.2);
  transform: translate(12px, -142px);
  font-size: 4.2em;
}
</style>
