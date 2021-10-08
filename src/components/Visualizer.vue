<template>
  <div class="visualizer">

    <img 
      class="fore"
      v-for="(artwork, index) in artworksFore"
      :key="artwork.id"
      :src="artwork.url + `?tr=n-visualizer`"
      :id="'fore_' + index"
      v-on:click="roll('fore_' + index, 'fore')">

    <img 
      class="distant"
      v-for="(artwork, index) in artworksDistant"
      :key="artwork.id" :src="artwork.url + `?tr=n-gallery`"
      :id="'distant_' + index"
      v-on:click="roll('distant_' + index, 'distant')">

  </div>
</template>

<static-query>
query {
  artwork: allArtworks(filter: {
      tags: { contains: ["Quality"] }
  }) {
    edges {
      node {
        id
        url
        tags
        height
        width
      }
    }
  }
}
</static-query>

<script>
export default {
  name: 'Visualizer',
  data() {
    return {
      allArtworks: [],
      allAmount: 0,

      artworksDistant: [],
      artworksFore: []
    }
  },
  mounted() {
    this.allArtworks = this.$static.artwork.edges.map(edge => edge.node)
    this.allAmount = this.allArtworks.length - 1
    for(var i=0;i<3;i++) {
      this.artworksFore.push(this.allArtworks[this.getRandomInt(this.allAmount)])
    }
    for(var i=0;i<3;i++) {
      this.artworksDistant.push(this.allArtworks[this.getRandomInt(this.allAmount)])
    }
  },
  methods: {
    getRandomInt(max) {
      return Math.floor(Math.random() * max)
    },
    roll(id, mode) {
      var pushedEl = document.querySelector('img#'+id)
      var modeEndpoint = (mode == "distant" ? "n-gallery" : "n-visualizer")
      pushedEl.src = this.allArtworks[this.getRandomInt(this.allAmount)].url + '?tr=' + modeEndpoint
    }
  }
}
</script>

<style scoped>
.visualizer {
  width: 100%;
}

img {
  position: absolute;
  display: block;
  border-radius: 0.2em;
  mix-blend-mode: normal;
  background-color: white;
  transform: scale(0);
  opacity: 0.8;
  object-fit: scale-down;
  filter: saturate(0.8);
  outline: rgba(109, 109, 109, 0.5) 2px solid;
  transition: all 0.2s;
  filter: saturate(0);
}

img.fore {
  height: auto;
}

img.distant {
  max-height: 200px;
  max-width: 200px;
}

#fore_0 {
  max-height: 350px;
  filter: saturate(1);
  z-index: 6;
  opacity: 1;
  left: 40%;
  top: 10%;
  animation: HoverFore0 4.8s ease-in-out alternate infinite;
}

@keyframes HoverFore0 {
  from {
    transform: rotateX(-15deg) rotateY(5deg) rotateZ(15deg);
  }
  to {
    transform: rotateX(15deg) rotateY(-5deg) rotateZ(-15deg);
  }
}

#fore_1 {
  max-height: 350px;
  max-width: 350px;
  z-index: 5;
  opacity: 0.6;
  left: 50%;
  top: 35%;
  animation: HoverFore1 5.9s ease-in-out alternate infinite;
}

@keyframes HoverFore1 {
  from {
    transform: rotateX(5deg) rotateY(-10deg) rotateZ(5deg);
  }
  to {
    transform: rotateX(25deg) rotateY(5deg) rotateZ(-5deg);
  }
}

#fore_2 {
  max-height: 300px;
  max-width: 300px;
  z-index: 4;
  opacity: 0.5;
  left: 30%;
  top: 45%;
  animation: HoverFore2 6.5s linear alternate infinite;
}

@keyframes HoverFore2 {
  from {
    transform: rotateX(-25deg) rotateY(-5deg) rotateZ(-15deg);
  }
  to {
    transform: rotateX(10deg) rotateY(8deg) rotateZ(10deg);
  }
}

#distant_0 {
  z-index: 3;
  opacity: 0.4;
  left: 30%;
  top: 30%;
  
  animation: HoverDist0 5.7s ease-in-out alternate infinite;
}

@keyframes HoverDist0 {
  from {
    transform: rotateX(15deg) rotateY(10deg) rotateZ(15deg);
  }
  to {
    transform: rotateX(5deg) rotateY(25deg) rotateZ(-14deg);
  }
}

#distant_1 {
  z-index: 2;
  opacity: 0.3;
  left: 50%;
  top: 70%;
  animation: HoverDist1 4.2s linear infinite;
}

@keyframes HoverDist1 {
  from {
    transform: rotateX(0deg) rotateY(180deg) rotateZ(-90deg);
  }
  to {
    transform: rotateX(360deg) rotateY(-180deg) rotateZ(270deg);
  }
}

#distant_2 {
  z-index: 1;
  opacity: 0.3;
  left: 65%;
  top: 10%;
  animation: HoverDist2 4s ease-in-out alternate infinite;
}

@keyframes HoverDist2 {
  from {
    transform: rotateX(-20deg) rotateY(20deg) rotateZ(-5deg);
  }
  to {
    transform: rotateX(10deg) rotateY(-20deg) rotateZ(5deg);
  }
}

img:hover { 
  opacity: 1;
  filter: saturate(1);
  outline: var(--spreen) 4px solid;

}

img:active {
  src: none;
  outline: var(--sprange) 8px solid;
}

@media screen and (max-width: 720px) {
  #fore_0{
    max-width: 300px;
    max-height: 300px;
    left: 25%;
  }
  #fore_1 {
    max-width: 200px;
    max-height: 200px;
    left: 70%;
  }
  #fore_2 {
    max-width: 200px;
    max-height: 200px;
    left: 0%;
  }
  #distant_0, #distant_1, #distant_2 {
    max-width: 150px;
    max-height: 150px;
  }
  #distant_0 {
    left: 10%;
    top: 20%;
  }
  #distant_1 {
    top: 60%;
    left: 50%;
  }

}

@media screen and (max-width: 360px) {
  #fore_0{
    max-width: 200px;
    max-height: 200px;
    left: 25%;
  }
  #fore_1 {
    max-width: 120px;
    max-height: 120px;
    left: 70%;
  }
  #fore_2 {
    max-width: 120px;
    max-height: 120px;
    left: 0%;
  }
  #distant_0, #distant_1, #distant_2 {
    max-width: 80px;
    max-height: 80px;
  }
  #distant_0 {
    left: 10%;
    top: 20%;
  }
  #distant_1 {
    top: 60%;
    left: 50%;
  }

}

</style>
