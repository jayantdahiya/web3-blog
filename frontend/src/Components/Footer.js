import React from 'react'

function Footer() {
  return (
    <footer class="footer p-10 bg-primary text-neutral-content">
      <div>
        <span class="footer-title">About</span>
        <a class="link link-hover">Home</a>
        <a class="link link-hover">GitHub</a>
        <a class="link link-hover">Smart Contract</a>
      </div>
      <div>
        <span class="footer-title">Dev</span>
        <a class="link link-hover">About me</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Twitter</a>
      </div>
      <div>
        <span class="footer-title">License</span>
        <a class="link link-hover">MIT</a>
      </div>
    </footer>
  );
}

export default Footer