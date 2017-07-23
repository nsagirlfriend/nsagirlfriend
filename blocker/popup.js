function uninstallNsa() {
  chrome.management.uninstall( 'obcbjekkchimndgicnkoiblhdmnfppah', function(res) {
    console.log(res);
  })
}

document.getElementById('pay').addEventListener('click', uninstallNsa);
