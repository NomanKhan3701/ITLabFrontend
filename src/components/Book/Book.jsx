import React from 'react'
import { useEffect } from 'react';
import './Book.scss'

const Book = () => {
  const pagesRef = React.useRef(null);
  const [pages, setPages] = React.useState([
    {
      id: 0,
      img: '/public/assets/images/bookCover.svg',
      title: 'The Book of Joy',
    },
    {
      id: -1,
    },
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ',
    },
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ',
    },
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ',
    },
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ',
    },
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ',
    },
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ',
    },
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ',
    },
    {
      id: -1,
    }, {
      id: -1,
    }
  ]);


  useEffect(() => {

    if (pages.length % 2 !== 0) {
      const newPages = [...pages];
      newPages.push({ id: -1 });
      setPages(newPages);
    }
  }, [pages]);

  return (
    <div className='Book'>
      <div id="pages" className="pages" ref={pagesRef}>
        {
          pages.map((page, index) => {

            const flipPage = (e) => {
              const page = e.currentTarget;
              const pageNum = index + 1;
              if (pageNum % 2 === 0) {
                page.classList.remove('flipped');
                page.previousElementSibling.classList.remove('flipped');

                if (pageNum === 2) {
                  pagesRef.current.style.transform = 'translateX(0)';
                  return;
                }
              }
              else {
                page.classList.add('flipped');
                page.nextElementSibling.classList.add('flipped');
              }
              pagesRef.current.style.transform = 'translateX(25%)';
            }

            if (index === 0) {
              return (
                <div className="page" onClick={flipPage} key={index} style={{ zIndex: `${index % 2 === 0 ? pages.length - index : 0}` }}>
                  <div className='cover_wrapper front_1'>
                    <div className='cover_img'>
                      <img src='/public/assets/images/bookCoverBg.jpg' alt="" />
                    </div>
                    <div className="author_name">Noman</div>
                  </div>
                </div>
              )
            } else if (pages.length % 2 === 0 && index === pages.length - 3) {
              return (
                <div className="page" key={index} onClick={flipPage} style={{ zIndex: `${index % 2 === 0 ? pages.length - index : 0}` }}>
                  <div className='cover_wrapper back_2'>

                  </div>
                </div>
              )
            } else if (index === pages.length - 2 || index === pages.length - 1) {
              return (
                <div className="page" key={index} onClick={flipPage} style={{ zIndex: `${index % 2 === 0 ? pages.length - index : 0}` }}>
                  <div className='cover_wrapper back_1'>
                    <div className='cover_img'>
                      <img src='/public/assets/images/bookCoverBg.jpg' alt="" />
                    </div>
                  </div>
                </div>
              )
            } else if (page.id === -1) {
              return (
                <div className="page " onClick={flipPage} key={index} style={{ zIndex: `${index % 2 === 0 ? pages.length - index : 0}` }}>
                  <div className='cover_wrapper front_2'>
                    <div className='cover_img'>
                      <img src='/public/assets/images/bookCoverBg.jpg' alt="" />
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <div className="page" onClick={flipPage} key={index} style={{ zIndex: `${index % 2 === 0 ? pages.length - index : 0}` }}>
                  <div className='page_content'>
                    {page.text}
                    <div className="page_count">{index - 1}</div>
                  </div>
                </div>
              )
            }

          })
        }
      </div>

    </div>
  )
}

export default Book