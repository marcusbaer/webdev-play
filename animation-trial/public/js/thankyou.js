const App = {
    data () {
      return {
        headline: 'Empfehlungen',
        message: 'Vielleicht interessiert Sie einer dieser Artikel',
        teasers: [{
            title: 'Gemüsesorten mit viel Vitaminen',
            img: 'https://via.placeholder.com/300.webp/09f/fff',
            text: 'Lorem ipsum dolor sit amet'
        }, {
            title: 'In diesem Monat aussähen',
            img: 'https://via.placeholder.com/300.webp/09f/fff',
            text: 'Lorem ipsum dolor sit amet'
        }, {
            title: 'Blütenpracht im Sommer',
            img: 'https://via.placeholder.com/300.webp/09f/fff',
            text: 'Lorem ipsum dolor sit amet'
        }, {
            title: 'Obstbäume richtig beschneiden',
            img: 'https://via.placeholder.com/300.webp/09f/fff',
            text: 'Lorem ipsum dolor sit amet'
        }, {
            title: 'Das richtige Gartenwerkzeug',
            img: 'https://via.placeholder.com/300.webp/09f/fff',
            text: 'Lorem ipsum dolor sit amet'
        }, {
            title: 'Gartenzwerge - ja oder nein',
            img: 'https://via.placeholder.com/300.webp/09f/fff',
            text: 'Lorem ipsum dolor sit amet'
        }]
      }
    }
  }
  
  // eslint-disable-next-line no-undef
  Vue.createApp(App).mount('#app')
  