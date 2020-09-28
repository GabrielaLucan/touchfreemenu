// polyfill();

document.querySelectorAll('.category-button').forEach((x) => {
  x.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      this.classList.add('active');
    }
  });
});

document.querySelectorAll('input[type=text]').forEach((x) => {
  x.addEventListener('focus', function () {
    window.scrollTo({ top: 198, behavior: 'smooth' });
  });
});
