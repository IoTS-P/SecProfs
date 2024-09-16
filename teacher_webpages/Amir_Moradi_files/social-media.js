Vue.component('social-media', {
  data: function data() {
    return {
      socialMediaItems: []
    }
  },
  beforeCreate: function() {
    fetch(socialMediaItemsUrl).then(response => {
      if (response.ok){
        return response.json();
      } else{
        throw new Error('socialMediaItems couldn\'t be loaded');
      }
    })
    .then(json => {
      this.socialMediaItems = json;
    });
  }
});