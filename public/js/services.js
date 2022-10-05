let services = (async function() {
  const r = await fetch('/service-categories')
  const p = await r.json();
  let out = '';
  for (let u of p) {
    out += '<div class="serviceCard card mx-auto category-' + u.id + '">'
    out += '<div class="card-header text-center">' + u.title + '</div>'
    out += '<div class="card-body"><ul>'
    const r1 = await fetch('/services')
    const p1 = await r1.json();
    for (let u1 of p1) {
      if (u1.categoryId === u.id)
        out += '<li><p class="card-text leftstr">'+ u1.title + '</p><a class="rightstr servicePrice text-muted">от ' + u1.price + '$</a></li>'
    }
    out += '</ul><div class="text-center"><a class="btn btn-primary" href="sign_up_for_an_appointment">Записаться</a></div></div></div>'
  }
  document.getElementById('services_container').innerHTML = out;
  document.getElementById('preloader').remove();
});