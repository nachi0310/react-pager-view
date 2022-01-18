import React, {useRef, useEffect} from 'react'
import styles from './styles.module.css'

export const SwiperTabComponent = (props) => {
  console.log("styles", styles);
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;
  let tabContentRef = useRef(null);
  let position = props.position ? props.position : 'top';
  let className = 'topTabs';
  if(position === 'bottom') {
    className = 'bottomTabs';
  }
  let selectedTab = 0;

  const handleGesture = (touchstartX, touchstartY, touchendX, touchendY) => {
    const distx = touchendX - touchstartX;
    const disty = touchendY - touchstartY;
    let currentTab = localStorage.getItem('tabIndex');
    let tabContent = tabContentRef.current?.children;
    let tabs = document.querySelectorAll('.' + styles.tab);

    //left -> increament slide
    //right -> decreament slide
    if(tabContent) {
      tabContent = Array.from(tabContent);
    }
    if(Math.abs(distx) > Math.abs(disty)){
      if(distx > 0) {
        if(Number(currentTab) !== 0 ) {
          tabContent.forEach((content, i) => {
            if((Number(currentTab) - 1) === i) {
              Array.from(tabs)[i].className = styles.tab + " " + styles.selected;
              content.className = styles.showContent;
              localStorage.setItem('tabIndex', i);
            } else {
              content.className = styles.hideContent;
              Array.from(tabs)[i].className = styles.tab;
            }
          })
        }
      } else {
        if(Number(currentTab) < (tabContent.length - 1)) {
          tabContent.forEach((content, i) => {
            if((Number(currentTab) + 1) === i) {
              Array.from(tabs)[i].className = styles.tab + " " + styles.selected;
              content.className = styles.showContent;
              localStorage.setItem('tabIndex', i);
            } else {
              content.className = styles.hideContent;
              Array.from(tabs)[i].className = styles.tab;
            }
          })
        }
      }  
    }
  }

  useEffect(() => {
    let tabs = document.querySelectorAll('.' + styles.tab);
    let tabIndexfromStorage = localStorage.getItem('tabIndex');
    let tabContent = tabContentRef.current?.children;
    if(tabContent) {
      tabContent = Array.from(tabContent);
    }
    if(tabIndexfromStorage) {
      Array.from(tabs)[Number(tabIndexfromStorage)].className = styles.tab + " " + styles.selected;
      if(tabContent.length >= (tabIndexfromStorage + 1)) {
        tabContent[Number(tabIndexfromStorage)].className = styles.showContent;
      }
      tabContent.forEach((content, i) => {
        if(i !== Number(tabIndexfromStorage)) {
          content.className = styles.hideContent;
        }
      })
    } else {
      localStorage.setItem('tabIndex', '0');
      Array.from(tabs)[0].className = styles.tab + " " + styles.selected;
      if(tabContent.length >= 0) {
        tabContent[0].className = styles.showContent;
      }
      tabContent.forEach((content, i) => {
        if(i !== 0) {
          content.className = styles.hideContent;
        }
      })
    }
    //listening to scroll events
    document.querySelector('.' + styles.tabContent).addEventListener('touchstart', (event) => {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
    }, false);

    document.querySelector('.' + styles.tabContent).addEventListener('touchend',(event) => {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      handleGesture(touchstartX, touchstartY, touchendX, touchendY)
    }, false); 

  })


  let changeTab = (e) => {
    let children = e.currentTarget.parentElement.children;
    let tabContent = tabContentRef.current?.children;
    if(tabContent) {
      tabContent = Array.from(tabContent);
    }
    for(let i = 0; i < children.length; i++) {
      if(children[i] === e.currentTarget) {
        selectedTab = i;
        localStorage.setItem('tabIndex', selectedTab);
        children[i].className = styles.tab + " " + styles.selected;
        if(tabContent.length === children.length) {
          tabContent[i].className = styles.showContent;
        }
      } else {
        children[i].className = styles.tab
        if(tabContent.length === children.length) {
          tabContent[i].className = styles.hideContent;
        }
      }
    }
  }

  let tabStyle = props.tabStyle ? props.tabStyle : 'default'
  console.log("props", className);
  let listItems = null;
  let tabWidth = (100/Number(props.tabs.length)).toFixed(2) + 'vh';
  console.log(tabWidth, typeof tabWidth);

  if(props.tabs.length > 0) {
    listItems = props.tabs.map((tab, i) =>
      <div className={styles.tab} style={{width: tabWidth}} data-tabid={i} onClick={changeTab}>
        <img data-selected src={tab.selectedIcon}/>
        <img data-hidden src={tab.icon}/>
        <div key={i.toString()}>{tab.name}</div>
      </div>  
    )
  }
    
  return (
    <div className={styles.test}>
      {props.tabs.length > 0 &&
        <div className={styles[className]}>
          {listItems}
        </div>
      }  
      <div className={styles.tabContent} ref={tabContentRef}> 
        {props.children}
      </div>
    </div>
  )  
}
