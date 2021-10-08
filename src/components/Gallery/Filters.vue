<template>
    <div>
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
</static-query>

<script>
export default {
    mounted () {
        var unsortedYears = []
        this.$static.years.edges.forEach(edge => unsortedYears.push(edge.node.year))
        this.years = unsortedYears.sort((a,b) => b-a)

        var unsortedCharacters = []
        this.$static.characters.edges.forEach(edge => unsortedCharacters.push(edge.node.name))
        this.characters = unsortedCharacters.sort()

        var unsortedStyles = []
        this.$static.styles.edges.forEach(edge => unsortedStyles.push(edge.node.name))
        this.styles = unsortedStyles.sort()
    },
    data () {
        return {
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
        filters() {
            this.$emit('filterChange', this.filters)
        }
    },
    methods:{
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
</style>