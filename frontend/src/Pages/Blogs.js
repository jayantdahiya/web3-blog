import React from 'react';
import { useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Blogs() {
  let navigate = useNavigate();
  const {account, isAuthenticated, isInitialized} = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const [blogs, setBlogs] = React.useState([]);
  const [blogsContent, setBlogsContent] = React.useState([]);
  const handleRead = () => {
    navigate('/blog/url');
  }
  const handleCreate = () => {
    navigate('/newBlog');
  }
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
    console.log(tokenUri);
  };

  const fetchBlogsContent = async () => {
    const limit5 = blogs?.slice(0, 5);
    let contentBlog = [];

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

  useEffect(() => {
    if (isInitialized) {
      fetchAllNfts();
      fetchBlogsContent();
    }
  }, [isInitialized]);
    
  return (
    <div className="hero">
      <div className="hero-content">
        { blogsContent.map((blog, id) => {
            const { title, text, owner_of, externalUrl } = blog;
            return (
              <div className="card w-96 bg-base-100 shadow-xl mt-2 mb-2" key={id}>
              <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{text}</p>
                <p>{owner_of.slice(20,30)}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={handleRead}>
                    Read
                  </button>
                </div>
              </div>
            </div>
            )
          })}
      </div>
    </div>
  );
}

export default Blogs