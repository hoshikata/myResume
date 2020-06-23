{
  // 讓 header 黏在頂端
  const header = document.querySelector('#header');
  let headerTop = header.offsetTop;
  window.addEventListener('resize', () => headerTop = header.offsetTop === 0 ? headerTop : header.offsetTop);
  const stickyHeader = () => {
    if (window.scrollY >= headerTop) header.classList.add('fixed');
    else header.classList.remove('fixed');
  };
  window.addEventListener('scroll', stickyHeader);

  // nav button跳轉
  const blockList = ['#top', '#profile', '#resume', '#portfolio'];
  blockList.forEach(item => {
    const navItem = document.querySelector(`[data-target="${item}"]`);
    const block = document.querySelector(item);
    navItem.addEventListener('click', () => {
      window.scrollTo(0, block.offsetTop - 70);
    });
  });

  // 隨卷軸移動讓 nav item 加上 active
  const navActive = () => {
    blockList.forEach(item => {
      const navItem = document.querySelector(`[data-target="${item}"]`);
      const block = document.querySelector(item);
      const scrollDistance = window.scrollY + window.innerHeight / 3;
      const start = scrollDistance > block.offsetTop;
      const end = scrollDistance < block.offsetTop + block.offsetHeight;
      if (start && end) navItem.classList.add('active');
      else navItem.classList.remove('active');
    });
  };
  window.addEventListener('scroll', navActive);

  // 漢堡選單
  const navBtn = document.querySelector('.navBtn');
  const nav = document.querySelector('.nav ul');
  navBtn.addEventListener('click', () => {
    navBtn.classList.toggle('navBtn_close');
    nav.classList.toggle('nav_open');
  })

  // 自傳詳細的按鈕
  const aboutMore = document.querySelector('.profile_more');
  const aboutBtn = document.querySelector('.profile_about .btn');
  let aboutBtnText = 'Hide';
  const moreBtnHandler = () => {
    aboutMore.classList.toggle('hide');
    const preText = aboutBtn.textContent;
    aboutBtn.textContent = aboutBtnText;
    aboutBtnText = preText;
  }
  aboutBtn.addEventListener('click', moreBtnHandler);
}