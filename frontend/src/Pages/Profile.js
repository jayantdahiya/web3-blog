import React from 'react'

function Profile() {
  return (
    <div className="hero">
      <div className="hero-content place-content-center h-[100vh] w-[100vw]">
        <div class="card w-96 bg-neutral text-neutral-content">
          <div class="card-body items-center text-center">
            <div class="avatar online placeholder">
              <div class="bg-slate-50 text-neutral-content rounded-full w-16">
                <span class="text-xl text-primary">JD</span>
              </div>
            </div>
            <h2 class="card-title">Hey!</h2>
            <p>This is your profile card</p>
            <p>Wallet address: xxxxxxxxx</p>
            <div class="card-actions justify-end">
              <button class="btn btn-accent">Home</button>
              <button class="btn btn-accent">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile