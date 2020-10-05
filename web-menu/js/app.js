polyfill();

document.querySelectorAll('.category-button').forEach((x) => {
  x.addEventListener('click', function () {
    if (this.classList.contains('active')) {
      this.classList.remove('active');
    } else {
      this.classList.add('active');
    }
  });
});

document.querySelectorAll('#searchInput').forEach((x) => {
  setTimeout(() => {
    x.addEventListener('focus', function () {
      window.scrollTo({ top: 198, behavior: 'smooth' });
    });
  }, 300);
});

const dateInput = document.querySelector('#dateTime');
const date = new Date();
dateInput.value = `${(date.getDate() + '').padStart(2, '0')}.${(date.getMonth() + 1 + '').padStart(2, '0')} @ ${(date.getHours() + '').padStart(2, '0')}:${(date.getMinutes() + '').padStart(2, '0')}`;

document.querySelectorAll('.field').forEach((x) => {
  x.addEventListener('keyup', (e) => {
    checkFormValidity();
  });
});

const submitButton = document.querySelector('#seeMenuButton');
submitButton.addEventListener('click', async () => {
  document.querySelector('.pre-menu').classList.add('loading');

  const suppliedName = document.querySelector('#fullName').value;
  const suppliedPhoneNumber = document.querySelector('#phoneNumber').value;

  await fetch('/api/covid-questionnaire', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: suppliedName, phoneNumber: suppliedPhoneNumber }),
  });

  document.querySelector('.pre-menu').remove();
  window.scrollTo(0, 0);
});

function checkFormValidity() {
  const suppliedName = document.querySelector('#fullName').value;
  const suppliedPhoneNumber = document.querySelector('#phoneNumber').value;

  if (suppliedName.length < 2) {
    submitButton.disabled = true;

    return;
  }

  if (suppliedPhoneNumber.length < 8) {
    submitButton.disabled = true;

    return;
  }

  if (!/^[0-9\s\+]+$/.test(suppliedPhoneNumber)) {
    submitButton.disabled = true;

    return;
  }

  submitButton.disabled = false;
}
