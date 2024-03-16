utils.jq(() => {
  $(function () {
    const els = document.getElementsByClassName('ds-ghuserinfo');
    for (var i = 0; i < els.length; i++) {
      const el = els[i];
      console.log(el);

      const api = el.getAttribute('api');
      if (api == null) {
        continue;
      }

      console.log(el);

      var xhr = new XMLHttpRequest();
      xhr.open('get', api);

      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            const login = data.login;
            const name = (data.name + ' (<a href="https://github.com/' + login + '">@' + login + '</a>)') || '<a href="https://github.com/' + login + '">@' + login + '</a>';
            const bio = data.bio || '';

            const nameEls = document.getElementsByClassName('ghusername');
            for (var i = 0; i < nameEls.length; i++) {
              console.log(nameEls[i]);
              const nameEl = nameEls[i];
              console.log(nameEl);
              const username = nameEl.getAttribute('username');
              if (username.toLocaleLowerCase == login.toLocaleLowerCase) {
                nameEl.innerHTML = name;
              }
            }

            const bioEls = document.getElementsByClassName('ghbio');
            for (var i = 0; i < bioEls.length; i++) {
              console.log(bioEls[i]);
              const bioEl = bioEls[i];
              console.log(bioEl);
              const username = bioEl.getAttribute('username');
              if (username.toLocaleLowerCase == login.toLocaleLowerCase) {
                bioEl.innerText = bio;
              }
            }
          } else {
            el.innerText = 'Error: ' + xhr.statusText;
          }
        }
      };

      xhr.onerror = function (e) {
        el.innerText = 'Error: ' + xhr.statusText;
      };

      xhr.send(null);
    }
  });
});
