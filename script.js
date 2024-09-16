document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.menu-button');
  const popupMenuButton = document.querySelector('.popup-menu-button');
  const popupMenu = document.getElementById('popupMenu');
  const mainContent = document.getElementById('main-content');
  let menuIsOpen = false;

  // Открытие/закрытие меню
  menuButton.addEventListener('click', toggleMenu);
  popupMenuButton.addEventListener('click', toggleMenu);

  function toggleMenu() {
    if (menuIsOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    popupMenu.style.right = "0";
    menuIsOpen = true;
  }

  function closeMenu() {
    popupMenu.style.right = "-250px";
    menuIsOpen = false;
  }

  // Обработка кликов по ссылкам внутри popup меню
  const links = document.querySelectorAll('#popupMenu nav ul li a');
  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // Остановка стандартного поведения ссылки
      const filePath = this.getAttribute('data-file'); // Получение пути к файлу из атрибута data-file
      loadPage(filePath); // Загрузка страницы с использованием AJAX
      closeMenu(); // Закрытие меню после клика по ссылке
    });
  });

  // Функция загрузки страницы с использованием AJAX
  function loadPage(filePath) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        mainContent.innerHTML = xhr.responseText; // Замена содержимого main-content
        console.log(`Page ${filePath} loaded successfully.`);
      } else if (xhr.readyState === 4) {
        console.error(`Error loading page: ${filePath}, status: ${xhr.status}`);
        mainContent.innerHTML = `<p>Error loading page. Please try again later.</p>`;
      }
    };
    xhr.send();
  }
});

