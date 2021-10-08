//var imagekit = new ImageKit({
//  publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
//  privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
//  urlEndpoint : "https://ik.imagekit.io/enj0y/"
//});

//const ImageKit = require('imagekit')
const axios = require('axios')

module.exports = function (api) {

  api.loadSource(async actions => {

    const { data } = await axios.get('https://api.imagekit.io/v1/files', {
      auth: {
        username: process.env.IMAGEKIT_PRIVATE_KEY,
        password: ''
      } 
    })
    const artworks = actions.addCollection('Artworks')
    const characters = ['Jamie', 'Sprume', 'Lunith', 'CEO', 'D6', 'Bloodmasked', 'Animus', 'Bert', 'Gob', 'Andrea', 'Boomer']
    const styles = ['Colour', 'Analog', 'Text', 'Symmetry', 'Profile']

    for (const item of data) {
      var pathArray = item.filePath.split('/')
      var groupName = (pathArray.length > 5 ? pathArray[4] : '')
      if (item.tags) {
        var itemCharacters = item.tags.filter(tag => characters.includes(tag))
        var itemStyles = item.tags.filter(tag => styles.includes(tag))
        var itemNaughty = item.tags.includes("Naughty")
        var primaryDisplay = (item.tags.includes("Main") || item.tags.includes("Single") ? true : false)
        var tags = item.tags
      } else {
        var itemCharacters = []
        var itemStyles = []
        var itemNaughty = false
        var primaryDisplay = false
        var tags = []
      }
      if (item.filePath.startsWith("/Sprume/")) {
        artworks.addNode({
          id: item.fileId,
          title: item.name,
          path: item.filePath,
          pathArray: pathArray,
          year: pathArray[2],
          month: pathArray[3],
          group: groupName,
          tags: tags,
          characters: itemCharacters,
          styles: itemStyles,
          naughty: itemNaughty,
          display: primaryDisplay,
          url: item.url,
          height: item.height,
          width: item.width
        })
      }
    }
  })

  api.loadSource(async actions => {
    const { data } = await axios.get('https://api.imagekit.io/v1/files?type=folder&path=Sprume', {
      auth: {
        username: process.env.IMAGEKIT_PRIVATE_KEY,
        password: ''
      } 
    })
    const years = actions.addCollection('Years')
    for (const item of data) {
      years.addNode({
        year: item.name
      })
    }
  })

  api.loadSource(actions => {
    const data = ['Jamie', 'Sprume', 'Lunith', 'CEO', 'D6', 'Bloodmasked', 'Animus', 'Bert', 'Gob', 'Andrea', 'Boomer']
    const characters = actions.addCollection('Characters')
    for (const item of data) {
      characters.addNode({
        name: item
      })
    }
  })

  api.loadSource(actions => {
    const data = ['Colour', 'Analog', 'Text', 'Symmetry', 'Profile']
    const styles = actions.addCollection('Styles')
    for (const item of data) {
      styles.addNode({
        name: item
      })
    }
  })
}
