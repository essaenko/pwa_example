import newsURL from './news.data';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await navigator.serviceWorker.register('/worker.ts');
  } catch (e) {
    console.warn('Error while registering service worker: ', e);
  }

  const news = await (await fetch(newsURL)).json();

  news.news.forEach((n: { id: number, title: string, body: string }) => {
    const newsElement = document.createElement('div');
    newsElement.classList.add('news__item');
    newsElement.id = `${n.id}_ news`;
    newsElement.innerHTML = `<h2>${n.title}</h2><span>${n.body}</span>`;

    document.body.querySelector('.news').appendChild(newsElement);
  });
})