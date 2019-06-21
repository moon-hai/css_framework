import { header } from './header'
import { footer } from './footer'

window.addEventListener('DOMContentLoaded', function () {
  header()
  footer()

  fetch('data.json')
  .then(response => response.json())
  .then(json => {
    console.log(json.branches)
  });
})
