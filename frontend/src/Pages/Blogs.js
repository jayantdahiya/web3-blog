import React from 'react'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { useNavigate } from 'react-router-dom';

function Blogs() {
  let navigate = useNavigate();
  const {account} = useMoralis();
  const web3API = useMoralisWeb3Api();
  const [blogs, setBlogs] = React.useState([]);
  const [blogsContent, setBlogsContent] = React.useState([]);
  const handleRead = () => {
    navigate('/blog/url');
  }
  const fetchBlogs = async () => {
    const options = {
      chain: "mumbai",
      address: account,
      token_address: "0x876094802821F0b185ab4C5cBf1A1607Db9A8361",
    };
    const polygonNFTS = await web3API.account.getNFTsForContract(options);
    try {
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
    } catch (error) {
      console.log(error);
    }
    }
  return (
    <div className="hero">
      <div classNameName="hero-content">
        <div className="card w-96 bg-base-100 shadow-xl mt-2 mb-2">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleRead}>Read</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs