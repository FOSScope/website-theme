utils.jq(() => {
  async function addData(el, api) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", api);

    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);

          const login = data.login;
          const name = data.name;
          const id = "@" + login;
          const link =
            '<a href="https://github.com/' + login + '">@' + login + "</a>";
          const bio = data.bio || "";

          const ghusernameEls = document.getElementsByClassName(
            "ghusername-" + login
          );
          for (var i = 0; i < ghusernameEls.length; i++) {
            console.log("ghusernameEls[i]");
            console.log(ghusernameEls[i]);
            const ghusernameEl = ghusernameEls[i];
            console.log("ghusernameEl");
            console.log(ghusernameEl);
            if (name) {
              ghusernameEl.innerHTML = name;
            } else {
              ghusernameEl.innerHTML = id;
            }
          }

          const ghuserinfoEls = document.getElementsByClassName("ghuserinfo");
          for (var i = 0; i < ghuserinfoEls.length; i++) {
            console.log(ghuserinfoEls[i]);
            const ghuserinfoEl = ghuserinfoEls[i];
            console.log(ghuserinfoEl);
            const username = ghuserinfoEl.getAttribute("username");
            if (username.toLocaleLowerCase == login.toLocaleLowerCase) {
              if (name) {
                ghuserinfoEl.innerHTML = name + " (" + link + ")";
              } else {
                ghuserinfoEl.innerHTML = link;
              }
            }
          }

          const ghuserbreadcrumbEls =
            document.getElementsByClassName("ghuserbreadcrumb");
          for (var i = 0; i < ghuserbreadcrumbEls.length; i++) {
            console.log(ghuserbreadcrumbEls[i]);
            const ghuserbreadcrumbEl = ghuserbreadcrumbEls[i];
            console.log(ghuserbreadcrumbEl);
            const username = ghuserbreadcrumbEl.getAttribute("username");
            if (username.toLocaleLowerCase == login.toLocaleLowerCase) {
              if (name) {
                ghuserbreadcrumbEl.innerHTML = name + " (" + id + ")";
              } else {
                ghuserbreadcrumbEl.innerHTML = id;
              }
            }
          }

          const bioEls = document.getElementsByClassName("ghbio");
          for (var i = 0; i < bioEls.length; i++) {
            console.log(bioEls[i]);
            const bioEl = bioEls[i];
            console.log(bioEl);
            const username = bioEl.getAttribute("username");
            if (username.toLocaleLowerCase == login.toLocaleLowerCase) {
              bioEl.innerText = bio;
            }
          }
        } else {
          el.innerText = "Error: " + xhr.statusText;
        }
      }
    };

    xhr.onerror = function (e) {
      el.innerText = "Error: " + xhr.statusText;
    };

    xhr.send(null);
  }

  $(function () {
    const els = document.getElementsByClassName("ds-ghuserinfo");
    for (var i = 0; i < els.length; i++) {
      const el = els[i];
      console.log(el);

      const api = el.getAttribute("api");
      if (api == null) {
        continue;
      }

      console.log(el);

      addData(el, api);
    }
  });
});
