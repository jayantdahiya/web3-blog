import React from 'react'
import { useNavigate } from 'react-router-dom';

function Blogs() {
  let navigate = useNavigate();
  const handleRead = () => {
    navigate('/blog/url');
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