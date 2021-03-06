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
    const navItem = document.querySelector(`[href="${item}"]`);
    const block = document.querySelector(item);
    navItem.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo(0, block.offsetTop - header.offsetHeight);
    });
  });

  // 隨卷軸移動讓 nav item 加上 active
  const navActive = () => {
    blockList.forEach(item => {
      const navItem = document.querySelector(`[href="${item}"]`);
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
  navBtn.addEventListener('click', () => {
    const nav = document.querySelector('.nav ul');
    navBtn.classList.toggle('navBtn_close');
    nav.classList.toggle('nav_open');
  });

  // profile高度
  const profileRowHeightSet = () => {
    const profile = document.querySelector('#profile');
    const profileRow1 = profile.querySelector('.profile_row1');
    const profileTitle = window.getComputedStyle(profile, '::before');
    const titleHeightList = [profileTitle['height'], profileTitle['padding-bottom'], profileTitle['padding-top']];
    const titleHeight = titleHeightList
      .map(string => string.replace(/px/gi, '') * 1)
      .reduce((prev, next) => {return prev + next}, 0) + 'px';
    const rowHeight = `calc(100vh - ${titleHeight} - ${header.offsetHeight}px * 2)`;
    profileRow1.style.setProperty('min-height', rowHeight);
  };
  profileRowHeightSet();
  window.addEventListener('resize', profileRowHeightSet);

  // 自傳詳細的按鈕
  const aboutBtn = document.querySelector('.profile_about .btn');
  let aboutBtnText = 'Hide';
  const moreBtnHandler = function () {
    const aboutMore = document.querySelector('.profile_more');
    aboutMore.classList.toggle('hide');
    const preText = this.textContent;
    this.textContent = aboutBtnText;
    aboutBtnText = preText;
  };
  aboutBtn.addEventListener('click', moreBtnHandler);

  // 技能圖百分比數
  const circles = document.querySelectorAll('.soft .progress, .coding .progress');
  circles.forEach(circle => {
    const percent = circle.dataset.level;
    const span = circle.querySelector('span');
    span.textContent = percent + '%';
  });

  // 技能圖動畫
  const circleAnimate = circle => {
    const percent = circle.dataset.level;
    const fill = circle.querySelector('.fill');
    const bar = circle.querySelector('.bar');
    circle.classList.add(`p${percent}`);
    fill.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'transform') bar.classList.add('visitable');
    });
  };
  const barAnimate = bar => {
    const percent = bar.dataset.level;
    bar.classList.add(`size-${percent}`);
  };
  const skillAnimateActive = () => {
    const skillTop = document.querySelector('.skills').offsetTop;
    const bars = document.querySelectorAll('.lang .progress');
    if (window.scrollY + window.innerHeight / 3 > skillTop) {
      circles.forEach(circleAnimate);
      bars.forEach(barAnimate);
    }
  };
  window.addEventListener('scroll', skillAnimateActive);

  // 作品集光箱
  const projectImageLink = document.querySelectorAll('.imageLink');
  const showImageLarge = (e) => {
    e.preventDefault();
    const imageLarge = e.currentTarget.nextSibling;
    const imageLargeClose = imageLarge.querySelector('.imageLarge_close');
    imageLarge.classList.add('show');
    imageLargeClose.addEventListener('click', () => imageLarge.classList.remove('show'));
  };
  projectImageLink.forEach(link => link.addEventListener('click', showImageLarge));

  // 作品集 Float 高度
  const projectFloat = document.querySelectorAll('.float');
  const floatHeight = [...projectFloat]
    .map(box => box.offsetHeight)
    .sort((prev, next) => next - prev);
  projectFloat.forEach(box => {
    box.style.height = floatHeight[0] + 'px';
  });
}