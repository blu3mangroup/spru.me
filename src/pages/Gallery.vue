<template>
  <Layout>

      <div>
        <viewer :options="options" :images="images"
                @inited="inited"
                class="viewer" ref="viewer"
        >
          <template #default="scope">
            <img v-for="src in scope.images" :src="src" :key="src" style="display: none">
          </template>
        </viewer>

      </div>
      <p style="color: var(--spreen); width: 100%; text-align: center; font-weight: bold;">"+" = has variants</p>
      <div class="filterBar">
        <form>
          <label for="years"> Year: </label>
          <select v-model="selectedYear" id="yearSelect" name="years">
            <option value="" enabled>---</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </form>

        <form>
          <label for="characters"> Character: </label>
          <select v-model="selectedCharacter" id="characterSelect" name="characters">
            <option value="" enabled>---</option>
            <option v-for="character in characters" :key="character" :value="character">{{ character }}</option>
          </select> 
        </form>

        <form> 
          <label for="styles"> Style: </label>
          <select v-model="selectedStyle" id="styleSelect" name="styles">
            <option value="" enabled>---</option>
            <option v-for="style in styles" :key="style" :value="style">{{ style }}</option>
          </select>
        </form>

        <form>
          <label for="naughty"> Naughty </label>
          <input type="checkbox" v-model="naughty" name="naughty" value="naughty" checked>
        </form>

      </div>

      <form>
        <button type="button" v-on:click="resetFilters()">Reset</button>
      </form>

      <h1 v-if="sortedImages.length == 0">
        There are no
        <span v-show="filters.style !== ''"> {{ filters.style }}-style</span>
        sprumes
        <span v-show="filters.character !== ''"> about {{ filters.character }}</span>
        <span v-show="filters.year !== ''"> in the year {{ filters.year }}</span>.<span v-if="filters.naughty == true">.. not even naughty ones.</span><span v-else>.. unless?</span>
      </h1>


        <div class="galleryBlock" v-for="node in sortedImages" :key="node.year" :id="'block_' + node.year">
          <h1 :id="'header_' + node.year">{{ node.year }}</h1>
            <div class="galleryGrid" :id="'gallery_' + node.year">
<!--<transition-group name="flip-list" tag="figure">-->
              <figure 
                v-for="image in node.images"
                :key="image.id"
                :class="image.tags.join(' ')"
                :id="'container_' + image.id"
                v-on:click="show(image)"
              >
                  <img :src="image.url + '?tr=n-gallery'" :id="'image_' + image.id" />
              </figure>
<!--</transition-group>-->
            </div>
        </div>

      <noscript>
        <label for="quality"> Only Quality </label>
        <input type="checkbox" id="quality" name="quality" value="quality">

        <label for="naughty"> Include Naughty </label>
        <input type="checkbox" id="naughty" name="naughty" value="naughty">

        <hr>

        <div class="galleryBlock" v-for="node in sortedImages" :key="node.year">
        <h1>{{ node.year }}</h1>

          <div class="galleryGrid" id="images">
            <figure 
              v-for="image in node.images"
              :key="image.id"
              :class="image.tags.join(' ')"
              :href="image.url"
            >
                <img :src="image.url + '?tr=n-gallery'" :id="image.id" loading="lazy" />
            </figure>
          </div>

      </div>
      </noscript>

  </Layout>
</template>

<page-query>
query {
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

  years: allYears {
    edges {
      node {
        year
      }
    }
  }

  characters: allCharacters {
    edges {
      node {
        name
      }
    }
  }

  styles: allStyles {
    edges {
      node {
        name
      }
    }
  }

}
</page-query>

<script>
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from "v-viewer"

export default {
  mounted() {
    var unsortedYears = []
    this.$page.years.edges.forEach(edge => unsortedYears.push(edge.node.year))
    this.years = unsortedYears.sort((a,b) => b-a)

    var unsortedCharacters = []
    this.$page.characters.edges.forEach(edge => unsortedCharacters.push(edge.node.name))
    this.characters = unsortedCharacters.sort()

    var unsortedStyles = []
    this.$page.styles.edges.forEach(edge => unsortedStyles.push(edge.node.name))
    this.styles = unsortedStyles.sort()

    var imageNodes = []
    this.$page.artworksDisplay.edges.forEach(edge => imageNodes.push(edge.node))
    this.allImages = imageNodes

    for (var year of this.years) {
      this.sortedImages.push( {year: year, images: this.allImages.filter(image => image.year == year)} )
    }

  },
  components: {
    Viewer
  },
  metaInfo: {
    title: 'Sprume Gallery'
  },
  data() {
    return {
      images: [],

      allImages: [],
      sortedImages: [],

      years: [],
      characters: [],
      styles: [],

      selectedYear: '',
      selectedCharacter: '',
      selectedStyle: '',
      naughty: true
    }
  },
  computed: {
    filters() {
      return { year: this.selectedYear, character: this.selectedCharacter, style: this.selectedStyle, naughty: this.naughty };
    },
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
      var that = this
      if (node.group == "") {
        that.images = [node.url]
        that.$viewer.show()
      } else {
        that.images = []
        for (var image of that.$page.artworks.edges.filter(edge => edge.node.group == node.group)) {
          that.images.push(image.node.url)
        }
        that.images.reverse()
        that.$viewer.show()
      }
    },
    resetFilters () {
      this.selectedYear = ''
      this.selectedCharacter = ''
      this.selectedStyle = ''
      this.naughty = true
    }
  }
}
</script>

<style scoped>

.filterBar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border: 1px black solid;
  margin: auto;
  width: 90%;
}

form {
  text-align: center;
  padding: 0.8em;
}

hr {
  width: 75%;
  margin: auto;
  margin-top: 1em;
  margin-bottom: 1em;
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

#quality:checked ~ .galleryBlock .galleryGrid figure {
  display: none;
}

#quality:checked ~ .galleryBlock .galleryGrid figure.Quality {
  display: block;
}

#naughty ~ .galleryBlock .galleryGrid figure.Naughty {
  display: none;
}

#naughty:checked ~ .galleryBlock .galleryGrid figure.Naughty {
  display: block;
}
</style>