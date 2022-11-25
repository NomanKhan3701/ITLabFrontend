import React from 'react'
import { useEffect } from 'react';
import './Book.scss'

const Book = ({ currAuthor, setCurrAuthor, reRender, setReRender }) => {
  const pagesRef = React.useRef(null);
  const [pages, setPages] = React.useState([]);

  useEffect(() => {
    if (pages) {
      if (pages.length % 2 !== 0) {
        const newPages = [...pages];
        newPages.push({ id: -1 });
        setPages(newPages);
      }
    }
  }, [pages])

  useEffect(() => {
    if (reRender) {
      setPages([]);
      setReRender(false);
      pagesRef.current.style.transform = 'translateX(0)';
    }
  }, [reRender])

  useEffect(() => {
    if (currAuthor) {
      const pages = [
        {
          id: 0,
        }, {
          id: -1,
        }
      ]
      currAuthor.Post.map((post, index) => {
        pages.push({
          id: post.postId,
          shayari: post.content,
        })
      })
      pages.push({
        id: -1,
      }, {
        id: -1,
      })
      setPages(pages);
    }
  }, [currAuthor])

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
                    <div className="author_name">{currAuthor && currAuthor.userName}</div>
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
            } else if (index === pages.length - 2) {
              return (
                <div className="page" key={index} onClick={flipPage} style={{ zIndex: `${index % 2 === 0 ? pages.length - index : 0}` }}>
                  <div className='cover_wrapper back_second'>
                    <div className='cover_img'>
                      <img src='/public/assets/images/bookCoverBg.jpg' alt="" />
                    </div>
                  </div>
                </div>
              )
            }
            else if (index === pages.length - 2 || index === pages.length - 1) {
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
                    {page.shayari}
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