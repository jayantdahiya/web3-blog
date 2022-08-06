import React from 'react'
import { useMoralis, useMoralisFile } from 'react-moralis';
import { useWeb3ExecuteFunction } from 'react-moralis';

function NewBlog() {
  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const {saveFile} = useMoralisFile();
  const [blogHeading, setBlogHeading] = React.useState('');
  const [blogContent, setBlogContent] = React.useState('');

  const mint = async(account, uri) => {

    let options = {
      contractAddress: "0x876094802821F0b185ab4C5cBf1A1607Db9A8361",
      functionName: "safeMint",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "string",
              name: "uri",
              type: "string",
            },
          ],
          name: "safeMint",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      params: {
        to: account,
        uri: uri,
      },
      msgValue: Moralis.Units.ETH(1),
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        alert("Minted");
        setBlogHeading('');
        setBlogContent('');
      },
      onError: (error) => {
        alert(error.message);
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const metaData = {
      title: blogHeading,
      content: blogContent,
    };
    try {
      const result = await saveFile(
        'blog.json',
        {base64: btoa(JSON.stringify(metaData))},
        {
          type: 'base64',
          saveIPFS: true,
        }
      );
      const nftResult = await uploadNftMetaData(result.ipfs());
      await mint(account, nftResult.ipfs());
    } catch (error) {
      alert(error.message);
    }
  }

  const uploadNftMetaData = async (uri) => {
    const metadataNft = {
      description: blogHeading,
      externalUrl: uri,
    };
    const resultNft = await saveFile(
      "metaData.json",
      { base64: btoa(JSON.stringify(metadataNft)) },
      {
        type: "base64",
        saveIPFS: true,
      }
    );
    return resultNft;
  }
  return (
    <div className="hero min-h-[90vh]">
      <div className="hero-content text-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Post a new blog!</h2>
            <p></p>
            <input
              type="text"
              placeholder="Type the heading here"
              className="input input-bordered input-primary w-full max-w-xs"
              onChange={(e) => setBlogHeading(e.target.value)}
            />
            <textarea
              className="textarea textarea-bordered textarea-primary h-64"
              placeholder="Blog content"
              onChange={(e) => setBlogContent(e.target.value)}
            ></textarea>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={handleSubmit}>Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewBlog