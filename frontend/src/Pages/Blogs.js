import React from 'react';
import { useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Blogs() {
  const navigate = useNavigate();
  const Web3Api = useMoralisWeb3Api();
  const {account, isAuthenticated, isInitialized} = useMoralis();
  const [blogs, setBlogs] = React.useState();
  var [blogsContent, setBlogsContent] = React.useState();
  

  const fetchAllNfts = async () => {
    const options = {
      chain: "mumbai",
      address: "0x876094802821F0b185ab4C5cBf1A1607Db9A8361",
    };

    const polygonNFTs = await Web3Api.token.getNFTOwners(options);
    const tokenUri = polygonNFTs?.result?.map((data) => {
      const { metadata, owner_of } = data;
      if (metadata) {
        const metadataObj = JSON.parse(metadata);
        const { externalUrl } = metadataObj;
        return { externalUrl, owner_of };
      } else {
        return undefined;
      }
    });
    setBlogs(tokenUri);
    console.log(blogs);
  };

  const fetchBlogsContent = async () => {
    const limit5 = blogs?.slice(0, 5);
    const contentBlog = [];
    if (limit5) {
      limit5.map(async (blog) => {
        if (blog) {
          const { externalUrl, owner_of } = blog;
          const res = await axios.get(externalUrl);
          const text = res.data.content.toString();
          const title = res.data.title;
          contentBlog.push({ title, text, owner_of, externalUrl });
        }
      });
    }
    setBlogsContent(contentBlog);
    console.log(contentBlog);
  };

  const handleRead = () => {
    navigate("/blog/url");
  };

  const handleCreate = () => {
    navigate("/newBlog");
  };


  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      fetchAllNfts();
    }
  }, [isAuthenticated, isInitialized, account]);

  useEffect(() => {
    if (blogs) {
      fetchBlogsContent();
    }
  }, [blogs]);
  

  return (
    <div className="hero min-h-screen">
      <div className='hero-content inline-grid'>
        {
          blogsContent && blogsContent.length > 0 ? (
            blogsContent.map((blog, i) => {
              const { title, text, owner_of, externalUrl } = blog;
                return (
                  <div className="card w-[80vw] bg-base-100 shadow-xl" key={i}>
                    <div className="card-body">
                      <h2 className="card-title">{title}</h2>
                      <p>
                        Author : {owner_of.slice(0, 3)}...
                        {owner_of.slice(26, 30)}
                      </p>
                      {text.length > 200 ? (
                        <p>{text.slice(0, 200)}...</p>
                      ) : (
                        <p>{text}</p>
                      )}
                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-primary"
                          onClick={handleRead}
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                );
            })
          ) : (
            <dov>Loading...</dov>
          )
        }
      </div>
    </div>
  )
}

export default Blogs