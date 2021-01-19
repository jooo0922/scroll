'use strict';

/**
 * Element.getBoundingClientRect() method returns the size of an element and
 * its position relative to the viewport.
 * 이게 정확히 뭘 return하는 거냐면, DOMRect 오브젝트라는 걸 반환함.
 * A DOMRect describes the size and position of a rectangle.
 */
/**
 * window.pageYoffset is a read - only window property that returns the number of pixels
 * the document has been scrolled vertically.
 */
/**
 * string.slice() extracts a section of a string without modifying original string
 */
/**
 * offsetTop - A Number, representing the top position of the element, in pixels
 */

// ********** set date **********
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();
// ********** close links **********
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function(){
  // linksContainer.classList.toggle('show-links');
  // toggle로 하는 것도 좋다. 근데 downside가 있음. 만약 메뉴 리스트를 index.html에서 추가하거나 뺀다면?
  // 그럴 때마다 매번 리스트 갯수에 맞춰서 css height값을 수정해줄 것인가? 하드코딩으로?
  // toggle을 사용하는 접근법 자체는 아무 문제가 없지만, 이렇게 메뉴가 추가되거나 삭제되는 등의 시나리오에서는 비효율적임.

  // 그래서 다른 방법을 사용할 것이다.
  // Element.getBoundingClientRect() 를 이용할 것임.
  const containerHeight = linksContainer.getBoundingClientRect().height;
  // console.log(containerHeight); 
  // 이걸로 확인해보면 .links-container에 관한 DOMRect값들을 알 수 있고, 거기에는 현재 height: 0 이라는 정보도 확인할 수 있음. 
  // 근데 우리는 해당 사이즈의 화면에서 기본적으로 links container가 보이지 않게 하려고 heigth: 0으로 만들어버렸잖아 css에서!

  // 그니까 실제 lists의 높이값을 알 수가 없는 겨. 이걸 알려면 .links 의 DOMRect 의 높이값을 가져와야 됨. 왜냐? 이거는 우리가 0이라고 강제로 설정한 적이 없는거니까.
  // 우리는 container 의 높이값만 css에서 0으로 강제 설정했잖아. 실제 리스트들의 높이값은 .links가 가지고 있는거지.
  const linksHeight = links.getBoundingClientRect().height;
  // console.log(linksHeight); 이걸 보면 실제 리스트들의 높이값이 리스트들을 index.html에서 추가하거나 뺄때마다 달라지는 걸 볼 수 있음

  if (containerHeight === 0) { // 즉, default 상태, 리스트들을 감춰놓은 상태라는 뜻이지?
    linksContainer.style.height = `${linksHeight}px`; 
    // .links-container의 스타일의 높이값에 linksHeight값을 넣어주겠다는 것.
    // 중요한 건 여기서 지정하는 style값은 inline 임. 인라인은 외부 스타일보다 항상 강하다.
  } 
  else { // 리스트들이 오픈된 상태인 경우겠지?
    linksContainer.style.height = 0; // 높이값을 다시 0으로 줘서 리스트들이 안보이게 하겠다는 뜻
  }
});
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link'); // 맨 위로가기 버튼도 스크롤이 됬을 때 show하려고 하는거지?
// ********** fixed navbar **********
window.addEventListener('scroll', function(){
  // console.log(window.pageYOffset);  이거는 스크롤 시 navbar 변경시킬 때 많이 쓰일 것.
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height; // navbar의 높이만큼 스크롤 했을 때, 즉 navbar가 window에서 안보일 때 fixed nav를 나타나게 하려는 거니까!
  if (scrollHeight > navHeight) {
    navbar.classList.add('fixed-nav');
  }
  else {
    navbar.classList.remove('fixed-nav');
  }

  if (scrollHeight > 500) {
    topLink.classList.add('show-link');
  }
  else {
    topLink.classList.remove('show-link');
  }
});
// ********** smooth scroll **********
// 작은 화면에서 메뉴를 열어 클릭 후 스크롤된 상태에서, .links-container의 창이 열려있으니까 아래의 섹션이 잘 안보이는 문제가 생김.
// 그래서 스크롤하면서 자동으로 .links-container 가 닫히도록 만들거임.
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(function(link){ // 참고로 forEach는 Nodelist를 Array로 변환하지 않아도 사용 가능.
  link.addEventListener('click', function(e){
    // prevent default
    /**
     * event.preventDefault();
     * preventDefault 는 기본으로 정의된 이벤트를 작동하지 못하게 하는 메서드입니다.
     * <a>,<input>,<textarea>의 기본 동작을 막을 수 있습니다.
     *   
     * a태그는 적용된 href 링크값으로 페이지 이동을 해주는 기본적인 기능을 가지고 있습니다.
     * a태그를 클릭 했을 때 preventDefault() 메서드를 실행시켜 주면 페이지 이동을 하는 기본 기능을 막는 것 입니다.
     */
    e.preventDefault();

    // navigate to specific spot
    const id = e.currentTarget.getAttribute('href').slice(1); 
    // getAttribute() 은 해당 요소에 지정된 값을 반환합니다. 만약 주어진 속성이 존재하지 않는다면, null 값이나 ""(빈문자열); 을 반환할 것입니다. 
    // slice(1)은 href값이 #~~~ 이렇게 나오니까, #을 없애려고 쓴거임. 왜 #을 없애냐고? 저 값을 getElementById() 여기에 넣을려고!
    console.log(id);
    const element = document.getElementById(id);

    // calculate the heights
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains('fixed-nav');
    let position = element.offsetTop - navHeight; 
    console.log(position); // 이렇게 하면, fixed-nav가 붙었을때와 안붙었을때 position이 차이가 나는 걸 확인할 수 있음.
    // 이거는 해당 section의 top position을 return해줌. 

    /**
     * 여기서 문제가 뭐냐면, fixed-nav가 없는 상태에서 메뉴 클릭 이동하면 섹션의 타이틀이 가려짐. why? 
     * fixed-nav가 붙는 순간, nav는 position: fixed가 되서 normal flow를 빠져나오게 된다. 이게 뭔말이냐면,
     * 
     * fixed-nav가 없을때는 position: static 즉, 포지션이 기본값일 때는 -navHeight(-82)한 상태의 position으로 이동하면
     * section title바로 위에서 딱 멈춰야하는 게 맞아! 그게 맞거든? 
     * 그래서 섹션의 타이틀이 가려지는 곳까지 갔을때의 position도 navHeight(82)만큼이 빠진 값인게 맞긴 해.
     * 
     * 클릭해서 이동하는 순간 스크롤이 자동 실행되는거지? 그럼 스크롤 이벤트를 받아서 
     * 위에서 스크롤 이벤트에 리스너 걸어둔 애가 콜백함수 호출하면 nav에다가 fixed-nav를 붙여주기로 했잖아 그치?
     * 그럼 그게 붙게되는 순간 nav의 position: fixed가 되는거야.
     * 
     * 여기서 중요한 게 position: fixed가 되어버리면, 해당 element는 일반적인 문서 대열에서 벗어나게 되는거야.
     * 그니까 position: fixed되면 얘는 아예 문서 대열의 흐름에서 없는 애로 친다고. 무시된다고. 없는 셈 치는거야.
     * 그니까 82만큼의 높이값(즉, position: fixed가 되어버린 nav의 높이값만큼)이 사라진 문서 대열에서
     * -navHeight(82를 뺀만큼)의 position으로 이동해봐야 또 가려져서 안보이게 되는거지. 
     * 왜? 맨 위에 문서대열 흐름을 이탈한 놈 때문에 전체적으로 문서 자체가 82만큼 위로 연쇄적으로 올라가버렸거든.
     * 
     * 그래서 이렇게 처음에는 fixed가 아니였다가 fixed인 애들은 문서흐름이 전체적으로 82만큼 올라간 것을 고려 안한 상태에서
     * 82가 빠진 만큼의 position으로 이동한거기 때문에 섹션의 제목이 여전히 가려지는 위치로 이동하게 된다는거야.
     * 
     * 그래서 정확히 말하면 이 if문에서는 fixed-nav가 안붙어있는 경우에는 navHeight을 한 번 더 빼줘라 라는거야.
     * 그래서 전체적으로 문서 대열이 82만큼 올라간 상태에서 한번 navHeight을 더 빼줘야 타이틀이 보이는 위치로 갈 수 있다는 거지. 
     */
    /**
     * 반면에, 이미 nav의 position: fixed가 되어있는 상태에서는, 다른 링크를 클릭하거나 하더라도
     * 문서 대열이 전체적으로 올라가게 된다거나 그런 거 없이 일정하잖아?
     * 그니까 딱 한번만 navHeight만큼 빼줘도 섹션의 타이틀이 보이는 위치로 이동할 수 있는거지
     */
    if (!fixedNav) { // 스크롤을 안해서, 스크롤이 맨 위에 있는, 그래서 fixed-nav가 붙어있지 않은 상태
      position = position - navHeight
      // 이 상태일때도 스크롤해서 얻게 된 navHeight 값을 빼라는 거지.
    }
    if (navHeight > 82) { // navHeight이 82보다 큰 상태는 화면이 줄어들어서 links의 height만큼 높이값이 늘어난 상태라는 거지?
      position = position + containerHeight 
      // 즉, linksContainer의 높이값이 빠진 (-navHeight) 상태에서 top position으로 옮겨간거고, 그래서 위에 큰 여백이 생긴 상태로 옮겨가게 되었으니,
      // 그만큼의 높이값을 다시 더해준 top position으로 가라는 뜻
    }

    window.scrollTo({ // window.scrollTo(x-좌표, y-좌표) 문서의 지정된 위치로 스크롤합니다.
      left: 0,
      top: position,
    });
    linksContainer.style.height = 0; // 이렇게 하면 작은 화면에서는 메뉴창이 자동으로 닫혀서 가려진 section들이 잘 보이게 됨.
  });
});