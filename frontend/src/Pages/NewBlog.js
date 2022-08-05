import React from 'react'

function NewBlog() {
  return (
    <div className="hero min-h-[90vh]">
      <div className="hero-content text-center">
        <div class="card w-96 bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Post a new blog!</h2>
            <p></p>
            <input
              type="text"
              placeholder="Type the heading here"
              class="input input-bordered input-primary w-full max-w-xs"
            />
            <textarea
              class="textarea textarea-bordered"
              placeholder="Blog content"
            ></textarea>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewBlog