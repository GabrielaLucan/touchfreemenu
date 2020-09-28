document.querySelectorAll('.category-button').forEach((x) => {
  x.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      this.classList.add('active');
    }
  });
});
